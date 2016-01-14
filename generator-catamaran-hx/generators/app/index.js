'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var gulp = require("gulp");
var sys = require('sys');
var mkdirp = require('mkdirp');
var exec = require('child_process').exec;


module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    this.log(chalk.blue("Welcome to CatamaranHx generator!\n\n'            `--.-+.        `--..--o.               \n           `.---+..``     `------o.               \n           `-.--+. .``.`:/.//:.--o.               \n           `----+ossoyyyyyys/.---o.               \n          ..:oyhysosssssoooooo/:-o.               \n        `.+sooossoo+oos-.:+++++oos:               \n           +ys++oo+++/++/--/ssyoohho-             \n            /yysoo+//+osys/..-/  ./sys/`          \n             -yyyo+oso/-`           ./sy+-        \n              `oyyy:`                  `/ss-      \n                :yys.                     `.      \n                 `oyy:                            \n                   -sy+`                          \n                     :so`                         \n                       -s`                        \n\nCatamaranHX 0.01a by Brendon Smith http://bit.ly/CatamaranHX"));
    
    var prompts = [
  {
    name: 'project_title',
    message: 'What is title of your project ?'
},
{
    name: 'company',
    message: 'What is the name of your company ?'
},
{
    name: 'main_class',
    message: 'What is your class name (example: Main) must start with a capital ?'
}
];

this.prompt(prompts, function(props) {
    console.log(props.hasDeps);
    this.props = props;
    done();
}.bind(this));
},

scaffoldFolders: function(){
    mkdirp("app");
    mkdirp("app/assets");
    mkdirp("app/assets/img");
    mkdirp("app/assets/css");
    mkdirp("app/source");
    mkdirp("app/export");
},

copyMainFiles: function () {

  var context = {
      title: this.props.project_title,
      company: this.props.company,
      main_class: this.props.main_class
  };

  this.template("project.xml", 'app/project.xml', context);
  this.template("Main.hx", 'app/source/' + this.props.main_class +'.hx', context);
}
});
