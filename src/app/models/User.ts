import { Byte } from "@angular/compiler/src/util";

export class User {
    idUser?: number;
    registerDate?: Date;
    userName: string;
    email?: string;
    password: string;
    newPassword?: string;
    profilePhoto?: Byte[];
}