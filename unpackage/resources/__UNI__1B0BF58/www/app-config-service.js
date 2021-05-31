
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/index","pages/somePage/ourgroup","pages/somePage/testDetail","pages/index/index","pages/login/change","pages/login/login","pages/class/index","pages/center/index","pages/center/logout","pages/somePage/achievement","pages/somePage/analysis","pages/somePage/performance","pages/somePage/signIn","pages/somePage/wrong","pages/login/sign","pages/somePage/createTest","pages/somePage/studentList"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#0188FB","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#000000","selectedColor":"#D9220C","backgroundColor":"#FFFFFF","borderStyle":"black","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/icon/home.png","selectedIconPath":"static/icon/home-check.png"},{"pagePath":"pages/center/index","text":"我的","iconPath":"static/icon/user.png","selectedIconPath":"static/icon/user-check.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"studySystem","compilerVersion":"3.1.13","entryPagePath":"pages/login/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登陆页"}},{"path":"/pages/somePage/ourgroup","meta":{},"window":{"navigationBarTitleText":"测试详细页"}},{"path":"/pages/somePage/testDetail","meta":{},"window":{"navigationBarTitleText":"测试"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"课堂"}},{"path":"/pages/login/change","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登陆页"}},{"path":"/pages/class/index","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/center/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心"}},{"path":"/pages/center/logout","meta":{},"window":{"navigationBarTitleText":"账号管理"}},{"path":"/pages/somePage/achievement","meta":{},"window":{"navigationBarTitleText":"成绩"}},{"path":"/pages/somePage/analysis","meta":{},"window":{"navigationBarTitleText":"分析"}},{"path":"/pages/somePage/performance","meta":{},"window":{"navigationBarTitleText":"表现"}},{"path":"/pages/somePage/signIn","meta":{},"window":{"navigationBarTitleText":"签到"}},{"path":"/pages/somePage/wrong","meta":{},"window":{"navigationBarTitleText":"错题"}},{"path":"/pages/login/sign","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/somePage/createTest","meta":{},"window":{"navigationBarTitleText":"试卷"}},{"path":"/pages/somePage/studentList","meta":{},"window":{"navigationBarTitleText":"学生评分"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});