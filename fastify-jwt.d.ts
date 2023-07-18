import { FastifyPluginCallback, FastifyPluginOptions } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    jwt: {
      sign(payload: any, options?: any): string;
      verify(token: string, options?: any): Promise<any>;
      decode(token: string, options?: any): any;
    };
  }
}

declare const fastifyJwt: FastifyPluginCallback<FastifyPluginOptions>;

export default fastifyJwt;
