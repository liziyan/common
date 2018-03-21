/**
* 功能说明:		注册等外部页面获取验证码公用模块
* @author:		vivy <zhanghx13855>
* @time:		2016-03-14 16:15:30
* @version:		V1.1.0
* @update:		2016-03-29 添加注释
*
*/
define(["verify","ajax"],function(check,a){
	function ErrorFn(){		
		flyfish.common.tooltip("网络异常，请刷新页面","error");
	};
	/*手机号码*/
	function validate_linkPhone(){		
		if(flyfish.common.rule.phone.test($("#linkPhone").val())){			
			a.ajaxCall({
				url:flyfish.bathPath + '/setting/queryEBaseCompanyInfoForRegister.vm',
				params:{"linkPhone":$(this).val()},
				successCallback:function(result,a,b,obj){					
					var msg="该手机号已被注册，请重新输入";
					if(result.success==true&&result.mobile==undefined){
						if(flyfish.common.rule.phone.test($("#linkPhone").val())) check._phoneConVer();
					}else{
						check._clearTips($("#linkPhone"));
						check._resultTips($("#linkPhone"),false,msg);
					}
				},
				errorCallback:function(result){
					var msg="该手机号可能被多次注册，请联系管理员";					
					check._clearTips($("#linkPhone"));
					check._resultTips($("#linkPhone"),false,msg);
				},
				bizErrCallback:function(result){
					check._clearTips($("#linkPhone"));
					check._resultTips($("#linkPhone"),false,result.errMsg);
				},
				bizErrTip:true
			});
		}
	};
	/*图形验证码*/
	function validate_verifyYz(obj,url){		
		if($(this).attr("disabled")) return;
		$("#verifyNo").removeClass("v_error");
		if($("#randCode").val()==""){
			check._resultTips($("#randCode"),false,"图形验证码输入错误");
			return;
		}
		if($("#randCode").hasClass("v_error")){
			check._resultTips($("#randCode"),false,"图形验证码输入错误");
			return;
		}
		if($(".v_error").length>0){
			check._resultTips($("#verifyNo"),false,"信息填写错误");
			return;
		}
		var linkPhone = $("#linkPhone").val();	
		a.ajaxCall({
			url:url,
			params:{"phoneNo":linkPhone,"verifyNo":$("#randCode").val()},
			isMask:false,
			bizErrTip:true,
			successCallback:function(result){
				if(result.success) {	
					$("#tokenId").attr("value", result.tokenId);  // 设置tokenId
					$("#verifyNo").attr("value", "");  // 验证码设置为空
					$("#time_box").text("60 s后可重发");
					check._sendVerify();
				}
			},
			errorCallback:function(){
				check._resultTips($("#verifyNo"),false,result.errMsg);
			},
			bizErrCallback:function(result){
				changeCode();
				if(result.errCode=="012004"){
					check._resultTips($("#randCode"),false,"图形验证码输入错误");
				}else{
					check._resultTips($("#verifyNo"),false,result.errMsg);
				}
			}
		});	
	};
	// 动态生成验证码
	function changeCode(){
		$("#randomCode")[0].src = flyfish.bathPath +"/randomCode.vm?t="+new Date().getTime();  
		$('#randCode').val("");// 验证码变化后，清空验证码输入框
	};
	// 验证码请求
	function validate_randCode(obj,num){
		if(obj.val() != ''){			
			a.ajaxCall({
				url:flyfish.bathPath + '/setting/verifyRandCode.vm',
				params:{"randCode":obj.val()},
				isMask:false,
				bizErrTip:true,
				successCallback:function(result,a,b,obj){
					var msg="图形验证码输入错误";					
					if(result.success==true&&result.data==true){
						check._clearTips($("#randCode"));
						$("#randCode").removeClass("v_error");
					}else{
						changeCode();
						check._resultTips($("#randCode"),false,msg);
					}
				},
				errorCallback:ErrorFn,
				bizErrCallback:function(result,a,b,obj){
					if(num=="admin"){
						var msg="图形验证码异常，请联系管理员";					
						check._clearTips($("#randCodeError"));
						check._resultTips($("#randCodeError"),false,msg);
					}				
				}
			});
		}
	};	
	return{
		ErrorFn:ErrorFn,
		validate_linkPhone:validate_linkPhone,		
		validate_verifyYz:validate_verifyYz,
		changeCode:changeCode,
		validate_randCode:validate_randCode	
	}
});