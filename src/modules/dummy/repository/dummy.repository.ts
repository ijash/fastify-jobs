import knex from "../../../helpers/database";

interface IDummyRepository {
  id: string;
  name: string;
  createdAt: Date;
}

class DummyRepository {
  tableName = "TB_M_MODULE";
  async findAll(): Promise<IDummyRepository[] | undefined> {
    const query = knex(this.tableName).select();
    console.log("query:", query.toQuery());
    const result = await query;
    if (result) {
      return result;
    } else {
      return undefined;
    }
  }
}

export default new DummyRepository();
