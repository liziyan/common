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
            var defaults = {parentSelect:"p",allId: 'checkAll',toggleClass: 'check_span--checked',checkCallBack:function(obj,bool){}};
			var options = $.extend(defaults, options);			
			function checkAll(getcheckbox,check,bool,obj){
				var o = options,call=$("#"+o.allId),len=getcheckbox.length-1;				
				if(o.checkCallBack && $.isFunction(o.checkCallBack)) o.checkCallBack.call(this,obj,bool);
				check.attr("id")==o.allId ? ( bool ? (getcheckbox.prop("checked",true),getcheckbox.parent().addClass(o.toggleClass),check.prop("checked",true)):(getcheckbox.removeAttr("checked"),getcheckbox.parent().removeClass(o.toggleClass),check.removeAttr("checked"))) :　
				( bool ? (check.prop("checked",true),check.parent().addClass(o.toggleClass),(len==obj.find("input:checkbox:checked").length) ? (call.parent().addClass(o.toggleClass),call.prop("checked",true)) :null) : (check.removeAttr("checked"),check.parent().removeClass(o.toggleClass),call.parent().removeClass(o.toggleClass),call.removeAttr("checked")));
			}			
            return this.each(function () {
                var o = options,obj = $(this),that=this,getcheckbox = $('input:checkbox',obj);
				o.parentSelect ? (getcheckbox.parents(o.parentSelect).click(function(e){o.allId ? ($(e.target).attr("type")=="checkbox" ? checkAll(getcheckbox,$(e.target),e.target.checked,obj) : checkAll(getcheckbox,$(this).find("input:checkbox"),!$(this).find("input:checkbox").is(":checked"),obj)) : 
					($(e.target).attr("type")=="checkbox" ? ($(e.target).parent().toggleClass(o.toggleClass),(o.checkCallBack && $.isFunction(o.checkCallBack)) ? (o.checkCallBack.call(that,obj,e.target.checked)) :null) :($('input:checkbox',$(this)).parent().toggleClass(o.toggleClass),(o.checkCallBack && $.isFunction(o.checkCallBack)) ? (o.checkCallBack.call(that,obj,e.target.checked)) :null))})
					): (getcheckbox.click(function(){o.allId ? checkAll(getcheckbox,$(this),this.checked.obj) : ($(this).parent().toggleClass(o.toggleClass),(o.checkCallBack && $.isFunction(o.checkCallBack)) ? (o.checkCallBack.call(that,obj,e.target.checked)) :null)}));
            });
        },		
		selectRadio:function(options){
			var defaults = {parentSelect:"p",toggleClass: 'radio_span--checked'};
			var options = $.extend(defaults, options);
			return this.each(function(){
				var o = options,obj = $(this),getradio = $('input:radio',obj); 
				o.parentSelect?(getradio.parents(o.parentSelect).click(function(e){getradio.parent().removeClass(o.toggleClass),$(e.target).attr("type")=="radio" ? $(e.target).parent().addClass(o.toggleClass) : $("input:radio",$(this)).parent().addClass(o.toggleClass);})):
				(getradio.click(function(){getradio.parent().removeClass(o.toggleClass),$(this).parent().addClass(o.toggleClass)}));				
			});
		}
    });
})(jQuery);