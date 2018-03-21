/**
* 功能说明:		操作cookie
* @author:		vivy <zhanghx13855>
* @time:		2015-9-25 16:15:30
* @version:		V1.1.0
* @update:		2016-03-29 添加注释
				2016-06-06 调用addCookie报错的修改
				2016-08-19 zhanghx13855 将cookie路径path指定到根目录
*
*/
var cookie=cookie||{};
cookie.setCookies=function(){
	var _a = flyfish.common.GetQueryString("source");
	if (_a == null || _a == "null" || _a == "") {} else {
		cookie.deleteOld();
		cookie.addCookie("source", flyfish.common.GetQueryString("source"), "120");
		cookie.addCookie("plan", flyfish.common.GetQueryString("plan"), "120");
		cookie.addCookie("type", flyfish.common.GetQueryString("type"), "120");
		cookie.addCookie("name", flyfish.common.GetQueryString("name"), "120");
		cookie.addCookie("reKey", flyfish.common.GetQueryString("key"), "120")
	}
}
cookie.deleteOld=function(){
	cookie.deleteCookie("source");
	cookie.deleteCookie("plan");
	cookie.deleteCookie("type");
	cookie.deleteCookie("name");
	cookie.deleteCookie("reKey");
}
//添加cookie
cookie.addCookie=function(_a, b, cx){
	var d = _a + "=" + escape(b);
	if (cx > 0) {
		var e = new Date();
		e.setTime(e.getTime() + cx * 3600 * 1000 * 24);
		d = d + "; expires=" + e.toGMTString()+";domain=.ihuge.com;path=/";
	}
	document.cookie = d
}
//获取cookie
cookie.getCookie=function(_a){
	var b = document.cookie;
	var cx = b.split(";");
	for (var i = 0; i < cx.length; i++) {
		var d = cx[i].split("=");
		if (flyfish.common.trim(d[0]) == _a) {
			return unescape(d[1])
		}
	}
	return ""
}
//删除cookie
cookie.deleteCookie=function(_a){
	var b = new Date();
	b.setTime(b.getTime() - 10000);
	document.cookie = _a + "=v; expires=" + b.toGMTString()+";domain=.ihuge.com;path=home.ihuge.com"
}
