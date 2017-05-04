var fs = require('fs');
var path = require('path');

exports.index = function(req, res){
  res.render('index', {
    title: '展望杯',
  });
}
exports.suc = function(req, res){
  res.render('suc', {
    title: '展望杯',
  });
}

exports.demofiles = function(req, res){
  var fileName = req.params.fileName;
  var filePath = path.join(__dirname, '../../public/demo_xls/', fileName);
  console.log(filePath);
  var stats = fs.statSync(filePath);
  if (stats.isFile()) {
    res.set({
     'Content-Type': 'application/octet-stream',
     'Content-Disposition': 'attachment; filename='+fileName,
     'Content-Length': stats.size
    });
    fs.createReadStream(filePath).pipe(res);
  }
  else{
    res.end(404);
  }
}

exports.save = function(req, res){
  var xlsFileData = req.files.uploadXls;
  var filePath = xlsFileData.path;
  var member = req.body.member;
  var c = req.body.categary;
  var originalFilename = xlsFileData.originalFilename;
  if (originalFilename) {
    fs.readFile(filePath, function(err, data){
      console.log(xlsFileData.type);
      // var type = xlsFileData.type.split('/')[1];
      var type = 'xls';
      var xlsFile = c +'-'+ member.type +'-'+ member.theme +'-'+ member.projname +'-'+ member.name +'-'+ member.tel +'-'+ member.email +'.' + type;
      var newPath = path.join(__dirname, '../../', '/public/upload/' + xlsFile);
      fs.writeFile(newPath, data, function(err){
        return res.redirect('/suc');
      })
    })
  }
  else{
    return res.redirect('/index');
  }
}