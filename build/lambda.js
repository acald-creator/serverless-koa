"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambda = void 0;
const app_1 = require("./app");
const ServerlessHttp = require("serverless-http");
exports.lambda = ServerlessHttp(app_1.default, {
    request: (request, event, context) => {
        request.event = event;
        request.context = context;
    }
});
//# sourceMappingURL=lambda.js.map