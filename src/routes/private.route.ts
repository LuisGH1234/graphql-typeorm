import { Router } from "express";
import Root from "../resolvers/private";
import { buildSchema } from "graphql";
import * as graphqlHTTP from "express-graphql";
import * as fs from "fs";
import * as path from "path";

const route = Router();
const schema = buildSchema(
    fs.readFileSync(path.join(__dirname, "../graphql/schema.graphql")).toString()
);

route.use((req, res, next) => {
    console.log("Private middleware");
    // console.log("Response:", req);
    next();
});
route.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue: Root,
        graphiql: true
    })
);

export default route;
