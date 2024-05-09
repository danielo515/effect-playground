import * as S from "@effect/schema/Schema";

export class Post extends S.Class<Post>("Post")({
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
