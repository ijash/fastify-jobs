import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RequestHeadersDefault,
} from "fastify";
import JobService from "../service/job.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../../../middleware/auth";

interface Querystring {
  description?: string;
  location?: string;
  full_time?: boolean;

  page?: number;
  limit?: number;
}

class JobController {
  private fastify: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }
  async find(request: FastifyRequest, reply: FastifyReply) {
    const { description, location, full_time, page, limit } =
      request.query as Querystring;

    const filter = {
      description,
      location,
      full_time,
    };

    const pagination = {
      page,
      limit,
    };

    const jobs = await JobService.find(filter, pagination);
    if (jobs?.totalResults && jobs?.totalResults > 0)
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
          meta: {
            code: 200,
            message: "Ok",
          },
          data: jobs,
        });
  }
  async findOne(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const id = request.params.id;
    const job = await JobService.findOne(id);
    if (job) {
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
          meta: {
            code: 200,
            message: "Ok",
          },
          data: job,
        });
    }
  }
}

export default JobController;
