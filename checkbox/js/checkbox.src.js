/**
* 功能说明:		复选框/单选框的全选反选以及文字点击控制的插件
* @author:		vivy <lizhiziyan@qq.com>
* @time:		2016-08-22 11:15:30
* @version:		V1.1.0
* @js调用方法[复选框]：
* $("#id").selectCheck({
* 	parentSelect:"p",//支持文字也选中的标签，例子中时P标签，根据具体情况换成li,div等。不需要要控制时设为null
* 	allId: 'checkAll',//全选反选input的ID,如果不需要全选反选，则设置为nul
* 	toggleClass: 'check_span--checked',//改变的样式名，针对例子中的复选框样式美化
* 	checkCallBack:function(obj,bool){}//选择之后回调函数,返回obj的是否选中
* })
* @js调用方法[单选框]：
* $("#id").selectRadio({
* 	parentSelect:"p",//支持文字也选中的标签，例子中时P标签，根据具体情况换成li,div等。不需要要控制时设为null
* 	toggleClass: 'radio_span--checked'//改变的样式名，针对例子中的复选框样式美化
* })
*
*/
(function ($) {
    $.fn.extend({        
        selectCheck: function (options) {          
            var defaults = {
				parentSelect:"p",//支持文字也选中
                allId: 'checkAll',//全选反选input的ID,如果不需要全选反选，则设置为null
				toggleClass: 'check_span--checked',//改变的样式名
				checkCallBack:function(obj,bool){}//选择之后回调函数,返回obj的是否选中
            };
			var options = $.extend(defaults, options);
			//全选反选的方法
			function checkAll(getcheckbox,check,bool,obj){
				var o = options;
				var call=$("#"+o.allId);//全选的obj
				if(o.checkCallBack && $.isFunction(o.checkCallBack)){//勾选的回调函数
					o.checkCallBack.call(this,obj,bool);
				}
				if(check.attr("id")==o.allId){//全选按钮
					if(bool){//如果全选	
						getcheckbox.prop("checked",true);//勾选框全部选中
						getcheckbox.parent().addClass(o.toggleClass);//添加选中的样式
						check.prop("checked",true);	//全选勾选框选中		
					}else{//全不选
						getcheckbox.removeAttr("checked");//勾选框全部取消选中
						getcheckbox.parent().removeClass(o.toggleClass);//去掉选中的样式
						check.removeAttr("checked");//全选勾选框取消选中
					}			
				}else{
					if(!bool){//取消选中
						check.removeAttr("checked");//当前勾选框取消选中
						check.parent().removeClass(o.toggleClass);//当前勾选框去掉选中样式
						call.parent().removeClass(o.toggleClass);//全选勾选框去掉选中样式
						call.removeAttr("checked");	//全选勾选框取消选中
					}else{//选中
						check.prop("checked",true);//当前勾选框选中
						check.parent().addClass(o.toggleClass);//当前勾选框添加选中样式
						for(var i=0;i<getcheckbox.length;i++){//如果有没有选中的勾选框则跳出方法
							if(getcheckbox[i].checked == false && getcheckbox[i].id!=o.allId) return; 
						}
						call.parent().addClass(o.toggleClass);//全选勾选框添加选中样式
						call.prop("checked",true);//全选勾选框选中
					}				
				}				
			}			
            return this.each(function () {
                var o = options;
                var obj = $(this);
				var that=this;
				var getcheckbox = $('input:checkbox',obj);
				if(o.parentSelect){//点击文字也可以勾选中
					getcheckbox.parents(o.parentSelect).click(function(e){
						if(o.allId){//有全选反选
							var chs=$(this).find("input:checkbox");//找到此栏勾选框		
							if($(e.target).attr("type")=="checkbox") checkAll(getcheckbox,$(e.target),e.target.checked,obj);//如果点击的是勾选框
							else checkAll(getcheckbox,chs,!chs.is(":checked"),obj);//如果点击的是文字
						}else{//只有勾选框
							if($(e.target).attr("type")=="checkbox"){
								$(e.target).parent().toggleClass(o.toggleClass);//添加/删除选中样式
								if(o.checkCallBack && $.isFunction(o.checkCallBack)){//点击的回调函数
									o.checkCallBack.call(that,obj,e.target.checked);
								}
							}
							else{
								$('input:checkbox',$(this)).parent().toggleClass(o.toggleClass);//添加/删除选中样式
								if(o.checkCallBack && $.isFunction(o.checkCallBack)){//点击的回调函数
									o.checkCallBack.call(that,obj,$('input:checkbox',$(this)).is(":checked"));
								}
							}							
						}
					});
					return;
				}				
				getcheckbox.click(function(){//只有勾选框能勾选
					if(o.allId){//有全选反选
						checkAll(getcheckbox,$(this),this.checked.obj);
					}else{//只有勾选框
						$(this).parent().toggleClass(o.toggleClass);//添加/删除选中样式
						if(o.checkCallBack && $.isFunction(o.checkCallBack)){//点击的回调函数
							o.checkCallBack.call(that,obj,this.checked);
						}
					}
				})
            });
        },
		selectRadio:function(options){
			var defaults = {
				parentSelect:"p",//支持文字也选中
				toggleClass: 'radio_span--checked'//改变的样式名
            };
			var options = $.extend(defaults, options);
			return this.each(function(){
				var o = options;
                var obj = $(this);
				var getradio = $('input:radio',obj);
				if(o.parentSelect){//支持文字选中
					getradio.parents(o.parentSelect).click(function(e){
						getradio.parent().removeClass(o.toggleClass);//去掉所有的radio的选中样式
						if($(e.target).attr("type")=="radio") $(e.target).parent().addClass(o.toggleClass);//如果点击的是radio
						else $("input:radio",$(this)).parent().addClass(o.toggleClass);//如果点击的是文字
					});
					return;
				}
				getradio.click(function(){//只能点击input
					getradio.parent().removeClass(o.toggleClass);//去掉所有的radio的选中样式
					$(this).parent().addClass(o.toggleClass);//添加选中样式
				});
			});
		}
    });
})(jQuery);








