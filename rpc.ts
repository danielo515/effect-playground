import { ResolverNoStream } from "@effect/rpc";
import { Router, Rpc } from "@effect/rpc";
import * as Effect from "effect/Effect";
import { CreatePost, Post } from "./rpc-schema";

export const router = Router.make(
  Rpc.effect(CreatePost, (req) => {
    console.log("Creating post", req);
    const { body } = req;
    return Effect.succeed(new Post({ id: 1, body }));
  }),
);

export type Router = typeof router;

export const handlerEffect = Router.toHandlerEffect(router);

export const resolver = ResolverNoStream.make(handlerEffect)<typeof router>();
