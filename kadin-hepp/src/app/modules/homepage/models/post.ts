import { User } from '../../auth/models/user';

export interface Post {
  id?: string;
  createdUser: User;
  content: string;
  likedCount: number;
  commentCount: number;
  createTime: number;
}
