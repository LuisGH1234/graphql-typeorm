import Query from "./query";
import Mutation from "./mutation";

const privateRoot: IResolver = {
    ...Query,
    ...Mutation
};

export default privateRoot;
