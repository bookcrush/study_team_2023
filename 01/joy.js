/*
1.이모티콘 길이만큼 할일률 리스트업 
  [[ 이모티콘 길이 ], [ 이모티콘 길이 ], ...]
  e.g. 길이: 4^(이모티콘 길이) (최대 7)
    [[0.1, 0.1, 0.1], [0.1, 0.1, 0.2], ...]
    
result = [plusEnterCount, discountAmmount]
2. 1번 루프돌면서
  루프마다 (A)
    user 루프 (B) [비율, 가격]
      plusEnterCount 
      discountAmmount
      A 루프 
        if(비율 <= A[i]) 할인 적용
        else count++
      
      plusEnterCount 기준 result Max 갱신
        plusEnterCount 
        discountAmmount
*/

function solution(users, emoticons) {
  const discountRateEnumContextList = permutation(4, emoticons.length);
  let [plusEnter, salesAmount] = [0, 0];

  discountRateEnumContextList.map((discountRateEnumContext, idx) => {
    let [_plusEnter, _salesAmount] = [0, 0];

    users.forEach(([비율, 최대가격]) => {
      let sumAmount = 0;

      discountRateEnumContext.forEach((discountRateEnum, index) => {
        const 비교할인백분률 = discountRateEnum * 10;
        if (비율 > 비교할인백분률) return;

        const 적용백분률 = 100 - 비교할인백분률;
        sumAmount += (emoticons[index] * 적용백분률) / 100;
      });

      if (sumAmount >= 최대가격) _plusEnter += 1;
      else _salesAmount += sumAmount;
    });

    if (plusEnter > _plusEnter) return;
    if (plusEnter < _plusEnter) {
      plusEnter = _plusEnter;
      salesAmount = _salesAmount;
      return;
    }
    if (salesAmount < _salesAmount) salesAmount = _salesAmount;
  });

  return [plusEnter, salesAmount];
}

// 중복 순열 DFS
function permutation(n, m) {
  let answer = [];
  let tmp = Array.from({ length: m }, () => 0);

  function DFS(L) {
    if (L === m) {
      answer.push(tmp.slice());
    } else {
      for (let i = 1; i <= n; i++) {
        tmp[L] = i;
        DFS(L + 1);
      }
    }
  }

  DFS(0);
  return answer;
}

// permutation(3, 2);
