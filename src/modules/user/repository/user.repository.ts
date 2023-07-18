import knex from "../../../helpers/database";

interface IUserRepository {
  id: string;
  password: string;
}

class UserRepository {
  tableName = "user";
  async findOne(id: string): Promise<IUserRepository | undefined> {
    const query = knex(this.tableName)
      .select(["id", "password"])
      .where({ id: id });
    console.log("query:", query.toQuery());
    const result = await query;
    if (result) {
      return result[0];
    } else {
      return undefined;
    }
  }
  async create(user: IUserRepository): Promise<Boolean> {
    console.log(user);
    const query = knex(this.tableName).insert({
      id: user.id,
      password: user.password,
    });

    console.log("query:", query.toQuery());
    const result = await query;
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}

export default new UserRepository();
