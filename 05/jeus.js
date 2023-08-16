// 택배 배달과 수거
function solution(cap, n, deliveries, pickups) {
    let answer = 0;

    let deliveryNum = 0; // 배달 해야할 상자 수
    let pickupNum = 0; // 픽업 해야할 상자 수

    for (let i = n - 1; i >= 0; i--) {
        deliveryNum += deliveries[i];
        pickupNum += pickups[i];

        while (deliveryNum > 0 || pickupNum > 0) {
            deliveryNum -= cap;
            pickupNum -= cap;
            answer = answer + ((i + 1) * 2); // 해당 위치의 집에 배달해야 할 상자 또는 픽업해야할 상자가 존재한다면 무조건 배달기사가 도달함, 왕복 거리라서 2를 곱해줌
        }

    }

    return answer;
}

// console.log(solution(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0], 16))
