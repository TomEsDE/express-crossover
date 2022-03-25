import question from '../model/question';
import answer from '../model/answer';

class QuestionService {
  addQuestionToQuiz(questionDto) {
    const { quizId, questionId } = questionDto;

    return question.addQuestionToQuiz(quizId, questionId);
  }

  async getQuestion(questionId) {
    const questionDB = await question.getQuestion(questionId);

    console.log('questionDB', questionDB.id);
    questionDB.answers = await answer.getAnswersByQuestion(questionDB.id);

    return questionDB;
  }

  async getRandomQuestion() {
    const questionDB = await question.getRandomQuestion(1);

    console.log('questionDB', questionDB);
    questionDB.answers = await answer.getAnswersByQuestion(questionDB.id);

    return questionDB;
  }
}

export default new QuestionService();
