"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateNumber = exports.checkAnswer = void 0;

var checkAnswer = function checkAnswer(answer, input) {
  var inputArr = input.split("");
  var strikes = 0,
      balls = 0;

  for (var answerIdx = 0; answerIdx < answer.length; answerIdx++) {
    var inputIdx = inputArr.indexOf(answer[answerIdx]);

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
    strikes: strikes,
    balls: balls,
    isOut: strikes === 0 && balls === 0,
    isCorrect: strikes === 3
  };
};

exports.checkAnswer = checkAnswer;

var generateNumber = function generateNumber(cipher) {
  var numberSet = new Set();

  while (numberSet.size < cipher) {
    numberSet.add(Math.floor(Math.random() * 9 + 1)); // 1~9까지의 난수 생성 후 집합에 추가
  }

  return Array.from(numberSet).join(""); // convert Set -> Array -> String
};

exports.generateNumber = generateNumber;