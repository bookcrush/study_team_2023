const discounts = [10, 20, 30, 40]
// 1. 쿠폰과 할인율 모든 경우의 수 구하기
// 2. 모든 경우의 수를 이용해 가격 유저가 해당 할인율 보다 많이 쓰는 경우 계산
function solution(users, emoticons) {
    const allCases = []
    let plusUser = 0; // 플러스 가입자수
    let salesAmount = 0; // 판매액

    getAllCases(emoticons, [], allCases)

    allCases.forEach((emoticonCase) => {
        let tempPlusUser = 0;
        let tempSalesAmount = 0;

        users.forEach((user) => {
            const [userDiscount, userPurchasePrice] = user

            let sumOfUserPurchases = emoticonCase.reduce((acc, cur) => {
                const [emotionDiscount, emoticonPrice] = cur
                // 사용자가 가진 할인율 보다 이모티콘 할인율 이상인 경우 모두 구매
                if (userDiscount <= emotionDiscount) {
                    return acc + discountPrice(emotionDiscount, emoticonPrice)
                }
                return acc
            }, 0)

            // 사용자가 가진 기준 금액보다 구입 비용이 높은 경우 플러스 가입
            if (sumOfUserPurchases >= userPurchasePrice) {
                tempPlusUser += 1;
            } else {
                // 플러스 가입 안하면 구매 비용 증가
                tempSalesAmount += sumOfUserPurchases
            }
        })
        // 우선순위 1. 플러스 가입자수가 많은 경우
        // 우선순위 2. 플러스 가입자수가 같은 경우 판매액이 높은 경우
        if (tempPlusUser > plusUser) {
            plusUser = tempPlusUser
            salesAmount = tempSalesAmount
        } else if (tempPlusUser === plusUser) {
            salesAmount = Math.max(salesAmount, tempSalesAmount)
        }
    })

    return [plusUser, salesAmount]
}

function discountPrice(discountPercent, price) {
    return price * (1 - (discountPercent / 100))
}

// 재귀함수로 이중배열 쿠폰과 할인율의 모든 경우의 수 구하기
// return [[할인율, 가격], ...]
function getAllCases(emoticons, emoticonCase, emoticonCases) {
    if (emoticons.length < 1) {
        emoticonCases.push(emoticonCase)
        return emoticonCases
    }

    discounts.forEach((emoticon, i) => {
        const newEmoticons = emoticons.slice(1)
        const newEmoticonCase = [...emoticonCase, [discounts[i], emoticons[0]]]
        getAllCases(newEmoticons, newEmoticonCase, emoticonCases)
    })
}

// solution([[40, 2900], [23, 10000], [11, 5200], [5, 5900], [40, 3100], [27, 9200], [32, 6900]], [1300, 1500, 1600, 4900])
