import { User } from "../../entity/User";

const Mutation: IResolver = {
    register: async (obj: { user: User }, args) => {
        const user = User.create(obj.user);
        await User.save(user);
        // console.log(user);
        return user;
    }
};

export default Mutation;
