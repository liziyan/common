//初始化打印机
/**
 * @type 打印类型 1 为电子面单 其他为普通物流单
 */
function createPrinterList(type){
	if((typeof(CLODOP)=="undefined")||CLODOP==null||(typeof(CLODOP.VERSION)=="undefined")){
		CheckIsInstall();
	}else{
		 //初始化打印机列表
		 CLODOP.Create_Printer_List(document.getElementById('printMachine'));
		 //初始化打印信息
		 var printSetting;
		 if("1"==type){
			 printSetting=$.cookie('elc_print_setting');
		 }else{
			 printSetting=$.cookie('normal_print_setting');
		 }
		 printSetting=jQuery.parseJSON(printSetting);
		 if(printSetting){
			 $("#printMachine").val(printSetting.printMachine);
			 if(printSetting.printImg == "checked"){
				 $("#printImg").attr("checked" , printSetting.printImg);
			 }
			 if("+"==printSetting.p_x){
				 $("input[name=p_x][value='+']").attr("checked",true);
			 }else{
				 $("input[name=p_x][value='-']").attr("checked",true);
			 }
			 $("#x_mm").val(printSetting.p_x_mm);
			 if("+"==printSetting.p_y){
				 $("input[name=p_y][value='+']").attr("checked",true);
			 }else{
				 $("input[name=p_y][value='-']").attr("checked",true);
			 }
			 $("#y_mm").val(printSetting.p_y_mm);
			 
		 }
	}
};
//保存打印设置的设置信息 如打印机选择,偏移量
/**
 * @type 打印类型 1 为电子面单 其他为普通物流单
 */
function keepPrintSetting(type){
	 var printSetting={}; 
	 var printMachine= $("#printMachine").val();//打印机
	 var p_x=$("input[name=p_x]:checked").val();//x轴是+/-
	 var p_x_mm=$("#x_mm").val();//x轴偏移量
	 var p_y=$("input[name=p_y]:checked").val();//y轴是+/-
	 var p_y_mm=$("#y_mm").val();//y轴偏移量
	 var printImg=$("#printImg").attr("checked");//是否打印背景图片
	 printSetting["printMachine"]=printMachine;
	 printSetting["p_x"]=p_x;
	 printSetting["p_x_mm"]=p_x_mm;
	 printSetting["p_y"]=p_y;
	 printSetting["p_y_mm"]=p_y_mm;
	 printSetting["printImg"]=printImg;

	 var res=JSON.stringify(printSetting);
	 if("1"==type){
		 $.cookie('elc_print_setting', res, { expires: 365 }); //默认存储365天
	 }else{
		 $.cookie('normal_print_setting', res, { expires: 365 }); //默认存储365天
	 }
 }

//检查是否已经按安装
function CheckIsInstall() {	 
	try{ 
	    var LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM')); 
	    return LODOP;
		//if ((LODOP!=null)&&(typeof(LODOP.VERSION)!="undefined")) alert("本机已成功安装过Lodop控件!\n  版本号:"+LODOP.VERSION); 
	 }catch(err){ 
		//alert("Error:本机未安装或需要升级!"); 
	 } 
}; 


//替换特殊标签
function replaceTag(src) {
    if (!src) {
        return src;
    }
    if (src == null || src == "") {
        return src;
    }
    src = "" + src;
    if (src.indexOf("<BR>") != -1) {
        var reg = new RegExp("<BR>", "g");
        var stt = src.replace(reg, "\n");
        return stt;
    }

    if (src.indexOf("<br>") != -1) {
        var reg = new RegExp("<br>", "g");
        var stt = src.replace(reg, "\n");
        return stt;
    }if (src.indexOf("<BR/>") != -1) {
		var reg = new RegExp("<BR/>", "gm");
		var stt = src.replace(reg, "\n");
		return stt;
	}
	if (src.indexOf("<br/>") != -1) {
		var reg = new RegExp("<br/>", "gm");
		var stt = src.replace(reg, "\n");
		return stt;
	} else {
        return src;
    }
}