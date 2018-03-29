const Router = require('koa-router');
const workService = require('../../service/workService');
const validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const fileUtil = require('./fileUtil');
const moment = require('moment');

const router = new Router();

const secretKey = 'dhq37f3862';

const tokenEncode = (data) => {
  const t = JSON.stringify(data);
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (20 * 60),
    data: t,
  }, secretKey);
};

const tokenDecode = (token) => {
  let result = {};
  try {
    result = jwt.verify(token, secretKey);
    return result;
  } catch (err) {
    return false;
  }
};

router.post('/signUp', async (ctx) => {
  const {
    id,
    username,
    password,
    className,
    grade,
    phoneNumber,
    email,
  } = ctx.request.body;

  const form = {
    id,
    username,
    password,
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

  const result = await workService.queryWorks({ id });
  console.log(result);
  if (result.count > 0) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '已经注册，请直接登录。',
    };
    return;
  }

  const users = await workService.addWork(form);

  console.log(users);

  const token = tokenEncode({
    id,
    username,
  });

  ctx.status = 200;
  ctx.body = {
    status: 200,
    isSuccess: true,
    data: {
      token,
      userInfo: {
        id,
        username,
      },
    },
    msg: '报名成功',
  };
});

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;

  const result = await workService.queryWorks({
    id: username,
    password,
  });

  console.log(result);
  if (result.count === 0) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '用户名或密码错误',
    };
    return;
  }

  ctx.body = {
    status: 200,
    isSuccess: true,
    data: {
      token: tokenEncode({
        id: username,
        username: result.rows[0].username,
      }),
      userInfo: {
        id: username,
        username: result.rows[0].username,
      },
    },
    msg: '登录成功',
  };
});

router.post('/signUp/file', async (ctx) => {
  const { token } = ctx.request.body.fields;
  console.log(ctx.request.body);
  let result = tokenDecode(token);

  if (result === false) {
    ctx.status = 400;
    ctx.body = `
      <p style="margin: 0px"><b>上传失败</b></p>
      <hr style="margin: 0px"/>
      <p style="margin: 0px">登录失效，请重新登录后上传。</p>
    `;
    return;
  }

  let userInfo = {};
  userInfo = JSON.parse(result.data);

  const filename = `${userInfo.id}_${userInfo.username}_${moment().format('YYMMDDHHmmss')}`;
  console.log(filename);
  result = await fileUtil.saveFile(ctx, 'file', '/public/files/', filename, 'zip', 20);

  console.log(result);

  if (!result.isSuccess) {
    ctx.status = 400;
    ctx.body = `
      <p style="margin: 0px"><b>上传失败</b></p>
      <hr style="margin: 0px"/>
      <p style="margin: 0px">服务异常，请稍后再试。</p>
    `;
    return;
  }
  ctx.status = 200;
  ctx.body = {
    isSuccess: true,
    status: 200,
    msg: '上传成功',
  };
});

module.exports = router;
