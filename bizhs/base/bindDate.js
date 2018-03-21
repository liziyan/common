define(["jquery.laydate"],function(){
	//单纯的一个时间选择框
	function bindSingle(opt){
		var id=opt.id?opt.id:'startDate',s,e;
		if(opt.startDate==false) s="";
		else s=opt.startDate?opt.startDate:flyfish.common.loadDate();
		if(opt.endDate==false) e="";
		else opt.endDate?opt.endDate:flyfish.common.loadDate()		
		var dateRange = new pickerDateRange(id, {
			calendars :1,
			startDate : s,
			endDate : e,
			isTodayValid : opt.isTodayValid?opt.isTodayValid:true,
			isSingleDay : true,
			shortOpr : true,
			autoSubmit:opt.autoSubmit?opt.autoSubmit:false,
			autoClick: opt.autoClick?opt.autoClick:true,	
			theme : 'ta',			
			startDateId:"bzd",
			endDateId:'bzds',
			success : function(obj) {
				if(opt.fun && $.isFunction(opt.fun)) {//是否有回调函数
					var func=opt.fun;
					return func.call(this,obj.startDate,obj.endDate);
				}
			},
			clear:function(){				
				if(opt.clear && $.isFunction(opt.clear)) {//是否有回调函数
					var func=opt.clear;
					return func.call(this);
				}
			}
		});
	};
	//时间间隔的选择框
	function bindTwo(opt){
		opt=opt||{};		
		var id=opt.id?opt.id:'startDate',
			dateEmpty=opt.dateEmpty?opt.dateEmpty:true,
			startDate=opt.isTodayValid?flyfish.common.loadDate(2,true):flyfish.common.loadDate(1,true),
			endDate=opt.isTodayValid?flyfish.common.loadDate(1,true):flyfish.common.loadDate();
		if(dateEmpty){
			startDate="";
			endDate="";			
		}
		var title=startDate+"至"+endDate;
		$("#"+id).attr("data-start",startDate).attr("data-end",endDate);
		$("#"+id).attr("title",title);
		var dateRange = new pickerDateRange(id, {			
			isTodayValid : opt.isTodayValid?opt.isTodayValid:true,
			startDate : opt.startDate?opt.startDate:startDate,
			endDate : opt.endDate?opt.endDate:endDate,
			defaultText : ' 至 ',
			autoSubmit : opt.autoSubmit?opt.autoSubmit:false,
			autoClick: opt.autoClick?opt.autoClick:true,	
			theme : 'ta',
			startDateId:"bzd",
			endDateId:'bzds',
			success : function(obj) {
				$("#"+id).attr("data-start",obj.startDate).attr("data-end",obj.endDate);
				title=obj.startDate+"至"+obj.endDate;
				$("#"+id).attr("title",title);
				if(opt.fun && $.isFunction(opt.fun)) {//是否有回调函数
					var func=opt.fun;
					return func.call(this,obj.startDate,obj.endDate);
				}
			},
			clear:function(){				
				if(opt.clear && $.isFunction(opt.clear)) {//是否有回调函数
					var func=opt.clear;
					return func.call(this);
				}
			}
		});
	};
	//时间间隔的选择框(最多只能选择3个月)
	function bindTwoMoth(opt){
		opt=opt||{};		
		var id=opt.id?opt.id:'startDate',
			startDate=opt.startDate ? opt.startDate : flyfish.common.loadDate(),
			endDate=opt.endDate ? opt.endDate :	flyfish.common.loadDate(1,true),
			dateEmpty=opt.dateEmpty?opt.dateEmpty:false;
		if(!dateEmpty){
			startDate="";
			endDate="";			
		}
		var title=startDate+"至"+endDate;
		$("#"+id).attr("data-start",startDate).attr("data-end",endDate);
		$("#"+id).attr("title",title);
		var dateRange = new pickerDateRange(id, {			
			isTodayValid : opt.isTodayValid?opt.isTodayValid:true,
			startDate : opt.startDate?opt.startDate:startDate,
			endDate : opt.endDate?opt.endDate:endDate,
			defaultText : ' 至 ',
			autoSubmit : opt.autoSubmit?opt.autoSubmit:false,
			autoClick: opt.autoClick?opt.autoClick:true,	
			theme : 'ta',monthRangeMax:3,
			errorTips:function(obj){
				flyfish.common.tooltip("最多只能选择"+obj.month+"个月至"+obj.date,"error");
			},
			success : function(obj) {
				$("#"+id).attr("data-start",obj.startDate).attr("data-end",obj.endDate);
				title=obj.startDate+"至"+obj.endDate;
				$("#"+id).attr("title",title);
				if(opt.fun && $.isFunction(opt.fun)) {//是否有回调函数
					var func=opt.fun;
					return func.call(this,obj.startDate,obj.endDate);
				}
			}
		});
	};
	/**
	 * 绑定时间控件，只针对运营分析
	 * @parame fun最近7天/1个月/3个月点击的回调函数，返回起时间和止时间
	 * @parame func 单纯的选择时候之间的回调函数，返回起时间和止时间
	 */
	function bindDate(fun,func){
		var start=flyfish.common.loadDate(6,true),end=flyfish.common.loadDate();
		$("#startDate").attr("data-start",start).attr("data-end",end);
		var dateRange = new pickerDateRange('startDate', {
			aRecent7Days : 'day7',
			aRecent30Days:'day30',
			aRecent90Days:'day90',
			isTodayValid : true,
			startDate : start,
			endDate : end,
			defaultText : ' 至 ',
			autoSubmit : true,
			theme : 'ta',
			monthRangeMax:3,
			errorTips:function(obj){
				flyfish.common.tooltip("最多只能选择"+obj.month+"个月至"+obj.date,"error");
			},
			success : function(obj) {
				$(".times .current").removeClass("current");
				$("#startDate").attr("data-start",obj.startDate).attr("data-end",obj.endDate);				
				var d=flyfish.common.DateDiff(obj.startDate,obj.endDate);
				var i=d==6?0:d==29?1:d==89?2:9;
				if(i!=9 && obj.endDate==end){
					$(".times a:eq("+i+")").addClass("current");
					if(fun && $.isFunction(fun)) {//是否有回调函数
						return fun.call(this);
					}
				}else{
					if(func && $.isFunction(func)) {//是否有回调函数
						return func.call(this);
					}
				}
			}
		});
	};
	return {
		bindSingle:bindSingle,
		bindTwo:bindTwo,
		bindTwoMoth:bindTwoMoth,
		bindDate:bindDate
	}
})