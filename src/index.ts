import "reflect-metadata";
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import "./libs/jwt";
import { createConnection } from "typeorm";
import Route from "./routes/graphql.route";

const app = express();

app.set("PORT", process.env.PORT || 3001);

app.use(morgan("tiny"));
app.use(cors());

app.use("/graphql", Route);

createConnection().then(() => {
    app.listen(app.get("PORT"), err => {
        if (err) return console.error("Error: " + err);
        console.log(`Running a GraphQL API server at localhost:${app.get("PORT")}/graphql`);
    });
});
