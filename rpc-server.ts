import { Effect } from "effect";
import { handlerEffect, router } from "./rpc";
import { HttpRouter } from "@effect/rpc-http";
import * as HttpServer from "@effect/platform/HttpServer";
import * as App from "@effect/platform/Http/App";
import { toHttpApp } from "@effect/rpc-http/HttpRouterNoStream";

const a = HttpServer.router.empty.pipe(
  HttpServer.router.post("/rpc", HttpRouter.toHttpApp(router)),
);

const x = toHttpApp(router);
// HttpServer(router).pipe(Effect.runPromise);
//
const b = App.toWebHandler(a);

// const app = HttpServer.router.post("/rpc", HttpRouter.toHttpApp(router));
// export const handler: APIRoute = ({ request }) => {
//   return handlerEffect(request).pipe(Effect.runPromise);
// };

Bun.serve({
  fetch(request, server) {
    return b(request);
  },
});
