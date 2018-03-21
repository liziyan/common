/*绑定jqgird
 * bind		  无分页时在页面上不添加分页的ID即可
 * 表格ID    table<固定>
 * 分页ID	 page<可配置>
 * @update 2016-04-21 10:30:30 tableID改为可配置，置于option之后。并新增了排序的方法
 * */
define(["jquery.grid","jquery.grid.zh"],function(){
	var bind=function(opt,id){
		id=id||"table";
		jQuery("#"+id).jqGrid({
			datatype: "json",
			url: opt.url,
			mtype: 'POST', 
			postData : opt.postData ? opt.postData : {},
			height : 'auto',
		    altRows:true,
		    altclass:'ui-priority-bgf3',
		    colNames:opt.colNames,
		    colModel:opt.colModel,
			rowNum : opt.rowNum ? opt.rowNum : 10,
			rowList : opt.rowList?opt.rowList:[10, 20, 30],
			pager : opt.pager?opt.pager:'#page',
			width:opt.width?opt.width:$(window).outerWidth()-30,
			height:opt.height?opt.height:"auto",
			multiselect:opt.multiselect ? true : false,
			multiboxonly:opt.multiboxonly ? true : false,
			successCallback:opt.successCallback?opt.successCallback:function(data, status, xhr){},	
			errorCallback:function(){flyfish.common.tooltip("error","error");},		
			rownumbers: opt.rownumbers==false ? false : true,
			prmNames: opt.prmNames?opt.prmNames:{   //默认发送参数格式设置
				page:"page",
				rows:"rows"
			},
			jsonReader:opt.jsonReader?opt.jsonReader:{  //返回数据格式设置
				root: "pageDto.rows",  
				page: "pageDto.page",
				total: "pageDto.total",  
				records: "pageDto.records",
				repeatitems : false
			},
			ajaxGridOptions:{timeout:flyfish.common.ajaxTimeout},//统一超时时间
			successTip:false,
			beforeProcessing:flyfish.common.gridajaxSuccessFn,
			loadError:flyfish.common.gridajaxErrorFn,
			onSortCol:opt.onSortCol?opt.onSortCol:function(){},
			loadComplete:opt.loadComplete ? opt.loadComplete : null,
			gridComplete : function() {
				flyfish.common.gridaddText();				
				var ts=this;
				if(opt.completeCallback && $.isFunction(opt.completeCallback)){
					return opt.completeCallback.call(ts);
				}				
			}
		});
	};	
	return{bind:bind}
})