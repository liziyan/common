var CreatedOKLodop7766=null;

//====判断是否需要安装CLodop云打印服务器:====
function needCLodop(){
	return true;//默认全部走c-lodop
    try{
	var ua=navigator.userAgent;
	if (ua.match(/Windows\sPhone/i) !=null) return true;
	if (ua.match(/iPhone|iPod/i) != null) return true;
	if (ua.match(/Android/i) != null) return true;
	if (ua.match(/Edge\D?\d+/i) != null) return true;
	if (ua.match(/QQBrowser/i) != null) return false;
	var verTrident=ua.match(/Trident\D?\d+/i);
	var verIE=ua.match(/MSIE\D?\d+/i);
	var verOPR=ua.match(/OPR\D?\d+/i);
	var verFF=ua.match(/Firefox\D?\d+/i);
	var x64=ua.match(/x64/i);
	if ((verTrident==null)&&(verIE==null)&&(x64!==null)) 
		return true; else
	if ( verFF !== null) {
		verFF = verFF[0].match(/\d+/);
		if ( verFF[0] >= 42 ) return true;
	} else 
	if ( verOPR !== null) {
		verOPR = verOPR[0].match(/\d+/);
		if ( verOPR[0] >= 32 ) return true;
	} else 
	if ((verTrident==null)&&(verIE==null)) {
		var verChrome=ua.match(/Chrome\D?\d+/i);		
		if ( verChrome !== null ) {
			verChrome = verChrome[0].match(/\d+/);
			if (verChrome[0]>=42) return true;
		};
	};
        return false;
    } catch(err) {return true;};
};
//====页面引用CLodop云打印必须的JS文件：====
/*if (needCLodop()) {
	var isIE = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
    //让其它电脑的浏览器通过本机打印（适用例子）：
    oscript = document.createElement("script");
    if(isIE){
    	 oscript.onreadystatechange = initPrintMachine;
    }else{
        oscript.onload =initPrintMachine;
    }
    oscript.src ="http://192.168.119.29:8000/CLodopfuncs.js";
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    head.insertBefore( oscript,head.firstChild );
    //让本机浏览器打印(更优先)：
    var oscript = document.createElement("script");
    if(isIE){
   	 	oscript.onreadystatechange = initPrintMachine;
    }else{
        oscript.onload =initPrintMachine;
    }
    oscript.src ="http://localhost:8000/CLodopfuncs.js?priority=1";
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    head.insertBefore( oscript,head.firstChild );
};*/

//====获取LODOP对象的主过程：====
function getLodop(oOBJECT,oEMBED){
    var strHtmInstall="<font class='c-red b-se3 f-r3 f-size12 f-ml10 bgf' style='padding: 8px 10px;margin:10px;'>未安装打印控件，点击执行安装<a href='"+flyfish.bathPath+"/install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    var strHtmUpdate="<font class='c-red b-se3 f-r3 f-size12 f-ml10 bgf' style='padding: 8px 10px;margin:10px;'>未安装打印控件，点击执行安装<a href='"+flyfish.bathPath+"/install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    var strHtm64_Install="<font class='c-red b-se3 f-r3 f-size12 f-ml10 bgf' style='padding: 8px 10px;margin:10px;'>未安装打印控件，点击执行安装<a href='"+flyfish.bathPath+"/install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    var strHtm64_Update="<font class='c-red b-se3 f-r3 f-size12 f-ml10 bgf' style='padding: 8px 10px;margin:10px;'>未安装打印控件，点击执行安装<a href='"+flyfish.bathPath+"/install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    var strHtmFireFox="<font class='c-red b-se3 f-r3 f-size12 f-ml10 bgf' style='padding: 8px 10px;margin:10px;'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
    var strHtmChrome="<font class='c-red b-se3 f-r3 f-size12 f-ml10 bgf' style='padding: 8px 10px;margin:10px;'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
    var strCLodopInstall="<font class='c-red b-se3 f-r3 f-size12 f-ml10 bgf abc' style='padding: 8px 10px;margin:10px;'>未安装打印控件，点击执行安装<a href='"+flyfish.bathPath+"/CLodopPrint_Setup_for_Win32NT.exe' target='_self'>执行安装</a>,安装后请刷新页面。</font>";
    var strCLodopUpdate="<font class='c-red b-se3 f-r3 f-size12 f-ml10 bgf' style='padding: 8px 10px;margin:10px;'>CLodop云打印服务需升级!点击这里<a href='"+flyfish.bathPath+"/CLodopPrint_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font>";
    var LODOP;
    try{
        var isIE = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
        if (needCLodop()) {
            try{ LODOP=getCLodop();} catch(err) {};
	   // if (!LODOP && document.readyState!=="complete") {alert("C-Lodop没准备好，请稍后再试！"); return;};
            if (!LODOP) {
		 if (isIE) document.write(strCLodopInstall); else
		 document.documentElement.innerHTML=strCLodopInstall+document.documentElement.innerHTML;
                 return;
            } else {

	         if (CLODOP.CVERSION<"2.0.4.0") { 
			if (isIE) document.write(strCLodopUpdate); else
			document.documentElement.innerHTML=strCLodopUpdate+document.documentElement.innerHTML;
		 };
		 if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
		 if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);	
	    };
        } else {
            var is64IE  = isIE && (navigator.userAgent.indexOf('x64')>=0);
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT!=undefined || oEMBED!=undefined) {
                if (isIE) LODOP=oOBJECT; else  LODOP=oEMBED;
            } else if (CreatedOKLodop7766==null){
                LODOP=document.createElement("object");
                LODOP.setAttribute("width",0);
                LODOP.setAttribute("height",0);
                LODOP.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE) LODOP.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else LODOP.setAttribute("type","application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766=LODOP;
             } else LODOP=CreatedOKLodop7766;
            //=====Lodop插件未安装时提示下载地址:==========
            if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
                 if (navigator.userAgent.indexOf('Chrome')>=0)
                     document.documentElement.innerHTML=strHtmChrome+document.documentElement.innerHTML;
                 if (navigator.userAgent.indexOf('Firefox')>=0)
                     document.documentElement.innerHTML=strHtmFireFox+document.documentElement.innerHTML;
                 if (is64IE) document.write(strHtm64_Install); else
                 if (isIE)   document.write(strHtmInstall);    else
                     document.documentElement.innerHTML=strHtmInstall+document.documentElement.innerHTML;
                 return LODOP;
            };
        };
        if (LODOP.VERSION<"6.2.0.3") {
            if (needCLodop())
            document.documentElement.innerHTML=strCLodopUpdate+document.documentElement.innerHTML; else
            if (is64IE) document.write(strHtm64_Update); else
            if (isIE) document.write(strHtmUpdate); else
            document.documentElement.innerHTML=strHtmUpdate+document.documentElement.innerHTML;
            return LODOP;
        };
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
		 LODOP.SET_LICENSES("恒生电子股份有限公司","83420CB7AB0D661978D8D05CE036EE47","恒生電子股份有限公司","874320063B3CDFDA3958BAEBFBDD1F01");
	     LODOP.SET_LICENSES("THIRD LICENSE","","The Hang Seng electronic Limited by Share Ltd","DE03BB4DFEDCD52C434BC881DEAFBC73");
		
        //===========================================================
        return LODOP;
    } catch(err) {alert("getLodop出错:"+err);};
};

function initPrintMachine(id){
	id=id||"printMachine";
	var printMachine= document.getElementById(id);
	if(printMachine){
		CLODOP.Create_Printer_List(printMachine);
	}
}