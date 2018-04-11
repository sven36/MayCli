import App from 'views/index/index';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';


var Koa = require('koa');
var Router = require('koa-router');
var app = new Koa();
var router = new Router();

router.get('/', (ctx, next) => {
    const markup = renderToString(
        <StaticRouter >
            <App />
        </StaticRouter>
    );
    console.log('restarted68883');
    ctx.body = markup+'66';
});

app.use(router.routes())
    .use(router.allowedMethods());


export default app;
