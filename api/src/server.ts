import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Hello World';
});

router.post('/profit', (ctx, next) => {
  let maximumProfit = 0;
  const optionsPrices = ctx.request.body.values;
  for (let i = 0; i < optionsPrices.length - 1; i++) {
    for (let j = i + 1; j < optionsPrices.length; j++) {
      const profit = optionsPrices[j] - optionsPrices[i];
      if (optionsPrices[j] - optionsPrices[i] > maximumProfit) {
        maximumProfit = profit;
      }
    }
  }
  ctx.body = maximumProfit;
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen('5000');
