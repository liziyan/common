/**
* 功能说明:		注册页面
* @author:		vivy <zhanghx13855>
* @time:		2016-03-14 16:15:30
* @version:		V1.1.0
* @update:		2016-03-29 添加注释
*/
require.config({
	paths: {
		"jquery.form": "../base/jquery-form.min",
		"ajax":"../base/ajax",
		"verify":"../base/verify",
		"pwd":"../base/pwd",
		"regCommon":'registerCommon'
	}
});
require(["verify","ajax","regCommon","pwd","jquery.form"],function(check,a,b){
	var i=0;
	var _initFind=function(){
		$("#linkPhone").val("");
		$("#randCode").val("");
		$("#verifyNo").val("");
		$(".m-step-point li,.m-step-title li").css("width","33%");	
		$("#linkPhone").unbind("keyup").bind("keyup",validate_linkPhone_find);
		$("#linkPhone").blur(validate_linkPhone_find);
		$("#verifyYz").click(function(){b.validate_verifyYz($(this),flyfish.bathPath + '/setting/findPwdMsgSend.vm');});
		check.verifyCheck({isReg:true});
		$("#randCode").blur(function(){b.validate_randCode($(this),"admin");});
		check.togglePwd();
		/*切换图形验证码*/
		$(".changeCode").click(function(){
			b.changeCode();
		});
		/*重置密码*/
		$("#btn_part1").click(function(){
			_goStep(2);
		});
		/*修改成功*/
		$("#btn_part2").click(function(){
			_goStep(3);
		});
		//控制密码输入提示	
		$("#password").blur(function(){
			$(".passTips").hide();
		});
		$("#password").focus(function(){
			if($(this).val().length>0) $(".passTips").show();
		});
		$('body').on("keyup","#password",function(){
			var t=$(this).val(),p=$(".passTips"),
				o=$(".strength");
			p.show();
			var l=check.pwdStrong(t);
			if(l>1) p.find("p:eq(1),p:eq(2)").addClass("on");
			else p.find("p:eq(1),p:eq(2)").removeClass("on");
			if(t.length>5 && t.length<21){
				p.find("p:eq(0)").addClass("on");
				for(var i=0;i<l;i++){
					o.find("b i").eq(i).addClass("on");					
				}
			}else p.find("p:eq(2),p:eq(0)").removeClass("on");				
		});	
		
		
		
	};	
	/*手机号码*/
	function validate_linkPhone_find(){	
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
	function _goStep(num){
		i++;
		var phoneNo=$("#linkPhone").val(),
			master=$("#master").val(),
			verifyNo=$("#verifyNo").val(),
			tokenId=$("#tokenId").val(),
			pwd=hsRSAEncrypt($("#password").val());
		if(num==2 && $("#type").val()==2){
			$(".getWord_list ul,.getWord_list div").hide();	
			$(".m-step-point").hide();
			$("#iform_step4").show();
			return;
		}
		if(num==2) {
			if(!check._click()) {i=0;return;}
			if($(".v_error").length>0) {i=0;return;}	
			if($("#randCode").val()==""){i=0;check._resultTips($("#randCode"),false,"请输入图形验证码");$("#randCode").focus();return;}
			if(i>1) return;				
			a.ajaxCall({
				url:flyfish.bathPath + '/setting/modVerifyMsgSend.vm',
				params:{"phoneNo":phoneNo,"master":master,"verifyNo":verifyNo,"tokenId":tokenId},				
				successCallback:function(){
					$(".part1").hide();
					$(".part2").show();					
					$(".find_step li:eq(1)").addClass("on");
					i=0;
				},
				errorCallback:function(data){
					flyfish.common.tooltip(data.msg,"error");
				},
				bizErrTip:true,
				bizErrCallback:function(data){
					i=0;
					b.changeCode();					
					if(data.errMsg=="验证码错误"||data.errMsg=="验证码不可用，请更换验证码"||data.errMsg=="验证码超时，请重新获取"){
						$("#verifyNo").val("");
						check._clearTips($("#verifyNo"));
						check._resultTips($("#verifyNo"),false,data.errMsg);
					}else{
					   $.artDialog({
							title:'错误',
							content:data.errMsg,
							isCloseBtn:false,
							ok:function(){},
							cancel:function(){
								return false;
							}
						});
					}
					return;
				}
			});
		}else if (num==3) {
			if(i>1) return;
			if(!check._click()){i=0;return;}			
			a.ajaxCall({
				url:flyfish.bathPath + '/setting/modPassword.vm',
				params:{"phoneNo":phoneNo,"password":pwd,"master":master,"verifyNo":verifyNo,"tokenId":tokenId},				
				successCallback:function(){
					i=0;					
					$(".part1,.part2").hide();
					$("#success").show();
					$("#password").val("");
					$("#rePassword").val("");
					$(".find_step li:eq(2)").addClass("on");
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
				errorCallback:function(data){
					i=0;
					b.changeCode();
					flyfish.common.tooltip(data.errMsg,"error");
					return;
				},
				bizErrCallback:function(data){					
					i=0;					
					b.changeCode();
					flyfish.common.tooltip(data.errMsg,"error");
					$(".part2").hide();
					$(".part1").show();
					$(".find_step li:eq(1)").removeClass("on");
					$(".find_step li:eq(2)").removeClass("on");
					return;
				},
				bizErrTip:true
			});	
		}else{
			$(".getWord_list ul,.getWord_list div").hide();	
			$(".m-step-point-red").addClass("m-step-point-gray").removeClass("m-step-point-red");
			$(".m-step-line-red").addClass("m-step-line-gray").removeClass("m-step-line-red");
			$(".m-step-outer").eq(num-1).find(".m-step-point-gray").addClass("m-step-point-red").removeClass("m-step-point-gray");
			$(".m-step-outer").eq(num-1).find(".m-step-line-gray").addClass("m-step-line-red").removeClass("m-step-line-gray");	
			$("#iform_step"+num).show();			
		}
	};
	_initFind();
});