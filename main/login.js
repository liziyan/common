/**
* 功能说明:		登录页面
* @author:		vivy <zhanghx13855@hundsun.com>
* @time:		2016-03-14 16:15:30
* @version:		V1.1.0
* @update:		2016-03-30 添加注释
* 
* 用到的js模块有：
* cookie<设置/获取>，
* common<公用方法>,
* verify<注册验证>,
* regCommon<获取验证码>,
* pwd<密码加密>,
* jquery.form<表单提交>
* ajax<请求>
* jquery.md5<md5加密>
* dialog<弹窗提示,regCommon有用到>
*
*/
require.config({
	shim: {
		"underscore": {
			exports: "_"
		}
	},
	paths: {
		"jquery.form": "../base/jquery-form.min",
		"ajax":"../base/ajax",
		"verify":"../base/verify",
		"cookie":"../base/cookie",
		"pwd":"../base/pwd",
		"regCommon":'registerCommon'
	}
});
define(["cookie","verify","ajax","regCommon","jquery.form","pwd"],function(cookie,check,a,b){
	var _initLogin=function(){
		/*设置cookie*/
		cookie.setCookies();
		//查询登录错误标记
		a.ajaxCall({
			url : flyfish.bathPath + '/queryErrFlag.vm',
			successCallback : function(result){
				if(result.errFlag){
					$("#randCodeId").show();
				}
			},
			chainPar : this
		});
		/*显示or隐藏密码*/
		if(!flyfish.common.isMobile()) check.togglePwd();
		//从cookies中读取用户名
		loadUserNameFromCookies();
		//3分钟后重置验证码
		check.countdown({
			maxTime:300,
			minTime:0,
			after:function(){
				b.changeCode();
			}
		});
		/*改变图形验证码*/
		$(".changeCode").click(function(){
			b.changeCode();
		});
		/*显示无法登录*/
		$(".showout").click(function(){
			$(".m-sPopBg,.registerOut").show();
		});
		/*隐藏无法登录*/
		$(".close").click(function(){
			$(".m-sPopBg,.registerOut").hide();
		});
		/*立即注册*/
		$(".regnow").click(function(){
			a.callControl({url:flyfish.bathPath +'/register.vm'});
		});
		$(".reg-box input").focus(function(){		
			$(this).parent("div").addClass("on");
			$(this).parent("div").removeClass("v-error");
			$(".error_tips").hide();
			$(this).parent("div").find(".close").addClass("hide");
			$(this).removeClass("v_error");
		});
		$(".reg-box input").blur(function(){
			$(this).parent("div").removeClass("on");	
		});		
		/*登录按钮*/
		$("#login").click(function(option){
			var ts=this;
			setUserNameFromCookies();
			var adminName=$("#adminName").val();
			var user = $('#loginName').val();
			var password = $('#password').val();
			var randCode = $('#randCode').val();
			if(adminName ==''){
				showError($('#adminName'),"商户名称不能为空");
				return ;
			}else if(user == ''){
				showError($('#loginName'),"用户名不能为空");
				return ;
			}else if(password == ''){
				showError($('#password'),"密码不能为空");
				return ;
			}
			var userPassword = hsRSAEncrypt(password);
			$(this).text("登录中...");
			a.ajaxCall({
				url:flyfish.bathPath+"/loginIn.vm",
				params:{"adminName":adminName,"loginName":user,"userPassword":userPassword,"randCode":randCode,"isGuest":"false"},
				successCallback:function(data, status, xhr){
					if(data.bizSuccess) {//验证通过
						a.callControl({
							url:flyfish.bathPath + data.href,
							isHrefReplace:true
						});
					}else{
						if(data.hasRisk) {//登陆聚石塔风控有风险  跳转到聚石塔短信验证页面
							a.callControl({
								url:data.href,
								isHrefReplace:true
							});
						}else{
							showError(null,data.errMsg);			
							b.changeCode();
							$(ts).text("登 录");
							if(data.errFlag==true){
								$("#randCodeId").show();
							}
						}			
					}
				}
			});
		});
	};
	//从cookies中读取用户名
	function loadUserNameFromCookies() {
		var coUserName = cookie.getCookie("coUserName");
		var adminName  = cookie.getCookie("adminName");
		if(""!=coUserName &&coUserName!="undefined" ) $("#ckId").prop("checked",true);	
		else $("#ckId").removeAttr("checked", "checked");
		if(coUserName!="undefined") $("#loginName").attr("value", coUserName);
		if(adminName!="undefined") $("#adminName").attr("value",adminName);
	};
	//设置用户名到cookies中
	function setUserNameFromCookies() {
		var checkStat = $(":checkbox[name=ckId]").attr("checked");
		var adminName = $("#adminName").val();
		if("checked"==checkStat) {
			var coUserName = $("#loginName").val();
			cookie.addCookie("coUserName",coUserName,"270");
		}else {
			cookie.addCookie("coUserName","","270");
		}
		cookie.addCookie("adminName",adminName,"270");
	};
	//显示错误信息
	function showError(obj,value){
		$(".error_tips").show();
		$(".error_tips .text").text(value);
		if(obj===null) return false;
		obj.parent("div").addClass("v-error");
		obj.parent("div").find(".close").removeClass("hide");	
		obj.addClass("v_error");
	};	
	_initLogin();
	
});