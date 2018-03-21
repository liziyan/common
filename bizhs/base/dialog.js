/**
* 功能说明:		弹出框
* @author:		vivy <zhanghx13855>
* @time:		2016-03-29
* @version:		V1.1.0
* @update:		2016-03-29 剥离出来并添加注释
* 				2016-09-09 插件有问题，重新写
* @js调用方法：
* $.artDialog({
*  	title:'提示框',				<提示头部>
*  	content: '消息提示内容',		<提示内容>
*  	isTitle:true,				<是否显示头部>		
*  	isOkBtn:true,				<是否显示确定按钮>
*   boxClass:"",				<整个大弹出框新增的样式，可用于调节内部样式>
*  	okText:"确定",				<取消按钮文字>
*  	okBtnClass:'btn-orange',	<确定按钮样式>
*  	ok: null,					<确定回调函数[]>
*  	isCloseBtn:true,			<是否显示取消按钮>
*  	cancelText:"关闭",			<取消按钮文字>
*  	cancelBtnClass:'btn-gray',	<取消按钮样式>
*  	cancel: null,				<取消回调函数>
*   titleCancel:null,           <提示标题的X关闭的回调函数>
*  	cancelClose:true,			<点取消时弹出层是否关闭>
*  	width:500,					<显示区域宽度>
*  	marginLeft:'auto',			<左间距，默认居中>
*  	marginTop:'auto'			<右间距,默认居中>
* })
*
*/
!function ($) {
	"use strict";
	var down=function(options){
		var defaults={
				id:'',
				title: '提示框',
				content: '消息提示内容',
				isTitle: true,
				isCloseIcon:true,
				isOkBtn: true,
				okText: "确定",
				okBtnClass: 'btn-orange',
				ok: null,
				isCloseBtn: true,
				cancelText: "关闭",
				cancelBtnClass: 'btn-gray',
				cancel: null,
				titleCancel:null,
				cancelClose: true,
				width: 500,
				marginLeft: 'auto',
				marginTop: 'auto'
		}		
		this.options=$.extend({}, defaults, options);
		this.init();
	}
	down.prototype.init=function(){
		var that = this,DOM;
		that.DOM = DOM = that.DOM || that._getDOM();
		if (DOM.close) {
			DOM.close.bind("click", function() {
				if (that.options.titleCancel && $.isFunction(that.options.titleCancel)) {
					that.options.titleCancel()
				}
				that._unlock()
			})
		}
		that._lock()._ok()._cancel();
		return that
	}
	down.prototype._getDOM=function(){
		var s = $('<div class="m-sPopBg" id="'+this.options.id+'_bg" style="display:block"></div>');
		var that = $(this._html());
		s.after(that);
		$('body', top.document).append(s);
		var b, i = 0,
			DOM = {
				wrap: $(that),
				pop: $(s)
			},
			els =that[0].getElementsByTagName('*'),
			elsLen = els.length;
		for (; i < elsLen; i++) {
			b = els[i].className.split('m-dialog-')[1];
			if (b) DOM[b] = $(els[i])
		};
		return DOM
	}
	down.prototype._html=function(){
		var _a = this.options.marginLeft === 'auto' ? this.options.width / 2 + 3 : this.options.marginLeft;
		var s = '<div class="m-dialog '+this.options.boxClass+'" id="'+this.options.id+'" style="top:50%;left:50%;z-index:2015;margin-left:-' + _a + 'px">';
		if (this.options.isTitle) {
			s += '<div class="m-dialog-header">' + '<div class="m-dialog-title">' + this.options.title + '</div>';
			if(this.options.isCloseIcon){
				s+='<a class="m-dialog-close" href="javascript:">×</a>';
			}				 
			s+='</div><div class="m-dialog-main" style="width:' + this.options.width + 'px;">';
		} else {
			
			s += '<div class="m-dialog-main" style="width:' + this.options.width + 'px; min-height:100px;padding: 30px 30px 0px;">'
		}
		s += '<div class="m-dialog-content">' + this.options.content + '</div></div><div class="m-dialog-buttons">';
		if (this.options.isOkBtn) s += '<button class="dialog_highlight btn ' + this.options.okBtnClass + ' f-r3" type="button">' + this.options.okText + '</button>';
		if (this.options.isCloseBtn) s += '<button type="button" class="closeBtn btn ' + this.options.cancelBtnClass + ' f-r3">' + this.options.cancelText + '</button>';
		s += '</div>';
		return s
	}
	down.prototype._lock=function(){
		var that = this,
			wrap = that.DOM.wrap;
		var b = this.options.marginTop === 'auto' ? $(".m-dialog", top.document).outerHeight() / 2 : this.options.marginTop;
		that.DOM.wrap.css({
			'margin-top': -b + "px"
		});
		return that
	}
	down.prototype._unlock=function(){
		this.DOM.wrap.remove();
		this.DOM.pop.remove()
	}
	down.prototype._ok=function(){
		var that = this,
			DOM = that.DOM,
			btn = DOM.buttons.find(".dialog_highlight");
		btn.bind("click", function() {
			if (that.options.ok && $.isFunction(that.options.ok)) {
				that.options.ok()
			}
			that._unlock()
		});
		return that
	}
	down.prototype._cancel=function(){
		var that = this,
			DOM = that.DOM,
			btn = DOM.buttons.find(".closeBtn");
		btn.bind("click", function() {
			if (that.options.cancel && $.isFunction(that.options.cancel)) {
				that.options.cancel()
			}
			if (that.options.cancelClose) that._unlock()
		});
		return that
	}
	window.artDialog = function(options){
		return new down(options);
	}
	$.dialog = $.artDialog = window.artDialog
}(jQuery);