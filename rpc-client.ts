import { HttpResolver } from "@effect/rpc-http";
import type { Router } from "./rpc.ts";
import { Effect } from "effect";
import { CreatePost } from "./rpc-schema.ts";

const client = HttpResolver.makeClient<Router>("http://localhost:3000/rpc");

// make calls
client(new CreatePost({ body: "Hello" }))
  .pipe(Effect.runPromise)
  .then((x) => console.log("Got this back", x));
// import * as Resolver from "@effect/rpc/Resolver";
// import { CreatePost, resolver } from "./rpc";
// import { Effect } from "effect";
//
// const client = Resolver.toClient(resolver);
//
// const x = client(new CreatePost({ body: "Hello" }));
// x.pipe(Effect.runPromise).then((x) => console.log("Got tis back", x));
