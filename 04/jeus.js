// 연산자 순서의 모든 경우의 수
function getOperations() {
    const operations = [];
    operations.push(["+", "-", "*"]);
    operations.push(["+", "*", "-"]);
    operations.push(["-", "+", "*"]);
    operations.push(["-", "*", "+"]);
    operations.push(["*", "+", "-"]);
    operations.push(["*", "-", "+"]);
    return operations;
}

// 연산자 우선순위에 따른 계산
// expression: 계산할 식
// operation: 연산자 우선순위
function calculate(expression, operation) {
    let result = 0;
    let numbers = expression.split(/[^0-9]/);
    let operators = expression.split(/[0-9]/).filter((value) => value !== "");

    for (let i = 0; i < operation.length; i++) {
        // 우선순위 연산자듦로 우선 계산
        let operator = operation[i];
        while (operators.includes(operator)) {
            let index = operators.indexOf(operator);
            let number1 = Number(numbers[index]);
            let number2 = Number(numbers[index + 1]);
            let tempResult = 0;
            if (operator === "+") {
                tempResult = number1 + number2;
            } else if (operator === "-") {
                tempResult = number1 - number2;
            } else if (operator === "*") {
                tempResult = number1 * number2;
            }

            // 계산한 결과를 제거하고, 계산 결과를 배열에 추가
            numbers.splice(index, 2, tempResult);
            // 계산한 연산자를 제거
            operators.splice(index, 1);
        }
    }
    result = numbers[0];
    return Math.abs(result);
}

function solution(expression) {
    let answer = 0;
    const operations = getOperations();
    for (let i = 0; i < operations.length; i++) {
        let result = calculate(expression, operations[i]);
        if (result > answer) {
            answer = result;
        }

    }
    return answer
}

// console.log(solution("100-200*300-500+20"))
