import { User } from '../../auth/models/user';

export interface Post {
  id?: string;
  createdUser: User;
  content: string;
  likedUsers: string[] | null;
  commentCount: number;
  createTime: number;
  images: string[];
}
