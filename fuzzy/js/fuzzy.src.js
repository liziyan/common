
/**
* 功能说明:		模糊查询
* @author:		vivy <lizhizyan@qq.com>
* @time:		2015-11-24至2015-11-25
* @version:		V1.1.0
* @update:		2015-12-15 14:04:30  onBlur时多加一个选中值的json串参数
* 				2015-12-17 18:35:30 _getRow方法中res[i].id===pid改为res[i].id==pid
* 				2015-12-17 19:44:30 输入框失去焦点后弹出remove掉，因还有其他点击事件，故setTimeout延时500毫秒
* 				2015-12-29 10:14:30 新增一个width参数，用于展示下拉框的宽度，为auto时表示和input框一样宽。
* 				2015-12-29 17:13:30 将方法中的固定id改为可配置，默认为id
* 				2015-12-30 09:15:30 搜索条件中有选值之后删除掉的需求，新增allowEmpty的参数
* 				2015-12-30 10:39:30 输入的值和下面显示出来的值相等且只有一个时，将输入的值写入input中
* 				2015-12-30 11:24:30 将选中的值的id绑定到input中
* 				2015-12-30 13:24:30 data-id与jqgrid中的重复，换成data-key
* 				2015-12-30 14:33:30 将document.click写到blur中，完善失去焦点之后的各种选择
* 				2015-12-30 15:00:30 没有新增时点击暂无数据的处理方法
* 
* @使用方法:	    
* <input type="text" class="inputElem" value="" oldValue="" selectValue="" />
* @class="inputElem"<样式必填，模糊查询的样式>
* @oldValue<当前输入框的值是否是上次查询的值，只有不同的情况才去查询，并且重新给oldValue赋值>
* @selectValue<下拉框选中后记录的值，对input删除或修改后判断input是否为空，不为空的情况把selectValue重新赋值给input,最后取值取这里的值>
*
*
* @js调用方法1:-----针对页面上只有一个模糊查询或者多个模糊查询可共用一个url和请求参数字段等
* dropDown({
*  	url:null,						 	//请求url地址
*	params:{'page':'1','rows':'10'},	//请求参数,不包括字段
*	keyword:'keyWord',					//显示名称的字段
*   searchKeyword:'shopTitle',			//数据库模糊查询时的字段
*	text:'商品',							//文字
*	width:'auto',						//下拉框宽度，默认和Input一样宽
*	id:'id',							//id值，可配置，默认为id
*	allowEmpty:false,					//改变值时是否允许为空，默认不能为空（针对删除）
*	addNew:true,						//是否有新增
*	selectItem:true,					//是否有选择
*	addCallback:null,					//新增回调函数,返回一个参数【obj<当前input>】
*	selectCallback:null,				//选择回调函数,返回一个参数【obj<当前input>】
*	allowPaste:false,					//是否允许粘贴	
*	isSelectHide:true,					//点击下拉框的选项是，下拉框是否隐藏	
*	onBlur:null,						//选中值回调函数，返回三个参数【obj<当前input>,id<选中值的>,value<选中值的>,row<选中的行的rowJson串>】
*   isLocal:true						//是否是本地数据，这个是我为了方便在线演示而配置的，实际使用时删除这个参数并删除代码行193-207、215
* });
*
* @js调用方法2:----每个模糊查询都要调用一次
* $(object).dropDown({
*  	url:null,						 	//请求url地址
*	params:{'page':'1','rows':'10'},	//请求参数,不包括字段
*	keyword:'keyWord',					//显示名称的字段
*   searchKeyword:'shopTitle',			//数据库模糊查询时的字段
*	text:'商品',							//文字
*	width:'auto',						//下拉框宽度，默认和Input一样宽
*	id:'id',							//id值，可配置，默认为id
*	allowEmpty:false,					//改变值时是否允许为空，默认不能为空（针对删除）
*	addNew:true,						//是否有新增
*	selectItem:true,					//是否有选择
*	addCallback:null,					//新增回调函数,返回一个参数【obj<当前input>】
*	selectCallback:null,				//选择回调函数,返回一个参数【obj<当前input>】
*	allowPaste:false,					//是否允许粘贴	
*	isSelectHide:true,					//点击下拉框的选项是，下拉框是否隐藏	
*	onBlur:null,						//选中值回调函数，返回三个参数【obj<当前input>,id<选中值的>,value<选中值的>,row<选中的行的rowJson串>】
*   isLocal:true						//是否是本地数据，这个是我为了方便在线演示而配置的，实际使用时删除这个参数并删除代码行193-207、215
* });
*
*/
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 t={"2F":"2L","1a":"业务交易成功","1s":{"2A":"1","37":"3l","18":[{"u":"0","C":"G","B":"11","K":"O","z":"1"},{"u":"2","C":"G","B":"11","K":"O","z":"1"},{"u":"3","C":"G","B":"11","K":"O","z":"1"},{"P":"2N:铺货失败,已存在相同商家编码的商品!","u":"2V","C":"G","B":"2Y","Q":"33","R":"3i","S":1,"U":"2G","K":"O","I":"2K","z":"1","J":"支持购买"},{"P":"25:铺货失败,已存在相同商家编码的商品!","u":"2P","C":"G","B":"2R","Q":"2S","R":"V","S":2k.7,"U":"15","K":"O","I":"31","z":"1","J":"29 2g全新行"},{"P":"25:铺货失败,已存在相同商家编码的商品!","u":"39","C":"G","B":"3a","Q":"3d","R":"V","S":2k.8,"U":"15","K":"O","I":"3e","z":"1","J":"29 2g全新行2"},{"P":"3f:铺货失败,已存在相同商家编码的商品!","u":"3g","C":"G","B":"3h","Q":"0","R":"V","S":5,"U":"15","K":"O","I":"3j","z":"1","J":"农家纯手工粽子"},{"P":"1M:铺货成功!","u":"3m","C":"G","B":"3o","Q":"0","R":"V","S":5,"U":"15","I":"3w","z":"1","J":"农家纯手工粽子"},{"P":"1M:铺货成功!","u":"3x","C":"G","B":"3A","Q":"0","R":"V","S":5,"U":"15","I":"3B","z":"1","J":"饺子"},{"P":"1M:铺货成功!","u":"2B","C":"G","B":"2C","Q":"0","R":"V","S":5,"U":"15","I":"2D","z":"1","J":"饺子"}],"2E":"6"},"1n":X};(l($){4 j,L,1d;4 k=l(a){E(2w N()).2t(a)};$.2Z.1L=l(a){L=m;E(2w N()).2n(a)};l N(a){};N.36={2t:l(c){4 d=m,2a;$(".3b").3c(l(a,b){$(b).27(l(e){$(m).1u("A");j=$.22(N.1Z,c||{});4 v=$(m).y();9(!j.1T){$(b).1R(\'1q\');$(b).1P(\'1q\',l(e){e.2o();$(m).y(v)})}d.1J($(m),e)});$(b).2v(l(e){d.1H($(m),e)});$(b).1h(l(e){d.1G($(m),e)});2a=$(b)})},2n:l(a){4 b=m;$(L).27(l(e){$(m).1u("A");j=$.22(N.1Z,a||{});4 v=$(m).y();9(!a.1T){$(L).1R(\'1q\');$(L).1P(\'1q\',l(e){e.2o();$(m).y(v)})}b.1J($(m),e)});$(L).2v(l(e){b.1H($(m),e)});$(L).1h(l(e){b.1G($(m),e)})},1G:l(f,e){4 g=m;4 h=f.y();$(2J).1R("2z").1P("2z",l(a){a.3J();4 b=a.2M,1B=$(b).2O(),r=$(b,1B).2Q(\'.n\'),H=$(b).2U(".n").D;4 c="A";9(($(b).1c("24")||$(b).1c("1y"))&&H>0){g.M();$(".A").W("A");9(j.1w&&$.Y(j.1w)){j.1w.16(g,f)}x{9(j.1A)1m("新增函数为空或不是方法");x{g.1C(f)}}}x 9($(b).1c("1D")&&H>0){g.M();$(".A").W("A");9(j.1l&&$.Y(j.1l)){j.1l.16(g,f)}x{1m("选择函数为空或不是方法")}}x 9($(b).1c("n-2y")&&H>0){g.1x(f,$(b).r("T-14"),$(b).F())}x 9(H>0||$(b,1B).1c(c)){E}x{9($(\'#n o\').D===1&&$(\'#n o\').F()===h){4 d=$(\'#n o\');g.1x(f,d.r("T-14"),d.F())}g.1C(f)}})},1C:l(a){4 b=m;4 v=a.r("1K");9(j.2r&&a.r("3n").D==0){v="";a.r("T-14","")}a.y(v).r("Z",v).r("1K",v);a.W("A");b.M()},1J:l(a){4 b=m;m.2l(a);b.1O(a)},1O:l(a){4 b=m;j.1e[j.2j]=$.1p(a.y());9(j.2d){4 v=$.1p(a.y()),1o=t.1s.18,1U=[];1V(4 i=0;i<1o.D;i++){4 c=1o[i][j.1W];9(c){9(c.2H(v)!=-1){1U.2I(1o[i])}}}t.1s.18=1U;m.1X(t)}x{1Y({1f:j.1f,1e:j.1e,1i:b.1X,1v:b.23})}},1X:l(a){4 b=a.1s.18;1d=b;4 s=\'\';$("#n p.1y").26();9(b.D===0){$("#n q").28("").2T("<p 1b=\'1y\'>暂无数据，请新增</p>");E}1V(4 i=0;i<b.D;i++){4 c=b[i][j.u];4 d=b[i][j.1W];9(d){s+=\'<o T-14="\'+c+\'" J="\'+d+\'" 1b="n-2y">\'+d+\'</o>\'}}$("#n q").28("").1g(s);$("#n o").2W(l(){$(m).2X("n-s")})},23:l(a){1m("1Y调用失败")},2b:l(a){1V(4 i=0;i<1d.D;i++){9(1d[i][j.u]==a)E 1d[i]}},2l:l(a){m.M();4 b=j.F;4 s=$(\'<2c 1b="n" u="n"></2c>\');s.1g(\'<q></q>\');j.1A?s.1g(\'<a 1S="2e:;" 1b="24">+ 新增\'+b+\'</a>\'):\'\';j.2f?s.1g(\'<a 1b="1D" J="选择\'+b+\'" 1S="2e:;">...</a>\'):\'\';$(\'32\').1g(s);4 w=a.34(),h=a.35(),2h=a.2i().1Q+h,21=a.2i().1N;$("#n .1D").2m({"1N":w-20+"1j"});w=j.1t=="2p"?w:j.1t;$("#n").2m({"1t":w+"1j","1N":21+"1j","1Q":2h+"1j"})},1H:l(a,e){4 b=m,2q=$.1p(a.y()),19=e.19,q=$("#n q");9(2q!==$.1p(a.r("Z"))){m.1O(a)}9(19===38){4 c=$("o.n-s",q).2s(),H=$("o",q).D;c=c===-1?H:c;c--;$("o:17("+c+")",q).1u("n-s").2u("o").W("n-s");a.y($("o:17("+c+")",q).F());a.r("Z",$("o:17("+c+")",q).F())}9(19===3k){4 c=$("o.n-s",q).2s(),H=$("o",q).D;c=c===H-1?-1:c;c++;$("o:17("+c+")",q).1u("n-s").2u("o").W("n-s");a.y($("o:17("+c+")",q).F());a.r("Z",$("o:17("+c+")",q).F())}9(19===13){4 d=$("o.n-s",q);9(d.D===0){9(j.1I)b.M();a.1h();E}4 f=d.r("T-14");4 g=d.F();b.1x(a,f,g);a.1h()}a.r("Z",a.y())},M:l(){$("#n").26()},1x:l(a,b,c){4 d=m;a.r("Z",c).r("1K",c).r("T-14",b);a.y(c);$(".A").W("A");9(j.1I)d.M();9(j.1r&&$.Y(j.1r)){j.1r.16(d,a,b,c,d.2b(b))}x{1m("回调函数为空或不是方法")}}};N.1Z={1f:12,1e:{\'2A\':\'1\',\'18\':\'10\'},1W:\'I\',2j:\'I\',1t:\'2p\',u:\'u\',2r:2x,F:\'商品\',1A:X,2f:X,1w:12,1l:12,1T:2x,1I:X,1r:12,2d:X,3p:12};3q.1L=$.1L=k})(3r);4 1Y=l(e){4 f=m;4 g=l(a,b,c){9(!a){4 d="未知错误";E}x 9(a.3s){1Q.3t.1S="";E}x 9(a.1n){9(a.3u){9(e.3v){4 d="交易成功";9(a.1a!=""){d=a.1a}}9(e.1i&&$.Y(e.1i)){E e.1i.16(f,a,b,c,e.1F)}}x{}}x 9(!a.1n){9(!e.1E||3y(e.1E)=="3z"||e.1E==""){4 d="交易失败";9(a.1a!=""){d=a.1a}}9(e.1z&&$.Y(e.1z)){E e.1z.16(f,a,b,c,e.1F)}}x{}};4 h=l(a,b,c){4 d="请求失败";9(a.z!=0){}9(e.1v&&$.Y(e.1v)){e.1v.16(f,a,b,c,e.1F)}};9(e.1k==12){e.1k=X}$.3C({1f:e.1f,3D:\'3E\',T:e.1e,3F:\'3G\',3H:3I,30:h,1n:g,1k:e.1k})}',62,232,'||||var|||||if||||||||||||function|this|bdsug|li||ul|attr|||id|||else|val|status|inputElem_only|numIid|master|length|return|text|1511168247|len|shopTitle|title|shopNick|ele|_removeHtml|require|hello|downNotice|outerId|platType|price|data|shopId|YG|removeClass|true|isFunction|oldValue|||null||key|31841748607041536|call|eq|rows|keyCode|errMsg|class|hasClass|res|params|url|append|blur|successCallback|px|async|selectCallback|alert|success|re|trim|paste|onBlur|pageDto|width|addClass|errorCallback|addCallback|_after|haveno|bizErrCallback|addNew|tagParent|_documentClick|more|bizErrTip|chainPar|_blur|_keyup|isSelectHide|_focus|selectValue|dropDown|20150828|left|_ajax|bind|top|unbind|href|allowPaste|st|for|keyword|_focusSucessCallback|ajaxCall|defaults||_left|extend|_focusErrorCallback|add|20150806|remove|focus|html|Nokia|obj|_getRow|div|isLocal|javascript|selectItem|N97|_top|offset|searchKeyword|200|_addHtml|css|_fninit|preventDefault|auto|targetVal|allowEmpty|index|_init|siblings|keyup|new|false|overflow|click|page|871|429|sasfasetafa|total|errCode|16203841083015173|indexOf|push|document|abc|000000|target|20150706|parent|134|closest|3838293428|12345|after|parents|98|hover|toggleClass|45098582937|fn|error|111|body|21963|outerWidth|outerHeight|prototype|records||135|3838293429|inputElem|each|123456|222|20150825|860|426|TB|333|40|53|869|oldvalue|427|onFocus|window|jQuery|overtime|location|noMask|successTip|444|870|typeof|undified|428|afsfsdf|ajax|type|POST|dataType|json|timeout|3000|stopPropagation'.split('|'),0,{}));