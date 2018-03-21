define(["ajax","jquery.cookie","pwd"],function(a){
	var checkFlag,scanFlag,weightFlag,user_source;//checkFlag=1的时候就是选择了订单审核模块,scanFlag=1的时候就是选择了扫描验货,weightFlag=1的时候就是选择了批量称重
	//诸葛io用户分析软件埋点需要注册来源数据
    a.ajaxCall({
        url:flyfish.bathPath+'/system/queryAdvertInfoByMaster.vm',
        params:{},
        successCallback :function(result){
            user_source=result.source;
        },
        successTip:false,
        bizErrTip:true,
    });
	var _init=function(){
		//诸葛io用户分析软件埋点
		var user_id=$('#userId').val();
		var user_mobile=$('#mobile').val();
		var user_compName=$('#compName').val();
        zhuge.identify(user_id, {
            name:  user_compName,   //预定义属性
            mobile:  user_mobile,  //预定义属性
            userSource:  user_source  //预定义属性
        });
        //埋点结束
		checkFlag=$("#checkFlag").val();
		scanFlag=$("#scanFlag").val();
		weightFlag=$("#weightFlag").val();
		bindproper();		
		oldIndex();
		$(".tokdd").click(function(){
			flyfish.common.childAddIframe({
				title:"快递单模板",
				url:flyfish.bathPath + "/printmgr/forwardTemplateMgr.vm",
				id:"cd100020103"
			});
		});
		$(".tofhd").click(function(){
			flyfish.common.childAddIframe({
				title:"发货单模板",
				url:flyfish.bathPath + "/ordermgr/sendTemplateList.vm",
				id:"cd100020110"
			});
		});
		$(".todzmd").click(function(){
			flyfish.common.childAddIframe({
				title:"电子面单账号",
				url:flyfish.bathPath + "/waybillAccount/forwardWaybillAccountMgr.vm",
				id:"cd100020601"
			});
		});
        //商通贷权限
        queryShopExistTbOrTm();
		function queryShopExistTbOrTm() {
            a.ajaxCall({
                url:flyfish.bathPath + '/storeManage/queryShopExistTbOrTm.vm',
                params:{},
                successCallback:function(data){
                    if(data.success) $('.shang-tong-dai').show();
                    else $('.shang-tong-dai').hide();
                },
                successTip:false,
                bizErrTip:true,
            });
        }
		/* 获取当前未处理的任务数量 */
		getNowUpDownTask();
		function getNowUpDownTask(){
			a.ajaxCall({
				url:flyfish.bathPath+'/asynUpdownload/queryAyncUpdownloadTask.vm',
				params:{"status":'0','rows':"1","page":9999},
				successCallback :function(result){
					if(result.success) {
						var _num = result.pageDto.total;
						$(".topNumTips").text(_num);
						if(+_num > 0) {
							$(".topNumTips").css("display", "inline-block");
						}else {
							$(".topNumTips").hide();
						}
					}
					else {
						// 查询出错则不显示
						var num=parseInt($(".topNumTips").text());
						if(num==0) $(".topNumTips").hide();	
					}
				},
				bizErrCallback: function(){
					// 报错则不显示红点
					var num=parseInt($(".topNumTips").text());
					if(num==0) $(".topNumTips").hide();	
				}
			});	
		};
		$(".rwxx").click(function(){
			flyfish.common.childAddIframe({
				title:"任务管理",
				url:flyfish.bathPath + "/asynUpdownload/forwardAsynUpdownloadMgr.vm",
				id:"cd100020507"
			});
			getNowUpDownTask();
		});
		//打开搜索的页面
		$(".m-tab-search-box").click(function(){
			flyfish.common.s_addPop({
		        title:'订单查询',
		        url:flyfish.bathPath+"/search/index.vm",		        
		        width:800,
		        height:$(window).height()-60
			});
		});
		var shopId = $.cookie("sq");
		$.cookie('sq', '', { expires: -1 }); // 删除 cookie
		if(!flyfish.common.isEmpty(shopId)){
			//授权成功后自动同步商品库存、订单
			syncItem(shopId);
		}
	}
	//根据不同的选择绑定不同的系统流程和待办事项
	function bindproper(){		
		//绑定系统流程
		var list=["添加店铺"],
			url=["/storeManage/forwardStoreManage.vm"],
			id=["cd100020501"],
			str="";//以上为系统流程所需的变量
		var wait=["待打单","待发货","当日已发"],waitId=["waitPrint","waitSend","hadSend"],str1="";
		if(checkFlag==1) list.push("订单审核"),url.push("/ordermgr/orderStart.vm"),id.push("cd100020104"),wait.unshift("待审核"),waitId.unshift("waitVerify");
		list.push("批量打单");
		url.push("/ebusi/ordermgr/sendmgr/orderStart8.vm");
		id.push("cd100020101");
		if(scanFlag==1) list.push("扫描验货"),url.push("/ordermgr/forwardNewScanOrder.vm"),id.push("cd100020105");
		if(weightFlag==1) list.push("批量称重"),url.push("/ordermgr/forwardNewWeightOrder.vm"),id.push("cd100020106");
		list.push("订单发货");
		url.push("/ebusi/ordermgr/orderSendMgr.vm");
		id.push("cd100020112");
		var len=list.length;
		for(var i=0;i<len;i++){
			var text=list[i],num=i+1,isarrow=text=="订单发货"?false:true,
				cls=len==6?"col-xs-2":len==4?"col-xs-3":len==3?"col-xs-4":
					(len==5 && (text=="添加店铺" || text=="订单发货")) ? "col-xs-3" : "col-xs-2",
				json=[];
			if(!hasStore && text=="添加店铺") cls+=" on";//如果没有授权店铺，添加店铺要显著显示
			json.push(url[i]);
			json.push(id[i]);
			str+=returnStr(cls,num,text,isarrow,json);
		}
		$(".m-tab-left-list").html("").append(str);
		function returnStr(cls,num,text,isarrow,json){//cls样式名即宽度，num当前第几个,text显示的文字
			var _text=text=="添加店铺"?"店铺管理":text;
			var str='<div class="m-tab-left-list-item '+cls+'" data-id="'+json[1]+'" data-url="'+json[0]+'" data-text="'+_text+'">'+
						'<div class="b-se3 f-r5 bgf col-xs-12" style="line-height:48px;">'+
							'<span>'+num+'</span>'+text+
						'</div>';
			if(isarrow) str+='<em class="hg-icon hg-11-5"></em>';
			str+='</div>';
			return str;
		}		
		//绑定代办事项
		for(var i=0;i<wait.length;i++){
			var json=[];
			if(wait[i]=="待审核") json.push(url[1]),json.push(id[1]);
			else if(wait[i]=="待打单" && wait.length==4) json.push(url[2]),json.push(id[2]);
			else if(wait[i]=="待打单" && wait.length==3) json.push(url[1]),json.push(id[1]);
			else if(wait[i]=="待发货") json.push(url[url.length-1]),json.push(id[id.length-1]);
			else if(wait[i]=="当日已发") json.push("/ebusi/ordermgr/orderSendMgr.vm"),json.push("cd100020112");
			var cls=wait.length==4?"col-xs-3" : "col-xs-4";
			str1+=returnWait(cls,wait[i],waitId[i],json);
		}
		$(".m-tab-wait").html("").append(str1);
		//先执行一次
		countStatus();
		//每隔十分钟刷新一次
		setInterval(countStatus,5*60*1000);
		//获取待办事项的数字
		function countStatus(){
		    var status_flag = false;
		    if(checkFlag==1){
		        status_flag = true;
		    }
			a.ajaxCall({
				url:flyfish.bathPath+"/search/countStatus.vm",
				params:{"status_flag":status_flag},
				successCallback :function(result){
					//如果成功挨个赋值
					$("#waitVerify").text(result.verify_wait);
					$("#waitPrint").text(result.print_wait);
					$("#waitSend").text(result.send_wait);
					$("#hadSend").text(result.sended_today);
				},
				async : false
			});		
		}
		function returnWait(cls,text,id,json){
			var _text= text=="当日已发" || text=="待发货" ? "订单发货" : text=="待打单" ? "批量打单" : text=="待审核" ? "订单审核" : text;
			var type=!flyfish.common.isEmpty(json)?'data-text="'+_text+'" data-url="'+json[0]+'" data-id="'+json[1]+'"' : "";			
			var str='<div class="m-tab-wait-item b-rse3 '+cls+'" '+type+'>'+
						'<p class="c-red f-size24" id="'+id+'">0</p>'+
						'<p class="f-mt5">'+text+'</p>'+
					'</div>';
			return str;
		}		
		$("body").on({
			click:function(){
				flyfish.common.childAddIframe({
					title:$(this).attr("data-text"),
					url:flyfish.bathPath + $(this).attr("data-url"),
					id:$(this).attr("data-id")
				});
			}			
		},".m-tab-left-list-item");
		$("body").on({
			click:function(){
				if(flyfish.common.isEmpty($(this).attr("data-id"))) return;
				flyfish.common.childAddIframe({
					title:$(this).attr("data-text"),
					url:flyfish.bathPath + $(this).attr("data-url"),
					id:$(this).attr("data-id")
				});
			}			
		},".m-tab-wait-item");		
	}
	//以前老的index的一些代码
	function oldIndex(){
		//查看公告的
		$('body').on({
			click:function(){
				var id=$(this).attr("data-id");
				flyfish.common.s_addPop({
			        title:'公告',
			        url:flyfish.bathPath+"/notice/forwardnoticeShowInfo.vm?id="+id,
			        width:600,
			        height:400
				});
			}
		},".m-tab-notice-list li");
		//获取公告的ajax方法
		a.ajaxCall({
			url : flyfish.bathPath + '/notice/queryNotice.vm',
			params : {"status":1},
			successCallback :function(result){
				if(result!=null){
					var items=result.items,noticeHtml="";			
					for(var i=0;i<items.length;i++){
						//if(i==4){break;}						
						noticeHtml+='<li data-id="'+items[i].id+'">'+items[i].title+'</li>';
					}					
					$(".m-tab-notice-list ul").html("").append(noticeHtml);
				}
			},
			successTip : false,
			async : false
		});
		/*公告轮播*/
		var i=0,len=$(".m-tab-notice-list li").length,n=15;
		setInterval(function(){
			if(i==len) i=0;
			var index=-n*i;
			$(".m-tab-notice-list ul").stop().animate({"margin-top":index+"px"});
			i++;			
		},2000);
		//绑定首页banner广告图
		a.ajaxCall({
			url:flyfish.bathPath+"/setting/queryImg.vm",
			params:{"type":1,"bannerFlag":1},
			successCallback:function(result){
				result=result.data,str='';
				if(result.length<3) return;				
				for(var i=0;i<result.length;i++){
					var src=result[i].ossUrl,
						href=result[i].bannerUrl,
						bgcolor=result[i].backgroundColor;
					str+='<li class="col-xs-4"><a class="ebusi_gg" href="'+href+'" target="_blank" style="background:url('+src+') top center no-repeat #'+bgcolor+';"></a></li>';
				}
				$(".ebusi_gg ul").html('').append(str);
			}
		});	
		
	}
	function yk(){
		//点击是否跳转到融生意，易库的代码，这里没有任何作用
		$("#toRsy").click(function(){
			  $.artDialog({
				title:'跳转到融生意',
				content:"确认跳转到融生意？",
				ok:function(){
					//获取到用户信息 
					var user={};
					var master=$("#master").val();
					var mobile=$("#mobile").val();
					var loginName=$("#loginName").val();
					var ykIp="70E6CB1C945309149D3CF9743BFAE7037901E223DFFD21D7883C677B11B5CFB2A6402ED8996148D89CD284CF15138FAD1F221302D2C4E18D5166253B8C34583A3BFED2E19B86C9C1F3AF96E80263A6759FC2B70431ED4001091DE97F9DC1D3F86BC4784113D36F483353EC2F49E1F8D961C5C2B81EDE8BC9861C1D77A82545A4";
					//查询企业名称
					a.ajaxCall({
						url:flyfish.bathPath + "/setting/queryEBaseCompanyInfo.vm",
						params:{"master":master},
						isMask:false,
						successCallback:function(result){				
							var adminName=result.data.compName;
							var params = hsRSAEncrypt(encodeURIComponent(master+";"+mobile+";"+loginName+";"+adminName));
							$.ajax({  
						        type : "post",  
						        async:false,  
						        url : "http://home.ihuge.com/setting/ykReturnToRsy.vm?params="+params+"&ykIp="+ykIp,  
						        dataType : "jsonp",//数据类型为jsonp  
						        jsonp:"callbackfun",     
						        success : function(data){
						        	if(data.bizSuccess){
						        		window.location.href= "http://home.ihuge.com/index.vm";
						        	}
						        },  
						        error:function(xmlHttpRequest,textStatus,errorThrown){  
						        	flyfish.common.tooltip("跳转到融生意失败，请联系客服人员，或者直接前往融生意官网:home.ihuge.com注册登录","error",8000);
						        }  
						    });   
						}
					});
				},
				isCloseBtn:function(){
					return false;
				}
			});
		});
	}
	//10.同步商品、库存
	function syncItem(shopId){
		if(!hasStore){//如果没有授权店铺
			$.artDialog({
				isTitle:false,
				cancelText:'忽略',
				okText:'去授权',
				content:"您尚未授权店铺，请授权！",
				width:400,
				ok:function(){
					flyfish.common.childAddIframe({
						title:"店铺管理",
						url:flyfish.bathPath+'/storeManage/forwardStoreManage.vm',
						id:"cd100020501"
					});
				}
		    });
			return;
		}
		flyfish.common.LayerShow("正在为您同步商品、库存和订单",true);//顶部提示
		a.ajaxCall({
			url:flyfish.bathPath + '/ebusiGoodsMgr/GoodsDistribution.vm',
			params:{"status":"1","shopId":shopId,"syncStock":true},
			isMask:false,
			successCallback:function(result){
				//商品同步成功后同步订单
				if(result.success){
					syncOrder(shopId);
				}
			},
			errorCallback:function(result){
				//商品同步失败后不同步订单
				flyfish.common.LayerHide();//取消提示
				flyfish.common.tooltip("同步结束");
			},
			bizErrCallback:function(result){
				//商品同步失败后不同步订单
				flyfish.common.LayerHide();//取消提示
				flyfish.common.tooltip("同步结束");
			}
		})
	}
	//11.同步订单
	function syncOrder(shopId){
		if(!hasStore){//如果没有授权店铺
			$.artDialog({
				isTitle:false,
				cancelText:'忽略',
				okText:'去授权',
				content:"您尚未授权店铺，请授权！",
				width:400,
				ok:function(){
					flyfish.common.childAddIframe({
						title:"店铺管理",
						url:flyfish.bathPath+'/storeManage/forwardStoreManage.vm',
						id:"cd100020501"
					});
				}
		    });
			return;
		}
		a.ajaxCall({
			url:flyfish.bathPath + '/ordermgr/loadOrderInfo.vm',
			params:{"shopId":shopId},
			isMask:false,
			successCallback:function(result){
				flyfish.common.LayerHide();//取消提示
				//订单同步成功后首页顶部消息提示关闭
				if(result.success){
					flyfish.common.tooltip("同步成功");
				}
			},
			errorCallback:function(result){
				//订单同步失败后首页顶部消息提示关闭
				flyfish.common.LayerHide();//取消提示
				flyfish.common.tooltip("同步结束");
			},
			bizErrCallback:function(result){
				//商品同步失败后不同步订单
				flyfish.common.LayerHide();//取消提示
				flyfish.common.tooltip("同步结束");
			}
		})
	}
	return{
		_init:_init
	}
})
