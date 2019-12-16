import * as fs from "fs";
import * as path from "path";
import { buildSchema } from "graphql";

function getSchema(name: string) {
    return buildSchema(
        fs.readFileSync(path.join(__dirname, `../../graphql/${name}.graphql`)).toString()
    );
}

export default getSchema;
