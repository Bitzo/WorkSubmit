const Router = require('koa-router');
const workRouter = require('./api/works');

const router = new Router();

router.get('/', (ctx) => {
  ctx.status = 200;
  return ctx.render('index', {
    title: 'Home',
    name: 'Bitzo',
  });
});

router.get('/login', (ctx) => {
  ctx.status = 200;
  return ctx.render('login', {
    title: 'Home',
    name: 'Bitzo',
  });
});

router.get('/home', (ctx) => {
  ctx.status = 200;
  return ctx.render('home', {
    name: 'bitzo',
    content: 'nothing',
  });
});

router.use('/api', workRouter.routes());

module.exports = router;
