var itemVals,propVals,fontVals;
var gdsData,type,printFlag,top_py,left_py,span_width_py,span_height_py,rows,columns;
//打印条码
function toPrint(srcData,codeType,flag,isPreview) {
	gdsData=srcData;
	type = codeType;
	printFlag = flag;
	propVals= $("#propVals").val();
	var props = propVals.split(";");
	rows = props[2].split(",")[1];//打印设置 left平移步数
	columns = props[3].split(",")[1];//打印设置 top下平移步数
	top_py = props[5].split(",")[1];//打印设置 top平移步距
	left_py = props[4].split(",")[1];//打印设置 top下平移步距
	span_width_py = props[6].split(",")[1];//打印设置 top标签宽平移步距
	span_height_py = props[7].split(",")[1];//打印设置 top标签高下平移步距
	if(parseInt(rows)>1 || parseInt(columns)>1){
		printMultiModel();
	}else{
		printModel();	
	}
	if(isPreview){
		CLODOP.PREVIEW();//预览	
	}else{
		CLODOP.PRINT();//直接打印
	}
};

function printModel(){
	CLODOP.PRINT_INIT("条码打印任务"+new Date().getTime());
	var printName=$("#printMachine").val();
	if (printName!=null&&printName != '') {
        CLODOP.SET_PRINTER_INDEX(printName); //设置选择后的打印机     
    }
	var pageWidth='',pageHeight='',codeWidth='',codeHeight='';
	var isBarCode = false;//是否条形码打印
	//var fontname = 'simsun';
    //var fontsize = 7;
	//var fontbold=0;	//加粗显示 1加粗,0正常显示
    //CLODOP.SET_PRINT_STYLE("FontSize", fontsize);
    //CLODOP.SET_PRINT_STYLE("Bold", fontbold);	//加粗显示 1加粗,0正常显示
	
    itemVals= $("#itemVals").val();
    propVals= $("#propVals").val();
    fontVals= $("#fontVals").val();
    if (itemVals&&itemVals != '') {
    	  var arrVal = itemVals.split(";");//元素坐标属性
          var arrVal1 = propVals.split(";");//纸张标签页面宽高属性
          var arrVal2 = fontVals.split(";");//字体属性
    	
          //var fontName1 = fontname;
          //var fontSize1 = fontsize;
          //var fontBold1 = fontbold;
          //var strFontName = "宋体";
          //组装打印数据
          for (var i = 0; i < arrVal.length; i++) {
              var temp = arrVal[i].split(",");
              var temp2 = arrVal2[i].split(",");
              var id = temp[0];//显示值
              if (id==null||id == "") {
                  continue;
              }
              if("barCode" == id){
            	  isBarCode = true;
            	  //打印标准条码
            	  if("0" == printFlag){
            		  if(chkEmpty(gdsData["gdsNormPact"])){
            			  id="gdsPact";
            		  }else{
            			  id="gdsNormPact";
            		  }
            	  }else{
            		//打印自定义条码
	        		  if(chkEmpty(gdsData["gdsPact"])){
	        			  id="gdsNormPact";
	        		  }else{
	        			  id="gdsPact";
	        		  }
            	  }
              }else{
            	  isBarCode = false;
              }
              var show = temp[1];//是否显示
              var left = temp[2];//左边距离
              var top = temp[3];//上距离
              var width = temp[4];//宽
              var height = temp[5];//高
              var val = gdsData[id];//显示值
              if(id=="spmc") val="名称：";
              if(id=="spfl") val="分类：";
              if(id=="hh") val="货号：";
              if(id=="spjc") val="简称：";
              if(id=="dj") val="单价：";
              if(id=="gg") val="规格：";
              if(id=="spbm") val="商品编码：";
              if(id=="ggdm") val="规格代码：";
              if(id=="prozdy1") val=temp[6];
              if(id=="prozdy2") val=temp[6];
              if(id=="prozdy3") val=temp[6];
              val=replaceTag(val);//替换换行
              if(chkEmpty(val)){val=""};
              if(i<=9){
        		  var temp1 = arrVal1[i].split(",");
                  if("pageWidth"==temp1[0]) pageWidth=temp1[1];
                  if("pageHeight"==temp1[0]) pageHeight=temp1[1];
                  //if("rows"==temp1[0]) rows=temp1[1];
                  //if("column"==temp1[0]) column=temp1[1];
                  //if("rowsWidth"==temp1[0]) rowsWidth=temp1[1];
                  //if("columnWidth"==temp1[0]) columnWidth=temp1[1];
                  //if("spanWidth"==temp1[0]) spanWidth=temp1[1];
                  //if("spanHeight"==temp1[0]) spanHeight=temp1[1];
                  if("codeWidth"==temp1[0]) codeWidth=temp1[1];
                  if("codeHeight"==temp1[0]) codeHeight=temp1[1]; 
        	  }
              if (show == 1) {
                  //left = countNum(parseInt(left), parseInt(x_px), x_tag);
                  //top = countNum(parseInt(top), parseInt(y_px), y_tag);
                  if(isBarCode){
              		CLODOP.ADD_PRINT_BARCODE(getHalfPxNum(top), getHalfPxNum(left), getPxNum(codeWidth), getPxNum(codeHeight),type,val);
                    //CLODOP.SET_PRINT_STYLEA(0, "FontSize", fontSize1);
                  }else{
                	CLODOP.ADD_PRINT_TEXT(getHalfPxNum(top), getHalfPxNum(left), getHalfPxNum(width), getHalfPxNum(height),val);
            	    CLODOP.SET_PRINT_STYLEA(0, "FontName", temp2[1]);
                    CLODOP.SET_PRINT_STYLEA(0, "FontSize", temp2[2]);
                    CLODOP.SET_PRINT_STYLEA(0, "Bold", temp2[3]);
                  }
              }
          }
    }
    CLODOP.SET_PRINT_PAGESIZE(1, parseInt(span_width_py)*10, parseInt(span_height_py)*10, '');
    CLODOP.SET_PRINT_COPIES(parseInt($(gdsData["printNum"]).attr("data-val")));
    //CLODOP.PREVIEW();//预览	
};
//排打
function printMultiModel(){

	CLODOP.PRINT_INIT("条码打印任务"+new Date().getTime());
	var printName=$("#printMachine").val();
	if (printName!=null&&printName != '') {
        CLODOP.SET_PRINTER_INDEX(printName); //设置选择后的打印机     
    }
	var pageWidth='',pageHeight='',codeWidth='',codeHeight='';
	var isBarCode = false;//是否条形码打印
	//var fontname = 'simsun';
    //var fontsize = 5;
	//var fontbold=0;	//加粗显示 1加粗,0正常显示
    //CLODOP.SET_PRINT_STYLE("FontSize", fontsize);
    //CLODOP.SET_PRINT_STYLE("Bold", fontbold);	//加粗显示 1加粗,0正常显示
	
    itemVals= $("#itemVals").val();
    propVals= $("#propVals").val();
    fontVals= $("#fontVals").val();
    if (itemVals&&itemVals != '') {
    	  var arrVal = itemVals.split(";");//input坐标属性
          var arrVal1 = propVals.split(";");//宽高属性
          var arrVal2 = fontVals.split(";");//字体属性
    	
          //var fontName1 = fontname;
          //var fontSize1 = fontsize;
          //var fontBold1 = fontbold;
          //var strFontName = "宋体";
          //组装打印数据
          for (var i = 0; i < arrVal.length; i++) {
              var temp = arrVal[i].split(",");
              var temp2 = arrVal2[i].split(",");
              var id = temp[0];//显示值
              if (id==null||id == "") {
                  continue;
              }
              if("barCode" == id){
            	  isBarCode = true;
            	  //打印标准条码
            	  if("0" == printFlag){
            		  if(chkEmpty(gdsData["gdsNormPact"])){
            			  id="gdsPact";
            		  }else{
            			  id="gdsNormPact";
            		  }
            	  }else{
            		//打印自定义条码
	        		  if(chkEmpty(gdsData["gdsPact"])){
	        			  id="gdsNormPact";
	        		  }else{
	        			  id="gdsPact";
	        		  }
            	  }
              }else{
            	  isBarCode = false;
              }
              var show = temp[1];//是否显示
              var left = temp[2];//左边距离
              var top = temp[3];//上距离
              var width = temp[4];//宽
              var height = temp[5];//高
              var val = gdsData[id];//显示值
              if(id=="spmc") val="名称：";
              if(id=="spfl") val="分类：";
              if(id=="hh") val="货号：";
              if(id=="spjc") val="简称：";
              if(id=="dj") val="单价：";
              if(id=="gg") val="规格：";
              if(id=="spbm") val="商品编码：";
              if(id=="ggdm") val="规格代码：";
              if(id=="prozdy1") val=temp[6];
              if(id=="prozdy2") val=temp[6];
              if(id=="prozdy3") val=temp[6];
              val=replaceTag(val);//替换换行
              if(chkEmpty(val)){val=""};
              if(i<=9){
        		  var temp1 = arrVal1[i].split(",");
                  if("pageWidth"==temp1[0]) pageWidth=temp1[1];
                  if("pageHeight"==temp1[0]) pageHeight=temp1[1];
                  //if("rows"==temp1[0]) rows=temp1[1];
                  //if("column"==temp1[0]) column=temp1[1];
                  //if("rowsWidth"==temp1[0]) rowsWidth=temp1[1];
                  //if("columnWidth"==temp1[0]) columnWidth=temp1[1];
                  if("spanWidth"==temp1[0]) spanWidth=temp1[1];
                  if("spanHeight"==temp1[0]) spanHeight=temp1[1];
                  if("codeWidth"==temp1[0]) codeWidth=temp1[1];
                  if("codeHeight"==temp1[0]) codeHeight=temp1[1]; 
        	  }
              if (show == 1) {
            	  for(var j=0;j<parseInt(rows);j++){
            		  for(var k=0;k<parseInt(columns);k++){
            			  if(isBarCode){
                        	  CLODOP.ADD_PRINT_BARCODE(getHalfPxNum(top)+j*getPxNum(top_py)+j*getPxNum(span_height_py), getHalfPxNum(left)+k*getPxNum(left_py)+k*getPxNum(span_width_py), getPxNum(codeWidth), getPxNum(codeHeight),type,val);
                              //CLODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
                            }else{
                          	  CLODOP.ADD_PRINT_TEXT(getHalfPxNum(top)+j*getPxNum(top_py)+j*getPxNum(span_height_py), getHalfPxNum(left)+k*getPxNum(left_py)+k*getPxNum(span_width_py), getHalfPxNum(width), getHalfPxNum(height),val);
                      	      CLODOP.SET_PRINT_STYLEA(0, "FontName", temp2[1]);
                              CLODOP.SET_PRINT_STYLEA(0, "FontSize", temp2[2]);
                              CLODOP.SET_PRINT_STYLEA(0, "Bold", temp2[3]);
                            }
            		  }
            	  }
                  
              }
          }
    }
    CLODOP.SET_PRINT_PAGESIZE(1, parseInt(spanWidth)*10*parseInt(columns), parseInt(spanHeight)*10*parseInt(rows), '');
    CLODOP.SET_PRINT_COPIES(parseInt($(gdsData["printNum"]).attr("data-val")));
    //CLODOP.SET_PRINT_COPIES(Math.floor(parseInt(columns)*parseInt(rows)/(parseInt($(gdsData["printNum"]).attr("data-val")))));
    //CLODOP.PREVIEW();//预览	

}
//mm换算px
function getPxNum(val)
{
    var mmnum = val;
    var num = 25.4;
    var dpi = js_getDPI();//window.screen.deviceXDPI;
    var px = Math.floor((mmnum / num) * dpi);
    return px;
}
//px/2向下取整
function getHalfPxNum(val)
{
    var px = Math.floor(val/2);
    return px;
}
function js_getDPI() {return 96;}
//批量替换br标签
function replaceTag(src) {
    if (!src) {
        return src;
    }
    if (src == null || src == "") {
        return src;
    }
    src = "" + src;
    if (src.indexOf("<BR>") != -1) {
        var reg = new RegExp("<BR>", "gm");
        var stt = src.replace(reg, "\n");
        return stt;
    }
    if (src.indexOf("<br>") != -1) {
        var reg = new RegExp("<br>", "gm");
        var stt = src.replace(reg, "\n");
        return stt;
    }
    if (src.indexOf("<BR/>") != -1) {
        var reg = new RegExp("<BR/>", "gm");
        var stt = src.replace(reg, "\n");
        return stt;
    }
    if (src.indexOf("<br/>") != -1) {
        var reg = new RegExp("<br/>", "gm");
        var stt = src.replace(reg, "\n");
        return stt;
    }
    return src;
}
//检验空值
function chkEmpty(str){
	if(typeof(str) == "undefined"||str===null||$.trim(str)==''||str=='undefined'||str=='null'){
		return true;
	}else{
		return false;
	}
};