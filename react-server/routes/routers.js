
import Index from 'views/index/routers';
import Info from 'views/info/routers';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import Layout from '../Layout/layout';

const router = require('koa-router')();
const IS_DEV = process.env.NODE_ENV !== 'production' ? true : false;
const assets = require('./build/asset-manifest.json');

export default function (app) {
    router.get('/*', (ctx, next) => {
        var markup;
        var bundle = 'index';
        const url = ctx.url;
        console.log('ctx.url:' + url);
        switch (url) {
            case '/info':
                markup = renderToString(
                    <StaticRouter location={ctx.url} context={{}} >
                        <Info />
                    </StaticRouter>
                );
                bundle = 'info';
            default:
                markup = renderToString(
                    <StaticRouter location={ctx.url} context={{}} >
                        <Index />
                    </StaticRouter>
                );
                break;
        }
        console.log('restarted');
        ctx.body = Layout(markup, bundle);
    });


    app.use(router.routes()).use(router.allowedMethods());
}


