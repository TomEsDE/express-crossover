import quizService from '../service/quiz';

class QuizController {
  async createQuiz(req, res) {
    try {
      console.log('createQuiz >> req.body: ', req.body);
      const result = await quizService.createQuiz(req.body);
      console.log('after createQuiz >> result: ', result);

      if (!result) throw new Error('Error createQuiz');

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getQuiz(req, res) {
    try {
      console.log('getQuiz >> params.id: ', req.params?.id);
      const result = await quizService.getQuiz(req.params.id);
      console.log('after getQuiz', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async addQuestion(req, res) {
    try {
      console.log('addQuestion >> req.body: ', req.params);
      const id = await quizService.addQuestion(
        req.params.id,
        req.params.questionId
      );
      console.log('after addQuestion >> id: ', id);

      if (!id) throw new Error('Error addQuestion');

      return res.status(200).json({ id: id });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async addRandomQuestion(req, res) {
    try {
      console.log('addQuestion >> req.body: ', req.params);
      const id = await quizService.addRandomQuestion(req.params.id);
      console.log('after addQuestion >> id: ', id);

      if (!id) throw new Error('Error addQuestion');

      return res.status(200).json({ id: id });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async updateQuestion(req, res) {
    try {
      console.log('updateQuestion >> req.body: ', req.body);
      const id = await quizService.updateQuestion(req.body);
      console.log('after updateQuestion >> id: ', id);

      if (!id) throw new Error('Error updateQuestion');

      return res.status(200).json({ id: id });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}

export default new QuizController();
