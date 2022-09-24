import {ROLE} from "./models/User";

export interface RequestWithAuth extends Request{
    user: {
        userId?: number,
        role?: ROLE
    }
}