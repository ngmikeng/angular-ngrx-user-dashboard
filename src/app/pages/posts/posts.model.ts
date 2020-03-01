import { IPost } from '../../shared/models/post.model';

export interface IPostState {
  items: IPost[],
  selectedItems: IPost[]
}
