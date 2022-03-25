import db from '../db/db';

class Quiz {
  async createQuiz(userId) {
    const [id] = await db('quiz')
      .insert({
        result: 0,
        user_id: userId,
      })
      .returning('quiz_id');

    return id.quiz_id;
  }

  async getQuiz(id) {
    console.log('quiz_id', id);
    const [result] = await db('quiz')
      .select({
        id: 'quiz_id',
        dateCreated: 'date_created',
        result: 'result',
      })
      .where({ quiz_id: id });

    return result;
  }

  async addQuestion(quizId, questionId) {
    const result = await db('quiz_question_junc').insert({
      quiz_id: quizId,
      question_id: questionId,
    });

    return result;
  }

  async updateQuestion(quizId, questionId, check) {
    const result = await db('quiz_question_junc')
      .update({
        check: check,
        date_checked: new Date(),
      })
      .where({ quiz_id: quizId, question_id: questionId });

    return result;
  }

  async getQuizQuestions(quizId) {
    const result = await db('quiz_question_junc')
      .select({
        questionId: 'question_id',
        check: 'check',
        dateChecked: 'date_checked',
        answerId: 'answer_id',
      })
      .where({ quiz_id: quizId });

    return result;
  }

  async getQuizQuestion(quizId, questionId) {
    const [result] = await db('quiz_question_junc')
      .select({
        id: 'id',
        title: 'title',
        description: 'description',
        rating: 'rating',
        authorId: 'author_id',
        quizDate: 'quiz_date',
      })
      .where({ id: id });

    return result;
  }
}

export default new Quiz();
