"use strict";
const Generator = require('yeoman-generator');
var logo = require('../util/logo.js');

module.exports = class extends Generator {

    initializing() {
        let done = this.async();
        this.pkg = require('../package.json');
        logo(this, done);
    }
    prompting() {
        return this.prompt([{
            type: 'list',
            name: 'name',
            message: '你准备创建',
            choices: [
                {
                    name: '项目(yo mays:project)',
                    value: 'project'

                }, {
                    name: '组件(yo mays:component)',
                    value: 'component'
                }
            ]
        }]).then((answers) => {
            this.composeWith('mays:' + answers.name);
        });
    }
}