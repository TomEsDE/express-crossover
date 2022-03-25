import answerService from '../service/answer';

class AnswerController {
  async createAnswer(req, res) {
    try {
      console.log('createAnswer >> req.body: ', req.body);
      const id = await answerService.createAnswer(req.body);
      console.log('after createAnswer >> id: ', id);

      if (!id) throw new Error('Error createAnswer');

      return res.status(200).json({ id: id });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getAnswer(req, res) {
    try {
      console.log('getAnswer >> params.id: ', req.params?.id);
      const result = await answerService.getAnswer(req.params.id);
      console.log('after getAnswer', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getAnswersByRecipe(req, res) {
    try {
      console.log(
        'getAnswersByRecipe >> params.questionId: ',
        req.params?.questionId
      );
      const result = await answerService.getAnswersByRecipe(
        req.params.questionId
      );
      console.log('after getAnswersByRecipe', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}

export default new AnswerController();
