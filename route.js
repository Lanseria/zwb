var Index = require('./app/controllers/index');
var multipart = require('connect-multiparty');
var fs = require('fs');
var path = require('path');

var multipartMiddleware = multipart();


module.exports = function(app){
  //pre handle user
  app.use(function(req, res, next){
    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID){
      return res.send('仅支持PC端');
    }else{
      next();
    }
  })

  // index page
  app.get('/', Index.index);
  app.get('/index', Index.index);

  app.get('/suc', Index.suc);

  app.post('/uploadXls', multipartMiddleware, Index.save);

  app.get('/demofiles/:fileName', Index.demofiles);

}