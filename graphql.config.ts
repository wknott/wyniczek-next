import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
    schema: "http://localhost:3000/graphql",
    documents: "graphql/*.graphql",
};

export default config;
