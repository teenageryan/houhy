var express = require('express'),
template = require('art-template'),
    //用来上传文件
    multer = require('multer')
var router = express.Router()


var storage = multer.diskStorage({
        destination: 'www/uploads',
        filename: function (req, file, callback) {
            var uname = req.cookies.uname
            callback(null, uname + '.jpg')
        }
    }),
    uploads = multer({ storage })
router.post('/user/photo', uploads.single('photo'), function (req, res) {
    res.status(200).json({ code: 'success', message: '上传成功,' })
})

router.get('/user.html',function(req,res){
    res.render('user',{title:'用户页面',name:'user'})
})




module.exports = router