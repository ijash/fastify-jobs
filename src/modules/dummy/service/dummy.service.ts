import DummyRepository from "../repository/dummy.repository";

// interface IDummyService {
//   id: string;
//   name: string;
//   createdAt: Date;
// }

class DummyService {
  async findAll() {
    return await DummyRepository.findAll();
  }
}

export default new DummyService();
