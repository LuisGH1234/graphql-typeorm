import { User } from "../../entity/User";
import { Brackets } from "typeorm";

const Query: IResolver = {
    user: async (obj: { id: number }, args, context, info) => {
        // console.log(args);
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

        return { users: users[0], count: users[1] };
    }
};

export default Query;
