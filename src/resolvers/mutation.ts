import { User } from "../entity/User";
import { sign } from "../libs/jwt";

const Mutation: IResolver = {
    register: async (obj: { user: User }) => {
        const user = User.create(obj.user);
        await User.save(user);
        // console.log(user);
        return { token: sign(user.getToToken()) };
    }
};

export default Mutation;
