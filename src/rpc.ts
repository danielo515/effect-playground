import { ResolverNoStream } from "@effect/rpc";
import { Router, Rpc } from "@effect/rpc";
import * as Effect from "effect/Effect";
import { CreatePost, GetPost, Post } from "./rpc-schema";
import { pipe } from "effect";

export const router = Router.make(
  Rpc.effect(CreatePost, (req) => {
    console.log("Creating post", req);
    const { body } = req;
    return Effect.succeed(new Post({ id: 1, body }));
  }),
  Rpc.effect(GetPost, (req) => {
    const { id } = req;
    return Effect.succeed(new Post({ id, body: "Edited" }));
  }),
);

export type Router = typeof router;

export const handlerEffect = Router.toHandlerEffect(router);

export const resolver = ResolverNoStream.make(handlerEffect)<typeof router>();
