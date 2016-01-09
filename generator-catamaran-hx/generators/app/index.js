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
      type: 'confirm',
      name: 'hasDeps',
      message: 'Do you have dependencies already installed (haXe, openFL, SVG, actuate, and Catamaranhx ) ?',
      default: true
  },
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

var promptsDeps = [
{
  type: 'confirm',
  name: 'hasHaxe',
  message: 'Do you have haxe already installed?',
  default: true
},{
    when: function (response) {
        if(!response.hasHaxe){
            var hxCheck = exec("which haxe", function (error, stdout, stderr) {
                      if (error !== null) {
                        var installHx = exec("npm install -g haxe", function (error, stdout, stderr) {
                          if (error !== null) {
                            console.log(error);
                        }
                    }); 
                    }
                }); 
        }                 
    }
},
{
  type: 'confirm',
  name: 'hasOpenfl',
  message: 'Do you have openFL already installed?',
  default: true
},{
    when: function (response) {
        if(!response.hasOpenfl){
            var hxCheck = exec("which openfl", function (error, stdout, stderr) {
              if (error !== null) {
                var installHx = exec("haxe install openfl", function (error, stdout, stderr) {
                  if (error !== null) {
                    console.log(error);
                }
            }); 
            }
        }); 
        } 
    }                 
},
{
  type: 'confirm',
  name: 'hasSvg',
  message: 'Do you have SVG already installed?',
  default: true
},{
    when: function (response) {
        if(!response.hasSvg){
            var installHx = exec("haxe install svg", function (error, stdout, stderr) {
                if (error !== null) {
                    console.log(error);
                }
            }); 
        }    
    }              
},
{
  type: 'confirm',
  name: 'hasActuate',
  message: 'Do you have Actuate already installed?',
  default: true
},{
    when: function (response) {
        if(!response.hasActuate){
            var installHx = exec("haxe install actuate", function (error, stdout, stderr) {
                if (error !== null) {
                    console.log(error);
                }
            }); 
        } 
    }                 
},

{
  type: 'confirm',
  name: 'hasCatamaran',
  message: 'Do you have Catamaran already installed?',
  default: true
},{
    when: function (response) {
        if(!response.hasCatamaran){
            var installHx = exec("haxelib -notimeout git catamaranhx  https://github.com/catamaranHX/catamaranHX_lib.git", function (error, stdout, stderr) {
                if (error !== null) {
                    console.log(error);
                }
            }); 
        }   
    }              
},
]

this.prompt(prompts, function(props) {
    console.log(props.hasDeps);
    this.props = props;
    if (!props.hasDeps) {
        this.prompt(promptsDeps, function(err, props) {
            console.log('in popsDeps');
            done();
        }.bind(this));
    }
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
