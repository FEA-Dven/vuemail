const express = require('express');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const uploader = require('./uploader-node.js')('tmp');
const app = express();
const bodyParser = require('body-parser')
const folderJson = require('./folders.json')
const itemJson = require('./item.json')
const mailinfoJson = require('./mailinfo.json')
const initmailJson = require('./initmail.json')
// const userlistJson = require('./userlist.json')
app.use(bodyParser.urlencoded({extended:false}))

// Configure access control allow origin header stuff
var ACCESS_CONTROLL_ALLOW_ORIGIN = true;

// Handle uploads through Uploader.js
app.post('/upload', multipartMiddleware, function(req, res) {
  uploader.post(req, function(status, filename, original_filename, identifier) {
    console.log('POST', status, filename, original_filename, identifier);
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
      res.header("Access-Control-Allow-Origin", "*");
    }
    setTimeout(function () {
      res.send(status);
    }, 500);
  });
});


app.options('/upload', function(req, res){
  console.log('OPTIONS');
  if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
    res.header("Access-Control-Allow-Origin", "*");
  }
  res.status(200).send();
});

app.use('/user',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  console.log(req.body)
  res.send(req.body)
})

app.use('/getfolders',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  let folders = folderJson
  res.send(folders)
})


app.use('/getmaillist',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  let item = itemJson
      res.send(item)
})

app.use('/getmailinfo',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  let mailinfo = mailinfoJson
  res.send(mailinfo)
})

app.use('/initmail',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  let initmail = initmailJson
  res.send(initmail)
})

app.use('/getuserlist',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  let userlist = {
         "groups": [
            {
                "members": [
                    "zhangsan@163.com",
                    "d.mkajvci@inwgq.pe",
                    "b.ugqlycwzyp@hfjjrm.ru",
                    "caocao@163.com",
                ],
                "name": "测试内容1",
               
            },
            {
                "members": [
                    "m.nokir@bgcpcw.edu",
                    "i.dxvxedormq@ccatx.ma",
                    "f.npnjw@xkkzjd.net.cn",
                    "n.ytzeg@iylxkj.in",
                    "k.smivoqmn@ctpb.iq"
                ],
                "name": "测试内容2",
            },
            {
                "members": [
                    "libai@qq.com",
                    "guanyu@163.com",
                    "huangzhong@qq.com",
                    
                ],
                "name": "测试内容3",
            }
        ],
        "persons": {
            "field_header": [
                "Name",
                "Email",
                "NickName",
                "IMaol",
                "IMicq",
                "IMgoogle",
                "IMmsn",
                "IMqq",
                "IMskype",
                "HomeTel",
                "Mobile",
                "HomeAddress",
                "HomeCity",
                "HomeState",
                "HomeZip",
                "HomeCountry",
                "Company",
                "Job",
                "WorkMail",
                "WorkTel",
                "WorkFax",
                "WorkAddress",
                "WorkCity",
                "WorkState",
                "WorkZip",
                "WorkCountry",
                "OtherMail",
                "OtherPhone",
                "WebSite",
                "BirthDay",
                "Notes",
                "Picture"
            ],
            "fields": [
                [
                    "张三",
                    "zhangsan@163.com",
                    "张三昵称",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ],
                [
                    "李四",
                    "lisi@163.com",
                    "李四昵称",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ],
                [
                    "赵四",
                    "n.ytzeg@iylxkj.in",
                    "赵四昵称",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ],
                [
                    "王六",
                    "wangliu@qq.com",
                    "王六昵称",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ],
                [
                    "黄忠",
                    "huangzhong@qq.com",
                    "黄忠昵称",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ],
                [
                    "李白",
                    "libai@qq.com",
                    "李白昵称",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ],
                [
                    "关羽",
                    "guanyu@163.com",
                    "关羽昵称",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ],
                [
                    "曹操",
                    "caocao@163.com",
                    "曹操昵称",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ],
            ]
        } 
}
      
  res.send(userlist)
})

app.use('/set_read',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    res.send('success')
})

app.use('/msg_delete_actual',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    res.send('success')
})

app.use('/msg_move',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    res.send('success')
})
app.use('/draft_save',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  res.send('success')
})
app.use('/msg_send',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  res.send('success')
})

console.log("start port at 2800")
app.listen(2800,'127.0.0.1');
