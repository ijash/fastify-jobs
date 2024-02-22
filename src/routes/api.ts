import { FastifyInstance } from "fastify";
import UserController from "../modules/user/controller/user.controller";
import JobController from "../modules/job/controller/job.controller";
import DummyController from "../modules/dummy/controller/dummy.controller";
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
const baseApiPath = `/api/v1`;

export default async (fastify: FastifyInstance) => {
  const userController = new UserController(fastify);

  fastify.post<{ Body: IAuth }>(`${baseApiPath}/login`, userController.login);
  fastify.post<{ Body: IAuth }>(
    `${baseApiPath}/register`,
    userController.register
  );

  const jobController = new JobController(fastify);
  fastify.get<{ Querystring: IJob }>(
    `${baseApiPath}/job`,
    { preHandler: auth },
    jobController.find
  );
  fastify.get<{ Params: { id: string } }>(
    `${baseApiPath}/job/:id`,
    { preHandler: auth },
    jobController.findOne
  );

  const dummyController = new DummyController(fastify);

  fastify.get(`${baseApiPath}/dummy`, dummyController.findAll);
};
