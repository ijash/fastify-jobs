import fastify from "fastify";
import routes from "./src/routes/api"; // Update the path accordingly

const server = fastify({ logger: true });

const createServer = async () => {
  try {
    // routes
    routes(server);

    await server.listen({ port: 3000, host: "0.0.0.0" });
    server.log.info(`Server listening on ${server.addresses()}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

export { createServer };
