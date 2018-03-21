/**
* 功能说明:		模糊查询
* @author:		vivy <zhanghx13855>
* @time:		2015-11-24至2015-11-25
* @version:		V1.1.0
* @update:		2015-12-15 14:04:30  onBlur时多加一个选中值的json串参数
* 				2015-12-17 18:35:30 _getRow方法中res[i].id===pid改为res[i].id==pid
* 				2015-12-17 19:44:30 输入框失去焦点后弹出remove掉，因还有其他点击事件，故setTimeout延时500毫秒
* 				2015-12-29 10:14:30 新增一个width参数，用于展示下拉框的宽度，为auto时表示和input框一样宽。
* 				2015-12-29 17:13:30 将方法中的固定id改为可配置，默认为id
* 				2015-12-30 09:15:30 搜索条件中有选值之后删除掉的需求，新增allowEmpty的参数
* 				2015-12-30 10:39:30 输入的值和下面显示出来的值相等且只有一个时，将输入的值写入input中
* 				2015-12-30 11:24:30 将选中的值的id绑定到input中
* 				2015-12-30 13:24:30 data-id与jqgrid中的重复，换成data-key
* 				2015-12-30 14:33:30 将document.click写到blur中，完善失去焦点之后的各种选择
* 				2015-12-30 15:00:30 没有新增时点击暂无数据的处理方法
*  				2016-03-31 16:17:00 回车后点击其他地方消失的修改，新增加==13下的前三行代码
* 
* @使用方法:	    
* <input type="text" class="inputElem" value="" oldValue="" selectValue="" />
* @class="inputElem"<样式必填，模糊查询的样式>
* @oldValue<当前输入框的值是否是上次查询的值，只有不同的情况才去查询，并且重新给oldValue赋值>
* @selectValue<下拉框选中后记录的值，对input删除或修改后判断input是否为空，不为空的情况把selectValue重新赋值给input,最后取值取这里的值>
*
*
* @js调用方法1:-----针对页面上只有一个模糊查询或者多个模糊查询可共用一个url和请求参数字段等
* dropDown({
*  	url:null,						 	//请求url地址
*	params:{'page':'1','rows':'10'},	//请求参数,不包括字段
*	keyword:'keyWord',					//查询字段名称,如果查询的sql语句已经写明字段，这个可以不配置
*	text:'商品',							//文字
*	width:'auto',						//下拉框宽度，默认和Input一样宽
*	id:'id',							//id值，可配置，默认为id
*	allowEmpty:false,					//改变值时是否允许为空，默认不能为空（针对删除）
*	addNew:true,						//是否有新增
*	selectItem:true,					//是否有选择
*	addCallback:null,					//新增回调函数,返回一个参数【obj<当前input>】
*	selectCallback:null,				//选择回调函数,返回一个参数【obj<当前input>】
*	allowPaste:false,					//是否允许粘贴	
*	isSelectHide:true,					//点击下拉框的选项是，下拉框是否隐藏	
*	onBlur:null							//选中值回调函数，返回三个参数【obj<当前input>,id<选中值的>,value<选中值的>,row<选中的行的rowJson串>】
* });
*
* @js调用方法2:----每个模糊查询都要调用一次
* $(object).dropDown({
*  	url:null,						 	//请求url地址
*	params:{'page':'1','rows':'10'},	//请求参数,不包括字段
*	keyword:'keyWord',					//查询字段名称,如果查询的sql语句已经写明字段，这个可以不配置
*	text:'商品',							//文字
*	width:'auto',						//下拉框宽度，默认和Input一样宽
*	id:'id',							//id值，可配置，默认为id
*	allowEmpty:false,					//改变值时是否允许为空，默认不能为空（针对删除）
*	addNew:true,						//是否有新增
*	selectItem:true,					//是否有选择
*	addCallback:null,					//新增回调函数,返回一个参数【obj<当前input>】
*	selectCallback:null,				//选择回调函数,返回一个参数【obj<当前input>】
*	allowPaste:false,					//是否允许粘贴	
*	isSelectHide:true,					//点击下拉框的选项是，下拉框是否隐藏	
*	onBlur:null							//选中值回调函数，返回三个参数【obj<当前input>,id<选中值的>,value<选中值的>,row<选中的行的rowJson串>】
* });
*
*/
define(["ajax"],function(a){
var t={"errCode":"000000","errMsg":"业务交易成功","pageDto":{"page":"1","records":"53","rows":[{"id":"0","master":"1511168247","numIid":"11","shopNick":"hello","status":"1"},{"id":"2","master":"1511168247","numIid":"11","shopNick":"hello","status":"1"},{"id":"3","master":"1511168247","numIid":"11","shopNick":"hello","status":"1"},{"downNotice":"20150706:铺货失败,已存在相同商家编码的商品!","id":"98","master":"1511168247","numIid":"45098582937","outerId":"21963","platType":"TB","price":1,"shopId":"16203841083015173","shopNick":"hello","shopTitle":"测试的小店","status":"1","title":"支持购买"},{"downNotice":"20150806:铺货失败,已存在相同商家编码的商品!","id":"134","master":"1511168247","numIid":"3838293428","outerId":"12345","platType":"YG","price":200.7,"shopId":"31841748607041536","shopNick":"hello","shopTitle":"颐高5店铺","status":"1","title":"Nokia N97全新行"},{"downNotice":"20150806:铺货失败,已存在相同商家编码的商品!","id":"135","master":"1511168247","numIid":"3838293429","outerId":"123456","platType":"YG","price":200.8,"shopId":"31841748607041536","shopNick":"hello","shopTitle":"颐高4店铺","status":"1","title":"Nokia N97全新行2"},{"downNotice":"20150825:铺货失败,已存在相同商家编码的商品!","id":"860","master":"1511168247","numIid":"426","outerId":"0","platType":"YG","price":5,"shopId":"31841748607041536","shopNick":"hello","shopTitle":"颐高3店铺","status":"1","title":"农家纯手工粽子"},{"downNotice":"20150828:铺货成功!","id":"869","master":"1511168247","numIid":"427","outerId":"0","platType":"YG","price":5,"shopId":"31841748607041536","shopTitle":"颐高店2铺","status":"1","title":"农家纯手工粽子"},{"downNotice":"20150828:铺货成功!","id":"870","master":"1511168247","numIid":"428","outerId":"0","platType":"YG","price":5,"shopId":"31841748607041536","shopTitle":"颐高店1铺","status":"1","title":"饺子"},{"downNotice":"20150828:铺货成功!","id":"871","master":"1511168247","numIid":"429","outerId":"0","platType":"YG","price":5,"shopId":"31841748607041536","shopTitle":"颐高店铺","status":"1","title":"饺子"}],"total":"6"},"success":true};
(function ($) {
	var opt,ele,res;//2015-12-15 change
	var dropDown=function(config){
		return (new require())._init(config);		
	};
	$.fn.dropDown=function(config){		
		ele=this;
		return (new require())._fninit(config);	
	};
	function require(options){};
	require.prototype={
		_init:function(config){			
			var that=this,obj;			
			$(".inputElem").each(function(index,item){	
				$(item).focus(function(e){					
					$(this).addClass("inputElem_only");
					opt=$.extend(require.defaults,config||{});
					/*不允许粘贴*/	
					var v=$(this).val();
					if(!opt.allowPaste){					
						$(item).unbind('paste');
						$(item).bind('paste',function(e){
							e.preventDefault();
							$(this).val(v);
						});	
					}
					that._focus($(this),e);
				});
				$(item).keyup(function(e){
					that._keyup($(this),e);
				});
				$(item).blur(function(e){
					that._blur($(this),e);
				});
				obj=$(item);
			});
		},
		_fninit:function(config){
			var that=this;	
			$(ele).focus(function(e){
				$(this).addClass("inputElem_only");	
				opt=$.extend(require.defaults,config||{});
				/*不允许粘贴*/
				var v=$(this).val();
				if(!config.allowPaste){					
					$(ele).unbind('paste');
					$(ele).bind('paste',function(e){
						e.preventDefault();
						$(this).val(v);
					});	
				}
				that._focus($(this),e);
			});
			$(ele).keyup(function(e){
				that._keyup($(this),e);
			});
			$(ele).blur(function(e){					
				that._blur($(this),e);
			});			
		},
		_blur:function(obj,e){
			var ts=this;			
			var value=obj.val();			
			$(document).unbind("click").bind("click",function(event){
				event.stopPropagation();
				var target = event.target,
					tagParent = $(target).parent(),
					attr = $(target,tagParent).closest('.bdsug'),
					len=$(target).parents(".bdsug").length;
				var tagCls ="inputElem_only";	
				if(($(target).hasClass("add") || $(target).hasClass("haveno")) && len>0){
					//新增和暂无数据的点击
					ts._removeHtml();	
					$(".inputElem_only").removeClass("inputElem_only");							
					if(opt.addCallback && $.isFunction(opt.addCallback)){
						opt.addCallback.call(ts,obj);
					}else{
						if(opt.addNew)
							alert("新增函数为空或不是方法");	
						else{
							ts._documentClick(obj);
						}
					}
				}else if($(target).hasClass("more") && len>0){
					//选择和暂无数据的点击
					ts._removeHtml();	
					$(".inputElem_only").removeClass("inputElem_only");							
					if(opt.selectCallback && $.isFunction(opt.selectCallback)){
						opt.selectCallback.call(ts,obj);
					}else{
						alert("选择函数为空或不是方法");	
					}
				}else if($(target).hasClass("bdsug-overflow") && len>0){
					//选中值
					ts._after(obj,$(target).attr("data-key"),$(target).text());
				}else if(len>0 || $(target,tagParent).hasClass(tagCls)){					
					return;
				}else{
					if($('#bdsug li').length===1 && $('#bdsug li').text()===value){
						var $this=$('#bdsug li');
						ts._after(obj,$this.attr("data-key"),$this.text());				
					}
					ts._documentClick(obj);
				}
			});
		},
		_documentClick:function(obj){
			var ts=this;
			var v=obj.attr("selectValue");
			if(opt.allowEmpty && obj.attr("oldvalue").length==0){
				v="";
				obj.attr("data-key","");
			}
			obj.val(v).attr("oldValue",v).attr("selectValue",v);
			obj.removeClass("inputElem_only");
			ts._removeHtml();
		},
		_focus:function(obj){
			var that=this;
			this._addHtml(obj);//加载弹出层
			that._ajax(obj);//填充数据
		},	
		_ajax:function(obj){		
			var that=this;	
			//url请求
			opt.params[opt.searchKeyword]=$.trim(obj.val());
			//alert(JSON.stringify(opt.params))
			a.ajaxCall({
				url:opt.url,
				params:opt.params,
				successCallback:that._focusSucessCallback,
				errorCallback:that._focusErrorCallback
			});
			//本地测试数据
			//this._focusSucessCallback(t);
		},
		_focusSucessCallback:function(result){
			var resArray = result.pageDto.rows;
			res=resArray;//2015-12-15add
			var s='';
			$("#bdsug p.haveno").remove();
			if(resArray.length===0){//没有数据
				$("#bdsug ul").html("").after("<p class='haveno'>暂无数据，请新增</p>");
				return;	
			}
			for(var i=0;i<resArray.length;i++){
				//var templateId = resArray[i].id;//2015-12-29 zhushi
				var templateId=resArray[i][opt.id];//2015-12-29 add
				var name = resArray[i][opt.keyword];
				if(name){
					s+='<li data-key="'+templateId+'" title="'+name+'" class="bdsug-overflow">'+name+'</li>';
				}   
			}
			$("#bdsug ul").html("").append(s);
			$("#bdsug li").hover(function(){
				$(this).toggleClass("bdsug-s");	
			});
		},
		_focusErrorCallback:function(result){
			alert("ajaxCall调用失败");
		},//2015-12-15 add
		_getRow:function(pid){
			for(var i=0;i<res.length;i++){
				//if(res[i].id==pid) return res[i];//2015-12-17 change
				if(res[i][opt.id]==pid) return res[i];//2015-12-29 add
			}
		},
		_addHtml:function(obj){
			this._removeHtml();
			var title=opt.text;
			var s=$('<div class="bdsug" id="bdsug"></div>');
			s.append('<ul></ul>');
			opt.addNew ? s.append('<a href="javascript:;" class="add">+ 新增'+title+'</a>') : '';
			opt.selectItem ? s.append('<a class="more" title="选择'+title+'" href="javascript:;">...</a>') : '';
			$('body').append(s);
			/*html position*/
			var w=obj.outerWidth(),
				h=obj.outerHeight(),
				_top=obj.offset().top + h,
				_left=obj.offset().left;
			$("#bdsug .more").css({"left":w-20+"px"});
			w= opt.width=="auto" ? w : opt.width;
			$("#bdsug").css({"width":w+"px","left":_left+"px","top":_top+"px"});			
		},
		_keyup:function(obj,e){
			var that=this,
				targetVal=$.trim(obj.val()),
                keyCode=e.keyCode,
				ul=$("#bdsug ul");			
			if(targetVal!==$.trim(obj.attr("oldValue"))){this._ajax(obj);}//值改变时才去数据库获取数据				
			if(keyCode===38){//上箭头	
				var index=$("li.bdsug-s",ul).index(),
					len=$("li",ul).length;	
				index = index===-1 ? len : index;	
				index--;	
				$("li:eq("+index+")",ul).addClass("bdsug-s").siblings("li").removeClass("bdsug-s");
				obj.val($("li:eq("+index+")",ul).text());
				obj.attr("oldValue",$("li:eq("+index+")",ul).text());
			}
			if(keyCode===40){//下箭头	
				var index=$("li.bdsug-s",ul).index(),
					len=$("li",ul).length;	
				index=index===len-1 ? -1 : index;
				index++;			
				$("li:eq("+index+")",ul).addClass("bdsug-s").siblings("li").removeClass("bdsug-s");
				obj.val($("li:eq("+index+")",ul).text());
				obj.attr("oldValue",$("li:eq("+index+")",ul).text());
			}
			if(keyCode===13){//回车
				$("#bdsug li").each(function(){
					if($(this).text()==obj.val()) $(this).addClass("bdsug-s").siblings("li").removeClass("bdsug-s");
				});
				var li=$("li.bdsug-s",ul);
				if(li.length===0){					
					if(opt.isSelectHide) that._removeHtml();
					obj.blur();
					return;
				}
				var id=li.attr("data-key");
				var value=li.text();
				that._after(obj,id,value);
				obj.blur();
			}
			obj.attr("oldValue",obj.val());			
		},
		/*删除*/
		_removeHtml:function(){			
			$("#bdsug").remove();	
		},
		/*选中值之后*/
		_after:function(obj,id,value){
			var ts=this;
			obj.attr("oldValue",value).attr("selectValue",value).attr("data-key",id);
			obj.val(value);
			$(".inputElem_only").removeClass("inputElem_only");
			if(opt.isSelectHide) ts._removeHtml();
			if(opt.onBlur && $.isFunction(opt.onBlur)){
				opt.onBlur.call(ts,obj,id,value,ts._getRow(id));//2015-12-15 change
			}else{
				alert("回调函数为空或不是方法");	
			}
		}
	};	
	require.defaults = {
		url:null, 	//请求地址
		params:{'page':'1','rows':'10'},	//请求参数,不包括字段
		keyword:'shopTitle',//显示名称的字段
		searchKeyword:'shopTitle',//数据库模糊查询时的字段
		width:'auto',	//下拉框宽度，默认和Input一样宽		
		id:'id',	//id值，可配置，默认为id
		allowEmpty:false,//改变值时是否允许为空，默认不能为空（针对删除）
		text:'商品',//文字
		addNew:true,//是否新增
		selectItem:true,//是否选择
		addCallback:null,//新增,返回一个参数【obj】
		selectCallback:null,//选择,返回一个参数【obj】
		allowPaste:false,//是否允许粘贴	
		isSelectHide:true,// 点击下拉框 是否隐藏	
		onBlur:null,//选中值之后，返回三个参数【obj<当前input>,id<选中值的>,value<选中值的>】
		onFocus:null
	};	
	window.dropDown = $.dropDown= dropDown;
})(jQuery);
});