/**
* 功能说明:		上传图片使用Canvas压缩及预览----只支持支持canvas的浏览器
* @author:		vivy <lizhiziyan@qq.com>
* @time:		2016-08-29 17:23:30
* @version:		V1.1.0
* 
* @js调用方法[预览]：
* html:<canvas id="mycanvas" width="50" height="50"></canvas> width/height指压缩后的宽高，必填。
* $("#file").uploadImgs({
* 	viewId:"mycanvas",预览的canvas的ID
* 	allowLack:true,//允许图片失真,默认不允许
* 	tipCallback:function(obj,bool,value){},//返回提示,参数obj,bool<错误false或正确true提示>,value<提示信息>
* 	afterUpload:function(src,obj){},//选择之后，返回src<压缩后的base64>，obj
* 	beforeUpload:function(){}//选择图片之前的回调函数
* })
* 
* @js调用方法[不预览，直接上传]：
* $("#file").uploadImgs({
* 	allowLack:true,//允许图片失真,默认不允许
* 	width:50,//压缩后的宽度，必填
* 	height:50,//压缩后的高度，必填
* 	tipCallback:function(obj,bool,value){},//返回提示,参数obj,bool<错误false或正确true提示>,value<提示信息>
* 	afterUpload:function(src,obj){},//选择之后，返回src<压缩后的base64>，obj
* 	beforeUpload:function(){}//选择图片之前的回调函数
* })
*
*/
(function($) {   
    $.fn.uploadImgs=function(options){		
    	var ele=this;
		var defaults = {
			viewId:null,//预览的canvas的ID，宽度和高度必填
			allowLack:false,//允许放大图片失真		
			width:50,//压缩后的宽度，不预览时必填
			height:50,//压缩后的宽度,不预览时必填
			tipCallback:null,//错误提示回调函数,参数obj,bool<错误false或正确true提示>,value<提示信息>
			afterUpload:null,//图片上传后的回调函数，参数src,obj
			beforeUpload:null//上传之前的回调函数
		};
		var opt = $.extend(defaults, options);
		return this.each(function () {
			var id=$(ele).attr("id"),that=this,x=document.getElementById(id);
			$(ele).unbind("change").bind("change",function(){//上传图片	    		
	    		if(opt.beforeUpload && $.isFunction(opt.beforeUpload)){
					opt.beforeUpload.call(id);					
					if(!opt.beforeUpload()) return;
				}	 
	    		_getImg(x,$("#"+id));				
			});
		});
		function _getImg(x,obj){
			var that=this;
			if(!x || !x.value) {//点击了取消之后
        		if(opt.afterUpload && $.isFunction(opt.afterUpload)){
					opt.afterUpload.call(that,false,obj);
				}
        		return;
        	}
			eval(_accept("jpg,jpeg,gif,bmp,png"));
			if(patn.test(x.value)){//判断是否是图片
				if (x.files && x.files[0])//非IE浏览器
   			 	{	 
	   				 var reader = new FileReader();
	   				 reader.readAsDataURL(x.files[0]);			
	   				 reader.onload = function(evt){
						 _canvas(evt.target.result,obj);
					} 
	   			 }
			}else{
        		var s="请上传jpg,jpeg,gif,bmp,png格式的图片";
        		_tips(obj,false,s);
        	}
		}
		function _canvas(url,obj){			
			if(opt.viewId){//如果预览图片
				var s='<img src="'+url+'" id="uploadImgs_img" style="display:none" />';
				$('body').append(s);
				var _w=$("#"+opt.viewId).width(),
					_h=$("#"+opt.viewId).height(),
					c=document.getElementById(opt.viewId),
					ctx=c.getContext("2d"),
					img=document.getElementById("uploadImgs_img");
				if(img.width<_w){
					_tips(obj,false,"图片宽度小于压缩宽度，继续压缩会导致图片失真，请慎重选择。");
					if(!opt.allowLack) return $("#uploadImgs_img").remove();
				}else if(img.height<_h){
					_tips(obj,false,"图片高度小于压缩高度，继续压缩会导致图片失真，请慎重选择。");
					if(!opt.allowLack) return $("#uploadImgs_img").remove();
				}else if(img.width / img.height != _w / _h){
					_tips(obj,false,"压缩后的图片比例不等于原图片，继续压缩会导致图片失真，请慎重选择。");
					if(!opt.allowLack) return $("#uploadImgs_img").remove();
				}	
				ctx.drawImage(img,0,0,_w,_h);
				if(opt.afterUpload && $.isFunction(opt.afterUpload)){//返回生成后的base64
					opt.afterUpload.call(this,c.toDataURL(),obj);
				}
				$("#uploadImgs_img").remove();								
			}else{							
				//在页面上新增img和canvas存放
				var s='<img src="'+url+'" id="uploadImgs_img" style="display:none" /><canvas id="uploadImgs_canvas" width="'+opt.width+'" height="'+opt.height+'" style="display:none"></canvas>';
				$('body').append(s);					
				var c=document.getElementById("uploadImgs_canvas"),
					ctx=c.getContext("2d"),
					img=document.getElementById("uploadImgs_img");
				if(img.width<opt.width){
					_tips(obj,false,"图片宽度小于压缩宽度，继续压缩会导致图片失真，请慎重选择。");
					if(!opt.allowLack) return $("#uploadImgs_img,#uploadImgs_canvas").remove();
				}else if(img.height<opt.height){
					_tips(obj,false,"图片高度小于压缩高度，继续压缩会导致图片失真，请慎重选择。");
					if(!opt.allowLack) return $("#uploadImgs_img,#uploadImgs_canvas").remove();
				}else if(img.width / img.height != opt.width / opt.height){
					_tips(obj,false,"压缩后的图片比例不等于原图片，继续压缩会导致图片失真，请慎重选择。");
					if(!opt.allowLack) return $("#uploadImgs_img,#uploadImgs_canvas").remove();
				}					
				ctx.drawImage(img,0,0,opt.width,opt.height);//将图片放到画布中			
				if(opt.afterUpload && $.isFunction(opt.afterUpload)){//返回生成后的base64
					opt.afterUpload.call(this,c.toDataURL(),obj);
				}
				$("#uploadImgs_img,#uploadImgs_canvas").remove();
			}
		}
		function _tips(obj,bool,s){
			opt.tipCallback && $.isFunction(opt.tipCallback) ? opt.tipCallback.call(this,obj,bool,s) : alert(s);	
		}
		function _accept(user){
			var _a="var patn = /\\.";
        	for(var i=0;i<user.split(",").length;i++)
    		{
    			if(i==user.split(",").length-1)
    			_a += user.split(",")[i];
    			else
    			_a += user.split(",")[i]+"|\\.";
    		}
    		_a+="$/i;";    		
    		return _a;
		}
	};
})(jQuery);