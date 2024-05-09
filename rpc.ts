import { ResolverNoStream } from "@effect/rpc";
import { Router, Rpc } from "@effect/rpc";
import * as S from "@effect/schema/Schema";
import * as Effect from "effect/Effect";

class Post extends S.Class<Post>("Post")({
  id: S.Number,
  body: S.String,
}) {}

export class CreatePost extends S.TaggedRequest<CreatePost>()(
  "CreatePost",
  S.Never,
  Post,
  {
    body: S.String,
  },
) {}

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
