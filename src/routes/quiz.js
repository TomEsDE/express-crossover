import express from 'express';
import userController from '../controller/user';
import questionController from '../controller/question';
import quizController from '../controller/quiz';
import answerController from '../controller/answer';

const routes = express.Router();

/* ###### USER */
routes.get('/user/:id', userController.getUser);
routes.post('/user', userController.createUser);
routes.post('/login', userController.loginUser);

/* ###### question */
routes.get('/question/:id', questionController.getQuestion);
routes.get('/questionRandom', questionController.getRandomQuestion);

/* ###### question */
routes.post('/quiz', quizController.createQuiz);
routes.get('/quiz/:id', quizController.getQuiz);
routes.post('/quiz/:id/udpate/:questionId', quizController.updateQuestion);
routes.post('/quiz/:id/add/:questionId', quizController.addQuestion);
routes.post('/quiz/:id/addRandom', quizController.addRandomQuestion);

// routes.get('/search/query=:query&flag=:flag', recipeController.searchRecipe);
// routes.post('/recipe', recipeController.createRecipe);
// // routes.post('/recipesImport', recipeController.doRecipeImport);

// /* ###### INGRIDIENT */
// routes.get('/ingridient/:id', answerController.getIngridient);
// routes.get(
//   '/ingridientsByRecipe/:recipeId',
//   answerController.getIngridientsByRecipe
// );
// routes.post('/ingridient', answerController.createIngridient);

// /* ###### ATTRIBUTES */
// routes.get(
//   '/attributesByRecipe/:recipeId',
//   attributeController.getAttributesByRecipe
// );
// routes.post('/attribute', attributeController.createAttribute);

export { routes };
