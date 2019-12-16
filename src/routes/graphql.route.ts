import { Router } from "express";
import Root from "../resolvers";
import * as graphqlHTTP from "express-graphql";
import Schema from "../libs/schema";
import { verify } from "../libs/jwt";

const route = Router();

route.use((req, res, next) => {
    // console.log("Private middleware");
    req["verify"] = () => verify(req);
    next();
});
route.use(
    "/",
    graphqlHTTP({
        schema: Schema("schema"),
        rootValue: Root,
        graphiql: true,
        // context: { verify } as Context,
        customFormatErrorFn: err => ({ error: err.originalError })
    })
);

export default route;
