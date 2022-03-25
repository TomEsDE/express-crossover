import answer from '../model/answer';

class AnswerService {
  createAnswer(answerDto) {
    const { questionId, description, check, number } = answerDto;

    return answer.createAnswer(questionId, description, check, number);
  }

  getAnswer(id) {
    return answer.getAnswer(id);
  }

  getAnswersByQuestion(questionId) {
    return answer.getAnswersByQuestion(questionId);
  }
}

export default new AnswerService();
