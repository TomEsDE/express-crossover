import db from '../db/db';

class Question {
  async addQuestionToQuiz(quizId, questionId) {
    const junction = await db('quiz_question_junc').insert({
      question_id: questionId,
      quiz_id: quizId,
    });
    // .returning('id');

    return true;
  }

  async getQuestion(questionId) {
    console.log('questionId', questionId);
    const [result] = await db('question')
      .select({
        id: 'question.id',
        question: 'question',
        description: 'question.description',
        number: 'number',
        imageUrl: 'image_url',
        topic: 'topic.description',
        language: 'language.country_code',
      })
      .leftJoin('topic', 'question.topic_id', 'topic.id')
      .leftJoin('language', 'question.language_id', 'language.id')
      .where({ 'question.id': questionId });

    return result;
  }

  async getQuestion(questionId) {
    console.log('questionId', questionId);
    const [result] = await db('question')
      .select({
        id: 'question.id',
        question: 'question',
        text: 'question.description',
        number: 'number',
        imageUrl: 'image_url',
        shuffle: 'shuffle',
        topic: 'topic.description',
        language: 'language.country_code',
      })
      .leftJoin('topic', 'question.topic_id', 'topic.id')
      .leftJoin('language', 'question.language_id', 'language.id')
      .where({ 'question.id': questionId });

    return result;
  }

  async getRandomQuestion(topicId) {
    // console.log('questionId', questionId);
    let result = await db('question')
      .select({
        id: 'question.id',
        question: 'question',
        description: 'question.description',
        number: 'number',
        imageUrl: 'image_url',
        topic: 'topic.description',
        language: 'language.country_code',
      })
      .leftJoin('topic', 'question.topic_id', 'topic.id')
      .leftJoin('language', 'question.language_id', 'language.id');

    console.log('result', result.length);
    if (result) {
      result = result[Math.floor(Math.random() * result.length)];
    }
    console.log('result', result);
    return result;
  }

  async getQuestionsByQuiz(quizId) {
    const result = await db('question')
      .select({
        id: 'question.id',
        question: 'question',
        description: 'description',
        number: 'number',
        imageUrl: 'image_url',
        topic: 'topic.description',
      })
      .join(
        'question_quiz_junc',
        'question.id',
        'question_quiz_junc.question_id'
      )
      .join('answer', 'answer.question_id', 'question.id')
      .join('topic', 'question.topic_id', 'topic.id')
      .where({ quiz_id: quizId });
    // .orderByRaw('COALESCE(question_quiz_junc.order, 1)');

    return result;
  }
}

export default new Question();
