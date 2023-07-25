function solution(n, k, enemy) {
    // 이진 탐색
    let [left, right] = [0, enemy.length];
    let mid = Math.floor((left + right) / 2);


    while (left <= right) {
        let clear = k
        let blockedRound = enemy.slice(0, mid).sort((a, b) => b - a)

        // 무적권 존재하지 않을때 까지 사용 후 남은 적 수
        const restN = blockedRound.reduce((acc, cur) => {
            if (clear > 0) {
                clear--;
                return acc;
            }
            return acc + cur;
        }, 0)

        // 무적권 갯수가 남으면서 적이 남아있는 경우
        if (n - restN >= 0 && clear >= 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }

        // while 문이 돌수록 새롭게 mid 값이 변경되어야 함
        mid = Math.floor((left + right) / 2);
    }

    // right 값은 index 가 아닌 length 이므로 -1 해줘야 함
    return left - 1;
}

// console.log(solution(7, 3, [4, 2, 4, 5, 3, 3, 1]))
// console.log(solution(2, 4, [3, 3, 3, 3]))
