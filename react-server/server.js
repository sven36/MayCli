import routers from './routes/routers';

const Koa = require('koa');
const app = new Koa();

// 注册路由；
routers(app);

export default app;
