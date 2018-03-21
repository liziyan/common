/**
* 功能说明:		注册页面
* @author:		vivy <zhanghx13855>
* @time:		2016-03-14 16:15:30
* @version:		V1.1.0
* @update:		2016-03-29 添加注释
*
*/
require.config({
	shim: {
		"underscore": {
			exports: "_"
		}
	},
	paths: {
		"jquery.form": "../base/jquery-form.min",
		"ajax":"../base/ajax",
		"verify":"../base/verify",
		"regCommon":'registerCommon'
	}
});
require(["verify","ajax","regCommon","jquery.form"],function(check,a,b){
	var _initAdmin=function(){
		$("#linkPhone").blur(validate_linkPhone_admin);
		$("#linkPhone").keyup(validate_linkPhone_admin);		
		$("#verifyYz").click(function(){b.validate_verifyYz($(this),flyfish.bathPath + '/setting/findAdminNoMsgSend.vm');});
		$("#randCode").blur(function(){b.validate_randCode($(this),"admin")});
		check.verifyCheck({isReg:true});
		$("#btn_part1").click(function(){
			if(!check._click()) return;
			if($(".v_error").length>0) return;	
			if($("#randCode").val()==""){check._resultTips($("#randCode"),false,"请输入图形验证码");$("#randCode").focus();return;}
			a.ajaxFormCall({
				formId:"iform",
				beforeSubmitFn:function(formData, jqForm, options){
					return true;
				},
				successTip:true,
				successCallback:function(result){
					$("#adminNo").html(result.data.compName);					
					$(".find_main").hide();
					$("#success").show();
					$("#linkPhone").val("");
					$("#randCode").val("");
					$("#verifyNo").val("");
					check.countdown({
						  maxTime:10,
						  ing:function(v){
							$("#times").text(v);  
						  },
						  after:function(){
							 window.location.href=flyfish.bathPath + '/login.vm';
						  }
					 });
				},
				isMask:false,
				bizErrTip:true,
				bizErrCallback:function(result) {
					b.changeCode();
					if(result.errMsg=="验证码错误"||result.errMsg=="验证码超时，请重新获取"||result.errMsg=="验证码不可用，请更换验证码"){
						$("#verifyNo").val("");
						check._clearTips($("#verifyNo"));
						check._resultTips($("#verifyNo"),false,result.errMsg);
					}else{
						$.artDialog({
							title:'错误',
							isCloseBtn:false,
							content:result.errMsg
					    });
					}
					
				}
			})
		});
		/*切换图形验证码*/
		$(".changeCode").click(function(){
			b.changeCode();
		});
	};	
	function validate_linkPhone_admin(){
		if(flyfish.common.rule.phone.test($("#linkPhone").val())){
		    a.ajaxCall({
		    	url:flyfish.bathPath + '/setting/queryLinkPhoneForFindAdminNo.vm',
		    	params:{"linkPhone":$(this).val()},
		    	successCallback:function(result,a,b,obj){
		    		var msg="该手机号尚未被注册，请重新输入";
		    		if(result.success==true&&result.mobile==undefined){//没查到该手机号
		    			check._clearTips($("#linkPhone"));
		    			check._resultTips($("#linkPhone"),false,msg);
		    		}else{			
		    			check._phoneConVer();
		    		}
		    	} , 	
				bizErrCallback : function(result,a,b,obj){
		    		check._clearTips($("#linkPhone"));
		    		check._resultTips($("#linkPhone"),false,result.errMsg);
		    	},
				bizErrTip:true
		    });
		}
	};
	_initAdmin();
});