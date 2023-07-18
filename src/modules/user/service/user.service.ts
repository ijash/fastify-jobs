import UserRepository from "../repository/user.repository";

interface IUserService {
  id: string;
  password: string;
}

class UserService {
  async findOne(id: string) {
    return await UserRepository.findOne(id);
  }
  async create(id: IUserService) {
    return await UserRepository.create(id);
  }
}

export default new UserService();
