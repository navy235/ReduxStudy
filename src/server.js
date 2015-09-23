require('babel/register');

var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serialize = require('serialize-javascript');
var cors = require('cors')
var React = require('react');
var Router = require('react-router');
var HtmlComponent = React.createFactory(require('./components/Html'))
var assets = require('./utils/assets');
var server = express();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
server.use(cors());

server.use(express.static(path.join(__dirname, 'public')));

server.get('/',function (req, res, next) {

    var doctype = '<!DOCTYPE html>';
    var html = React.renderToStaticMarkup(HtmlComponent({
        assets: assets,
        markup: ''
    }));
    res.send(doctype + html);
});


module.exports = server;