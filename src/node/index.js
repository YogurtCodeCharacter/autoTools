const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
const fs = require("fs");
const path = require('path');
const app = new Koa();

app.use(
    cors({
        origin: function(ctx) { //设置允许来自指定域名请求
            return '*';
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);

router.get('/getTemplate', async function (ctx) {
    let res = {
        data: null
    }
    res = await new Promise((resolve, reject) => {
        fs.readFile(`${path.resolve()}/src/template/get/index.js`, (err, data) => {
            if (!err) {
                res.data = data;
                res.text = '成功';
                res.success = true;
                resolve(res);
            } else {
                res.data = null;
                res.text = '失败';
                res.success = false;
                reject(res);
            }
        });
    })
    ctx.body = res;
});

router.get('/postTemplate', async function (ctx) {
    let res = {
        data: null
    }
    res = await new Promise((resolve, reject) => {
        fs.readFile(`${path.resolve()}/src/template/post/index.js`, (err, data) => {
            if (!err) {
                res.data = data;
                res.text = '成功';
                res.success = true;
                resolve(res);
            } else {
                res.data = null;
                res.text = '失败';
                res.success = false;
                reject(res);
            }
        });
    })
    ctx.body = res;
});

app.use(router.routes());

app.listen(3000);