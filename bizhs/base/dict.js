//数据字典
define(["ajax"],function(a){
	return {
		/**
		* 功能说明:		数据字典取数，应用于单独的下拉框数据加载
		* @author:		niwj <niwj>
		* @time:		2015-12-22 14:13:30
		* @version:		V1.1.0
		* @update:		
		* @param:		dictName<数据字典名称>
		* @param:		selVal<默认选中的val,如果改值不存在，默认选中第一条记录>
		* @param:		setFlag<true，就有一条请选择记录，如果不填或false,就不只显示表中的数据>
		* @param:		flagVal<如果setFlag为true 则显示一条value为空的option  当flagVal 不存在时默认为‘请选择’,如果存在则显示存在的值>
		*/
		getDictforSelect:function(dictName, selVal,setFlag,flagVal){
			var str="";
			var successCallback = function(data){ 
				if (data != null) {
					var strTemp="";
			        var jsonobj=eval(data.itemList);
			        if(undefined==jsonobj) return str;
			        var length=jsonobj.length;
			        if(length<=0) return str;			        
			        var flag = false;  //是否匹配到selVal，默认否
			        for(var i=0;i<length;i++){
			        	if(jsonobj[i].value == selVal) { //匹配到选中的值
			        		flag = true;
			        		break;
			        	}
			        }
			        for(var i=0;i<length;i++){
			        	if(flag) {  //有选中项参数
			        		if(jsonobj[i].value == selVal)
			        			strTemp += "<option value="+jsonobj[i].value+" selected='true'>"+jsonobj[i].text+"</option>";
				            else
				            	strTemp += "<option value="+jsonobj[i].value+">"+jsonobj[i].text+"</option>";				            
			        	}else {
			        		if(i == 0){
			        			if(setFlag){
			        				var defaultStr="请选择"
			        				if(flagVal){defaultStr=flagVal};
			        				strTemp="<option value='' selected='true'>"+defaultStr+"</option><option value="+jsonobj[i].value+" >"+jsonobj[i].text+"</option>";
			        			}else{
			        				strTemp += "<option value="+jsonobj[i].value+" selected='true'>"+jsonobj[i].text+"</option>";	
			        			}
				            }else{
				            	strTemp += "<option value="+jsonobj[i].value+">"+jsonobj[i].text+"</option>";
				            }
			        	}
			        }
			        str=strTemp;
			 	}
			}; 
			//取数据典
			var url=flyfish.bathPath+'/dict/getDictInfo.vm';
			var params = {"dictValue":dictName};
			a.ajaxCall({
				url:url,
				async:false,
				params:params,
				successCallback:successCallback,
				errorCallback:function(){alert("查询数据字典失败！")}
			}); 
			return str;
		},
		getDict_Sys:function(dictName){
			var str="";
			a.ajaxCall({
				url : flyfish.bathPath+'/dict/dictItem.vm?typeStr='+dictName,
				successCallback : function(data){
					var strTemp="";
					if (data != null) {
				        var jsonobj=eval(data.dictList);
				        var length=jsonobj.length;
				        for(var i=0;i<length;i++){
				            if(i!=length-1){
				            	strTemp+=jsonobj[i].dictitemValue+":"+jsonobj[i].dictitemName+";";
				            }else{
				            	strTemp+=jsonobj[i].dictitemValue+":"+jsonobj[i].dictitemName;
				            	str=strTemp;
				            }
				        }   
					}
				},
				errorCallback : function(){ 
					alert("查询数据字典失败！")
				},
				successTip:false,
				async:false
			});
			return str;
		},
		getDict:function(dictName){
			var str="";
			var successCallback = function(data){ 
				if (data != null) {
			        var jsonobj=eval(data.itemList);
			        if(undefined==jsonobj) {
			        	return str;
			        }
			        var length=jsonobj.length;
			        for(var i=0;i<length;i++){
			            if(i!=length-1){
			            	str+=jsonobj[i].value+":"+jsonobj[i].text+";";
			            }else{
			            	str+=jsonobj[i].value+":"+jsonobj[i].text;
			            }
			         }   
			       }
			}; 
			var errorCallback = function(){ 
				alert("查询数据字典失败！")
			};
			//取数据典
			var url=flyfish.bathPath+'/dict/getDictInfo.vm';
			a.ajaxCall({
				url:url,
				params:{"dictValue":dictName},
				successTip:false,
				async:false,
				successCallback:successCallback,
				errorCallback:errorCallback
			});
			if("PLATFORM_TYPE"==dictName){
				str+=";";
				a.ajaxCall({
					url : url,
					params : {"dictValue":"PLATFORM_TYPE_ZJ"},
					successCallback:successCallback,
					errorCallback:errorCallback,
					successTip:false,
					async:false
				});
			}	
			return str;
		},
		getDictforSelect_Sys:function(dictName, selVal,setFlag){
			var str="";
			//取数据典
			var url=flyfish.bathPath+'/dict/dictItem.vm?typeStr='+dictName;
			a.ajaxCall({
				url:url,
				successCallback:function(data){
					if (data != null) {
						var strTemp="";
				        var jsonobj=eval(data.dictList);
				        var length=jsonobj.length;
				        if(length<=0) {
				        	return str;
				        }
				        var flag = false;  //是否匹配到selVal，默认否
				        for(var i=0;i<length;i++){
				        	if(jsonobj[i].dictitemValue == selVal) { //匹配到选中的值
				        		flag = true;
				        		break;
				        	}
				        }
				        for(var i=0;i<length;i++){
				        	if(flag) {  //有选中项参数
				        		if(jsonobj[i].dictitemValue == selVal){
				        			strTemp += "<option value="+jsonobj[i].dictitemValue+" selected='true'>"+jsonobj[i].dictitemName+"</option>";
					            }else{
					            	strTemp += "<option value="+jsonobj[i].dictitemValue+">"+jsonobj[i].dictitemName+"</option>";
					            }
				        	}else {
				        		if(i == 0){
				        			if(setFlag){
				        				strTemp="<option value='' selected='true'>请选择</option><option value="+jsonobj[i].dictitemValue+" >"+jsonobj[i].dictitemName+"</option>";
				        			}else{
				        				strTemp += "<option value="+jsonobj[i].dictitemValue+" selected='true'>"+jsonobj[i].dictitemName+"</option>";	
				        			}
					            }else{
					            	strTemp += "<option value="+jsonobj[i].dictitemValue+">"+jsonobj[i].dictitemName+"</option>";
					            }
				        	}
				        } 
				        str=strTemp;
				 	}
				},
				errorCallback:function(){ 
					alert("查询数据字典失败！")
				},
				successTip:false,
				async:false
			});
			return str;	
		}
	}
});