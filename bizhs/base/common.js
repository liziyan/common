/**
 * 2016-06-20 因为所有页面都有引用common.js 所以写成js模式 定为缓存
 * auth  zhanghx13855
 * update  zhanghx13855 20161215 c和cnzz冲突，全部更换为flyfish.common
 * **/
flyfish.common=flyfish.common || {};
flyfish.common._number=[48,49,50,51,52,53,54,55,56,57,8,40,38,39,37]; //数字
flyfish.common._money=[46,48,49,50,51,52,53,54,55,56,57,8,40,38,39,37]; //金额
flyfish.common.ajaxTimeout=300000; //ajax请求统一默认超时时间
flyfish.common.rule={//验证规则
	phone:/^1(3\d|5[0-35-9]|8\d|4[567]|7\d)\d{8}$/,//手机号
	company:/^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5()a-zA-Z0-9\s-,-.]*$/,//企业名称
	//uname:/^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z0-9_]*$/,//用户名
	//company:/^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5()a-zA-Z0-9\s-,-.]*$/,//商户名称	
	uname:/^[\u4E00-\u9FA5a-zA-Z0-9_]*$/,//用户名
	company:/^[\u4E00-\u9FA5()a-zA-Z0-9\s-,-.]*$/,//商户名称	
	ename:/^[a-zA-Z][a-zA-Z0-9_]*$/,//用户名，英文、数字、下划线	
	tel:/^((0[1-9]\d{1,2})|852|853|886|00852|00853|00886)(|-)\d{7,8}(-\d{1,4})?$/,//固话	
	email:/(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/,//邮箱	
	en:/^[A-Za-z]+$/,//纯英文	
	zh:/^[\u4e00-\u9fa5]+$/,//纯中文	
	num:/^[0-9]+([.][0-9]+){0,1}$/,//浮点类型（2位小数）	
	int:/^[0-9]*$/,//整数	
	url:/(http|https):\/\/[0-9a-zA-Z\-]+(\.[0-9a-zA-Z\-]+)+(:\d+)?(\/[^\/]+)*[\/]?/i,//验证http地址	
	postcode: /^[0-8]\d{5}$/,//邮编	
	money: /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,//钱验证 数字 或 数字.数字	
	bankCard:/^\d{4}(?:\s\d{4}){3}(?:\s\d{3}){0,1}$/,//16位或19位银行卡,每隔4位一个空格[2015-9-24修改]	
	card:/^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(((((19|20)((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229)))|20000229)\d{3}(\d|X|x))|(((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229))\d{3}))$/, //身份证号		
};
/**
 * 功能说明: 交易提示信息
 * @author ljf <liangjf>
 * @date 2015-2-26 下午4:14:49
 * @version V1.0
 * @param msg 信息文本
 */
flyfish.common.tooltip=function(msg,variety,time){
	$("#m_tip_con",top.document).remove();
	var time = time || 5000;
	var kind = null;
	if(variety == "succeed"){
		kind = 'm-tip-succeed';	
	}else if(variety == "error"){
		kind = 'm-tip-error';	
	}
	var str ='<div id="m_tip_con" class="m-tip-con '+ kind +'"><span class="hg-icon hg-7-8 f-mr5"></span>'+ msg +'</div>';
	$('body',top.document).append(str);
	window.top.setTimeout('$("#m_tip_con",top.document).remove()',time);
};
/**
* 功能说明:		页面中所有属性为tel的input都只能输入数字,可以输入0，但如果有nozero属性时则不能输入0
* @author:		vivy <zhanghx13855>
* @time:		2015-8-31 15:37:30
* @version:		V1.1.0
* @update:	    2015-9-1  17:16:30 新增金额的控制
* 				2015-12-23 15:12:30 火狐浏览器下删除(8)、箭头左右上下移动(37/39/38/40)的keycode
* 				2015-12-23 16:50:30 金额和数字控制首字母不能为0
* 				2015-12-30 15:11:30 小数点后面控制显示个数
*/
flyfish.common.arrowNumber=function(){	
	var ts=this;
	$("body").on({
		keypress:function(e){							
			var theEvent = window.event || e;
			var code = theEvent.keyCode || theEvent.which;	
			if(flyfish.common.getIndexOfArray(flyfish.common._number,code)==undefined) return false;
			if(typeof($(this).attr("nozero"))!="undefined"){
				if(code===48 && flyfish.common.getCursorPosition($(this))==0) return false;//不能以0开头
			}
		},
		keyup:function(e){
			var value=$.trim($(this).val()),r=/^[0-9]*$/;
			if(!r.test(value)){
			   $(this).val(value.replace(/[^0-9]/g,''));
			}
			if(value.length>1 && value.substr(0,1)==0){
				if(!$(this).hasClass("mobile"))
					value=value.substr(1,value.length-1);
				$(this).val(value);
			}
		}
	},"input[type='tel']:not('.money')");
	$("body").on({
		keypress:function(e){							
			var theEvent = window.event || e;
			var code = theEvent.keyCode || theEvent.which;
			var val=$(this).val(),_len=val.length,index=val.indexOf(".");
			if(index!=-1 && code===46) return false; //只能输入一个小数点	
			if(!$(this).attr("allowLength")){//小数点后超过两位不让输入,默认
				if(index!=-1 && val.split(".")[1].length===2 && flyfish.common.getCursorPosition($(this))>index && code!=37 && code!=39 && code!=8) return false;
			}	
			else{
				var len=$(this).attr("allowLength");
				if(!isNaN(len)){//数字
					if(index!=-1 && val.split(".")[1].length===parseInt(len) && flyfish.common.getCursorPosition($(this))>index && code!=37 && code!=39 && code!=8) return false;
				}
			}
			if(flyfish.common._money.indexOf(code) === -1) return false;
		},
		keyup:function(e){
			var value=$(this).val(),r=/^[0-9]+([.][0-9]+){0,1}$/;
			if(!r.test(value)){
			   $(this).val(value.replace(/[^0-9.]/g,''));
			}
			if(value.length>1 && value.substr(0,1)==0 && value.substr(1,1)!="."){
				value=value.substr(1,value.length-1);
				$(this).val(value);
			}
		}
	},"input[type='tel'].money");		
};
/**
 * 2.0版本以上用到
 *IE8以下浏览器的input支持placeholder，
 *引用方法：在需要的Input上添加placeText属性，如<input type="text" class="u-ipt u-ipt-nm" value="" placeText/>
 *需要注意的是，仅支持u-ipt样式的input,特殊的样式不支持
 */
flyfish.common.placeholderText=function(){
	var $text=$("input[placeText]");
	$text.each(function(){		
		$(this).val("");
		var oldText=$(this).attr("placeholder"),
			w=$(this).width(),
			h=$(this).height(),
			c=$(this).attr("class"),
			style=$(this).attr("style"),
			str='<b class="'+c+' placeTextB" onClick="$(this).prev().show().focus();$(this).remove();" style="margin:0;display:inline-block;float:left;font-weight:normal;color:#888;'+style+'">'+oldText+'</b>';
		$(this).hide();
		$(this).after(str);
		$(this).blur(function(){
			if($(this).val()=="")
			{
				if($(this).next(".placeTextB").length==0)
				$(this).after(str);
				$(this).hide();
			}
			else
			$(this).next("b").remove();
		});	
	});
};
/**
 * 2.0版本add
 * 给readonly和disabled的元素跳过tab键
 * 先将已经有的tabinde移出，再给含有不可点击的元素加上tabindex属性  
 */
flyfish.common.textTabRemove=function(){
	$("[tabindex='-1']").each(function(){$(this).removeAttr("tabindex");})
	$(".u-btn-bg-blue-disabled,.u-btn-bg-red-disabled,.u-btn-bg-gray-disabled,.u-ipt-disabled,.u-select-disabled,.u-textarea-disabled,[readonly]").each(function(e) {$(this).attr("tabindex","-1");});
};
/**
 * 2.0版本add
 * IE9及以下版本不支持textarea的maxlength属性的解决方法
 * */
flyfish.common.textarea=function(){		
	// IE也能用textarea
	$("textarea[maxlength]").keyup(function() {
		var area = $(this);
		var max = parseInt(area.attr("maxlength"), 10); // 获取maxlength的值
		if (max > 0) {
			if (area.val().length > max) { // textarea的文本长度大于maxlength
				area.val(area.val().substr(0, max)); // 截断textarea的文本重新赋值
			}
		}
	});
	// 复制的字符处理问题
	$("textarea[maxlength]").blur(function() {
		var area = $(this);
		var max = parseInt(area.attr("maxlength"), 10); // 获取maxlength的值
		if (max > 0) {
			if (area.val().length > max) { // textarea的文本长度大于maxlength
				area.val(area.val().substr(0, max)); // 截断textarea的文本重新赋值
			}
		}
	}); 		
};
/**
* 功能说明:		获取textarea或input[type="text"]的光标位置
* @author:		vivy <zhanghx13855>
* @time:		2015-12-04 10:12:30
* @version:		V1.1.0
*/
flyfish.common.getCursorPosition=function(obj){
	var el = obj.get(0);
	var pos = 0;
	if ('selectionStart' in el) {
		pos = el.selectionStart;
	} else if ('selection' in document) {
		el.focus();
		var Sel = document.selection.createRange();
		var SelLength = document.selection.createRange().text.length;
		Sel.moveStart('character', -el.value.length);
		pos = Sel.text.length - SelLength;
	}
	return pos;
};
/**
 * 2.0版本add
 * 获得URL传入的参数
 * name为参数名，GetQueryString("option");获得参数对应的值
**/
flyfish.common.GetQueryString=function(name){
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)","i");
	var result = window.location.search.substr(1).match(reg);
	return result?decodeURIComponent(result[2]):null;	
};
/**
 * 2.2版本add
 * 去左右空格
 * s为value，返回清除左右空格之后的值
**/
flyfish.common.trim=function(s){
	return s.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 * 判断浏览器内核32位还是64位
 * 2016-08-16 zhanghx13855 add
**/	
flyfish.common.getCPU=function(){
	var agent=navigator.userAgent.toLowerCase();
	if(agent.indexOf("win64")>=0||agent.indexOf("wow64")>=0) return "x64";
	return navigator.cpuClass;
}

/**
 * 判断浏览器版本，IE/火狐等
 * 2016-01-05 zhanghx13855 add
**/	
flyfish.common.browserVerisionJudge=function(){
	var check = function(r) {
		return r.test(navigator.userAgent.toLowerCase());
	};
	var isIe=function(){
		return ("ActiveXObject" in window);
	};
	var _IE = (function(){//ie789
		var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);		
		return v > 4 ? v : false ;
	}());
	var	isWebkit = check(/webkit/) ? "webkit" : false,//不做判断暂时
		isFirefox = check(/firefox/) ? "firefox" : false,
		isOpera= check(/opr/) ? "Opera" : false,
		isChrome=!isOpera && check(/chrome/) ? "chrome" : false,
		isSafari=!isChrome && !isOpera && check(/safari/) ? "safari" : false,
		isIE10=!_IE &&  navigator.userAgent.indexOf("MSIE 10.0")!=-1 ? "10" : false,
		isIE11=!_IE && !isIE10 && "ActiveXObject" in window ? "11" : false;	
	return isFirefox || isOpera || isChrome ||  isSafari || _IE || isIE10 || isIE11;	
};
/**
 * 2.1版本add
 * 判断浏览器是否是手机端
 * 2016-01-05 zhanghx13855 add
**/		
flyfish.common.isMobile=function(){
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ) return false;
	else return true;
};
/**
 * chenliang write zhx20160307copy
 * 等待的loading图
**/	
flyfish.common.LayerShow=function(text,isTop){
	if(isTop){				
		var addDiv= flyfish.common.loadDivTop(text);				
		flyfish.common.LayerHide();
		$('body',top.document).append($(addDiv));
	}else{
		var addDiv= flyfish.common.loadDiv(text); 
		flyfish.common.LayerHide();
		$('body',top.document).append($(addDiv));
		$(window).resize(flyfish.common.Position); 
		flyfish.common.Position(); 
	}
};
flyfish.common.loadDivTop=function(text){
	var div='<div id="_layer_sync" class="f-r5 loaddingTop"><p class="loadingpng"></p><p style="min-width:200px;" class="f-fl display-inline">'+text+'</p></div>';
    return div; 
};
flyfish.common.loadDiv=function(text){
	var div='<div class="m-sPopBg" id="_layer_Main" style="background:#fff;display:inline-block"></div><div id="_layer_" class="loaddings f-r5"><p class="loadingpng"></p><p>'+text+'</p></div>';
    return div; 
};
flyfish.common.LayerHide=function(){
	$("#_layer_",top.document).remove();
	$("#_layer_Main",top.document).remove();
	$("#_layer_sync",top.document).remove();
};
flyfish.common.Position=function(){
	var obj=$("#_layer_").length===1?$("#_layer_"):parent.$("#_layer_");	
	var _w=obj.outerWidth(),_h=obj.outerHeight();
	obj.css({"margin-left":-_w/2+"px","margin-top":-_h/2+"px"});
};
/**
 * 通用系统级最外层遮罩层
 * option.errMsg:错误信息
 */
flyfish.common.topCommonDialog=function(option) {	
	$.artDialog({
		content: option.errMsg,   // 消息内容
		isTitle:false,
		isCloseBtn:false,    //是否有关闭按钮 
		okText:"跳转到登录页面",       //确定按钮显示的内容
		ok: function(){
			window.top.location.href = flyfish.bathPath + "/login.vm";
		}
	});
};
/**
* 功能说明:		获取字符串所有中文的字节数(一个汉字=2个字节)
* @author:		vivy <zhanghx13855>
* @time:		2015-8-31 15:37:30
* @version:		V1.1.0
* @update:		
* @param:		tips<提示的内容>
* @param:		timeout<提示停留的时间，可不配置，默认为2秒>
*/
flyfish.common.textChineseLength=function(str){
	var re=/[\u4E00-\u9FA5]|[\u3001-\u3002]|[\uFF1A-\uFF1F]|[\u300A-\u300F]|[\u3010-\u3015]|[\u2013-\u201D]|[\uFF01-\uFF0E]|[\u3008-\u3009]|[\u2026]|[\uffe5]/g;
	if(re.test(str))        //使用正则判断是否存在中文
	return str.match(re).length; //返回中文的个数
	else
	return 0;
};
/**
* 功能说明:		新增或修改 新开窗口
* @author:		vivy <zhanghx13855>
* @time:		2016-03-17 14:09:30
* @version:		V1.1.0
* @update:		
* @param:		getTitle<tab显示的标题>
* @param:		getUrl<iframe的url>
* @param:		getId<tab显示的ID>
* @param:		isRefresh<关闭tab时是否刷新父页面>
* @param:		isChange<页面已经打开时刷新当前页面>
*/
flyfish.common.childAddIframe=function(option){	
	var opt={
			title:null,
			url:null,
			id:null,
			isRefresh:false,
			isChange:false
		};
		opt=$.extend(opt, option || {});
		var isRefresh=opt.isRefresh,
			getTitle=opt.title,
			getUrl=opt.url,
			getId=opt.id,
			isChange=opt.isChange;			
		if(!getId){return false;}
		var iframe=$("#tabCon",top.document),
			li=$("#tabList",top.document);
		if(isRefresh) getUrl = getUrl+ '#isReturn='+ li.find(".on").attr("data-id") +'';	
		var have=$("[data-id="+getId+"]",li).length>0 ? true : false ;
		var haveCon=$("#"+getId+"Con",iframe).length>0 ? true : false ;			
		if(have){				
			$("[data-id="+getId+"]",li).click();
			if(isChange){
				$('#'+ getId + 'Con',iframe).find("iframe").remove();
				var ifr='<iframe scrolling="auto" src="'+getUrl+'" frameborder="0" name="m-frameCon" class="m-frameCon"></iframe>';
				$('#'+ getId + 'Con',iframe).append(ifr);
			}
			flyfish.common.controlTablist();
		}
		else{
			if(haveCon){
				$("#"+getId+"Con",iframe).remove();
			}
			iframe.find(".m-tab-content").hide();
			var ifr='<div id="'+getId+'Con" class="m-tab-content"><iframe scrolling="auto" src="'+getUrl+'" frameborder="0" name="m-frameCon" class="m-frameCon"></iframe></div>';
			iframe.append(ifr);
			li.find("li").removeClass("on");
			var s='<li class="on" data-id="'+getId+'" id="'+getId+'list"><a data-id="'+getId+'" data-href="'+getUrl+'" href="javascript:">'+getTitle+'</a><a href="javascript:;" class="hg-icon hg-1-10 m-tab-close"></a></li>';
			li.append(s);
			$(".m-nav dd a").removeClass("on");
			var a=$(".m-nav dd a[data-id="+getId+"]");			
			a.addClass("on");			
			if(!a.parents("dl").hasClass("on")) a.parents("dl").find("dt").click();	
			flyfish.common.controlTablist();
		}
		return false;
};
/**
* 功能说明:		iframe中关闭当前窗口
* @author:		vivy <zhanghx13855>
* @time:		2016-03-17 16:31:30
* @version:		V1.1.0
* @update:		
* @param:		isRefresh<父页面是否刷新>
* @param:		isCloseIframe<是否留在当前页>
* @使用案例：(下面是兼容老的方法，以后不准再用)
* 	childClosedIframe()[关闭页面，父页面不刷新]
* 	childClosedIframe(true)[关闭页面，父页面刷新]
* 	childClosedIframe(true,true)[留在当前页面，父页面刷新]
* 使用新方法
* 1、关闭当前页面回到父页面
* 	1) 父页面打开新窗口时isRefresh要为true（不加时会默认回到打开新窗口的上一个页面）
* 	2) 子页面调用 flyfish.common.childClosedIframe()--父页面不刷新
* 			   flyfish.common.childClosedIframe({isRefresh:true})---父页面刷新
* 2、关闭当前回到指定页面
* 	flyfish.common.childClosedIframe({
* 		id:'id',//要关闭的页面的id,
* 		isRefresh:true,//刷新父页面
* 		isCloseIframe:false//留在子页面
* 	})
* 3、关闭指定页面
* 	flyfish.common.childClosedIframe({
* 		closeId:"id"//指定关闭的页面ID
* 	})
* 
*/
flyfish.common.childClosedIframe=function(option,isClose){	
	var isRefresh=false,isCloseIframe=false;
	var opt={
		id:null,//指定回到的页面ID
		closeId:null,//指定关闭的页面ID
		refreshId:null,//指定刷新的页面ID
		isRefresh:false,//是否刷新父页面
		isCloseIframe:false//是否关闭父页面
	}
	if(option==true) isRefresh=true;
	else if(option==false) isRefresh=false;
	else{
		opt=$.extend(opt, option || {});
		isRefresh=opt.isRefresh;
	}
	if(isClose==true) isCloseIframe=true;
	else if(isClose==false) isCloseIframe=false;
	else isCloseIframe=opt.isCloseIframe;
	if(opt.closeId && isCloseIframe){
		$("#"+opt.closeId+"list",top.document).remove();				
		$("#"+opt.closeId+"Con",top.document).remove();
		return;
	}
	if(opt.refreshId){
		$("#"+opt.refreshId+"Con",top.document).find(".m-frameCon")[0].contentWindow.location.reload();
	}
	var tabList=$("#tabList",top.document),
		iframe=$("#tabCon",top.document),
		oldId=$(".on",tabList).attr("data-id"),
		url=$("#"+oldId+"Con",iframe).find("iframe").attr("src"),
		isReturn=url.split("isReturn=")[1],
		pId= isReturn ? isReturn : $(".on",tabList).prev().attr("data-id");	
	pId=opt.id ? opt.id : pId;
	if(oldId==="0") return false;	
	if(isReturn && isRefresh){
		$("#"+pId+"Con",top.document).find(".m-frameCon")[0].contentWindow.location.reload();
	}	
	if(!isCloseIframe){	
		if(pId && $("#"+pId+"list",top.document).length==1){//如果有父页面且父页面没有关闭时打开父页面
			$("#"+pId+"list",top.document).addClass("on");
			$("#"+pId+"Con",top.document).show();	
		}
		else{//显示首页
			$(".m-nav dl.on dd",top.document).hide();
			$(".m-nav dl.on dd a.on",top.document).removeClass("on");
			$(".m-nav dl.on",top.document).removeClass("on");
			$("#0Con",top.document).show();	
		}
		if(opt.closeId){//关闭指定的ID的页面
			$("#"+opt.closeId+"list",top.document).remove();				
			$("#"+opt.closeId+"Con",top.document).remove();
		}else{//否则关闭先前打开的页面
			$("#"+oldId+"list",top.document).remove();				
			$("#"+oldId+"Con",top.document).remove();
		}
	}
	return;	
};
/**
 * 获取往前多少月最大天数
 * @param num<当前月份往前月数>
 * @return 天数<number>
 * **/
flyfish.common.getMaxDate=function(num){
	var now = new Date(),m=now.getMonth()+1;
	m=m-num;
	if(m<1) m=12;
	return new Date(now.getFullYear(), m,0).getDate();	
};
/**
 * 格式化日期
 * @param strTime<日期,string类型>
 * @param isZero<月/日小于10时是否前面有0，默认有>
 * @return 天数<number>
 * **/
flyfish.common.formatDate=function(strTime,isZero){
	var date = new Date(strTime),
		year=date.getFullYear(),
		mouth=date.getMonth()+1,
		day=date.getDate();
	mouth= mouth>9 && !isZero ? mouth : "0"+mouth;
	day= day>9 && !isZero ? day : "0"+day;
	return year+"-"+mouth+"-"+day;
};
/**
 * YYYY-MM-DD转化为字符串,和formatDate刚好相反
 * @param str<日期,yyyy-mm-dd>
 * @return 天数<number>
 * **/
flyfish.common.dateToStr=function(str){
	var ar = str.split('-');
	// 返回日期格式
	return new Date(ar[0], parseFloat(ar[1]) - 1, parseFloat(ar[2]));
};
/**
 *  往前多少天<经营分析用到>
 * @param isDay<判断是天(true)还是月(false)，月最多支持12个月，暂不支持年,false可不填>
 * @param num<往前多久，数字类型>
 * @param nowDate<从这个日期往前，默认为空时指当天>
 * @return 日期<yyyy-mm-dd格式>
 */
flyfish.common.loadDate=function(num,isDay,nowDate){
	num=num||0;
	var m=nowDate?parseFloat(nowDate.split("-")[1]):(new Date()).getMonth()+1,n=0,ts=this
		formatTime=nowDate?flyfish.common.dateToStr(nowDate).getTime():(new Date()).getTime();
	if(isDay) n=num;
	else{
		var ax=Math.floor(num/12),b=num%12;
		for(var i=1;i<=b;i++){
			n+=flyfish.common.getMaxDate(i);
		}
		n+=ax*365;		
	}
	var weak = new Date(formatTime - n * 24 * 3600 * 1000);	
	return flyfish.common.formatDate(weak);
};
//字符串格式的时间转换成时间戳
//dataStr 格式是yyyy-mm-dd
flyfish.common.strToDatetimeStamp=function(dataStr) {
	date = new Date(Date.parse(dataStr.replace(/-/g, "/")));
	return date.getTime();
};
/**
 * 获取两个时间之间的差值
 * @param sDate1<第一个时间>
 * @param sDate2<第二个时间>
 * @return 天数<number>
 * **/
flyfish.common.DateDiff=function(sDate1,  sDate2){
	var aDate,oDate1,oDate2,iDays,content="-"; 
	if(flyfish.common.browserVerisionJudge()=="firefox") content=",";
	aDate = sDate1.split("-") ;		
	oDate1= new Date(aDate[1] + content + aDate[2] + content + aDate[0]);
	aDate = sDate2.split("-") ;	
	oDate2 = new Date(aDate[1] + content + aDate[2] + content + aDate[0]);
	iDays = parseFloat(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24);
	return iDays;
};
/**
 * 获取某天是周几
 * @param 时间<yyyy-mm-dd格式>
 * **/
flyfish.common.DateWeak=function(sDate1){	
	var ts=this;
	sDate1=sDate1||flyfish.common.loadDate();	
	var myDate = new Date(sDate1.split("-")[0],parseFloat(sDate1.split("-")[1])-1,parseFloat(sDate1.split("-")[2]));
	return myDate .getDay();
};
/**
 * 含有外部选择的勾选框,例如<span><input/>XX</span>点击文字或勾选框都选中
 * @param outSpan<外部元素，上面的span[例如“.shop a”]>
 * @param fun<回调函数，返回当前元素和是否选中>
 */
flyfish.common.checkSelect=function(outSpan,fun){
	$('body').on({
		click:function(e){
			var input=$(this).find("input"),ts=this,bool=input.is(":checked"),name=input.attr("name");			
			if($(e.target).attr("type")==="checkbox"){
				if(fun && $.isFunction(fun)) {//是否有回调函数
					return fun.call(ts,$(this),!bool,name);
				}						
				return;
			}					
			if(bool) input.removeAttr("checked");
			else input.attr("checked",true);
			if(fun && $.isFunction(fun)) {//是否有回调函数
				return fun.call(ts,$(this),bool,name);
			}
		}
	},outSpan);
};
/**
 * 精度缺失的方法,accMul[乘法]，accAdd[加法]，Subtr[减法]，accDiv[除法]
 * @param arg1<计算值1>
 * @param arg2<计算值2>
 */
flyfish.common.accMul=function(arg1,arg2){   
  var m=0,s1=arg1.toString(),s2=arg2.toString();   
  try{m+=s1.split(".")[1].length;}catch(e){}   
  try{m+=s2.split(".")[1].length;}catch(e){}   
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);  
};
flyfish.common.accAdd=function(arg1,arg2){   
	var r1,r2,m;   
	try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}   
	try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}   
	m=Math.pow(10,Math.max(r1,r2));  
	return (arg1*m+arg2*m)/m;   
};  
flyfish.common.accDiv=function(arg1,arg2){   
	 var t1=0,t2=0,r1,r2;   
	 try{t1=arg1.toString().split(".")[1].length;}catch(e){}   
	 try{t2=arg2.toString().split(".")[1].length;}catch(e){}   
	 with(Math){   
		 r1=Number(arg1.toString().replace(".",""));   
		 r2=Number(arg2.toString().replace(".",""));  
		 return flyfish.common.accMul((r1/r2),pow(10,t2-t1));   
	 }   
};
flyfish.common.Subtr=function(arg1,arg2){  
	var r1,r2,m,n;  
	try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}  
	try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}  
	m=Math.pow(10,Math.max(r1,r2));  
	n=(r1>=r2)?r1:r2;  
	return ((arg1*m-arg2*m)/m).toFixed(n);  
};
/**
 * 针对IE8不支持数组的indexof方法而将数组遍历取值
 * @param getIndexOfArray<数组>
 * @param value<需要查找索引的数据值>
 * @return 索引值
 */
flyfish.common.getIndexOfArray=function(arr,value){
	for(var i=0;i<arr.length;i++){
		if(arr[i]===value) return i;			
	}
};
/****
 * zhanghx13855 2015-12-04
 * 删除数组中的指定元素
 */
flyfish.common.removeArr=function(arr,value){
	for(var i=0;i<arr.length;i++){
		if(arr[i]===value) arr.splice(jQuery.inArray(value,arr),1);			
	}
	return arr;
};
/****
 * zhanghx13855 2016-10-12
 * 数组去重
 */
flyfish.common.unique=function(arr){
	var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
};
/**复制数组,2.1需求流程管理新建
 *arr--数组， newArr--返回复制后的数组
*/
flyfish.common.copyArr=function(t){
	var newArr=[];	
	for (var i=0;i<t.length;i++){		
		newArr[i]=t[i];
	}
	return newArr;
};
/**
 * 功能说明: grid请求失败统一处理函数
 * @author ljf <liangjf>
 * @date 2015-2-26 下午4:14:49
 * @version V1.0
 * @param xhr xhr信息
 * @param status 状态
 * @param error 错误信息
 */
flyfish.common.gridajaxErrorFn=function(xhr, status, error) {
	var ts = this;
	var msg = "请求失败";
	flyfish.common.tooltip(msg,"error");
	if(ts.p.errorCallback && $.isFunction(ts.p.errorCallback)) {
		ts.p.errorCallback.call(ts, xhr, status, error);
	}
};
/**
 * 功能说明: grid请求成功统一处理函数
 * @author ljf <liangjf>
 * @date 2015-2-26 下午4:14:49
 * @version V1.0
 * @param data 数据
 * @param status 状态
 * @param xhr xhr信息
 */
flyfish.common.gridajaxSuccessFn=function(data, status, xhr) {
	var ts = this;
	if(!data) {
		var msg = "未知错误";
		flyfish.common.tooltip(msg,"error");
		return;
	}else if(data.success) {
		if(ts.p.successTip) {
			var msg = "交易成功";
			if(data.errMsg!="") {
				msg = data.errMsg;
			}
			flyfish.common.tooltip(msg,"succeed");
		}
		if(ts.p.successCallback && $.isFunction(ts.p.successCallback)) {
			ts.p.successCallback.call(ts, data, status, xhr);
		}
	}else {	
		flyfish.common.tooltip(data.errMsg,"error");
	}
};
/**
 * 功能说明: grid页面的重写
 * @author zhanghx <zhanghx13855>
 * @date 2016-3-23 
 * @version V1.0
 * @update  2016-3-23 16:13:30 给页面框给一个ui-pg-input的ID,主要用于光标的移除
 * 			2016-4-19 10:35:30 兼容ie8的修改
 */
flyfish.common.gridaddText=function(){
	var obj=$(".ui-pg-table select.ui-pg-selbox");
	var s='<span class="z_l">条</span>';
	var t='<span class="z_r">每页显示</span>';
	obj.parent("td").css({"display":"inline-block","width":"250px","line-height":"24px","padding":"1px 5px","padding-right":"0px"});
	obj.parents(".ui-pg-table").css({"min-width":"300px"});
	obj.css({"display":"inline-block","margin-left":"5px"});
	if($(".z_l").length===0) obj.after(s);       		
	if($(".z_r").length===0) obj.before(t);
	if($("#ui-pg-input").length==0) $(".ui-pg-input").attr("id","ui-pg-input");
	$("td[aria-describedby='sg1_rn']").css({"padding":"0","text-overflow":"clip","overflow":"inherit"});
	$("td[aria-describedby='table_rn']").css({"padding":"0","text-overflow":"clip","overflow":"inherit"});
	flyfish.common.gridTrhover();	
};
flyfish.common.gridTrhover=function(tabId){
	tabId=tabId||"table";
	if($(".frozen-bdiv").length>0){
		$("#"+tabId+" tr").hover(function(){
			var id=$(this).attr("id");					
			$("#"+tabId+"_frozen tr#"+id).find("td").toggleClass("hover");
			$("#"+tabId+" tr#"+id).find("td").toggleClass("hover");
		});
	}
}
/**
 * 2.1需求中jqgrid行列可编辑方法3,前面有编辑保存按钮的情况
 * @param id要编辑的行ID
 * */
flyfish.common.grideditThree=function(id,isID,obj){
	if(!isID) obj=$("#"+id);
	obj.find(".editSpans").each(function(){
		$(this).addClass("onEdit");
		$(this).hide();
		var value=$(this).find("span").text();
		$(this).parent().find(".editInput").val(value).show();		
	});
};
flyfish.common.grideditThreeSave=function(id,isID,obj){
	if(!isID) obj=$("#"+id);
	obj.find(".editSpans").each(function(){
		$(this).removeClass("onEdit");
		var value=$(this).parent().find(".editInput").val();		
		$(this).show();	
		$(this).find("span").text(value);	
		$(this).parent().find(".editInput").hide();
	});
};
/**
* 功能说明:		弹出层插件
* @author:		vivy <zhanghx13855>
* @time:		2015-11-27 16:15:30
* @version:		V1.1.0
* @update		2016-3-23 close方法，关闭时将光标指定到父页面页面框中，页码框ID为ui-pg-input
*
* @js调用方法：
* flyfish.common.s_addPop({
*	title:'新增角色',	//title
*	url:flyfish.bathPath+'/roleManage/forwardRoleAdd.vm?master='+master,	//url
*	width:690,			//宽度
*	height:350,			//高度
*	以上为必须配置，以下为非必须
*	closeCallback:null,	//关闭按钮回调函数		
* 	fix:false	//不固定	
* });
* 
* 关闭窗口调用方法:
* flyfish.common.s_addPop_close(true);//关闭窗口,刷新父页面
* flyfish.common.s_addPop_close();//关闭窗口，不刷新父
*/
flyfish.common.s_addPop=function(option){
	var opt={
			title:'',			//头部标题
			url:'',				//url
			width:$(window).width()-40,			//宽度
			height:$(window).height()-40,			//高度
			closeCallback:null,	//关闭按钮回调函数
			isScreen:false,		//全屏时是否放大
			top:'auto',			//上间距，默认居中
			left:'auto',		//左间距,默认居中
	 	 	position:'absolute'	//绝对定位方式
	 };
	opt=$.extend(opt, option || {});
	var ts=this;
	if($("#popCon").length>0){
		return;
  	}
	var s_popHtml = '',
		ch=opt.height-48,
		left= opt.left==="auto" ? ($(window).outerWidth()-opt.width)/2 : opt.left,
		top= opt.top==="auto" ? ($(window).outerHeight()-opt.height)/2 : opt.top,
		cls=opt.isScreen?"isScreen":"";
	if(top<0) top=0;
	s_popHtml+='<div class="m-sPopBg" id="popBg"></div>';
	s_popHtml+= '<div class="m-sPopCon '+cls+'" id="popCon" style="width:' + opt.width + 'px;position:'+opt.position+'; height:'+ opt.height +'px; left:'+ left +'px; top:'+ top +'px;">'
					+'<div class="m-sPopTitle">'
					+'<strong>'+opt.title+'</strong>'
					+'<b id="sPopClose" class="m-sPopClose">x</b>'
					+'</div>'
					+'<div id="iframeDiv" class="m-sPopContent" style="height:' + ch + 'px;"></div>'
				+'</div>';
	$('body').append(s_popHtml);
	$("#popBg,#popCon").show();
	$('#iframeDiv').append('<iframe scrolling="auto" frameborder="0" class="m-frameCon"></iframe>');			
	$('#iframeDiv .m-frameCon').attr('src', opt.url); 
	$('#sPopClose').on("click",function(){
		if(opt.closeCallback && $.isFunction(opt.closeCallback)){
			opt.closeCallback();
		}else{
			flyfish.common.s_addPop_close();
		}				
	});		
};
/*关闭弹出层，*/
flyfish.common.s_addPop_close=function(isRefresh,isClose){
	var ts=this;
	if(parent.$("#ui-pg-input").length>0) parent.$("#ui-pg-input").focus();
	isRefresh=isRefresh||false;
	isClose= isClose==undefined ? true : false;
	var isParent=$("#popBg").length===1 ? false : true;
	if(isParent){
		if(isRefresh) parent.window.location.reload();	 
		if(isClose) $("#popCon,#popBg",parent.document).remove();
	}else
	{
		if(isRefresh) window.location.reload();
		if(isClose) $("#popCon,#popBg").remove();
	}
};
/**
 * 何龙写的，2.0版本打单发货有用到
 * 判断是否为空****/
flyfish.common.isEmpty=function(str){
	if(typeof(str) == "undefined"||str===null||$.trim(str)==''||str=='undefined'||str=='null'||!str){
		return true;
	}else{
		return false;
	}
};
/**
* 功能说明:		操作框架的tab导航
* @author:		vivy <zhanghx13855>
* @time:		2016-03-17 14:13:30
* @version:		V1.1.0
* @update:		
* @param:		isClose<是否关闭当前tab>
* @param:		isScreen<是否全屏>
*/
flyfish.common.controlTablist=function(isClose,isScreen){
	var liw=0,//所有li加起来的宽度
		arrw=[],//每个li的宽度数组，
		arrid=[],//每个li的data-id数组，
		mnavw=isScreen?0:$(".m-nav").outerWidth(),
		maxw=$(window).outerWidth() - mnavw-86-40,//可显示区域的宽度
		obj=$("#tabList li"),
		lilen=$("#tabList li").length;//li的个数							
	$(".m-tab-list").css({"width":maxw+"px"});
	$("#tabList li").each(function(){
		var w=$(this).outerWidth();
		liw+=w;
		arrw.push(w);
		arrid.push($(this).attr("data-id"));
	});			
	if(liw<=maxw){ //新开窗口数小于可显示区域
		$("#tabList").css({"margin-left":0}); 
		return;	
	}
	$(".arrow").show();	
	/*选中显示*/
	var left=parseInt($("#tabList").css("margin-left")) * (-1),		
		index=$("#tabList li.on").index(),
		thisw=$("#tabList li.on").outerWidth();
	var ax=0;
	for(var i=0;i<index;i++){
		ax+=arrw[i];
	}	
	if(ax<left){
		$("#tabList").css({"margin-left": - ax +"px"});
	}else if(ax>=left+maxw){
		var b=ax-maxw+thisw;		
		$("#tabList").css({"margin-left": - b +"px"});
	}
	/*关闭*/
	if(isClose){				
		var t=parseInt($("#tabList").css("margin-left")),c=0;				
		if(maxw-t>liw){
			cx=maxw-liw;
			if(cx>arrw[0]) cx=0;
			$("#tabList").css({"margin-left": cx +"px"});
		}		
	}
	/*左右箭头*/
	$(".arrowLeft").unbind("click").bind("click",function(){
		var t=parseInt($("#tabList").css("margin-left")),
			next=t+maxw;
		if(next>0) next=0;
		$("#tabList").css({"margin-left": next+"px"});	
	});
	$(".arrowRight").unbind("click").bind("click",function(){
		var t=parseInt($("#tabList").css("margin-left")),
			next=-(t-maxw);			
		if(next+maxw > liw){
			next=liw-maxw;
		}
		$("#tabList").css({"margin-left": -next+"px"});	
	});	
};
/**
* 功能说明:		引入音乐
* @author:		vivy <zhanghx13855>
* @time:		2016-04-12 11:25:30
* @version:		V1.1.0
* @param		src<音乐文件的路径>
*/
flyfish.common.creatAudio=function(src){
	var ts=this;
	if($("#audio").length>0) $("#audio").remove();
	var s='';
	if(ts.browserVerisionJudge()<9){
		s+='<embed src="'+src+'" width=300 height=45 type="audio/mpeg" id="audio" style="display:none"></embed>';
		$('body').append(s);
	}else{
		s='<audio id="audio" controls="controls" style="display:none">'+
		'<source src="'+src+'" type="audio/mpeg">'+
		'</audio>';
		$('body').append(s);
		var ax=document.getElementById("audio");
		ax.play();
	}
};
flyfish.common.showToUse=function(option){			
	var opt={
		_class:'',
		_style:'',
		_html:null
	};
	opt=$.extend(opt, option || {});
	if(!opt._html) return;
	var str='<div class="m-sPopBg" style="display:block;opacity: .8;filter: alpha(opacity=80);"></div><div class="'+opt._class+'" style="display:block;'+opt._style+'">'+opt._html+'</div>';
	$('body', top.document).append(str);
};
$(function(){
	if(flyfish.common.browserVerisionJudge()<10) flyfish.common.placeholderText(); //IE8下文本框仿placeholder
	flyfish.common.textTabRemove();//不可编辑的元素跳过tab键
	if(flyfish.common.browserVerisionJudge() <10 ) flyfish.common.textarea();//ie9及以下textarea不支持maxlength方法
	flyfish.common.arrowNumber();//输入框只能输入金额或数字的控制
});
/**
* 功能说明:		倒计时/计数器插件
* @author:		vivy <zhanghx13855>
* @time:		2016-12-29 11:14:30
* @version:		V1.1.0
* @param		startTime  开始时间
* @param		endTime  结束时间
* @param		ing  记数每秒的回调函数，参数为当前多少秒
* @param		after  记数完成的回调函数
* 调用方法，倒计时：
* flyfish.common.timeChange({
* 	startTime:60,//从60秒开始倒计时
* 	endTime:0//倒计时到0结束
* })
* 往上增加的记数字：
* flyfish.common.timeChange({
* 	startTime:0,//从0秒开始往上记数
* 	endTime:60//增加到60秒后停止记数
* })
* 有一种情况，当往上增加的记数，没有上限值，即endTime没有值时，after的回调函数无用
* flyfish.common.timeChange({
* 	startTime:0,//从0秒开始往上记数
* 	endTime:null//没有上限
* })
* flyfish.common.timeChageClear();//关闭计数器，当计数器是往上增且没有上限值时，关闭计数器时一定要调用这个方法
*/
(function($) {
	var b, timerC, opt;
	var d = function(a) {
			a = $.extend(require.defaults, a || {});
			opt = a;
			clearTimeout(b);
			return (new require())._init()
		};

	function require(a) {};
	require.prototype = {
		_init: function() {
			timerC = opt.startTime;
			this._sendVerify()
		},
		_sendVerify: function() {
			var a = this;
			if (timerC === opt.endTime) {
				clearTimeout(b);
				opt.after();
				timerC = opt.startTime;
				return;
			}
			if(opt.startTime<opt.endTime || opt.endTime===null) timerC++;
			else timerC--;
			opt.ing(timerC);
			b = setTimeout(function() {
				a._sendVerify()
			}, 1000);
		}
	};
	require.defaults = {
		startTime:60,
		endTime:0,	//为null时表示递增且没有上限值	
		ing: function(c) {},
		after: function() {}
	};
	flyfish.common.timeChange = d;
	flyfish.common.timeChageClear=function(){clearTimeout(b);}
})(jQuery);