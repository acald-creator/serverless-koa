"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpWarmup = void 0;
const WARMUP_HEADER = 'x-serverless-warmup';
exports.HttpWarmup = (ctx, next) => {
    if (ctx.request.headers[WARMUP_HEADER] === 'true') {
        ctx.response.body = undefined;
        return;
    }
    return next();
};
//# sourceMappingURL=http-warmup.js.map