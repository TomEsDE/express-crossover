import db from '../db/db';

class User {
  async createUser(
    username,
    email,
    password,
    validated = false,
    avatarUrl = null
  ) {
    const [id] = await db('users')
      .insert({
        username: username,
        email: email,
        password: password,
        validated: validated,
        avatar_url: avatarUrl,
      })
      .returning('id');

    return id;
  }

  async loginUser(username, password) {
    const [validated] = await db('users')
      .select({
        validated: 'validated',
      })
      .where({ username: username, password: password });

    // console.log('validated', validated.validated);

    return validated?.validated;
  }

  async getUser(id) {
    const [result] = await db('users')
      .select({
        id: 'id',
        username: 'username',
        email: 'email',
        validated: 'validated',
        dateCreated: 'date_created',
        avatarUrl: 'avatar_url',
      })
      .where({ id: id });

    return result;
  }

  async createUserFavourite(userId, recipeId, order = 1, rating = 0) {
    const junction = await db('user_recipe_junc').insert({
      user_id: userId,
      recipe_id: recipeId,
      order: order,
      rating: +rating,
      favourite: true,
    });

    return junction;
  }

  async getUserFavourites(id) {
    const result = await db('users')
      .select({
        id: 'users.id',
        recipeId: 'recipe_id',
        order: 'order',
        userRating: 'user_recipe_junc.rating',
        recipeRating: 'recipe.rating',
        recipeTitle: 'recipe.title',
      })
      .join('user_recipe_junc', 'users.id', 'user_recipe_junc.user_id')
      .join('recipe', 'recipe.id', 'user_recipe_junc.recipe_id')
      .where('users.id', id)
      .orderByRaw('user_recipe_junc.order');

    return result;
  }
}

export default new User();
