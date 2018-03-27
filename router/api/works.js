const Router = require('koa-router');
const workService = require('../../service/workService');
const validator = require('validator');
const _ = require('lodash');

const router = new Router();

router.post('/signUp', async (ctx) => {
  const {
    id,
    username,
    className,
    grade,
    phoneNumber,
    email,
  } = ctx.request.body;

  const form = {
    id,
    username,
    className,
    grade,
    phoneNumber,
    email,
  };

  console.log(form);

  if (id.length !== 10) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '学号非法',
    };
    return;
  }

  if (!validator.isMobilePhone(_.toString(phoneNumber), 'zh-CN')) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '手机号无效',
    };
    return;
  }

  if (!validator.isEmail(email)) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '邮箱无效',
    };
    return;
  }

  const users = await workService.addWork(form);

  console.log(users);

  ctx.status = 200;
  ctx.body = {
    status: 200,
    isSuccess: true,
    data: users,
  };
});

router.post('/signUp/file', async (ctx) => {
  ctx.status = 400;
  ctx.body = {};
});

module.exports = router;
