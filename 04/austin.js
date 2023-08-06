function getOperator(a, b, operator) {
    if (operator === '*') {
        return a * b
    } else if (operator === '+') {
        return a + b
    }
    return a - b
}
    
function sum(numbers, operators, sequences) {
    const size = sequences.length
    const [operator, ...nextSequences] = sequences
    if (size <= 1) {
        return numbers.reduce((acc, n, index) => {
            if(!index) {
                return n
            }
            return getOperator(
                acc,
                n,
                operator
            )
        }, 0)
    }
    return sum(
        numbers.reduce((acc, n, index) => {
            if (index === 0) {
                acc.push(n)
                return acc
            }
            const length = acc.length - 1
            const o = operators[index - 1]
            if (o === operator) {
                acc[length] = (
                    getOperator(
                        acc[length],
                        n,
                        operator
                    )
                )
            } else {
                acc.push(n)
            }
            return acc
        }, []),
        operators.filter((o) => o !== operator),
        nextSequences,
    )
}

function solution(expression) {
    const operators = expression.split(/\d/).filter((v) => v)
    const numbers = expression.split(/\D/).map(Number)
    return [
        ['*', '+', '-'],
        ['*', '-', '+'],
        ['+', '*', '-'],
        ['+', '-', '*'],
        ['-', '*', '+'],
        ['-', '+', '*'],
    ].reduce((acc, sequences) => {
        const value = Math.abs(sum(
            numbers,
            operators,
            sequences,
        ))
        if (acc < value) {
            return value
        }
        return acc
    }, 0)
}