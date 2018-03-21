/**
* 功能说明:		注册页面
* @author:		vivy <zhanghx13855>
* @time:		2016-03-14 16:15:30
* @version:		V1.1.0
* @update:		2016-03-29 添加注释
* 
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
		"cookie":"../base/cookie",
		"pwd":"../base/pwd",
		"regCommon":'registerCommon'
	}
});
require(["verify","ajax","regCommon","pwd","jquery.form","cookie"],function(check,a,b){
	var ask=(flyfish.common.GetQueryString("isask")=="1") ? true : false;
	//根据推广带来的type参数控制显示
	function getType(){
		var t=flyfish.common.GetQueryString("type");	
		if(t){			
			a.ajaxCall({
				url : flyfish.bathPath + '/system/queryEEbusiType.vm',
				params:{'type':t},
				successCallback : function(result){
					var s=result.showBtn;
					if(s!="1"){
						var s1=s.split(";");
						for(var i=0;i<s1.length;i++){
							var isShow=s1[i].split(",")[1];
							isShow=="false" ? $("#nav_"+s1[i].split(",")[0]).hide() : isShow=="true" ? $("#nav_"+s1[i].split(",")[0]).show() : ($("#nav_"+s1[i].split(",")[0]).show(),$("#nav_"+s1[i].split(",")[0]).find("a").attr("href",isShow));
						}
					}
				}
			});
		}
	}
	getType();
	//推广end	
	//注册的第一个页面代码
	var init=function(){
		if(ask) $(".login_header img").attr("src",flyfish.bathPath+"/static/images/logo_white_ask.png").show(),$("#nav_login a,.regnow").attr("href","http://home.ihuge.com/flyfish.sso/login.html?ReturnURL=http%3A%2F%2Fask.ihuge.com"),$(".login_footer").text("北京新软孚科技有限公司版权所有  Copyright © 2016 All Rights Reserved").show();
		else $(".login_header img,.login_footer").show();
		//刷新图形验证码
		b.changeCode();
		//设置cookie
		cookie.setCookies();
		//判断是否有手机带过来
		var phone=flyfish.common.GetQueryString("phone");
		if(phone){
			$("#linkPhone").val(phone);
			$("#linkPhone").focus();
		}
		//切换图形验证码
		$(".changeCode").click(function(){
			b.changeCode();
		});
		//注册验证功能
		check.verifyCheck({isReg:true});
		//控件改变触发事件
		$("#linkPhone").blur(b.validate_linkPhone);
		$("#linkPhone").keyup(b.validate_linkPhone);
		$("#verifyYz").click(function(){b.validate_verifyYz($(this),flyfish.bathPath + '/setting/registerMsgSend.vm');});
		$("#randCode").blur(function(){b.validate_randCode($(this))});
		//提交方法
		$("#btn_part2").click(function(evt){
			if($(this).attr("disabled")) return;
			if(!check._click()) return;
			if($(".v_error").length>0) return;	
			if($("#randCode").val()==""){check._resultTips($("#randCode"),false,"请输入图形验证码");$("#randCode").focus();return;}			
			//这里要判断手机验证码是否正确
			a.ajaxCall({
	    		url:flyfish.bathPath + '/system/registerMsgVerify.vm',
	    		params: {"linkPhone":$("#linkPhone").val(),"verifyNo":$("#verifyNo").val(),"randCode":$("#randCode").val()},
	    		successCallback:function(result,a,b,obj){
	    			$("#btn_part2").attr("disabled" , true);
	    			var url=ask?flyfish.bathPath+"/newPcRegister2.vm?isask=1":flyfish.bathPath+"/newPcRegister2.vm";
	    			//手机验证码正确之后将值传入下一个页面
                    zz_trace.zztrans.transExt = "";
                    zz_trace.syncTrans(function(){
                        document.location.href=url;
                    });
	    			// window.location.href=url;
	    		},
	    		errorCallback:b.ErrorFn,
				bizErrTip:true,
	    		bizErrCallback:function(result){	    
	    			//提示用户手机验证码错误
    				check._resultTips($("#verifyNo"),false,result.errMsg);
    				//刷新图形验证码
    				b.changeCode();
	    		}
	    	});
			
		});
	}
	//注册的第二个页面代码
	var _init=function(){		
		if($("#randCode").val()==""){
			//如果没有图形验证码则调回第一个注册页面
			window.location.href=flyfish.bathPath+"/register.vm";
		}
		if($("#verifyNo").val()==""){
			//如果没有短信验证码则调回第一个注册页面
			window.location.href=flyfish.bathPath+"/register.vm";
		}
		if(ask) {
            $(".login_header img").attr("src",flyfish.bathPath+"/static/images/logo_white_ask.png").show(),
			$(".login_header li.on a,.regnow").attr("href","http://home.ihuge.com/flyfish.sso/login.html?ReturnURL=http%3A%2F%2Fask.ihuge.com"),
			$("#compName,#adminNo,input[name='compName'],input[name='adminNo']").val("ask"+$("#linkPhone").val()),
			$(".login_footer").text("北京新软孚科技有限公司版权所有  Copyright © 2016 All Rights Reserved").show();
            $("#isCheckedAsk").show();
            $("#isChecked").hide();
            //弹出用户协议
            $(".showoutc").click(function(){
                $(".reg_rule_bgAsk,.reg_ruleAsk").show();
            });
            //关闭用户协议
            $(".closeClause").click(function(){
                $(".reg_rule_bgAsk,.reg_ruleAsk").hide();
                $(".icon-check").addClass("on");
                $(".icon-check").parents(".item").find(".focus").text("").removeClass("error");
            });
            //同意条款
            $("#aggressClauseAsk").click(function(){
                $(".reg_rule_bgAsk,.reg_ruleAsk").hide();
                check._resultTips($("#isChecked"),true);
                $("#clause").attr("checked","checked");
            });
		}
		else {
            $(".login_header img,.login_footer,.checkbox").show(),$("#compName").focus();//初始商户名称选中
            $("#isCheckedAsk").hide();
            $("#isChecked").show();
			//弹出用户协议
            $(".showoutc").click(function(){
                $(".reg_rule_bg,.reg_rule").show();
            });
            //关闭用户协议
            $(".closeClause").click(function(){
                $(".reg_rule_bg,.reg_rule").hide();
                $(".icon-check").addClass("on");
                $(".icon-check").parents(".item").find(".focus").text("").removeClass("error");
            });
            //同意条款
            $("#aggressClause").click(function(){
                $(".reg_rule_bg,.reg_rule").hide();
                check._resultTips($("#isChecked"),true);
                $("#clause").attr("checked","checked");
            });
		}
		//切换图形验证码
		$(".changeCode").click(function(){
			b.changeCode();
		});
		//注册验证功能
		check.verifyCheck({isReg:true});		
		//将用户名的文字保存到name='adminNo'的隐藏输入框中，为了解决浏览器保存用户名和密码
		$("#adminNo").blur(function(){
			if($.trim($(this).val())=="null"||$.trim($(this).val())=="undefined"){
				check._resultTips($("#adminNo"),false,"用户名:"+$.trim($(this).val())+",不能为关键字");
				return;
			}
			$("input[name='adminNo']").val($(this).val());
		});
		//显示or隐藏密码
		if(!flyfish.common.isMobile()) check.togglePwd();

		//控制密码输入提示	
		$("#userPassword").blur(function(){
			$(".passTips").hide();
		});
		$("#userPassword").focus(function(){
			if($(this).val().length>0) $(".passTips").show();
		});
		$('body').on("keyup","#userPassword",function(){
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
		//控制事件
		$("#compName").blur(validate_compName);	
		//注册提交
		$("#btn_part2").click(function(evt){
			if($(this).attr("disabled")) return;
			if(!$("#clause").attr("checked")){
				check._resultTips($("#isChecked"),false,"请先同意条款");
			}else{
				check._clearTips($("#isChecked"));
			}
            if(!$("#clauseAsk").attr("checked")){
                check._resultTips($("#isCheckedAsk"),false,"请先同意条款");
            }else{
                check._clearTips($("#isCheckedAsk"));
            }
			if(!check._click()) return;			
			if($(".v_error").length>0) return;	
			$("#pwdStrong").val(check.pwdStrong($("#userPassword").val()));
			$("#password").val(hsRSAEncrypt($("#userPassword").val()));	
			dealCookiesInfo();
			//下面是form提交的代码，自己写
			//需要判断手机号和手机验证码是否正确对应，图形验证码是否正确，如果不满足其中一项，都跳回到第一页注册	
			a.ajaxFormCall({
				formId:"iform",
				beforeSubmitFn:function(formData, jqForm, options){
					if($(this).attr("disabled")) return;
					$("#btn_part2").attr("disabled" , true);
				    return true;
				},
				successTip:false,
				successCallback:function(result){
					if(ask) window.location.href="http://home.ihuge.com/flyfish.sso/login.html?ReturnURL=http%3A%2F%2Fask.ihuge.com";
					else window.location.href=flyfish.bathPath+"/newRegisterSuccess.vm?flag="+true+"&linkPhone="+$("#linkPhone").val();
				},
				isMask:false,
				bizErrCallback:function(result) {					
		    		$("#btn_part2").removeAttr("disabled");
		    		window.setTimeout(function(){
		    			window.location.href=flyfish.bathPath+"/register.vm?phone="+$("#linkPhone").val();
		    		},1500); 
				},
				errorCallback:function(result){
					//网络异常等异常出现时
					window.location.href=flyfish.bathPath+"/newRegisterSuccess.vm?flag="+false+"&linkPhone="+$("#linkPhone").val();
				}
			});		
		});
		
	}
	//企业名称
	function validate_compName(){
		if($.trim($(this).val())=="null"||$.trim($(this).val())=="undefined"){
			check._resultTips($("#compName"),false,"商户名称:"+$.trim($(this).val())+",不能为关键字");
			return;
		}
		if($.trim($(this).val()) != ''){
	    	var msg="服务器正在帮你确认企业名是否占用，请稍后...";	
	    	$(this).attr("validatemsg",msg);		    	
	    	a.ajaxCall({
	    		url:flyfish.bathPath + '/setting/queryEBaseCompanyInfoForRegister.vm',
	    		params:{"compName":$(this).val()},
	    		successCallback:function(result,a,b,obj){
	    			var msg="该企业名称已被注册，请重新输入";		
	    			if(!(result.success==true&&result.id==undefined)){
	    				check._clearTips($("#compName"));
	    				check._resultTips($("#compName"),false,msg);
	    			}
	    		},
	    		errorCallback:b.ErrorFn,
	    		bizErrTip:true,
	    		bizErrCallback:function(result,a,b,obj){	    			
	    			var msg="该企业名可能被多次注册，请联系管理员";		
	    			check._clearTips($("#compName"));
	    			check._resultTips($("#compName"),false,msg);
	    		}
	    	});
	    }
	};
	// 设置广告cookies信息
	function dealCookiesInfo() {
		var source = cookie.getCookie("source");
		var plan = cookie.getCookie("plan");
		var type = cookie.getCookie("type");
		var name = cookie.getCookie("name");
		var reKey = cookie.getCookie("reKey");
		$("#source").attr("value", source);
		$("#plan").attr("value", plan);
		$("#type").attr("value", type);
		$("#name").attr("value", name);
		$("#reKey").attr("value", reKey);
	};
	//注册结果页
	var _result=function(){
		var bool=$("#flag").val()==="true" ? true : false;
		//如果成功
		if(bool){				
			$("#wrong").remove();
			$("#success").show();			
		}else{//失败			
			$("#wrong").show();
			$("#success").remove();
			check.countdown({
				maxTime:5,
				ing:function(v){
					$("#times").text(v);
				},
				after:function(){
					window.location.href=flyfish.bathPath + '/login.vm';	
				}
			});	
		}
	}
	if($("#page").val()=="0") init();
	else if($("#page").val()=="1") _init();
	else if($("#page").val()=="2") _result();	
});
