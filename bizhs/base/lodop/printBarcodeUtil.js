//初始化条码打印机
function createPrinterList(){
	if((typeof(CLODOP)=="undefined")||CLODOP==null||(typeof(CLODOP.VERSION)=="undefined")){
		CheckIsInstall();
	}else{
		 //初始化打印机列表
		 CLODOP.Create_Printer_List(document.getElementById('printMachine'));
		 //初始化打印信息
		 var printSetting=$.cookie('barcode_print_setting');
		 printSetting=jQuery.parseJSON(printSetting);
		 if(printSetting){
			 $("#printMachine").val(printSetting.printMachine);
		 }
	}
};
//保存打印设置的设置信息 如打印机选择,偏移量
function keepPrintSetting(){
	 var printSetting={}; 
	 var printMachine= $("#printMachine").val();//打印机
	 printSetting["printMachine"]=printMachine;
	 var res=JSON.stringify(printSetting);
     $.cookie('barcode_print_setting', res, { expires: 365 }); //默认存储365天
 }

//检查是否已经按安装
function CheckIsInstall() {	 
	try{ 
	    var LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM')); 
		//if ((LODOP!=null)&&(typeof(LODOP.VERSION)!="undefined")) alert("本机已成功安装过Lodop控件!\n  版本号:"+LODOP.VERSION); 
	 }catch(err){ 
		//alert("Error:本机未安装或需要升级!"); 
	 } 
}; 
