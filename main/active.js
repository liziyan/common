/*
 * 首页的各种弹出层和活动
 * zhanghx13855  add  2016-07-08
 * 
 * */
define(["ajax","index","jquery.form","jquery.cookie"],function(a,ebusi){
    var sendAjax=true;//判断选择专业版本时是否需要发送请求
	var init=function(){		
		cookieSc();//收藏		
	}
	//2016-07-08从原先的活动剥离出来，收藏
	function cookieSc(){
		var str='<div class="m-sPopBg" id="fac_bg"></div><div class="fac" id="fac"><p>新增收藏功能啦 </p><a href="javascript:;" ><img src="'+flyfish.bathPath+'/static/images/fac_btn.png" class="f-mt40" /></a></div>';
		var css='<style id="fac_bg">.m-sPopBg{opacity:0.6;filter:alpha(opacity=60);position: fixed;background: #000;width: 100%;height: 100%;display: block;z-index: 998;top: 0;left: 0;}.fac{position:absolute;padding:50px 85px 0 15px;text-align:center;background:url('+flyfish.bathPath+'/static/images/fac_bg.png) no-repeat;width:200px;height:130px;top:30px;left:150px;z-index:999;}</style>'
		var cookie=$.cookie('isfacs');		
		if(!cookie){
			$("body").append(css);
			$("body").append(str);
			$("#addFav").css({"z-index":"999"});//显示收藏				
			cookie=$.cookie('isfacs', 'true', { expires: 365 });//加入cookie
		}
		$("#fac a").click(function(){
			$("#addFav").css({"z-index":"2"});
			$("#fac_bg,#fac").remove();
		});
	}
	//2017-01-03 新手指引-版本选择 caowl20684
	function addBbxz(fun){
		//弹出内容
	 var str='<p class="text-center f-size12 c-999 f-p20">亲！可在基础设置 版本及流程设置界面进行更改。</p>'+
		 '<div class="version-set clearfix">'+
		 '<div class="extr-version ver-titel active f-fl">'+
		 '<p class="hg-icon hg-b1-1"></p>'+
		 '<p class="version-info"></p>'+
		 '<p class="version-text f-size16 f-weight-bold">极速版</p>'+
		 '<p class="version-content f-size12">包含订单同步、批量打印（电子面单、快递单、发货单）、发货等功能</p>'+
		 '</div>'+
         '<div class="pro-version ver-titel f-fr">' +
         '<p class="hg-icon hg-b1-2"></p>'+
         '<p class="version-info"></p>'+
         '<p class="version-text f-size16 f-weight-bold">专业版</p>'+
         '<p class="version-content f-size12">在极速版基础上，增加商品管理、<br>库存管理、经营分析等功能</p>'+
		 '</div>'+
		 '</div>';
	 //弹出内容样式
	 var css='<style id="hyxz_bg">.version-set{padding:30px 150px;padding-bottom: 0;}.extr-version,.pro-version{position:relative;width:270px;height:180px;border:1px solid #ddd;text-align:center;padding:1px;}.hg-b1-1{width:38px;height:38px;margin:0 auto;margin-top:35px;margin-bottom: 20px; background-position:-265px -124px}.hg-b1-2{width:38px;height:38px;margin:0 auto;margin-top:35px;margin-bottom: 20px;background-position:-186px -180px;}.version-text{color:#999999;margin-bottom: 10px}.version-content{color:#999;padding:0 32px;}.btn-switch{width:80px;height:30px;outline:none;border:0;border-radius:3px;color:#fff;background-color:#4e6ba5;margin-top:60px}.extr-version:hover .hg-b1-1{background-position:-224px -125px}.extr-version:hover .version-text{color:#333}.extr-version:hover{border-color:#1ea6ff;cursor:pointer}.pro-version:hover .hg-b1-2{background-position:-235px -180px}.pro-version:hover{border-color:#1ea6ff;cursor:pointer}.pro-version:hover .version-text{color:#333}.active .version-info{position:absolute;top:0;left:100%;width:24px;height:24px;margin-top:-12px;margin-left:-12px;background:url('+flyfish.bathPath+'/static/images/hgicon.png) no-repeat -235px -94px;display:block;}.active .hg-b1-2{background-position:-235px -180px}.active .version-text{color:#1ea6ff}.active {padding:0;border:2px solid #1ea6ff;}.active .version-text{color:#1ea6ff}.active .version-content{color:#1ea6ff}.active:hover .version-text{color:#1ea6ff}.active .hg-b1-1{background-position:-224px -125px}.active:hover .hg-b1-1{background-position:-224px -125px}</style>';
		 $("body").append(css);//追加样式
		 $.artDialog({//iframe弹框
			 id:"hyxz",
			 content:str,
			 width:900,
			 isOkBtn:true,
			 isCloseBtn:false,
			 isTitle:true,
			 title:'选择版本',
			 okText:'确定',
             okBtnClass:'btn-orange',
			 isCloseIcon:false,//是否需要X关闭按钮
			 ok:function () {
				 var num=$('.dialog_highlight').html()=="确定"?"1":"2"; //判断哪个版本被选中，执行哪个版本任务
				 $("#version").val(num); //被选择版本记录在框架中
                 if(!sendAjax&&num==2){addlc(fun);$("#hyxz,#hyxz_bg").remove();}//如果选择专业版并且并且已经请求过一次,将不再发送
                 else{
					 a.ajaxCall({ //发送ajax服务
						 url: flyfish.bathPath +'/roleManage/modVersionSwitch.vm', //服务请求地址
						 params:{'version':num}, //服务请求参数
						 isMask:true, // 请求等待增加遮罩层
						 successCallback: function(){
							 if(num=="1"){ //判断哪个版本,1为极速版
								 if(fun && $.isFunction(fun)) {//是否有回调函数
									  fun.call(this);//执行回调函数内容
								 }
								 ebusi._init();//绑定主页流程，也就是绑定主页js
								 newSq();//弹出授权页面
							 }else{//如果不为极速版，则进入下一步进行流程设置
								 addlc(fun);
							 }
							 $("#hyxz,#hyxz_bg").remove();//执行完成后删除弹框
						 }
					 });
                 }
			 }
		 });
	 $("#hyxz .m-dialog-main").css({"padding":"0"});
        $("body").on({//绑定切换版本样式
            click:function(){
                if($(this).hasClass('active'))return;//如果已经选中就退出
				$(this).addClass('active').siblings('.active').removeClass('active');//如果没有选中设置选中并清空其他兄弟选中样式
                if($(this).hasClass('extr-version'))$('.dialog_highlight').html("确定");//如果为极速版就为确定
                else{//为专业版就为下一步
                    $('.dialog_highlight').html("下一步");
                }
            }
        },".ver-titel");
	 };
	//2016-01-03 新手指引-流程设置，增加版本切换内容修改 caowl20684
    function addlc(fun){
    	//流程设置弹框内容
        var str=
            '<p class="text-center f-size12 c-999 f-p20 f-pb50">亲，设置发货流程，可以在发货管理中修改您的流程</p>'+
            '<ul class="find_step new_step text-center f-size12 c-999" style="">'+
            '<li class="col-xs-20" processId="" id="100020104" sequence="1" functionName="订单审核">'+
            '<span class="find_bg" style="left:50%;width:50%;"></span>'+
            '<a href="javascript:;" class="ha-icon ha-3-3"></a>'+
            '<span>订单审核</span>'+
            '</li>'+
            '<li class="col-xs-20 on" processId="" id="100020101" sequence="2" functionName="批量打单">'+
            '<span>批量打单</span>'+
            '<span class="find_bg"></span>'+
            '<span class="ha-icon ha-3-2"></span>'+
            '</li>'+
            '<li class="col-xs-20" processId="" id="100020105" sequence="3" functionName="扫描验货">'+
            '<span>扫描验货</span>'+
            '<span class="find_bg"></span>'+
            '<a href="javascript:;" class="ha-icon ha-3-3"></a>'+
            '</li>'+
            '<li class="col-xs-20" processId="" id="100020106" sequence="4" functionName="批量称重">'+
            '<span>批量称重</span>'+
            '<span class="find_bg"></span>'+
            '<a href="javascript:;" class="ha-icon ha-3-3"></a>'+
            '</li>' +
            '<li class="col-xs-20 on">'+
            '<span>发货</span>'+
            '<span class="find_bg" style="width:50%"></span>'+
            '<a href="javascript:;" class="hg-icon hg-process"></a>'+
            '</li>' +
            '</ul>';
        //流程设置弹框内容样式
        var css='<style id="lcsz_bg">#lcsz .m-sPopTitle,#lcsz .m-dialog-header{background: #d1d1d2;border:0;}#lcsz .m-dialog-content{padding:0;}.find_step{margin:0 auto;width: 525px;}.find_step li.col-xs-6{position: relative;z-index: 2;height: 100%;}.ha-icon{background:url('+flyfish.bathPath+'/static/images/ha-icon.png) no-repeat;position:absolute;width:34px;height:34px;display:inline-block;top:0;left:50%;margin-left:-17px;z-index:4}.ha-3-1{background-position:0 -120px;}.ha-3-2{background-position:-34px -120px;}.ha-3-3{background-position:-68px -120px;}.ha-3-1:hover{background-position:0 -154px;}.ha-3-3:hover{background-position:-68px -154px;}.new_step{height:80px;margin:20px auto;margin-bottom:60px;}.find_step li.col-xs-20{position: relative;z-index: 2;height: 100%;padding-top: 50px;}.new_step .find_bg{top: 16px;}.new_step li.on{color:#666}.new_step li.on .find_bg{background: #fec667;border-color: #fec667;}.m-sPopBg{opacity: .8;filter: alpha(opacity=80);}.m-dialog-buttons{margin-bottom:50px;}.closeBtn{border:0;background:#ececec}</style>';
        //追加样式到页面
        $("body").append(css);
        $.artDialog({//iframe弹框
            id:"lcsz",
            content:str,
            width:900,
            height:550,
            isOkBtn:true,
            okText: "确定",
            isCloseBtn:true,
            cancelText:"上一步",
            cancelBtnClass:'btn-gray',
            cancel: function () {//点击取消按钮操作方法
                sendAjax=false;//设置为已发送过专业版标识
                addBbxz(fun);//点击上一步,弹出版本设置
                $("#lcsz,#lcsz_bg").remove();//清除流程设置弹框
            },
            isTitle:true,//是否需要标题
            isCloseIcon:false,//是否需要点击X关闭
            title:"流程设置",//标题内容
            ok:function(){
                //这里添加写入数据库的方法
                var processes=$(".new_step li");//获取流程节点
                var eebusiProcessReqDtoList = new Array();//定义数组
                for(var i=0;i<processes.length-1;i++){//循环各个流程节点
                    var temp=processes.eq(i);//定义变量接收每个流程节点
                    var eebusiProcessReqDto ={};//定义对象,用于提交数据
                    eebusiProcessReqDto.id=temp.attr("processId");//获取流程节点id
                    eebusiProcessReqDto.functionId=temp.attr("id");//获取id
                    eebusiProcessReqDto.isShow=temp.hasClass("on") ? "1" : "0";//是否被选中
                    eebusiProcessReqDto.proSequence=temp.attr("sequence");//获取流程设置节点代号
                    eebusiProcessReqDto.functionName=temp.attr("functionName");//获取流程节点内容
                    eebusiProcessReqDtoList.push(eebusiProcessReqDto);//将构造好对象放入数组中
                }
                var epurForm = {};//定义对象
                epurForm.eebusiProcessReqDtoList = eebusiProcessReqDtoList;//赋值
                //组装成提交的json数据
                var epurFormInfo = new Array();//定义数组
                epurFormInfo.push(epurForm);//将构造好的流程节点内容数组放入epurFormInfo数组中
                var jsonData = new Array();//定义用于构造json数据数组
                var data = {};//定义data对象
                data.eebusiProcessOperReqDto = JSON.stringify(epurFormInfo[0]);//转化为json格式数据
                jsonData.push(data);//将json格式数据放入要提交的数组中
                a.ajaxCall({ //ajax请求
                    url:flyfish.bathPath + '/process/modProcess.vm',//服务请求地址
                    params:jsonData[0],//请求参数
                    successCallback:function(){//成功后回调
                        a.ajaxCall({//成功会再次进行请求
                            url:flyfish.bathPath + '/process/userLogoutAll.vm',//服务请求地址
                            successCallback:function(){//成功后回调
                                a.ajaxCall({//成功会再次进行请求
                                    url:flyfish.bathPath + '/process/queryProcessInDB.vm',//服务请求地址
                                    successCallback:function(result){//成功后回调
                                        var data = result.data;//返回数据
                                        for(var i=0;i<data.length;i++){//循环返回参数
                                            if("100020104" == (data[i].functionId)){//如果订单审核存在
                                                $("#checkFlag").val(data[i].isShow);//将订单审核是否选中存入框架中
                                            }
                                            if("100020105" == (data[i].functionId)){//如果扫描验货存在
                                                $("#scanFlag").val(data[i].isShow);//将扫描验货是否选中存入框架中
                                            }
                                            if("100020106" == (data[i].functionId)){//如果批量称重存在
                                                $("#weightFlag").val(data[i].isShow);//将批量称重是否选中存入框架中
                                            }
                                        }
                                        //成功之后绑定首页流程
                                        ebusi._init();
                                        //成功后弹出授权页面
                                        newSq();
                                        $("#lcsz,#lcsz_bg").remove();
                                        if(fun && $.isFunction(fun)) {//是否有回调函数
                                            fun.call(this);//执行回调方法
                                        }
                                    },
                                    errorCallback:function(){//请求失败回调
                                        window.location.reload();//刷新页面
                                    }
                                });
                            },isMask:true//等待遮罩
                        });
                    },
                    errorCallback:null,//请求失败回调
                    isMask:true//等待遮罩
                });
            }
        });
		$("body .ha-icon").unbind('click').bind('click',function(){//设置流程各节点是否选中样式
			if($(this).hasClass("ha-3-3")){//判断是否选中,为真为未选中
				$(this).parents("li").addClass("on");//给父元素加class
				$(this).removeClass("ha-3-3").addClass("ha-3-1");//自己变为选中
			}else if($(this).hasClass("ha-3-1")){//判断是否选中,为真为选中
				$(this).parents("li").removeClass("on");//删除父元素加class
				$(this).removeClass("ha-3-1").addClass("ha-3-3");//自己取消选中
			}
        });
    }
	//2016-07-08 新手指引-授权
	function newSq(){	
		//保存到后台发货单模板,默认三种模板，一种普通发货单，一种热敏发货单，一种小票发货单
        a.ajaxCall({//Ajax请求
            url:flyfish.bathPath + '/sendmgr/addThrSendModel.vm' ,//服务请求地址
            successCallback: function (result){},//成功后回调
            errorCallback: function (){}//失败后回调
        });	
        judgeStore();//判断是否已经有授权店铺,如果没有授权店铺则弹出授权店铺
		$("#popCon .m-sPopTitle,#popCon .m-dialog-header").css({"background":"#d1d1d2","border":"0"});
	}
	//2017-01-06 新用户的判断由是否选择行业改为是否选择版本
	function judgeVersion(fun){
        a.ajaxCall({//Ajax请求
            url:flyfish.bathPath +'/system/queryEBaseCompanyInfoForActivity.vm',//请求地址,版本设置
            params:{},//请求参数
            successCallback:function(result){//成功后回调
            	var version=result.version//返回参数
            	$("#version").val(version);//将版本信息存入框架中
            	$("#compName").val(result.compName);//将商户名存入框架中
            	if(version){//判断是否已经设置版本,为真表示已经设置版本信息
            		if(fun && $.isFunction(fun)) {//是否有回调函数
						fun.call(this);//执行回调方法
					}
            		ebusi._init();//绑定首页流程
            		judgeStore();//判断是否已经有授权店铺,如果没有授权店铺则弹出授权店铺
            	}else{
            		addBbxz(fun);//否则进行版本设置,弹出版本设置界面
            	}
            }
        });
	}
	function judgeStore(){//判断是否已经有授权店铺,如果没有授权店铺则弹出授权店铺
		a.ajaxCall({//Ajax请求
			url : flyfish.bathPath+'/storeManage/queryStore.vm',//判断店铺是否已授权地址
			params:{page:"1",rows:"10"},//请求参数
			successCallback : function(data){//成功后回调
	            var len = data.pageDto.rows.length;//返回参数
	            if(len == 0){//如果返回数据为空
	            	  hasStore=false;//设置未授权店铺标识
	            	  $("#hasStore").val("false");//设置未授权店铺,保存在框架中
		              flyfish.common.s_addPop({//弹出店铺授权操作层
		                  title: '店铺授权' ,//弹层标题
		                  url:flyfish.bathPath+"/storeManage/forwardStoreAddAuth.vm" ,//跳转url
		                  width:740,//设置弹层宽
		                  height:483//设置弹层高
		              });  
		              getStore();//进行店铺授权设置
	             }else{ //如果已经授权
	            	 hasStore=true;//设置已授权店铺标识
	            	 $("#hasStore").val("true");//设置已授权店铺,保存在框架中
	            	 authChange();//弹出版本更新的提示
	            	 moneyActive();//活动弹窗
	             }
			},
			errorCallback : function(){},//失败后回调
			successTip : false,//成功提示信息
			async : false//同步请求
		});
	}
	function getStore(){//设置店铺授权
		$("#popCon #sPopClose").click(function(){//绑定点击事件
			 if($(this).prev("strong").text()=="店铺授权"){//判断点击元素上一个兄弟元素内容是否为店铺授权
				 a.ajaxCall({//Ajax请求
					url : flyfish.bathPath+'/storeManage/queryStore.vm',//设置授权店铺请求地址
					params:{page:"1",rows:"10"},//请求参数
					successCallback : function(data){//成功后回调
			            var len = data.pageDto.rows.length;//返回参数
			            if(len == 0) {//如果参数为空
			            	hasStore=false;//设置未授权标识
			            	$("#hasStore").val("false");//设置未授权标识保存框架中
			            }					             
			            else{//如果授权成功
			            	hasStore=true;//设置已授权标识
		            	    $("#hasStore").val("true");//设置已授权标识保存框架中
			            } 
					},
					errorCallback : function(){},//失败后回调
					successTip : false,//成功后回调
					async : false//同步请求
				});
			 }
		});
	}
	//2016-10-18 3号业务改为4号业务的弹出提示
	//2017-01-06 已经被他们改为版本更新的提示
	function authChange(){
		a.ajaxCall({
			url : flyfish.bathPath+'/pop/queryPopInfo.vm',
			bizErrTip:true,
			successCallback : function(result){
				if(result.success){
					var str;
					if (result.type ==2){
						//软件版本更新公告
						str ='<div class="m-sPopBg" id="authChange_bg"></div>'+
							'<div class="authChange" id="authChange">'+
								'<div class="auth-box">'+
									'<p  style="font-size: 22px;font-weight: bold;text-align: center;margin-bottom: 10px;">融生意12月26日晚新版本公告</p>'+
									'<p>1. 首页新增待办事项、系统流程、基础设置；</p>'+
									'<p>2. 左侧菜单栏新增基础设置模块，集中管理设置项；</p>'+
									'<p>3. 首页&订单查询页面，可精确查找订单；</p>'+
									'<p>4. 快递单发货人信息取自店铺；</p>'+
									'<p>5. 电子面单号余额可显示；</p>'+
									'<p>6. 多个电子面单账号统一管理；</p>'+
									'<p>7. 可使用韵达、中通、顺丰网点电子面单；</p>'+
									'<p>8. 新增非淘系电子面单功能，无淘宝店铺也可使用菜鸟电子面单；</p>'+
									'<p>9. 授权淘宝店铺后，电子面单账号和快递模版自动生成。</p>'+
									'<p>详情及操作，详见链接：</p>'+
									'<a href="http://ask.ihuge.com/question/1715" target="_blank" style="color:#ffe021">&nbsp;&nbsp;&nbsp;&nbsp;http://ask.ihuge.com/question/1715</a>'+
									'<p >如有疑问可拨打免费客服热线：0571-26695000，或联系在线客服</p>'+
									'<p class="f-mt20 text-center"><a href="javascript:;" class="authChangeSave">我知道了</a></p>'+
								'</div>'+
							'</div>'; 
					}else return;
					var css='<style id="authChange_style">.m-sPopBg{opacity:0.6;filter:alpha(opacity=60);position: fixed;background: #000;width: 100%;height: 100%;display: block;z-index: 998;top: 0;left: 0;}.authChange{width:750px;background:url('+flyfish.bathPath+'/static/images/avctive-authchange-2.png) no-repeat top left;min-height:500px;position:fixed;top:0;left:50%;margin-left:-375px;z-index:999;padding:0 86px 0 84px;}.auth-box{width:581px;background:url('+flyfish.bathPath+'/static/images/avctive-authchange-1.jpg) no-repeat left top #405099;border-radius:20px;overflow:hidden;padding:160px 45px 20px 45px;min-height:500px;color:#fff;font-size:16px;line-height:1.8em}.authChangeSave{background:#ffe021;height:50px;display:inline-block;border-radius:5px;line-height:50px;box-shadow:0 5px 0 #e5912b;width:200px;text-align:center;color:#ef4800;font-size:21px;}.authChangeSave:hover{color:#fff;background:#e5912b}</style>'
					$("body").append(css);
					$("body").append(str);	
					var h=$(window).height(),_h=$(".auth-box").outerHeight(),__h=(h-_h)/2,___h=__h>94 ? 94 : __h;
					$(".authChange").css({"padding-top":___h+"px"});
					$(".authChangeSave").click(function(){
						$("#authChange_style,#authChange_bg,#authChange").remove();
						//点击我知道了,修改是否弹出通知标记
						a.ajaxCall({
							url : flyfish.bathPath+'/pop/updatePopInfo.vm',
							params:{popFlag:"1",'id':result.id},
							successCallback : function(result){
							}
						});
					});				
				}
			}
		});		
	}
	
	//2016-10-28 代金券活动提示框
	function moneyActive(){
		a.ajaxCall({
			url : flyfish.bathPath+'/activity-web/user/eventNotify/queryEventNotify.vm',
			params:{},
			bizErrTip:true,
			successCallback : function(result){
				var data = result.data;
				if(data.hasNotify){
					var str='<div class="m-sPopBg" id="moneyActive_bg"></div>'+
					'<div class="moneyActive" id="moneyActive">'+
						'<div class="moneyTopBg"></div>'+
						'<div class="moneyClose">X</div>'+
						'<div class="money-box">'+
							'<p class="f-size18">感谢您选择融生意软件 </p>'+
							'<p class="f-mt20 f-mb20">为了您能更好进行使用，将<span class="f-size24" style="color:#ffe021">1元赠送您融生意1个月版</span>，请点击“<span class="f-size18" style="color:#ffe021">参加活动</span>”进行1个月版的订购和返现</p>'+
							'<p class="f-size14 f-mb20">提醒：订购所产生的费用我们会进行返还，请在订购成功后关注返款短信，<span class="f-weight-bold f-size24">每个用户最多可免费赠送2次。</span></p>'+
							'<p class="f-mt30 f-mb20 text-center"><a href="javascript:;" class="moneyActiveSave">参加活动</a></p>'+
							'<p class="text-right f-size12"><input type="checkbox" id="moneyCk" name="ck" /> 我知道了，下次不再提示</p>'+
						'</div>'+
					'</div>';
					var css='<style id="moneyActive_style">'+
								'.m-sPopBg{opacity:0.6;filter:alpha(opacity=60);position: fixed;background: #000;width: 100%;height: 100%;display: block;z-index: 998;top: 0;left: 0;}'+
								'.moneyActive{width:750px;background:url(http://www.ihuge.com/templets/default/img/moneyActive_bg.png) no-repeat top left;min-height:500px;position:fixed;top:0;left:50%;margin-left:-375px;z-index:999;padding:0 86px 0 84px;}'+
								'.moneyTopBg{background:url(http://www.ihuge.com/templets/default/img/moneyActive_top.png) no-repeat top left;width:581px;height:144px;display:inline-block;}'+
								'.money-box{position:relative;z-index:999;width:581px;background:#405099;border-radius:0 0 20px 20px;overflow:hidden;padding:45px 45px 20px;min-height:320px;color:#fff;font-size:16px;line-height:1.8em}'+
								'.moneyActiveSave{background:#ffe021;height:50px;display:inline-block;border-radius:5px;line-height:50px;box-shadow:0 5px 0 #e5912b;width:200px;text-align:center;color:#ef4800;font-size:21px;}'+
								'.moneyActiveSave:hover{color:#fff;background:#e5912b}'+
								'.moneyClose{position:absolute;right:95px;top:60px;cursor:pointer;line-height:26px;font-size:16px;background:rgba(0,0,0,.4);border-radius:100%;color:#fff;text-align:center;width:26px;height:26px;}'+
							'</style>';	
					$("body").append(css);
					$("body").append(str);	
					var h=$(window).height(),_h=$(".moneyActive").outerHeight(),__h=(h-_h)/2,___h=__h>80 ? 80 : __h;
					$(".moneyActive").css({"padding-top":___h+"px"});
					$(".moneyClose").css({"top":(___h+60)+"px"});
					$(".moneyActiveSave").click(function(){		
						var bool=$("#moneyCk").is(":checked");//判断是否选中知道了的勾选框
						//下面写点击参加活动的方法，完成后删除弹出层	
						a.ajaxCall({
							url : flyfish.bathPath + '/activity-web/user/usercenter/submitInviteCode.vm',
							params : {'inviteCode' : data.inviteCode},
							successCallback : function(result) {
								if(result.errCode == "000000"){
									flyfish.common.tooltip(result.errMsg,"succeed");
								}else{
									flyfish.common.tooltip(result.errMsg,"error");
								}
								window.open("https://fuwu.taobao.com/ser/detail.html?spm=a1z13.8114210.1234-fwlb.4.i7r0R0&service_code=FW_GOODS-1000271137");
								setNextNotNotify(data.id);
							},
							isMask : true
						});	
						
					});//点关闭按钮
					$(".moneyClose").click(function(){
						var bool=$("#moneyCk").is(":checked");//判断是否选中知道了的勾选框
						//下面写点击关闭按钮的方法，完成后删除弹出层			
						if(bool){
							setNextNotNotify(data.id);
						}else{
							$("#moneyActive_style,#moneyActive_bg,#moneyActive").remove();//删除弹出层
						}
					});
				}
			}
		});
	}
	
	function setNextNotNotify(notifyId){
		a.ajaxCall({
			url : flyfish.bathPath + '/activity-web/user/eventNotify/setNextNotNotify.vm',
			params : {'id' : notifyId},
			successCallback : function(result) {
				$("#moneyActive_style,#moneyActive_bg,#moneyActive").remove();//删除弹出层
			},
			errorCallback : function(){
				$("#moneyActive_style,#moneyActive_bg,#moneyActive").remove();//删除弹出层
			},
			bizErrCallback : function(){
				$("#moneyActive_style,#moneyActive_bg,#moneyActive").remove();//删除弹出层
			}
		});	
	}
	
	//2016-11-1有奖调研的方法
	function invest(){
		if(!('01'===$("#roleCode").val())){
			$(".invest").hide();
		}else{
			a.ajaxCall({
				url:flyfish.bathPath+'/sys/queryQuestionFeedbackResult.vm',
				params:{},
				async:false,
				successCallback : function(result){
					if(result.success){
						if(result.data!=undefined&&result.data.length>0){						
							$(".invest").hide();
							return;
						}
					}
				}
			});		
			$(".invest").click(function(){//点击事件	
				var url='';
				a.ajaxCall({
					url:flyfish.bathPath+'/sys/returnSign.vm',
					params:{},
					async:false,
					successCallback : function(result){
						if(result.success){
							if(result.data==undefined){
								alert('加密失败，请重试');
								return;
							}
							url="sign="+result.data;//给url赋值
							window.open("http://www.ihuge.com/invest/?"+url);
						}
					}
				});		
			});
		}
	}	
	return{
		_init:init,
		loadHy:judgeVersion
	}
})
