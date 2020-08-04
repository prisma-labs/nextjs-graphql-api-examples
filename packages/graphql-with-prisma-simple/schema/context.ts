import { UserService, PostService } from "../services";

export type Context = {
  user: UserService,
  post: PostService
}