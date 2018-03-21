/**
* 功能说明:		输入验证
* @author:		vivy <zhanghx13855>
* @time:		2015-9-25 16:15:30
* @version:		V1.1.0
* @使用方法:	    
* <input class="required" type="text" data-valid="isNonEmpty||isEmail" data-error="email不能为空||邮箱格式不正确" id="" />	
* 1、需要验证的元素都加上【required】样式
* 2、@data-valid		验证规则，验证多个规则中间用【||】隔开，更多验证规则，看rules和rule，后面遇到可继续增加
* 3、@data-error		规则对应的提示信息，一一对应
*
* @js调用方法：
* verify.verifyCheck({
*  	formId: 'verifyCheck',		<验证formId内class为required的元素
*   isReg: false,				<是否是手机端注册>
*	onBlur:null,				<被验证元素失去焦点的回调函数>
*	onFocus:null,				<被验证元素获得焦点的回调函数>
*	onChange: null,				<被验证元值改变的回调函数>
*	successTip: true,			<验证通过是否提示>
*	resultTips:null,			<显示提示的方法，参数obj[当前元素],isRight[是否正确提示],value[提示信息]>
*	clearTips:null,				<清除提示的方法，参数obj[当前元素]>			
*	code:true					<是否需要手机号码输入控制验证码及点击验证码倒计时,目前固定手机号码ID为phone,验证码两个标签id分别为time_box，resend,填写验证框id为code>
*	phone:true					<改变手机号时是否控制验证码>
* })
* $("#submit-botton").click(function(){		<点击提交按钮时验证>	
*  	if(!verify._click()) return false;
* })
*
*/
define(["countdown"], function(d) {
	(function($) {
		var j = 60,
			opt;
		var k = function(a) {
				a = $.extend(require.defaults, a || {});
				opt = a;
				return (new require())._init(opt)
			};

		function require(f) {
			this.rules = {
				isNonEmpty: function(a, b) {
					b = b || "不能为空";
					if (!a.length) return b
				},
				minLength: function(a, b, cx) {
					cx = cx || "长度不能小于" + b;
					if (a !== "") {
						if (a.length < b) return cx
					}
				},
				maxLength: function(a, b, cx) {
					cx = cx || "长度不能大于" + b;
					if (a !== "") {
						if (a.length > b) return cx
					}
				},
				isRepeat: function(a, b, cx) {
					cx = cx || "两次输入密码不一致";
					if (a !== "") {
						if (a !== $("#" + b).val()) return cx
					}
				},
				between: function(a, b, cx) {
					if (a !== "") {
						var d = parseInt(b.split('-')[0]);
						var e = parseInt(b.split('-')[1]);
						cx = cx || d + "-" + e + "位";
						if (a.length < d || a.length > e) return cx
					}
				},
				//商通贷借款金额限制
                betweenSTD: function(a, b, cx) {
                    if (a !== "") {
                        var d = parseInt(b.split('-')[0]);
                        var e = parseInt(b.split('-')[1]);
                        cx = cx || d + "-" + e + "之间";
                        if (a < d || a > e) return cx
                    }
                },
				level: function(a, b, cx) {
					cx = cx || "密码太简单";
					var r = k.pwdStrong(a);
					if (b > 4) b = 3;
					if (r < b) return cx
				},
				isPhone: function(a, b) {
					b = b || "手机号码格式错误";
					if (a !== "") {
						if (!flyfish.common.rule.phone.test(a)) return b
					}
				},
				isTel: function(a, b) {
					b = b || "固定电话格式错误";
					if (a !== "") {
						if (!flyfish.common.rule.tel.test(a)) return b
					}
				},
				isEmail: function(a, b) {
					b = b || "邮箱格式不正确";
					if (a !== "") {
						if (!flyfish.common.rule.email.test(a)) return b
					}
				},
				isEn: function(a, b) {
					b = b || "只能输入英文";
					if (a !== "") {
						if (!flyfish.common.rule.en.test(a)) return b
					}
				},
				isZh: function(a, b) {
					b = b || "只能输入中文";
					if (a !== "") {
						if (!flyfish.common.rule.zh.test(a)) return b
					}
				},
				isInt: function(a, b) {
					b = b || "只能输入正整数";
					if (a !== "") {
						if (!flyfish.common.rule.int.test(a)) return b
					}
				},
				isNum: function(a, b) {
					b = b || "只能输入正整数或正小数";
					if (a !== "") {
						if (!flyfish.common.rule.num.test(a)) return b
					}
				},
				isUname: function(a, b) {
					b = b || "中或英文开头，中文、数字、字母、下划线组成";
					if (a !== "") {
						if (!flyfish.common.rule.uname.test(a)) return b
					}
				},
				isUrl: function(a, b) {
					b = b || "url格式不正确";
					if (a !== "") {
						if (!flyfish.common.rule.url.test(a)) return b
					}
				},
				isPostcode: function(a, b) {
					b = b || "邮编格式不正确";
					if (a !== "") {
						if (!flyfish.common.rule.postcode.test(a)) return b
					}
				},
				isMoney: function(a, b) {
					b = b || "金额格式不正确";
					if (a !== "") {
						if (!flyfish.common.rule.money.test(a)) return b
					}
				},
				isBankCard: function(a, b) {
					b = b || "银行卡格式不正确";
					if (a !== "") {
						if (!flyfish.common.rule.bankCard.test(a)) return b
					}
				},
				isCard: function(a, b) {
					b = b || "身份证格式不正确";
					if (a !== "") {
						if (!flyfish.common.rule.card.test(a)) return b
					}
				},
				isCompany: function(a, b) {
					b = b || "中或英文开头，中文、数字、字母、空格、括号和.组成";
					if (a !== "") {
						if (!flyfish.common.rule.company.test(a)) return b
					}
				},
				isEname: function(a, b) {
					b = b || "只能输入、英文、数字、下划线组成，且以英文开头";
					if (a !== "") {
						if (!flyfish.common.rule.ename.test(a)) return b
					}
				},
				isChecked: function(c, d, e) {
					d = d || "必须选择";
					var a = $(e).find('input:checked').length,
						b = $(e).find('.on').length;
					if (!a && !b) return d
				}
			}
		};
		require.prototype = {
			_init: function(b) {
				this.config = b;
				var cx = false;
				var d = this;
				$('body').on({
					blur: function(a) {
						if ($(this).attr("noblur") === undefined) d.formValidator($(this));
						if (b.phone && $(this).attr("id") === "linkPhone") d._change($(this));
						b.onBlur ? b.onBlur($(this)) : ''
					},
					focus: function(a) {
						if (opt.isReg) {
							b.onFocus ? b.onFocus($(this)) : $(this).parent().find("label.focus").not(".valid").removeClass("hide").siblings(".valid").addClass("hide") && $(this).parent().find(".blank").addClass("hide") && $(this).parent().find(".close").addClass("hide")
						} else {
							k._clearTips($(this));
							b.onFocus ? b.onFocus($(this)) : ''
						}
					},
					keyup: function(a) {
						if (b.phone && $(this).attr("id") === "linkPhone") d._change($(this))
					},
					change: function(a) {
						b.onChange ? b.onChange($(this)) : ''
					}
				}, "#" + b.formId + " .required:visible");
				if (opt.isReg) {
					$('body').on("click", ".close", function() {
						var p = $(this).parent(),
							input = p.find("input");
						input.val("").focus()
					})
				}
			},
			formValidator: function(a) {
				var b = a.attr('data-valid');
				if (b === undefined) return false;
				var cx = b.split('||');
				var d = a.attr('data-error');
				if (d === undefined) d = "";
				var e = d.split("||");
				var f = [];
				for (var i = 0; i < cx.length; i++) {
					f.push({
						strategy: cx[i],
						errorMsg: e[i]
					})
				};
				return this._add(a, f)
			},
			_add: function(a, b) {
				var d = this;
				for (var i = 0, rule; rule = b[i++];) {
					var e = rule.strategy.split(':');
					var f = rule.errorMsg;
					var g = e.shift();
					e.unshift(a.val());
					e.push(f);
					e.push(a);
					var cx = d.rules[g].apply(a, e);
					if (cx) {
						opt.resultTips ? opt.resultTips(a, false, cx) : k._resultTips(a, false, cx);
						return false
					}
				}
				opt.successTip ? (opt.resultTips ? opt.resultTips(a, true) : k._resultTips(a, true)) : k._clearTips(a);
				return true
			},
			_change: function(a) {
				var b = this;
				if (a.val().length != 11) {
					$("#verifyYz").hide();
					$("#time_box").show();
					if (j === 60) $("#time_box").text("获取短信验证码");
					$("#verifyNo").val("");
					this.config.clearTips ? this.config.clearTips($("#verifyNo")) : k._clearTips($("#verifyNo"));
					return
				}
				var cx = /^1([^01269])\d{9}$/;
				if (!cx.test(a.val())) return false
			}
		};
		k._clearTips = function(a) {
			if (opt.isReg) {
				a.parent().find(".blank").addClass("hide");
				a.parent().find(".valid").addClass("hide");
				a.removeClass("v_cuowu")
			} else {
				var b = a.attr("id") ? a.attr("id") + "_add" : "verify_add";
				$("#" + b).remove();
				a.removeClass("v_Error").addClass("v_Correct")
			}
		};
		k._resultTips = function(a, b, cx, d) {
			if (!opt.isReg) {
				k._clearTips(a);
				var e = a.attr("id") ? a.attr("id") + "_add" : "verify_add",
					t = a.offset().top - 2,
					l = a.offset().left + a.outerWidth() + 15,
					bool = b ? "" : "error";
				cx = cx || "";
				var f = (cx.length > 12 ? 11 : cx.length) * 12 + 47;
				if (f + l > $(window).outerWidth()) l = $(window).outerWidth() - f;
				var g = cx.length > 12 ? '<span class="f-fl f-size12"><em>' + cx + '</em></span>' : '<span class="f-fl f-size12 f-pr10">' + cx + '</span>';
				var s = '<div class="verify_tips f-r5 ' + bool + '" style="top:' + t + 'px;left:' + l + 'px" id="' + e + '">' + '<div class="hg-icon hg-3-6"></div>' + '<div class="hg-icon hg-3-8 f-fl"></div>' + g + '</div>';
				$('body').append(s);
				if (!b) a.removeClass("v_Correct").addClass("v_Error")
			} else {
				if (flyfish.common.isMobile()) {
					if (b == "1") {
						a.removeClass("v_cuowu");
						return
					}
					if (b == "0") a.addClass("v_cuowu");
					if (cx === "" || cx === undefined) return;
					$(".error").remove();
					d = d || 1000;
					var h = $('<div class="error">' + '<div class="error-layer">' + cx + '</div>' + '</div>');
					$('body').append(h);
					var i = $(".error");
					i.addClass("cm-up-in").css({
						"margin-left": -i.outerWidth(true) / 2 + "px",
						"margin-top": -i.outerHeight(true) / 2 + "px"
					}).show();
					setTimeout(function() {
						i.removeClass("cm-up-in")
					}, 300);
					setTimeout(function() {
						i.addClass("cm-up-out")
					}, d + 600);
					setTimeout(function() {
						i.removeClass("cm-up-out")
					}, 900 + d);
					setTimeout(function() {
						i.hide()
					}, 900 + d)
				} else {						
					a.removeClass("v_error");
					$(".login_tip").text("");
					var err=a.next(".login_error");
					if(err.length==0) err=a.next().next(".login_error");
					if(b){
						err.hide();						
					}else{
						err.show();
						$(".login_tip").text(cx);
						a.addClass("v_error");
					}
				}
			}
		};
		k._click = function(cx) {
			cx = cx || opt.formId;
			var d = $("#" + cx).find('.required:visible'),
				self = this,
				result = true,
				t = new require(),
				r = [];
			$.each(d, function(a, b) {
				result = t.formValidator($(b));
				if (result) r.push(result);
				else {
					if(opt.isReg) return false
					if (flyfish.common.isMobile()) return false
				}
			});
			if (d.length !== r.length) result = false;
			return result
		};
		k._sendVerify = function() {
			$("#verifyYz").text("获取短信验证码").hide();
			$("#time_box").text("60 s后可重发").show();
			d.countdown({
				maxTime: 60,
				minTime: 0,
				ing: function(cx) {
					j = cx;
					$("#time_box").text(cx + " s后可重发");
				},
				after: function() {
					j = 60;
					if (!flyfish.common.rule.phone.test($("#linkPhone").val())) {
						$("#time_box").text("获取短信验证码");
					} else {
						$("#verifyYz").show();
						$("#time_box").hide()
					}
				}
			})
		};
		k.pwdStrong = function(a) {
			var b = 0;
			if (a.match(/[a-z]/g)) {
				b++
			}
			if (a.match(/[A-Z]/g)) {
				b++
			}
			if (a.match(/[0-9]/g)) {
				b++
			}
			if (a.match(/(.[^a-z0-9A-Z])/g)) {
				b++
			}
			if (b > 4) {
				b = 4
			}
			if (b === 0) return false;
			return b
		};
		require.defaults = {
			formId: 'verifyCheck',
			isReg: false,
			onBlur: null,
			onFocus: null,
			onChange: null,
			successTip: true,
			resultTips: null,
			clearTips: null,
			phone: true
		};
		k._phoneConVer = function() {
			if (j === 60) {
				$("#verifyYz").show();
				$("#time_box").hide()
			} else {
				$("#verifyYz").hide();
				$("#time_box").show()
			}
		};
		window.verifyCheck = $.verifyCheck = k
	})(jQuery);
	/**
	* 功能说明:		输入密码时显示或隐藏密码
	* @author:		vivy <zhanghx13855>
	* @time:		2015-10-29 19:57:30
	* @version:		V1.1.0
	* @update:		2015-11-12 10:07:30 加入验证规则
	*				2015-11-12 11:05:30 显示密码时不能输入
	*
	* @js调用方法：
	* <span class="showpwd" data-eye="password"></span> 样式showpwd固定必须的，data-eye是要隐藏显示的文本框ID
	* verify.togglePwd();
	*
	*/
	(function($) {
		var f;
		var g = function() {
				return (new require())._init()
			};

		function require(a) {};
		require.prototype = {
			_init: function() {
				var b = this;
				$('body').on({
					click: function(a) {
						b._click($(this))
					}
				}, ".showpwd:visible")
			},
			_click: function(a) {
				var cx = a.attr('data-eye');
				if (cx === undefined) return false;
				var d = $("#" + cx),
					cls = !d.attr("class") ? "" : d.attr("class"),
					value = !d.val() ? "" : d.val(),
					type = d.attr("type") === "password" ? "text" : "password",
					b = d.parent().find("b.placeTextB"),
					isB = b.length === 0 ? false : true;
				var s = d.attr("name") ? " name='" + d.attr("name") + "'" : "";
				s += d.attr("data-valid") ? " data-valid='" + d.attr("data-valid") + "'" : "";
				s += d.attr("data-error") ? " data-error='" + d.attr("data-error") + "'" : "";
				s += d.attr("placeholder") ? " placeholder='" + d.attr("placeholder") + "'" : "";
				var e = '<input readonly type="' + type + '" class="' + cls + '" value="' + value + '" id="' + cx + '"' + s + ' />';
				if (type === "text") {
					if (isB) b.hide();
					d.parent().find(".icon-close.close").addClass("hide");
					d.removeAttr("id").hide();
					d.after(e);
					a.addClass("hidepwd")
				} else {
					d.prev("input").attr("id", cx).val(value).show();
					if (isB && $.trim(value) === "") {
						d.prev("input").hide();
						b.show()
					}
					d.remove();
					a.removeClass("hidepwd")
				};
				$('body').on("click", "#" + cx, function() {
					$(this).parent().find(".hidepwd").click();
					if (isB && $.trim($(this).val()) === "") {
						d.show();
						b.hide()
					}
					d.focus()
				})
			}
		};
		require.defaults = {};
		window.togglePwd = $.togglePwd = g
	})(jQuery);
	return {
		verifyCheck: verifyCheck,//验证总方法<option>
		_clearTips: verifyCheck._clearTips,//清空提示回调函数<当前元素obj>
		_resultTips: verifyCheck._resultTips,//提示回调函数<当前元素obj,正确提示true/false,提示内容,手机端提示显示的时长毫秒>
		_click: verifyCheck._click,//点击回调函数
		_sendVerify: verifyCheck._sendVerify,//启动验证码倒计时回调函数
		_phoneConVer: verifyCheck._phoneConVer,//发送验证码按钮变为可编辑状态
		pwdStrong: verifyCheck.pwdStrong,//密码强度<返回强度1,2,3,4>
		togglePwd: togglePwd,//显示/隐藏密码
		countdown:d.countdown//倒计时
	}
});
/**
* 功能说明:		倒计时插件
* @author:		vivy <zhanghx13855>
* @time:		2015-10-29 16:15:30
* @version:		V1.1.0
*
* @js调用方法：
* countdown({
*	  maxTime:60,//倒计时最大值
*	  minTime:0,//倒计时最小值
*	  ing:function(c){},//每倒计时一秒返回函数
*	  after:function(){}//倒计时结束后返回函数
* });	
*
*/
define("countdown", [], function() {
	(function($) {
		var b, timerC, opt;
		var d = function(a) {
				a = $.extend(require.defaults, a || {});
				opt = a;
				clearTimeout(b);
				return (new require())._init()
			};

		function require(a) {};
		require.prototype = {
			_init: function() {
				timerC = opt.maxTime;
				this._sendVerify()
			},
			_sendVerify: function() {
				var a = this;
				if (timerC === 0) {
					clearTimeout(b);
					opt.after();
					timerC = opt.maxTime;
					return;
				}
				timerC--;
				opt.ing(timerC);
				b = setTimeout(function() {
					a._sendVerify()
				}, 1000);
			}
		};
		require.defaults = {
			maxTime: 60,
			minTime: 0,
			ing: function(c) {},
			after: function() {}
		};
		window.countdown = $.countdown = d
	})(jQuery);
	return {
		countdown: countdown
	}
});