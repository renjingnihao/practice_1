var  gulp = require('gulp');
var server = require('gulp-webserver');
var urlTool = require('url')


var dataBase={
	goodlist:[{
		name:"奶茶",
		price:"￥9"
	},{
		name:"蛋挞",
		price:"￥3"
	},{
		name:"火锅",
		price:"￥100",
	}],
	users:[
       
       {account:"zhangsan",password:'123456'}
 
	 ]

}
gulp.task('mockServer',function(){
	 gulp.src('gulp')
	     .pipe(server({
	     	  port:8008,
	     	  middleware:function(req,res,next){
                  var method = req.method,
                      urlObj = urlTool.parse(req.url,true);
                      pathname=urlObj.pathname,
                      query=urlObj.query;
                      console.log(query)
                      	//Request.Url.Query 能够显示加密的数据;Request.QueryString只能显示HttpUtility.UrlEncode(name)的数据
			
                      //console.log(method,urlObj);
                      switch(pathname){

                        case "/index":
                        res.setHeader('content-type','application/json;charset=utf-8')
                        res.end();
                        break;

                      	case '/goodlist':
                      	res.setHeader('content-type',"application/json;charset=utf-8")
                      	res.write(JSON.stringify(dataBase.goodlist))
                      	res.end();
                      	break;
                      	default:
                      	 res.setHeader('content-type','application/json;charset=utf-8;')
                      	 res.write('{"word":"你请求成功了"}')
                      	 //res.write({"write":dataBase.goodlist})
                         res.end();
                      }
                      
                     
                     
	     	  }
	     }))
})
/*GET Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '',
  query: {},
  pathname: '/',
  path: '/',
  href: '/' }
GET Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '',
  query: {},
  pathname: '/favicon.ico'
  path: '/favicon.ico',
  href: '/favicon.ico' }*/
gulp.task('default',['mockServer']);