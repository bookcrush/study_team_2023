// 대기실별 응시자가 있는 P의 좌표만 추출한다.
// P의 좌표를 기준으로 거리가 2 보다 작으면 0 아니면 1을 반환하는데,
// 위아래 또는 양쪽 사이의 값이 테이블(0)이 있는 경우 실패
// 대각선에 테이블(0)이 있는 경우 실패

function solution(places) {
    const answer = [];
    const 대기실별_응시자_목록 = []

    // 대기실 별
    for (let i = 0; i < places.length; i++) {
        // 행
        const 대기실 = [];
        for (let j = 0; j < places[i].length; j++) {
            const place = places[i][j];
            // 열
            for (let k = 0; k < place.length; k++) {
                if (place[k] === 'P') {
                    대기실.push([j, k])
                }
            }
        }
        대기실별_응시자_목록.push(대기실);

    }

    for (let i = 0; i < 대기실별_응시자_목록.length; i++) {
        const 대기실 = 대기실별_응시자_목록[i];
        let flag = true;
        for (let j = 0; j < 대기실.length; j++) {
            for (let k = j + 1; k < 대기실.length; k++) {
                if (distance(대기실[j], 대기실[k]) < 2) {
                    flag = false;
                    break;
                } else if (distance(대기실[j], 대기실[k]) === 2) {
                    // 행 위치가 같은 경우
                    if (대기실[j][0] === 대기실[k][0]) {
                        // 기존 대기실의 왼쪽 오른쪽 사이의 값에 테이블이 있는 경우 싪패
                        if (places[i][대기실[j][0]][대기실[j][1] + 1] === 'O') {
                            flag = false;
                            break;
                        }
                        // 열 위치가 같은 경우
                    } else if (대기실[j][1] === 대기실[k][1]) {
                        // 기존 대기실의 위 아래 사이의 값에 테이블이 있는 경우 실패
                        if (places[i][대기실[j][0] + 1][대기실[j][1]] === 'O') {
                            flag = false;
                            break;
                        }
                    } else {
                        // 대각선에 테이블이 있는 경우 실패
                        if (places[i][대기실[j][0]][대기실[k][1]] === 'O' || places[i][대기실[k][0]][대기실[j][1]] === 'O') {
                            flag = false;
                            break;
                        }
                    }
                }
            }
        }
        answer.push(flag ? 1 : 0);
    }

    return answer;
}

function distance(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
}

solution([["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]])
