class Heap {
    list = []
    push (value) {
        this.list.push(value)
        let index = this.list.length - 1
        while (index > 0) {
            const top = Math.floor((index - 2 + (index % 2)) / 2)
            if (this.list[top] > value) {
                this.list[index] = this.list[top]
                this.list[top] = value
                index = top
            } else {
                index = 0
            }
        }
    }
    pop () {
        const min = this.list[0]
        const last = this.list.pop()
        const size = this.list.length - 1
        if (last) {
            let index = 0
            this.list[index] = last
             // 0
             // 1        2
             // 3   4    5     6
             // 7 8 9 10 11 12 13 14
            while (index < size) {
                const leftIndex = index * 2 + 1
                const rightIndex = index * 2 + 2
                const left = this.list[leftIndex] ?? 0
                const right = this.list[rightIndex] ?? 0
                if (
                    left && left < last &&
                    (!right || left < right)
                ) {
                    this.list[index] = left
                    this.list[leftIndex] = last
                    index = leftIndex
                } else if (
                    right && right < last
                ) {
                    this.list[index] = right
                    this.list[rightIndex] = last
                    index = rightIndex
                } else {
                    index = size
                }
            }
            return min
        }
    }
    get min() {
        return this.list[0]
    }
}

const heap = new Heap()

function solution(n, k, enemy) {
    let answer = 0
    const lastRoundNumber = enemy.length
    let remainSoldierCount = n

    if (k >= lastRoundNumber) {
        return lastRoundNumber
    }
    
    for (
        let roundNumber = 0;
        roundNumber < lastRoundNumber;
        roundNumber += 1
    ) {
        const enemyNumber = enemy[roundNumber]
        if (roundNumber < k) {
            heap.push(enemyNumber)
        } else if (enemyNumber <= heap.min) {
            remainSoldierCount -= enemyNumber
        } else {
            remainSoldierCount -= heap.pop()
            heap.push(enemyNumber)
        }
        if (remainSoldierCount === 0) {
            return roundNumber + 1
        } else if(remainSoldierCount < 0) {
            return roundNumber
        }
    }
    
    return lastRoundNumber
}