"use strict";
const Generator = require('yeoman-generator');
var path = require('path');
module.exports = class extends Generator {
    initializing() {
        var pkgJSON;
        try {
            var config = path.resolve(process.cwd(), './package.json');
            this.log(config);
            pkgJSON = require(config);

        } catch (e) { }
        if (!pkgJSON.author || typeof pkgJSON.author == 'string') {
            let gitUser = this.user.git;
            if (pkgJSON.author) {

                let parts = /(.*)<(.*)\>/g.exec(pkgJSON.author);

                if (parts) {

                    pkgJSON.author = {

                        name: (parts[1] || '').trim(),
                        email: (parts[2] || '').trim()

                    };

                }

            } else {
                this.log(gitUser);
                pkgJSON.author = {

                    name: gitUser.name() || '',
                    email: gitUser.email() || ''

                };

            }

        }

        if (!pkgJSON.name) {

            pkgJSON.name = 'mays-tmp';

        }
        this.pkgJSON = pkgJSON;
    }
    prompting() {
        var _this = this;
        var pkgJSON = this.pkgJSON;
        return this.prompt([{
            type: 'list',
            name: 'projectType',
            message: '项目类型',
            choices: [
                {
                    name: 'for M',
                    value: 'for M'

                }, {
                    name: 'for PC',
                    value: 'for PC'
                }]
        }, {

            name: 'frameType',
            message: '框架选型',
            type: 'list',
            choices: [{

                name: 'MayReact',
                value: 'mays'

            }, {

                name: 'React',
                value: 'react'

            }]

        }, {

            name: 'projectName',
            message: '请输入项目名',
            validate: function (input, answer) {

                if (!input.trim()) {
                    return '请输入项目名称';
                } else if (/A-Z/.test(input)) {
                    return '项目名不建议包含大写字母, 请使用 "-" 连字符分隔';
                }
                return true;
            }

        }, {

            name: 'projectDesc',
            message: '项目描述',
            default: '项目描述内容',
            validate: function (input) {
                console.log('star run demoDesc validate')
                return !!input.trim() || '请输入项目描述!';

            }

        }, {

            // 对于 React 项目, 询问是否启用redux
            name: 'useRedux',
            message: '是否使用 redux',
            type: 'confirm',
            default: false,
            when: answer => answer.frameType === 'react'

        }, {

            name: 'author',
            message: '作者名',
            default: pkgJSON.author.name

        }, {

            name: 'email',
            message: '作者 Email',
            default: pkgJSON.author.email,
            validate: function (input) {
                return /^.+@.+\..+$/.test(input.trim()) || '请输入合法的 Email 地址!';
            }

        }, {

            name: 'version',
            message: '初始版本号',
            default: '0.1.0',
            validate: function (input) {
                return /^\d+\.\d+\.\d+$/.test(input.trim()) || '请输入合法的版本号!';
            }

        }, {

            name: 'autoInstall',
            message: '是否自动执行' + ' npm i'.yellow + ' 以安装依赖',
            type: 'confirm',
            default: false

        }]
        ).then((answer) => {
            _this.projectType = answer.projectType;
            _this.frameType = answer.frameType;
            _this.name = answer.projectName;
            _this.desc = answer.projectDesc;
            _this.useRedux = answer.useRedux;
            _this.author = answer.author;
            _this.email = answer.email;
            _this.version = answer.version;
            _this.autoInstall = answer.autoInstall;
            var folderName = path.basename(process.cwd());
            if (answer.projectName != folderName) {
                _this.createRoot = true;
            }
        });
    }
    configuring() {
        this.sourceRoot(path.join(__dirname, this.frameType));
    }

    writing() {

        let outPutUrl = this.createRoot ? this.name + '/' : './';
        let resetCss = this.projectType === 'for M' ? 'reset.scss' : 'reset_pc.scss';
        let useMays = '';
        switch (this.frameType) {
            case 'mays':
            case 'react':

                let tplFile = '';
                if (this.useRedux) {
                    tplFile = 'react-redux';
                } else {
                    tplFile = 'react';
                }

                let tplPath = this.templatePath(`../${tplFile}`);
                this.fs.copyTpl(
                    tplPath,
                    outPutUrl,
                    {
                        name: this.name,
                        author: this.author,
                        frameType: this.frameType,
                        email: this.email,
                        version: this.version,
                        desc: this.desc,
                        groupName: this.groupName,
                        resetCss: resetCss,
                        flexibleStr: '<%= htmlWebpackPlugin.options.flexibleStr %>'
                    }
                );

                this.fs.copyTpl(
                    this.templatePath(`../_gitignore`),
                    outPutUrl + '.gitignore'
                );
                this.fs.copyTpl(
                    this.templatePath(`../_editorconfig`),
                    outPutUrl + '.editorconfig'
                );
                this.fs.copyTpl(
                    this.templatePath(`../_babelrc`),
                    outPutUrl + '.babelrc'
                );


                //add scss
                this.fs.copyTpl(
                    this.templatePath(`../../common/scss_mixin`),
                    `${outPutUrl}src/scss_mixin/`
                );

                //add utils 语法糖
                this.fs.copyTpl(
                    this.templatePath(`../../common/utils`),
                    `${outPutUrl}src/tools/utils/`
                );

                break;

            default:

                break;

        }
    }
    install() {
        this.autoInstall && this.npmInstall();
    }
}