import questionService from '../service/question';

class QuestionController {
  async addQuestionToQuiz(req, res) {
    try {
      console.log('addQuestionToQuiz >> req.body: ', req.body);
      const result = await questionService.addQuestionToQuiz(req.body);
      console.log('after addQuestionToQuiz >> id: ', result);

      if (!result) throw new Error('Error addQuestionToQuiz');

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getQuestion(req, res) {
    try {
      console.log('getQuestion >> params.id: ', req.params?.id);
      const result = await questionService.getQuestion(req.params.id);
      console.log('after getQuestion', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getRandomQuestion(req, res) {
    try {
      const result = await questionService.getRandomQuestion();
      console.log('after getRandomQuestion', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getQuestionsByQuiz(req, res) {
    try {
      console.log('getQuestionsByQuiz >> params.quizId: ', req.params?.quizId);
      const result = await questionService.getQuestionsByQuiz(
        req.params.quizId
      );
      console.log('after getQuestionsByQuiz', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}

export default new QuestionController();
