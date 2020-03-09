import { IPost } from '../../shared/models/post.model';

export interface IPostState {
  items: IPost[],
  pageItems: IPost[],
  selectedItems: IPost[],
  page?: string
}

export interface ISelectedAllState {
  isSelectedAll: boolean,
  isIndeterminate: boolean
}
