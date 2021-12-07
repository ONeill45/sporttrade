import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

const app = new Koa();
const router = new Router();

router.post('/profit', (ctx) => {
  let maximumProfit = 0;
  const optionsPrices = ctx.request.body.prices;
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

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen('5000');
