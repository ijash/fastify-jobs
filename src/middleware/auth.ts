import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

const customMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  // Perform some actions before the request handler
  console.log("jwt middleware executed");
  const authorized = jwt.verify(
    (request.headers["authorization"]?.split("Bearer ")[1] as string) || "",
    process.env.SECRET_KEY || ""
  );
  if (!authorized) {
    console.log("authorized");
    reply
      .code(400)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        meta: {
          code: 400,
          message: "not authorized",
        },
        data: null,
      });
  }
};

export default customMiddleware;
