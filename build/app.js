"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const Router = require("@koa/router");
const compress = require("koa-compress");
const http_warmup_1 = require("./lib/http-warmup");
const app = new Koa();
const router = Router();
if (process.env.NODE_ENV === 'test') {
    router.use('/sam', compress());
}
else {
    router.use(compress());
}
router.use(cors({ keepHeadersOnError: true }));
router.use(bodyParser({
    detectJSON: function (ctx) {
        return /\.json$/i.test(ctx.path);
    }
}));
router.use(http_warmup_1.HttpWarmup);
// router.use(ServerlessHttp)
// app.use(HttpWarmup)
app.use(async (ctx) => {
    const {} = ctx.request.body;
    try {
        ctx.request.body = { data: 'hello world' };
    }
    catch (error) {
        console.error('error', error);
        ctx.throw(400, error.description);
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map