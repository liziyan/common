/**
* 功能说明:		进度条
* @author:		vivy <zhanghx13855>
* @time:		2017-01-04
* @version:		V1.1.0
* @js调用方法：
* $.loadingBar({
*   isTitle:true,//有头部提示条
*  	key:"打印",//关键字			
*  	tip:"",//如同打印时下面一行蓝色提示文字内容
*  	content:'',//显示的内容，默认为空，用于内容自定义的拓展
*  	totalTime:0,//一共大概需要多少毫秒
*  	titleCancel:null//点击头部关闭按钮的回调函数
* })
* loadingBar.close()----当业务失败中断关掉滚动条时调用
* loadingBar.ok()-------当业务完成进度条变为100%且关掉关掉条时调用
*
*/
!function ($) {
	"use strict";
	var timer,_n=1;
	var down=function(options){		
		var defaults={
			isTitle:true,
			key:"打印",//关键字
			tip:"",//如同打印时下面一行蓝色提示文字内容
			content:'',//显示的内容，默认为空，用于内容自定义的拓展
			totalTime:0,//一共大概需要多少毫秒
			titleCancel:null//点击头部按钮的回调函数
		}		
		this.options=$.extend({}, defaults, options);
		this.init();
	}
	down.prototype.init=function(){
		var that = this,DOM;
		that.DOM = DOM = that.DOM || that._getDOM();
	}	
	down.prototype._getDOM=function(){
		var that=this;
		var waitTime=that._getTime(that.options.totalTime / 1000);	
		var str='<div class="text-left" style="padding:0 20px;"><p class="c-red f-size20 text-center">正在'+that.options.key+'中，请勿关闭浏览器</p><p class="c-999 f-mt10">请耐心等待，大约需要'+waitTime+'，已等待 <span id="waitTime"></span></p>'+
			'<div style="width:90%;float:left;">'+
			'<div class="bar_bg f-mt10" style="background:#e7ebf3;width:99%;height:12px;padding:1px 0;display:inline-block;overflow:hidden;border-radius:10px;">'+
			'<span class="bar" style="background:#5575b5;width:0%;border-radius:10px;display:inline-block;height:10px;"></span></div>'+
			'</div><span class="f-fl c-blue bar_text" style="margin-top:5px;">1%</span>';
		if(that.options.tip) str+='<div class="col-xs-12 f-mt20 f-mb20 f-pb20 f-weight-bold c-blue">'+that.options.tip+'</div>';
		str+='</div>';
		var con=that.options.content||str;
		$(".m-dialog,.m-sPopBg",top.document).remove();		
		$.artDialog({
			isTitle:that.options.isTitle,
			title:that.options.key+"提示",
			isOkBtn:false,
			width:550,
			isCloseBtn:false,
			content:con,
			titleCancel : function(){
				flyfish.common.timeChageClear();
				if (that.options.titleCancel && $.isFunction(that.options.titleCancel)) {
					that.options.titleCancel();
				}
			}
		});	
		that._timeChange();
	}
	down.prototype._getTime=function(value){//秒转换为时分秒
		var theTime = value;// 秒 
		var theTime1 = 0;// 分 
		var theTime2 = 0;// 小时 
		if(theTime > 59) { 
			theTime1 = parseInt(theTime/60); 
			theTime = parseInt(theTime%60); 
			if(theTime1 > 59) { 
				theTime2 = parseInt(theTime1/60); 
				theTime1 = parseInt(theTime1%60); 
			} 
		}
		var result =""+theTime+"秒";
		if(theTime1 > 0){
			var s=theTime==0?"":theTime+"秒"
			result = ""+parseInt(theTime1)+"分"+s; 
		}
		if(theTime2 > 0) result = ""+parseInt(theTime2)+"小时"+result; 
		return result; 
	}
	down.prototype._timeChange=function(){
		//因为弹出弹出层的时候，计数器，后台程序已经进行了一秒钟的操作，所以这里需要将n重新赋值1秒钟的进度
		_n=parseInt(1000*100 / this.options.totalTime);
        if(_n>90) _n=89;//如果初始化进度大于90需要重新赋值90，避免进度条超过100%
		//进度条的变化
		timer=setInterval(function(){			
			_n++;
			if(_n>89) clearInterval(timer);
			$(".bar_text",top.document).text(_n+"%");
			$(".bar",top.document).css("width",_n+"%");
		},this.options.totalTime/100);
		//已经等待多久的计数器
		flyfish.common.timeChange({//记数器
			startTime:0,
			endTime:null,			
			ing:function(c){
				var str="";
				if(c<60) str=c+" 秒";
				else if(c>=60 && c<3600) str=parseInt(c/60)+" 分"+c%60+" 秒";
				$("#waitTime",window.top.document).text(str);				
			}
		});		
	}
	window.loadingBar = function(options){
		return new down(options);
	}	
	$.loadingBar = window.loadingBar;	
	loadingBar.close=function(){//关闭滚动条
		flyfish.common.timeChageClear();
		clearInterval(timer);
		_n=1;
		$(".m-sPopBg,.m-dialog",top.document).remove();
	}
	loadingBar.ok=function(){//滚动条完成
		flyfish.common.timeChageClear();
		clearInterval(timer);
		_n=1;
		$(".bar_text",top.document).text("100%");
		$(".bar",top.document).css("width","100%");
	}
}(jQuery);