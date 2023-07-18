import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserService from "../service/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RequestBody {
  id: string;
  password: string;
}

class UserController {
  private fastify: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }
  async login(
    request: FastifyRequest<{ Body: RequestBody }>,
    reply: FastifyReply
  ) {
    if (request.body.id) {
      const data = await UserService.findOne(request.body.id);

      if (data) {
        const password = data.password;
        // compare bcrypt
        const pwResult = await bcrypt.compare(request.body.password, password);

        if (pwResult) {
          const jwtPayload = { id: request.body.id };
          const token = jwt.sign(jwtPayload, process.env.SECRET_KEY || "");
          reply
            .code(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send({
              meta: {
                code: 200,
                message: "Ok",
              },
              data: { token },
            });
        }
      }
    }

    reply
      .code(400)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        meta: {
          code: 400,
          message: "Incorrect id/pw",
        },
        data: null,
      });
  }
  async register(
    request: FastifyRequest<{ Body: RequestBody }>,
    reply: FastifyReply
  ) {
    if (request.body?.id && request.body?.password) {
      const hashedPassword = await bcrypt.hash(request.body.password, 10);
      const user = {
        id: request.body.id,
        password: hashedPassword,
      };
      const result = await UserService.create(user);
      if (result) {
        reply
          .code(200)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({
            meta: {
              code: 200,
              message: "Ok",
            },
            data: user,
          });
      }
    }
    reply
      .code(400)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        meta: {
          code: 400,
          message: "request error",
        },
        data: null,
      });
  }
}
export default UserController;
