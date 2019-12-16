import { Request } from "express";
import { User } from "./entity/User";

declare global {
    interface IResolver {
        [key: string]: (obj: any, req: Request & Context, ctx: any, info: any) => any;
    }

    interface Context {
        // verify: (req: Request) => Partial<User>;
        verify: () => Partial<User>;
    }
}
