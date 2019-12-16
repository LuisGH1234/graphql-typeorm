import { User } from "../entity/User";
import { Brackets } from "typeorm";
import { Unauthorized } from "../libs/http-status";
import { sign } from "../libs/jwt";

const Query: IResolver = {
    login: async (obj: { email: string; password: string }) => {
        const user = await User.findOne({ email: obj.email });
        if (!user) throw new Unauthorized(); // NotFound 404

        const isValid = user.compare(obj.password);
        if (!isValid) throw new Unauthorized();

        return { token: sign(user.getToToken()) };
    },

    user: async (obj: { id: number }, req) => {
        // console.log("CONTEXT", req.headers);
        req.verify();
        const user = await User.findOne(obj.id);
        if (!user) throw new Error("User not found");

        return user;
    },

    users: async (obj: { page?: number; limit?: number; filter?: string }) => {
        const { page = 1, limit = 10, filter = "" } = obj;
        const users = await User.createQueryBuilder("user")
            .where(
                new Brackets(sqb => {
                    sqb.where(`user.firstName like "%${filter}%"`).orWhere(
                        `user.lastName like "%${filter}%"`
                    );
                })
            )
            .skip(limit * (page - 1))
            .take(limit)
            .getManyAndCount();
        return await new Promise((resolve, reject) => {
            setTimeout(
                users => {
                    resolve({ users: users[0], count: users[1] });
                },
                3000,
                users
            );
        });
        // return { users: users[0], count: users[1] };
    }
};

export default Query;
