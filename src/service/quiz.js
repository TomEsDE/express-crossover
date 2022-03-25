import quizDao from '../model/quiz';
import questionDao from '../model/question';
import questionService from '../service/question';
import answerDao from '../model/answer';

class QuizService {
  async createQuiz(quizDto) {
    const { userId } = quizDto;

    const quizId = await quizDao.createQuiz(userId);
    console.log('quizDB', quizId);

    return await this.getQuiz(quizId);
  }

  async getQuiz(id) {
    const quizDB = await quizDao.getQuiz(id);
    console.log('quizDB', quizDB);
    quizDB.questions = await quizDao.getQuizQuestions(quizDB.id);

    if (quizDB.questions) {
      for (const question of quizDB.questions) {
        question.question = await questionService.getQuestion(
          question.questionId
        );
      }
    }

    return quizDB;
  }

  async addQuestion(quizId, questionId) {
    // const { , questionId } = quizDto;
    const quizDB = await quizDao.addQuestion(quizId, questionId);

    // console.log('quizDB', quizDB);
    // quizDB.ingridients = await answerDao.getIngridientsByQuiz(quizDB.id);
    // quizDB.preparation = await preparationDao.getPreparationByQuiz(quizDB.id);
    // quizDB.images = await imageDao.getImagesByQuiz(quizDB.id);
    // quizDB.attributes = await attributeDao.getAttributesByQuiz(quizDB.id);

    return await this.getQuiz(quizId);
  }

  async addRandomQuestion(quizId, topicId = 1) {
    // const { , questionId } = quizDto;
    const question = await questionService.getRandomQuestion();
    const quizDB = await quizDao.addQuestion(quizId, question.id);

    // console.log('quizDB', quizDB);
    // quizDB.ingridients = await answerDao.getIngridientsByQuiz(quizDB.id);
    // quizDB.preparation = await preparationDao.getPreparationByQuiz(quizDB.id);
    // quizDB.images = await imageDao.getImagesByQuiz(quizDB.id);
    // quizDB.attributes = await attributeDao.getAttributesByQuiz(quizDB.id);

    return await this.getQuiz(quizId);
  }

  async updateQuestion(quizDto) {
    const { quizId, questionId, check } = quizDto;

    const quizDB = await quizDao.updateQuestion(quizId, questionId, check);
    console.log('quizDB', quizDB);

    return await this.getQuiz(quizId);
  }
}

export default new QuizService();
