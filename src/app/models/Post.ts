import { User } from './User';
export class Post {
    idPost?: number;
    userId: string;
    title: string;
    content: string;
    creationdate?: Date;
    userName?: string;
}