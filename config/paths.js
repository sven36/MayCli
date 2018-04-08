// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
	const hasSlash = path.endsWith('/');
	if (hasSlash && !needsSlash) {
		return path.substr(path, path.length - 1);
	} else if (!hasSlash && needsSlash) {
		return `${path}/`;
	} else {
		return path;
	}
}

const getPublicUrl = appPackageJson =>
	envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
	const publicUrl = getPublicUrl(appPackageJson);
	const servedUrl =
		envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
	return ensureSlash(servedUrl, true);
}

//add flexible
// const flexibleStr = (function(){
//   return fs.readFileSync('node_modules/lm-flexible/build/changeRem-min.js', 'utf-8');
// })();

let cdnConfig = null;
try {
	cdnConfig = require(path.resolve('config/cdnPath'));
} catch (e) {
	console.log('================config warning================');
	console.log('\n' + "hi man, you should add cdnPath.js in config" + '\n');
	console.log('================config warning================');

	cdnConfig = {
		prodJsCDN: '.',
		prodCssCDN: '.',
		prodImgCDN: '.',
		prodMediaCDN: '.'
	};
}


let aliasConfig = null;
try {
	aliasConfig = require(path.resolve('config/alias'));
} catch (e) {
	console.log('================config warning================');
	console.log('\n' + "hi man, you should add alias.js in config" + '\n');
	console.log('================config warning================');

	aliasConfig = {
		commons: path.resolve('src/components_common/'),
		tools: path.resolve('src/tools/'),
		api: path.resolve('src/api/'),
		config: path.resolve('src/config'),
		public: path.resolve('public/'),
		scss: path.resolve('src/scss_mixin/scss/'),
		scss_mixin: path.resolve('src/scss_mixin/'),
		// @remove-on-eject-begin
		// Resolve Babel runtime relative to react-scripts.
		// It usually still works on npm 3 without this but it would be
		// unfortunate to rely on, as react-scripts could be symlinked,
		// and thus babel-runtime might not be resolvable from the source.
		'babel-runtime': path.dirname(
			require.resolve('babel-runtime/package.json')
		),
		// @remove-on-eject-end
		// Support React Native Web
		// https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
		'react-native': 'react-native-web',
	};
}

// config after eject: we're in ./config/
module.exports = {
	dotenv: resolveApp('.env'),
	appBuild: resolveApp('build'),
	appPublic: resolveApp('public'),
	appHtml: resolveApp('public/index.html'),
	appIndexJs: resolveApp('src/pages/index/index.js'),
	appPackageJson: resolveApp('package.json'),
	appSrc: resolveApp('src'),
	yarnLockFile: resolveApp('yarn.lock'),
	testsSetup: resolveApp('src/setupTests.js'),
	appNodeModules: resolveApp('node_modules'),
	publicUrl: getPublicUrl(resolveApp('package.json')),
	servedPath: getServedPath(resolveApp('package.json')),

	aliasConfig: aliasConfig,
	prodJsCDN: cdnConfig.prodJsCDN,
	prodCssCDN: cdnConfig.prodCssCDN,
	prodImgCDN: cdnConfig.prodImgCDN,
	prodMediaCDN: cdnConfig.prodMediaCDN
};

// @remove-on-eject-begin
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

// config before eject: we're in ./node_modules/react-scripts/config/
module.exports = {
	dotenv: resolveApp('.env'),
	appPath: resolveApp('.'),
	appBuild: resolveApp('build'),
	appPublic: resolveApp('public'),
	appHtml: resolveApp('public/index.html'),
	appIndexJs: resolveApp('src/pages/index/index.js'),
	appPackageJson: resolveApp('package.json'),
	appSrc: resolveApp('src'),
	yarnLockFile: resolveApp('yarn.lock'),
	testsSetup: resolveApp('src/setupTests.js'),
	appNodeModules: resolveApp('node_modules'),
	publicUrl: getPublicUrl(resolveApp('package.json')),
	servedPath: getServedPath(resolveApp('package.json')),
	// These properties only exist before ejecting:
	ownPath: resolveOwn('.'),
	ownNodeModules: resolveOwn('node_modules'), // This is empty on npm 3

	aliasConfig: aliasConfig,
	prodJsCDN: cdnConfig.prodJsCDN,
	prodCssCDN: cdnConfig.prodCssCDN,
	prodImgCDN: cdnConfig.prodImgCDN,
	prodMediaCDN: cdnConfig.prodMediaCDN
};

const ownPackageJson = require('../package.json');
const reactScriptsPath = resolveApp(`node_modules/${ownPackageJson.name}`);
const reactScriptsLinked =
	fs.existsSync(reactScriptsPath) &&
	fs.lstatSync(reactScriptsPath).isSymbolicLink();

// config before publish: we're in ./packages/react-scripts/config/
if (
	!reactScriptsLinked &&
	__dirname.indexOf(path.join('packages', 'react-scripts', 'config')) !== -1
) {
	module.exports = {
		dotenv: resolveOwn('template/.env'),
		appPath: resolveApp('.'),
		appBuild: resolveOwn('../../build'),
		appPublic: resolveOwn('template/public'),
		appHtml: resolveOwn('template/public/index.html'),
		appIndexJs: resolveOwn('template/src/pages/index/index.js'),
		appPackageJson: resolveOwn('package.json'),
		appSrc: resolveOwn('template/src'),
		yarnLockFile: resolveOwn('template/yarn.lock'),
		testsSetup: resolveOwn('template/src/setupTests.js'),
		appNodeModules: resolveOwn('node_modules'),
		publicUrl: getPublicUrl(resolveOwn('package.json')),
		servedPath: getServedPath(resolveOwn('package.json')),
		// These properties only exist before ejecting:
		ownPath: resolveOwn('.'),
		ownNodeModules: resolveOwn('node_modules'),


		aliasConfig: aliasConfig,
		prodJsCDN: cdnConfig.prodJsCDN,
		prodCssCDN: cdnConfig.prodCssCDN,
		prodImgCDN: cdnConfig.prodImgCDN,
		prodMediaCDN: cdnConfig.prodMediaCDN
	};
}
// @remove-on-eject-end
