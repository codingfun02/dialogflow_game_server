export const checkAnswer = (answer, input) => {
  const inputArr = input.split("");
  let strikes = 0,
    balls = 0;
  for (let answerIdx = 0; answerIdx < answer.length; answerIdx++) {
    const inputIdx = inputArr.indexOf(answer[answerIdx]);
    if (inputIdx === -1) {
      continue;
    }
    if (inputIdx === answerIdx) {
      strikes++;
      continue;
    }
    if (inputIdx !== answerIdx) {
      balls++;
      continue;
    }
  }
  return {
    strikes,
    balls,
    isOut: strikes === 0 && balls === 0,
    isCorrect: strikes === 3,
  };
};

export const generateNumber = (cipher) => {
  const numberSet = new Set();
  while (numberSet.size < cipher) {
    numberSet.add(Math.floor(Math.random() * 9 + 1)); // 1~9까지의 난수 생성 후 집합에 추가
  }
  return Array.from(numberSet).join(""); // convert Set -> Array -> String
};
