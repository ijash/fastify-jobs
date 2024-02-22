import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import DummyService from "../service/dummy.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class DummyController {
  private fastify: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const result = await DummyService.findAll();
    if (result) {
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
          meta: {
            code: 200,
            message: "Ok",
          },
          data: result,
        });
    }
  }
}
export default DummyController;
