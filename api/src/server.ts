import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('Maximum Profit', '/', (ctx) => {
  ctx.body = 'Hello World';
});

router.get('Maximum Profit', '/profit', (ctx) => {
  ctx.body = 'Top Profit: ';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen('5000');
