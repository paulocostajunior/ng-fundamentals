import { IUser } from "./user.model";
import { IRequest } from "./request.model";

export interface ILoginRequest extends IRequest 
{ 
    user: IUser
}