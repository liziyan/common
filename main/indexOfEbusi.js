define(["ajax","auth","jquery.cookie","pwd"],function(a,d){
	var checkFlag,scanFlag;//checkFlag=1的时候就是选择了订单审核模块,scanFlag=1的时候就是选择了扫描验货
	var _init=function(){		
		checkFlag=$("#checkFlag").val();
		scanFlag=$("#scanFlag").val();		
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
				})
		});

		$(".dpsq .item").hover(function(){
			$(this).find("p").stop().fadeToggle();	
		});
		$(".btns span").click(function(){
			$(this).addClass("on").siblings("span").removeClass("on");
			var w=270,i=$(this).index();
			$(".ebusi_sq").stop(true, false).animate({"marginLeft":-w * i +"px"}, 500);		
		});
		a.ajaxCall({
			url:flyfish.bathPath + "/index/queryNumInfo.vm",
			isMask:false,
			successCallback:function(result){				
				if(result&&result.ebusiNumInfo&&result.ebusiNumInfo.num1){
					$("#unPrintNum").html(result.ebusiNumInfo.num1);
				}
				if(result&&result.ebusiNumInfo&&result.ebusiNumInfo.num2){
					$("#unSendNum").html(result.ebusiNumInfo.num2);
				}	
			}
		});
		a.ajaxCall({
			url : flyfish.bathPath + '/notice/queryNotice.vm',
			params : {"status":1},
			successCallback :function(result){
				if(result!=null){
					var items=result.items;
					var noticeHtml = "";
					noticeHtml += "<ul class='f-p20 f-pt10 f-pb10'>";
					for(var i=0;i<items.length;i++){
						if(i==4){
							break;
						}
						noticeHtml += "<li><a data-id='"+items[i].id+"' href='javascript:;'>"
										+"<em class='f-r100'></em>"+items[i].title+"</a>"
										+"</li>";
					}
					noticeHtml.append += "</ul>";
					$("#notice").after(noticeHtml);
				}
			},
			successTip : false,
			async : false
		});		
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
		},".ebusi_rb li a");
		$("#keyword").keydown(function(e){
			var event = window.event || e;
			if(event.keyCode==13) sendOrder();
		});
		$("#searchOrder").click(function(){
			sendOrder();
		});
		$(".sendMgr").click(function(){
			sendMgr();
		});
		$("#orderLoad").click(function(){
			orderLoad();
		});
		$("#printTemplate").click(function(){
			printTemplate();
		});
		$("#exaMgr").click(function(){
			checkFlag=$("#checkFlag").val();
			if(checkFlag == "1"){
				exaMgr();
			}else{
				$.artDialog({
					isTitle:false,
					content:"您尚未开启订单审核，请到发货流程中设置",
					okText:"确定",
					ok:function(){
						//跳到流程设置
						sendFlow();
					}
				});
			}
		});
		$("#scanMgr").click(function(){
			scanFlag=$("#scanFlag").val();
			if(scanFlag == "1"){
				scanMgr();
			}else{
				$.artDialog({
					isTitle:false,
					content:"您尚未开启扫描验货，请到发货流程中设置",
					okText:"确定",
					ok:function(){
					//跳到流程设置
						sendFlow();
					}
				});
			}
		});
		$("#sync_items").click(function(){
			sync_items();
		});
		$("#storeMgr").click(function(){
			storeMgr();
		});
		$("#backMgr").click(function(){
			backMgr();
		});
		/*店铺授权*/
		$(".item:not('.disopen')").click(function(){
			var u=$(this).attr("data-id");
			d.auth(u);
		});
		var shopId = $.cookie("sq");
		$.cookie('sq', '', { expires: -1 }); // 删除 cookie
		if(!flyfish.common.isEmpty(shopId)){
			//授权成功后自动同步商品库存、订单
			syncItem(shopId);
		}
	};
	//1.订单同步
	function orderLoad(){		
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
		if($("#_layer_sync",top.document).length==1) return;
		flyfish.common.LayerShow("订单同步中，请稍后",true);
		a.ajaxCall({
			url:flyfish.bathPath + '/ordermgr/loadAllOrder.vm',
			successCallback:function(){
				flyfish.common.LayerHide();
				flyfish.common.tooltip("操作成功","",1000);
			},
			bizErrTip:true,
			bizErrCallback:function(result){
				flyfish.common.LayerHide();
				if("170018" == result.errCode){
					$.artDialog({
						isTitle:false,
						cancelText:'忽略',
						okText:'重新授权',
						content:"您有店铺已失效，请重新授权！",
						ok:function(){
							flyfish.common.childAddIframe({
								title:"店铺管理",
								url:flyfish.bathPath+'/storeManage/forwardStoreManage.vm',
								id:"cd100020501"
							});
						}
				    });
				}else if("170019" == result.errCode){
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
				}else if("170020" == result.errCode){
					$.artDialog({
						isTitle:false,
						cancelText:'忽略',
						okText:'启用',
						content:"您的店铺已停用，请重新启用！",
						ok:function(){
							flyfish.common.childAddIframe({
								title:"店铺管理",
								url:flyfish.bathPath+'/storeManage/forwardStoreManage.vm',
								id:"cd100020501"
							});
						}
				    });
				}else{
					flyfish.common.tooltip(result.errMsg,"error",2000);
				}
			},
			errorCallback:function(){
				flyfish.common.LayerHide();
			}
		});
	};	
	//2.订单审核
	function exaMgr(type){
		flyfish.common.childAddIframe({
			title:"订单审核",
			url:flyfish.bathPath + "/ordermgr/orderStart.vm",
			id:"cd100020104"
		});
	}
	//5.跳转到发货流程
	function sendFlow(){
		flyfish.common.childAddIframe({
			title:"发货流程",
			url:flyfish.bathPath + "/process/forwardProcessOper.vm",
			id:"cd100020109"
		});
	}
	//3.打单发货	
	function sendMgr(type){
		flyfish.common.childAddIframe({
			title:"批量打单",
			url:flyfish.bathPath + "/ebusi/ordermgr/sendmgr/orderStart8.vm",
			id:"cd100020101",
			isChange:true
		});
	};
	//4.扫描验货
	function scanMgr(){
		flyfish.common.childAddIframe({
			title:"扫描验货",
			url:flyfish.bathPath + "/ordermgr/forwardNewScanOrder.vm",
			id:"cd100020105"
		});
	};
	//5.商品同步
	function sync_items(){
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
		if($("#_layer_sync",top.document).length==1) return;
		/*if (!confirm("系统将要自动同步平台商品，您确定要同步吗？")) {
	        return;
	    }*/
		flyfish.common.LayerShow("商品同步中，请稍后",true);
		a.ajaxCall({
			url:flyfish.bathPath + '/ebusiGoodsMgr/GoodsDistribution.vm',
			params:{"status":"1"},
			successTip:true,
			successCallback:function(result){
				flyfish.common.LayerHide();
				flyfish.common.tooltip(result.errMsg,"",3000);
			},
			errorCallback:function(){
				flyfish.common.LayerHide();
			},
			bizErrCallback:function(){flyfish.common.LayerHide();}
		});
	};
	//6.库存管理
	function storeMgr(type){
		flyfish.common.childAddIframe({
			title:"商品库存",
			url:flyfish.bathPath + "/inventory/forwardStoreMgr.vm",
			id:"cd100020301"
		});
	};
	//6.库存管理
	function storeMgr(type){
		flyfish.common.childAddIframe({
			title:"商品库存",
			url:flyfish.bathPath + "/inventory/forwardStoreMgr.vm",
			id:"cd100020301"
		});
	};
	//7.退货登记
	function backMgr(type){
		flyfish.common.childAddIframe({
			title:"退货登记",
			url:flyfish.bathPath + "/ebusi/ordermgr/returnmgr/queryReturnReg.vm",
			id:"cd100020107"
		});
	};
	//8.快递设置
	function printTemplate(){
		flyfish.common.childAddIframe({
			title:"打单模板设置",
			url:flyfish.bathPath + "/printmgr/forwardTemplateMgr.vm",
			id:"cd100020103"
		});
	};	
	//9.订单查询
	function sendOrder(){		
		flyfish.common.childAddIframe({
			title:"批量打单",
			url:flyfish.bathPath+"/ebusi/ordermgr/sendmgr/orderStart8.vm?tab=0&keyword="+$("#keyword").val(),
			id:"cd100020101",
			isChange:true
		});
	};
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
});
