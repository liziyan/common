/**
* 功能说明:		框架页
* @author:		vivy <zhanghx13855>
* @time:		2016-03-30 09:15:30
* @version:		V1.1.0
* @update:		
*
*/
require.config({
	shim: {
		"underscore": {
			exports: "_"
		}
	},
	paths: {
		"pwd":"../base/pwd",//密码验证
		"jquery.form": "../base/jquery-form.min",//表单提交
		"jquery.scroll": "../base/jquery-divscroll",//滚动条
		"jquery.cookie":"../base/jquery.cookie",//存取cookie
		"ajax":"../base/ajax",//Ajax请求
		"index":"indexMain",//主页流程
		"active":"active"//首页的各种活动和弹出层
	}
});
define(["ajax","active","jquery.scroll"],function(a,active){
	var menuData,compName,t_sys_version,isScreen=false,hasStore=true,isSmall=$(window).outerWidth()<1300 ? true : false;
	/*页面初始加载*/
	pageLoad();//页面初始化
	$(window).resize(function(){//高度自适应
		pageLoad();//页面初始化
		//设置左侧导航栏高度,即定位左侧导航栏
		$(".m-nav,.m-nav .item").css({"height":$(window).outerHeight()-$(".m-header").outerHeight()-38});
	});
	$("#refreshMenu").click(function(){
		_getLeftJson(true);//单纯刷新时左侧菜单
	})
	function pageLoad(){//页面初始化方法
		var w=$(window).outerWidth(),//获取页面宽度包括boder和padding
			h=$(window).outerHeight(),//获取页面高度包括boder和padding
			nh=40,nw=isScreen?0:180,sh=38,//nh头部导航栏高;nw为左侧导栏宽度,全屏时为0;sh为左侧导航栏底部全屏按钮高度
			snh=30;//标签高度
		if(w<1300) w=1300;//如果屏幕宽小于1300,就是设置宽度为1300
		$(".m-container").css({"height":h-nh+"px"});//设置主体区域高
		$(".m-nav").css({"height":h-nh-sh+"px"});//设置左侧导航栏高度
		$(".m-tabCon").css({"height":h-nh-snh+"px"});//设置除去标签栏主体区域内容高
		$("#0Con").perfectScrollbar();//从新定义滚到条
		var size=isScreen?0:180;//定义是否全屏变量,如果全屏则为0,否则为左侧
		$(".m-main").css({"padding-left":size+"px"});//设置是否全屏宽,即左侧导航栏是否隐藏宽
		if(isSmall){
			$(".m-nav,#screen").css({"position":"absolute"});
			$("body").css({"overflow-x":"scroll"});
		}
	};
	function screens(){//全屏操作方法
		isScreen=true;//全屏标志
		$(".m-nav,#screen").animate({"width":"0px"},200);//全屏,添加动画,隐藏左侧导航栏及按钮
		$("#screenCancel").animate({"width":"20px"},200);//添加动画,显示按钮全屏操作按钮
		pageLoad(true);//初始化页面
		flyfish.common.controlTablist(false,isScreen);//调用操作框架的标签导航
		$(".arrowRight").click();//模拟点击操作按钮全屏
		$("#tabList li.on").click();//模拟点击选中标签
		setTimeout(function(){$(".m-nav .item").perfectScrollbar('update');},400);//延迟.4秒加载左侧导航栏滚动条
	}
	function screenCancel(){//取消全屏操作方法
		isScreen=false;//非全屏标志
		$(".m-nav,#screen").animate({"width":"180px"},200);//添加动画,显示左侧导航栏
		$("#screenCancel").animate({"width":"0"},200);//添加动画,隐藏操作全屏按钮
		pageLoad();//初始化页面
		flyfish.common.controlTablist(false,isScreen);//调用操作框架的标签导航
		$(".arrowLeft").click();//模拟点击操作按钮取消全屏
		$("#tabList li.on").click();//模拟点击选中标签
		setTimeout(function(){$(".m-nav .item").perfectScrollbar('update');},400);//延迟.4秒加载左侧导航栏滚动条
	}

	/*事件开始*/
	var _left=function(){
		_getLeftJson();//获取左侧菜单的json数据
	};
	function _getMenu(data){//绑定左侧导航栏
		$(".m-nav .item").remove();//先清空
		var item=$('<div class="item"></div>');//创建一级导航条父DOM节点
		$(data).each(function(i){//循环获取到的一级导航数据
			var cls=data[i].id==="1000201"?"on":"";//设置默认展开的导航条,默认展开发货管理
			var strLi=$('<dl class="'+cls+'"></dl>');//创建一级导航条子节点
			//var v=data[i].text==="经营分析" ? '<span style="color:#f96268;font-size:8px;margin-left:3px;">(即将开放)</span>' : "";
			var strDt=$('<dt><span class="hg-icon hg-2-7 f-fr f-mt20"></span><i class="f-mr5 '+data[i].icon+'"></i>'+ data[i].text +'</dt>');//创建一级导航所需内容DOM节点
			var strDl=$('<dd></dd>');
			$(data[i].items).each(function(j){//循环获取到的二级导航数据
                var strDd;
                //判断电商贷页面
                if(data[i].items[j].id=="cd100020801"){
                    strDd='<a data-id="'+ data[i].items[j].id +'" href="' + flyfish.bathPath + data[i].items[j].href +'" target="_blank">'+ data[i].items[j].text +'</a>';//创建商通贷二级导航节点
                }else{
                    strDd='<a data-id="'+ data[i].items[j].id +'" data-href="' + flyfish.bathPath + data[i].items[j].href +'" href="javascript:">'+ data[i].items[j].text +'</a>';//创建二级导航节点
                }
				strDl.append(strDd);//追加到一级导航DOM节点
			});
			strLi.append(strDt);//追加到一级导航子节点
			strLi.append(strDl);//追加到一级导航子节点
			item.append(strLi);//将一级导航子节点追加到一级导航父节点
		});
		$('.m-nav').prepend(item);//将一级导航追加导航栏
		$(".m-nav dd").slideUp(0);//class带有dd收起
		$(".m-nav .on dd").slideDown(0);//class带有dd和on的展开
		$(".m-nav .item").perfectScrollbar();//添加美化后的滚动条
		return this;
	};
	function _getLeftJson(bool){
		var parentId=$("#channel").val()=="02"?'10002':'10000';//构造参数
		a.ajaxCall({
			url : flyfish.bathPath+'/sysManage/queryPageInit.vm?userId='+$("#userId").val()+'&parentId='+parentId,//获取菜单数据地址
			successCallback : function(data){//成功后回调
				menuData=data.menuData;//返回数据并赋值给变量menuData
				_getMenu(menuData);//动态加载左侧菜单栏
				_mentHover();//左侧菜单栏点击效果
				if(!bool){
					//右侧页面的延迟加载
					$("#0Con .m-frameCon").attr("src",flyfish.bathPath+"/work/forwardWorkEbusi.vm");
				}
			},
			errorCallback : function(){//失败回调
				flyfish.common.tooltip("页面初始化失败","error");//提示信息
			},
			successTip : false,//是否需要X关闭按钮
			async : false//同步请求
		});
	};
	var _tab=function(){//tab导航点击
		tabList();//tablist点击事件
		tabCloseEven();	//tablist右击出现层的点击事件
		$('#mm').find('.menu-item').hover(function(){//标签栏鼠标右键移入hover事件
			$(this).addClass('menu-active');//设置鼠标移入样式
		},function(){
			$(this).removeClass('menu-active');//鼠标移除去掉样式
		});
		$('#mm').bind('mouseleave',function(){//绑定鼠标离开标签栏事件
			$(this).hide();	//隐藏鼠标右键内容
		});
	};
	function tabCloseEven() {	//绑定右键菜单事件
		$('#mm-tabupdate').click(function() {//刷新
			var id=$("#tabList li.on").attr("data-id");//获取当前选中标签data-id
			$('#'+ id + 'Con').find(".m-frameCon")[0].contentWindow.location.reload();//刷新打开的当前iframe页面
			$('#mm').hide();//隐藏鼠标右键内容
		});
		$('#mm-tabclose').click(function() {	//关闭当前
			closeIframe($("#tabList li.on"));//调用关闭当前方法
			$('#mm').hide();
		});
		$('#mm-tabcloseall').click(function() {//全部关闭
			closeTabAll();//调用关闭全部方法
			$('#mm').hide();
		});
		$('#mm-tabcloseother').click(function() {//关闭其他
			var obj=$("#tabList li.on"),//获取当前选中元素
				id=obj.attr("data-id");//获取当前选中data-id
			$(".m-tab-content").not("#0Con,#"+id+"Con").remove();//关闭除当前选中标签对应的iframe页面和首页外其他标签对应的页面
			$("#tabList li").not("#0list,#"+id+"list").remove();//关闭除当前选中标签和首页外标签
			$('#mm').hide();
			$("#tabList").css({"margin-left":"0"});//当前标签回到首页右边
		});
	};
	function showIndex(){	//首页tab
		$(".m-nav dl").removeClass("on");//清除导航栏展开class
		$(".m-nav dd").slideUp();//展开的导航栏收起
		$("#tabList li").removeClass("on");//去除标签栏元素class
		$(".m-tab-content").hide();//隐藏标签栏内容
		$(".m-tab-content#0Con").show();//展示标签栏首页标签
	}
	function closeTabAll(){//关闭所有
		$(".m-tab-content").not("#0Con").remove();//关闭除首页外其他标签
		showIndex();//展示首页
		$("#tabList li").remove();//移除除首页外所有标签
		$(".m-tab-list .home a").click();//模拟首页被点击
		$("#tabList").css({"margin-left":"0"});//标签栏回到首页右侧
	};
	function closeIframe(obj){//关闭当前
		var	id=obj.attr("data-id"),//获取选中data-id元素
			nid=obj.prev().attr("data-id");//找到选中元素的上一个data-id
		if(obj.prev().length ===0 ) showIndex();//如果选中标签上一个标签为空,展示首页
		obj.prev().click();//模拟上一个标签被选中
		$("#tabCon #"+id+"Con").remove();//移除选中标签对应iframe页面
		$("#tabList #"+id+"list").remove();//移除被选中标签
		flyfish.common.controlTablist(true,isScreen);//调用操作框架标签方法
	};
	function tabList(){//tab切换显示
		$("body").on("click","#tabList .m-tab-close", function (e) { //x点击关闭
			var p=$(this).parents("li"),//获取被点击标签X的父元素
				bool=p.hasClass("on");//判断被点击标签X的父元素是否有被选中
			if(bool){
				closeIframe(p);///调用关闭该标签及页面方法
			}else{//否则
				var id=p.attr("data-id");//获取被点击标签X的父元素的data-id
				$("#tabCon #"+id+"Con").remove();//移除该标签对应的iframe页面
				$("#tabList #"+id+"list").remove();//移除该标签
				flyfish.common.controlTablist(true,isScreen);//调用操作标签栏方法
			}
		});
		$('#tabList').delegate('li','click',function(e){//标签栏点击切换
			if($(e.target).attr("class")==="hg-icon hg-1-10 m-tab-close") return;//如果标签已经被选中就退出
			var id=$(this).attr("data-id"),//获取选中标签data-id
				iframe=$("#tabCon");//获取对应的iframe页面
			//选中和显示
			$(this).addClass("on").siblings("li").removeClass("on");//选中点击标签并移除其他标签选中样式
			$("#"+id+"Con",iframe).show().siblings(".m-tab-content").hide();//展示选中标签对应的iframe页面,隐藏其他未选中iframe页面
			//左侧菜单hover
			$(".m-nav dd a").removeClass("on");//移除左侧菜单选中claas
			var a=$(".m-nav dd a[data-id="+id+"]");//获取选中标签页面对应的菜单
			a.addClass("on");//将该菜单设置为选中样式
			if(!a.parents("dl").hasClass("on")) a.parents("dl").find("dt").click();//如果该菜单父元素没有展开,就模拟点击事件展开
			flyfish.common.controlTablist(false,isScreen);//调用操作框架标签栏方法
		});
		$("body").on("dblclick","#tabList li", function () { //双击
			closeIframe($(this));//调用关闭该标签及页面方法
		});
		$("body").on("contextmenu","#tabList li", function (e) { //右击
			var id=$(this).attr("data-id");//获取该标签data-id
			$(this).click();//模拟点击该标签
			$('#mm').show().css({'top':e.pageY-2,'left':e.pageX-4});//展示右击内容,并设置出现位置
			return false;
		});
	};
	function _mentHover(){//左侧菜单导航点击方法
		$(".m-nav dt").click(function(){//绑定点击事件
			$(".m-nav dt").not($(this)).next("dd").slideUp();//收起除被点击菜单
			if($(this).parent("dl").hasClass("on")){//如果被点击菜单父元素有样式class
				$(this).parent("dl").removeClass("on");//移除样式class
				$(this).next("dd").slideUp();//将兄弟元素收起
			}
			else{//否则
				$(this).parent("dl").addClass("on");//给点击菜单父元素加样式class
				$(this).next("dd").slideDown();//将兄弟元素展开
				var end=$(window).outerHeight()-$(".m-header").outerHeight()-38;//定义变量赋值为左侧菜单栏高度
				$(".m-nav,.m-nav .item").css({"height":end});//设置菜单导航高
				setTimeout(function(){$(".m-nav .item").perfectScrollbar('update');},400);//延迟更新菜单栏滚动条
			}
			$(".m-nav dt").not($(this)).parent("dl").removeClass("on");//除点击菜单外其他菜单父元素移除样式class
		});
		$(".m-nav dd a").click(function(){//绑定点击二级菜单
			var getUrl = $(this).attr('data-href'),//获取被点击二级菜单的对应页面的url
				getTitle = $(this).text(),//获取二级菜单内容
				getId=$(this).attr('data-id'),//获取二级菜单data-id
            	iframeTab=$("#tabCon",top.document),
            	iframeChange=$('#'+ getId + 'Con',iframeTab).find("iframe").contents(),
                todefalute=iframeChange.find('.todefalute'),
                reFreshTable=iframeChange.find('.reFreshTable'),
                updateTable=iframeChange.find('.updateTable'),
                clearSearchTerm=iframeChange.find('.clearSearchTerm'),
                uiJqgridBdiv=iframeChange.find('.ui-jqgrid-bdiv'),
                isChange=true;
			if(todefalute.length>0){todefalute[0].click();isChange=false}
			else if(reFreshTable.length>0){reFreshTable[0].click();isChange=false}
			else if(updateTable.length>0){updateTable[0].click();isChange=false;uiJqgridBdiv.css("height","auto")}
			else if(clearSearchTerm.length>0){clearSearchTerm[0].click();isChange=false;uiJqgridBdiv.css("height","auto")}
			else isChange=true;
			$(".m-nav dd a").removeClass("on");//移除所有样式class
			$(this).addClass("on");//为点击二级菜单加样式class
            if(getId=="cd100020801") return;
			a.ajaxCall({
				url: flyfish.bathPath + "/main/queryUserMask.vm",//请求二级菜单对应的iframe页面
				params:{},//请求参数
				async:false,  //同步调用
				successCallback:function(data) {//成功后回调
					if(data.noMask) {//无遮罩层
						flyfish.common.childAddIframe({//调用打开iframe页面方法
							title:getTitle,
							url:getUrl,
							id:getId,
                            isChange:isChange
						});
					}else {//否则
						// flyfish.common.topCommonDialog();//调用通用系统级最外层遮罩层方法,给出失败信息
					}
				}
			});

		});
	};
	var pageInit=function(){
		active.loadHy(_left);//加载左侧导航，根据路程来判断
		//_left();//加载左边导航
		_tab();//左侧菜单点击事件
		$("#showIndex").click(function(){showIndex();});
		//取消全屏
		$("#screenCancel").click(function(){
			screenCancel();
		});
		//全屏
		$("#screen").click(function(){
			screens();
		});
		//取消如何操作的弹出层
		$('body').on({
			click:function(){
				$(".m-sPopBg,.showToUse").remove();
			}
		},".closeUse");
		/*退出登录*/
		$(".loginout").click(function(){
			window.location.replace(flyfish.bathPath +"/logout.vm");
		});
		/*打开帮助中心*/
		$(".openhelp").click(function(){
			window.open(flyfish.bathPath+'/opeManage/forwardHelp.vm');
		});
		/*打开第三方服务*/
		$(".sffw").click(function(){
			window.open(flyfish.bathPath+'/providers/forwardProvidersMgr.vm');
		});
		/*打开商通贷页面*/
        $(".s-t-d").click(function(){
            // window.open(flyfish.bathPath+'/ebusi/ordermgr/sendmgr/orderStart8.vm');
            window.open(flyfish.bathPath+'/loan/shangtongdai/index.vm');
        });
		setTimeout(function(){active._init();},100);//活动延迟加载
	};
	pageInit();
	//动态加载有奖调研图片
	a.ajaxCall({
    url:flyfish.bathPath + '/setting/findOneParamSettingMgr.vm',//有奖调研图片请求地址
    params:{"sysparamName":"RESEARCH_PICTURE"},//请求参数
    successCallback:function(result){//成功后回调
      if(result.data != null && result.data != ""){//判断返回数据是否为空
        $("#resImg").attr("src",result.data+"&v="+Math.random());//为图片赋值,并且清初缓存
        $(".resImg").click(function(){//点击图片
          flyfish.common.childAddIframe({//调用打开iframe页面
              title:"用户调研",
              id:"userSurvey",
              url:flyfish.bathPath + '/userSurvey/toAttendUserSurveyMgr.vm'//页面地址
            });
        });
        $(".resImg").show();//展示图片
//        a.ajaxCall({
//          url:flyfish.bathPath + '/userSurvey/toAttendUserSurveyMgr.vm',
//          params:{},
//          successCallback:function(result){
//            if(result.data != null && result.data != ""){
//            	$(".resImg").click(function(){
//            		flyfish.common.childAddIframe({
//                		title:"用户调研",
//                		id:"userSurvey",
//                		url:flyfish.bathPath + result.data
//                	});
//            	});
//            }
//          }
//        });
      }else{//否则
        $(".resImg").hide();//隐藏图片
      }
    }
  });
});
