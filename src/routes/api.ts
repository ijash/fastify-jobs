import { FastifyInstance } from "fastify";
import UserController from "../modules/user/controller/user.controller";
import JobController from "../modules/job/controller/job.controller";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth";
interface IAuth {
  id: string;
  password: string;
}
interface IJob {
  description?: string;
  location?: string;
  full_time?: boolean;
}

export default async (fastify: FastifyInstance) => {
  const userController = new UserController(fastify);

  fastify.post<{ Body: IAuth }>(`/api/v1/login`, userController.login);
  fastify.post<{ Body: IAuth }>(`/api/v1/register`, userController.register);

  const jobController = new JobController(fastify);
  fastify.get<{ Querystring: IJob }>(
    `/api/v1/job`,
    { preHandler: auth },
    jobController.find
  );
  fastify.get<{ Params: { id: string } }>(
    `/api/v1/job/:id`,
    { preHandler: auth },
    jobController.findOne
  );
};
