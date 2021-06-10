"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var express_1 = __importDefault(require("express"));
var graphql_upload_1 = require("graphql-upload");
var context_1 = require("./context");
var schema_1 = require("./schema");
var _a = process.env.PORT, PORT = _a === void 0 ? 5000 : _a;
var app = express_1["default"]();
var apollo = new apollo_server_express_1.ApolloServer({
    schema: schema_1.schema,
    context: context_1.context,
    tracing: process.env.NODE_ENV !== 'production',
    introspection: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV !== 'production',
    uploads: {
        maxFileSize: 10000000,
        maxFiles: 20
    }
});
app.use(graphql_upload_1.graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
apollo.applyMiddleware({
    app: app,
    cors: {
        credentials: true,
        origin: '*'
    }
});
app.listen({ port: PORT }, function () {
    process.stdout.write("\uD83D\uDE80 Server ready at http://localhost:" + PORT + apollo.graphqlPath + "\n");
});
