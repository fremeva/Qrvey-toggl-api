class AuthService {
  constructor({ UserService }) {
    this.userService = UserService;
  }

  async singUp() {}
  async singIn() {}
  async reject() {}
  async refresh() {}
}

module.exports = AuthService;
