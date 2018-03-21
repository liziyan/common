/**
* 功能说明:		上传图片不直接上传现在本地图片在网页上
* @author:		vivy <zhanghx13855>
* @time:		2015-12-03至2015-12-04
* @update:		2015-12-23 17:33:30IE8显示div时添加max-width和max-height,且多次上传只显示一个div
* @version:		V1.1.0
*
* @js调用方法:
* $(object).uploadImgs({
*  	isMB:true,//图片大小限制是否为mb，默认是MB
*    imgSize:'2048',//图片限制大小,默认2M
*    file:'图片',//图片或者文件的提示信息
*    imgClass:'Img',//显示图片的img
*    tipCallback:null,//错误提示回调函数,参数obj,bool<错误false或正确true提示>,value<提示信息>
*    afterUpload:null//图片上传后的回调函数，参数src,obj
*    beforeUpload:null//图片上传前的回调函数，参数src,obj
* });
*
*/
(function($) {
    var opt,ele;
    $.fn.uploadImgs=function(config){		
    	ele=this;
		return (new require())._init(config);	
	};
    function require(options) {};
    require.prototype = {
        _init: function(config) {
	    	var id=$(ele).attr("id"),that=this,
		    	x=document.getElementById(id);	    	
	    	$(ele).unbind("change").bind("change",function(){//上传图片
	    		opt=$.extend(require.defaults, config || {});
	    		if(opt.beforeUpload && $.isFunction(opt.beforeUpload)){
					opt.beforeUpload.call(id);
					if(!opt.beforeUpload()) return;
				}	 
	    		that._getImg(x,$("#"+id));				
			});
        },
        _getImg:function(x,obj){
        	var pasts=opt.isMB ? opt.imgSize / 1024 +"M" : opt.imgSize+"kb",that=this;
        	if(!x || !x.value) {//点击了取消之后
        		if(opt.afterUpload && $.isFunction(opt.afterUpload)){
					opt.afterUpload.call(that,false,obj);
				}
        		return;
        	}
        	var user= obj.attr("accept")=="" || !obj.attr("accept") ? "jpg,jpeg,gif,bmp,png" : obj.attr("accept");
        	eval(that._accept(user));     
        	if(patn.test(x.value)){//判断是否是图片	
        		if (x.files && x.files[0])
   			 	{
	   				 var size=Math.ceil(x.files[0].size / 1024);//判断图片大小
	   				
	   				 if(size > opt.imgSize)
	   				 {
	   					var value=opt.file+"大小不能超过"+pasts;
	   					opt.tipCallback && $.isFunction(opt.tipCallback) ? opt.tipCallback.call(that,obj,false,value) : that._tips(obj,false,value);
	   					return;	 
	   				 }		 
	   				 var reader = new FileReader();
	   				 reader.readAsDataURL(x.files[0]);			
	   				 reader.onload = function(evt){
	   					$("."+opt.imgClass).attr("src",evt.target.result).attr("hasImg",true);
	   					if(opt.afterUpload && $.isFunction(opt.afterUpload)){
	   						opt.afterUpload.call(that,value,obj);
	   					}
	   				 } 
	   			 }else{//ie
	   				var img= new Image();	
	   				var _val=that._getPath(x);
	   				img.src=x.value;
	   				var size=Math.ceil(img.fileSize / 1024);		   				
					if(size>opt.imgSize)
					{				
						var value=opt.file+"大小不能超过"+pasts;
	   					opt.tipCallback && $.isFunction(opt.tipCallback) ? opt.tipCallback.call(that,obj,false,value) : that._tips(obj,false,value);
						return; 
					}
					//_val = _val.replace(' ','%20');
					var aa=$('<div class="adddivs" style="filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=scale,src=\''+_val+'\'); WIDTH: '+opt.imgWidth+'px; HEIGHT: '+opt.imgHeight+'px;max-width:100%;max-height:100%"></div>');
					if($("."+opt.imgClass).parent().find(".adddivs").length>0){
						$("."+opt.imgClass).parent().find(".adddivs").remove();
					}
					$("."+opt.imgClass).after(aa);
					$("."+opt.imgClass).hide();
					if(opt.afterUpload && $.isFunction(opt.afterUpload)){
   						opt.afterUpload.call(that,_val,obj);
   					}
	   			 }
        		var value="上传成功";
        		opt.tipCallback && $.isFunction(opt.tipCallback) ? opt.tipCallback.call(that,obj,true,value) : that._tips(obj,true,value);
        	}else{
        		var s="请上传"+user+"格式的"+opt.file;
        		opt.tipCallback && $.isFunction(opt.tipCallback) ? opt.tipCallback.call(that,obj,false,s) : that._tips(obj,false,s);
        	}
        },
        _accept:function(user){
        	var a="var patn = /\\.";
        	for(var i=0;i<user.split(",").length;i++)
    		{
    			if(i==user.split(",").length-1)
    			a += user.split(",")[i];
    			else
    			a += user.split(",")[i]+"|\\.";
    		}
    		a+="$/i;";    		
    		return a;
        },
        _tips:function(obj,bool,value){
        	var tip=obj.parent().next(".error_tips");
        	tip.text(value);	
        	if(bool){tip.addClass("c-blue").removeClass("c-red");}
        	else{tip.addClass("c-red").removeClass("c-blue");}
        },
        _getPath:function(obj){ 
        	if(obj)    
            {    
	            if (window.navigator.userAgent.indexOf("MSIE")>=1){  
            	  obj.select();
            	  window.top.document.body.focus();
            	  var path = document.selection.createRange().text;
	              return path;    
	            }else if(window.navigator.userAgent.indexOf("Firefox")>=1)    
	            {    
	              if(obj.files)  return obj.files.item(0).getAsDataURL();  
	              return obj.value;    
	            }    
	            return obj.value;    
            } 
        }
    };   
    require.defaults = {
    	isMB:true,//图片大小限制是否为mb，默认是MB
    	imgSize:'2048',//图片限制大小,默认2M
    	file:'图片',//图片或者文件的提示信息
    	imgClass:'Img',//显示图片的img
    	tipCallback:null,//错误提示回调函数,参数obj,bool<错误false或正确true提示>,value<提示信息>
    	afterUpload:null,//图片上传后的回调函数，参数src,obj
    	beforeUpload:null,//上传之前的回调函数
    	imgWidth:80,//用于IE8显示图片div的宽度
    	imgHeight:80//用于IE8显示图片div的高度
    };   
})(jQuery);