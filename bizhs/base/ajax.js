define([], function() {
	/**
	 * ajax通用调用方法（改版后，方便参数拓展和调用）
	 * auth:chenliang
	 * time:2015-10-15
	 * @param option.url 请求地址
	 * @param option.params 请求参数
	 * @param option.successCallback ajax成功回调函数
	 * @param option.errorCallback ajax失败回调函数
	 * @param option.successTip 是否提示成功信息 true-提示 false-不提示
	 * @param option.chainPar 链参数 会传递到回调方法里
	 * @param option.async 是否异步
	 * @param option.bizErrTip 是否错误提示(默认或者false的时候提示，true的时候不提示)
	 * @param option.bizErrCallback 错误回调函数
	 * @param option.isMask 是否需要遮罩层,默认不需要
	 */
	var ajaxCall=function(option) {
		if(option.isMask) flyfish.common.LayerShow("正在加载中...");
		var ts = this;
		var isMobile=flyfish.common.isMobile();
		//成功的回调
		var _succ = function(data, status, xhr){
			if(option.isMask) flyfish.common.LayerHide();  //回调函数去掉遮罩层
			if(!data) {
				var msg = "未知错误";
				isMobile ? c.toastError(msg) : flyfish.common.tooltip(msg,"error");
				return;
			}else if(data.overtime) {//超时
				top.location.href = flyfish.bathPath + "/login.vm";
				return;
			}else if(data.success) { //交易成功
				if(data.noMask) {  //没有遮罩层
					if(option.successTip) {
						var msg = "交易成功";
						if(data.errMsg!="") {
							msg = data.errMsg;
						}
						isMobile ? c.toastError(msg) : flyfish.common.tooltip(msg,"succeed");
					}
					if(option.successCallback && $.isFunction(option.successCallback)) {//是否存在回调函数
						return option.successCallback.call(ts, data, status, xhr, option.chainPar);
					}
				}else {  //公共信息不正确，产生遮罩层
					topCommonDialog({
						errMsg : data.errMsg
					});
				}
			}else if(!data.success) { //交易失败
				if(!option.bizErrTip || typeof(option.bizErrTip)=="undified" || option.bizErrTip=="") {
					var msg = "交易失败";
					if(data.errMsg!="") {
						msg = data.errMsg;
					}
					isMobile ? c.toastError(msg) : flyfish.common.tooltip(msg,"error");
				}
				if(option.bizErrCallback && $.isFunction(option.bizErrCallback)) {//是否存在回调函数
					return option.bizErrCallback.call(ts, data, status, xhr, option.chainPar);
				}
			}else { //交易失败
				isMobile ? c.toastError(data.errMsg) : flyfish.common.tooltip(data.errMsg,"error");
			}
		};
		//失败的回调
		var _err = function(xhr, status, error){
			if(option.isMask) {
				flyfish.common.LayerHide();  //回调函数去掉遮罩层
			}
			var msg = "请求失败";
			if(xhr.status!=0){
				//为0时是浏览器主动关闭请求，此时不需要显示错误信息
				isMobile ? c.toastError(msg) : flyfish.common.tooltip(msg,"error");
			}
			if(option.errorCallback && $.isFunction(option.errorCallback)) {
				option.errorCallback.call(ts, xhr, status, error, option.chainPar)
			}
		};
		if(option.async == null){
			option.async = true;
		}
		//ajax请求
		$.ajax({
			url: option.url,
			type: 'POST',
			data: option.params,
			dataType: 'json',
			timeout: flyfish.common.ajaxTimeout,
			error: _err,
			success: _succ,
			async:option.async
		});
	};
	/**
	 * ajax form通用提交(封装jquery from插件)（改版后，方便参数拓展和调用）
	 * auth:chenliang
	 * time:2015-10-15
	 * 
	 * 参数:1.formId:form的id
	 * 		2.beforeSubmitFn(formData, jqForm, options):提交前用于验证数据和组装自定义数据的自定义回调函数
	 * 				formData: 数组对象，提交表单时，Form插件会以Ajax方式自动提交这些数据，格式如：[{name:user,value:val },{name:pwd,value:pwd}]  
	 *			    jqForm:   jQuery对象，封装了表单的元素     
	 *			    options:  options对象  
	 * 		3.successCallback(data,status,xhr)：ajax访问成功后回调函数
	 *      4.errorCallback(xhr,status,error)：ajax访问失败后回调函数
	 *      5.successTip：是否提示成功信息 true-提示 false-不提示
	 *      6.@param async 是否异步
	 * 		7.@param bizErrTip 是否错误提示(默认或者false的时候提示，true的时候不提示)
	 *      8.@param bizErrCallback 错误回调函数
	 *      9.@param isMask 是否加遮罩层
	 *      10.@param timeout 如果不传 默认取 flyfish.common.ajaxTimeout
	 *      11.params 自定义参数
	 * 
	*/
	var ajaxFormCall = function(option){
		if(option.isMask)  flyfish.common.LayerShow("正在加载中...");
		var ts = this;
		var isMobile=flyfish.common.isMobile();
		var _succ = function(data, status, xhr) {
			if(option.isMask) {
				flyfish.common.LayerHide();  //回调函数去掉遮罩层
			}
			if(!data) {
				var msg = "未知错误";
				isMobile ? c.toastError(msg) : flyfish.common.tooltip(msg,"error");
				return;
			}else if(data.overtime) {//超时
				top.location.href = flyfish.bathPath + "/login.vm";
				return;
			}else if(data.success) {
				if(data.noMask) {  //没有遮罩层
					if(option.successTip){
						var msg = "交易成功";
						if(data.errMsg!="") {
							msg = data.errMsg;
						}
						isMobile ? c.toastError(msg) : flyfish.common.tooltip(msg,"succeed");
					}
					if(option.successCallback && $.isFunction(option.successCallback)) {
						return option.successCallback.call(ts, data, status, xhr);
					}
				}else {  //公共信息不正确，产生遮罩层
					topCommonDialog({
						errMsg : data.errMsg
					});
				}
			}else if(!data.success) { //交易失败
				if(!option.bizErrTip || typeof(option.bizErrTip)=="undified" || option.bizErrTip=="") {
					var msg = "交易失败";
					if(data.errMsg!="") {
						msg = data.errMsg;
					}
					isMobile ? c.toastError(msg) : flyfish.common.tooltip(msg,"error");
				}
				if(option.bizErrCallback && $.isFunction(option.bizErrCallback)) {//是否存在回调函数
					return option.bizErrCallback.call(ts, data, status, xhr);
				}
			}else {// 交易失败
				isMobile ? c.toastError(data.errMsg) : flyfish.common.tooltip(data.errMsg,"error");
			}
		};
		
		var _err = function(xhr, status, error){
			if(option.isMask) {
				flyfish.common.LayerHide();  //回调函数去掉遮罩层
			}
			var msg = "请求失败";
			isMobile ? c.toastError(msg) : flyfish.common.tooltip(msg,"error");
			if(option.errorCallback && $.isFunction(option.errorCallback)) {
				option.errorCallback.call(ts, xhr, status, error);
			}
		};
		$('#'+option.formId).ajaxSubmit({
		   beforeSubmit: option.beforeSubmitFn, //提交前的回调函数  
		   success: _succ,               //提交成功的回调函数  
		   data:option.params,
		   error:_err,                   //提交失败的回调函数
		   type: "POST",                 //默认是form的method（get or post），如果申明，则会覆盖  
		   dataType: "json",             //html(默认), xml, script, json...接受服务端返回的类型  
		   timeout:flyfish.common.ajaxTimeout   //限制请求的时间，当请求大于3秒后，跳出请求  
		});
		return false;  //阻止表单默认提交
	};
	/**
	 * 
	 * url直接调用控制层
	 * option.url:vm访问地址
	 * option.isOpenTab:
	 * 					默认false 是否打开tab页面
	 * 					true:打开tab子页面  
	 * 					false：直接跳转
	 * option.isHrefReplace:
	 * 					isOpenTab为false的时候需要提供，是否是replace重定向,默认false
	 * option.tabTitle:
	 * 					isOpenTab为true的时候需要提供，tab的标题
	 * option.tabId:
	 * 					isOpenTab为true的时候需要提供,tab的Id
	 * 
	 */
	function callControl(option){
		ajaxCall({
			url: flyfish.bathPath + "/main/queryUserMask.vm",
			params:{},
			async:false,  //同步调用
			successCallback:function(data) {				
				//无遮罩层
				if(data.noMask) {
					if(option.isOpenTab) { //打开tab子页面
						flyfish.common.childAddIframe({
							title:option.tabTitle,
							url:option.url,
							id:getId
						});
					}else {
						if(option.isHrefReplace) {
							window.top.location.replace(option.url);
						}else {
							window.top.location.href = option.url;
						}
					}
				}else {
					topCommonDialog({
						errMsg : data.errMsg
					});
				}
			}
		});
	};
	/**
	 * 通用系统级最外层遮罩层
	 * option.errMsg:错误信息
	 */
	function topCommonDialog(option){
		var isMobile=flyfish.common.isMobile();		
		if(isMobile){			
			c.dialog({
				isTitle:false,
				content:option.errMsg,
				btn:[{text:"重新登录",fun:function(){
					window.top.location.href = flyfish.bathPath + "/ebusiGoodsMgr/indexOfWap.vm";
				}}]
			});
		}else{
			if($(".m-dialog").length==1) $(".m-dialog,.m-sPopBg").remove();
			$.artDialog({
				content: option.errMsg,   // 消息内容
				isTitle:false,
				isCloseBtn:false,    //是否有关闭按钮 
				okText:"跳转到登录页面",       //确定按钮显示的内容
				ok: function(){
					window.top.location.href = flyfish.bathPath + "/login.vm";
				}
			});
		}
	};	
	return {
		load: function() {
			$.ajaxSetup({
				contentType: "application/x-www-form-urlencoded;charset=utf-8",
				complete: function(a, b) {
					var c = a.getResponseHeader("sessionStatus");
					if (c == "timeout") {
						top.location.href = flyfish.bathPath + "/login.vm"
					}
				}
			})
		},
		ajaxCall: ajaxCall,
		ajaxFormCall: ajaxFormCall,
		topCommonDialog:topCommonDialog,
		callControl:callControl
	}
});