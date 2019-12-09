import "reflect-metadata";
import * as express from "express";
import { createConnection } from "typeorm";
import PrivateRoute from "./routes/private.route";
import PublicRoute from "./routes/public.route";

const app = express();

app.set("PORT", process.env.PORT || 3000);

app.use("/private", PrivateRoute);
app.use("/public", PublicRoute);

createConnection().then(() => {
    app.listen(app.get("PORT"), err => {
        if (err) return console.error("Error: " + err);
        console.log(`Running a GraphQL API server at localhost:${app.get("PORT")}/graphql`);
    });
});
