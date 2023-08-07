function solution(soldier, freePassCount, enemies) {
  let winCount = 0;
  
  enemies.every((enemy) => {
    if (soldier < enemy) {
      if (!freePassCount) return false;

      freePassCount--;
      winCount++;
      return true;
    }

    if (!soldier) {
      return false;
    }
    if (soldier >= enemy) {
      winCount++;
      soldier -= enemy;
      return true;
    }
  });
    
  return winCount;
}

