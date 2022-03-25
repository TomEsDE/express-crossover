import user from '../model/user';

class UserService {
  createUser(userDto) {
    const { username, email, password, validated, avatarUrl } = userDto;

    return user.createUser(username, email, password, validated, avatarUrl);
  }

  loginUser(userDto) {
    const { username, password } = userDto;

    return user.loginUser(username, password);
  }

  // getUser(id) {
  //   return user.getUser(id);
  // }

  async getUser(id) {
    const userDB = await user.getUser(id);

    console.log('userDB', userDB.id);
    // userDB.favourites = await user.getUserFavourites(userDB.id);

    return userDB;
  }
}

export default new UserService();
