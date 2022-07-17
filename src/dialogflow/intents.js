import User from "../models/User";
import { checkAnswer, generateNumber } from "./answerProcessor";

export const gameStart = async (agent) => {
  const sessionId = agent.session.split("/").pop();
  const generatedNumber = generateNumber(3); // 세 자리 자연수 생성
  const user = await User.findOne({ userId: sessionId });
  agent.add("안녕? 나는 숫자야구봇이야. 😆");
  agent.add("내가 생각한 숫자를 맞춰봐! (세 자리 자연수, 숫자 중복 허용 ❌)");
  if (user) {
    console.log("user exists");
    user.answer = generatedNumber;
    await user.save();
  } else {
    console.log("user doesn't exist");
    await User.create({
      userId: sessionId,
      answer: generatedNumber,
    });
  }
};

export const getNumber = async (agent) => {
  const sessionId = agent.session.split("/").pop();
  const user = await User.findOne({ userId: sessionId });
  const { query } = agent;
  const queryRegex = /^(?![0-9]*([0-9])[0-9]*\1)[0-9]{3}$/; // 숫자 중복이 없는 세 자리 자연수인지 체크!
  if (!queryRegex.test(query)) {
    return agent.add("⚠️ 숫자 중복이 없는 세 자리 자연수만 입력해야해!");
  }
  const { strikes, balls, isOut, isCorrect } = checkAnswer(user.answer, query);
  if (isCorrect) {
    agent.add("정답!");
    agent.add("다시 할꺼면 '다시', 여기서 끝낼거면 '끝'을 입력해줘 😉");
    await user.delete();
    // -> game_end
    return;
  }
  if (!isOut) {
    return agent.add(
      `${strikes > 0 ? `스트라이크 ${strikes}` : ""} ${
        balls > 0 ? `볼 ${balls}` : ""
      }`
    );
  }
  agent.add("아웃!");
};
