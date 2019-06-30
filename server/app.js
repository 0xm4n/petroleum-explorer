const Koa = require('koa');
const app = new Koa();
var router = require('./routes');
const cors = require('@koa/cors');

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);