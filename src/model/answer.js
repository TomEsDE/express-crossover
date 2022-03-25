import db from '../db/db';

class Answer {
  async createAnswer(questionId, description, check, number = 1) {
    const [id] = await db('answer')
      .insert({
        question_id: questionId,
        description: description,
        check: check,
        number: +number,
      })
      .returning('id');

    return id;
  }

  async getAnswer(id) {
    const [result] = await db('answer')
      .select({
        id: 'id',
        description: 'description',
        check: 'check',
        number: 'number',
        questionId: 'question_id',
      })
      .where({ id: id });

    return result;
  }

  async getAnswersByQuestion(questionId) {
    const result = await db('answer')
      .select({
        id: 'id',
        text: 'description',
        check: 'check',
        // number: 'number',
        // questionId: 'question_id',
      })
      .where({ question_id: questionId });

    return result;
  }
}

export default new Answer();
