import { IUser } from '../../shared/models/user.model';

export interface IUserState {
  items: IUser[],
  pageItems: IUser[],
  selectedItems: IUser[],
  page: number,
  total: number
}
