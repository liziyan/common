var play = play || {};
play.isNowMan=false;
play.map=com.copyArr(com.zx);
play.mans=com.mans;
play.isFoul=false;
play.isPlay=true;//是否允许走棋
play.depth=3;//级别
play.regrets=[];//记录每一步棋后的布局，用于悔棋
play.pace=[];//记录每一步棋的坐标，用于悔棋
play.person=false; //是否双人对弈
play.who=1;//那一方先走，默认红方
com.canvas.onclick=function(e){//点击棋盘
	if(!play.isPlay) return false;
	var key=play.getKey(e).key,
		_x=play.getKey(e).x,
		_y=play.getKey(e).y;
	if (key){
		play.clickMan(key,_x,_y);	
	}
	else{
		play.clickPoint(_x,_y);	
	}
	play.isFoul = play.checkFoul();//检测是不是长将	
};
play.getKey=function(e){
	var x=Math.floor((e.pageX-com.canvas.offsetLeft - com.pointStartX) / com.spaceX),
		y=Math.floor((e.pageY-com.canvas.offsetTop - com.pointStartY) / com.spaceY);
	if (x < 0 || x>8 || y < 0 || y > 9) return false;	
	var key=(play.map[y][x] && play.map[y][x]!="0") ? play.map[y][x] : false;	
	return {x:x,y:y,key:key}
};
play.clickMan=function(key,x,y){//选中棋
	var man=com.mans[key];
	var my=com.args[key.slice(0,1)].my;
	if(play.isNowMan && play.isNowMan != key && my != com.args[play.isNowMan.slice(0,1)].my){//吃棋
		if (play.indexOfPs(com.mans[play.isNowMan].ps,[x,y])){
			man.isShow = false;	
			var pace=com.mans[play.isNowMan].x+""+com.mans[play.isNowMan].y;	
			play.regrets.push(com.copyArr(play.map));//将更改后的play.map放入数组中便于悔棋	
			delete play.map[com.mans[play.isNowMan].y][com.mans[play.isNowMan].x];
			play.map[y][x] = play.isNowMan;	
			com.mans[play.isNowMan].x = x;
			com.mans[play.isNowMan].y = y;
			com.mans[play.isNowMan].alpha = 1;
			play.isNowMan = false;
			com.dot.dots = [];
			com.show();		
			play.pace.push(pace+x+y);
			if (key == "j0") play.showWin(false);
			if (key == "J0") play.showWin(true);
			if(play.person) play.who=-play.who;
			else setTimeout("play.AIPlay()",500);	
		}
	}else{//到空白地方		
		if((play.person && play.who != my) || (!play.person && my==-1)) return false;//人机对战点黑子，或双人对弈点不对应的子则返回
		if(com.mans[play.isNowMan]) com.mans[play.isNowMan].alpha=1;
		man.alpha=0.6;
		play.isNowMan=key;
		com.pane.isShow = false;
		com.mans[key].ps = com.mans[key].bl();			
		com.dot.dots = com.mans[key].ps;			
		com.show();	
		
	}
};
play.clickPoint = function(x,y,AI){//走棋	
	var man=com.mans[play.isNowMan];	
	if(play.isNowMan){
		if(!AI && !play.indexOfPs(com.mans[play.isNowMan].ps,[x,y])) return false;	
		play.regrets.push(com.copyArr(play.map));//将更改后的play.map放入数组中便于悔棋
		delete play.map[man.y][man.x];//老地址为空
		play.map[y][x] = play.isNowMan;//新地址加入数组		
		var pace=man.x+""+man.y;	
		if(AI) com.showPane(man.x,man.y,x,y);	
		man.x=x;
		man.y=y;
		man.alpha=1;		
		play.isNowMan=false;
		com.dot.dots = [];		
		com.show();					
		play.pace.push(pace+x+y);	
		if(play.person) play.who=-play.who;
		if(!AI && !play.person)	setTimeout("play.AIPlay()",500);
	}
};
play.AIclickMan=function(key,x,y){
	var man = com.mans[key];	
	man.isShow = false;
	var pace=com.mans[play.isNowMan].x+""+com.mans[play.isNowMan].y;
	play.regrets.push(com.copyArr(play.map));//将更改后的play.map放入数组中便于悔棋
	
	delete play.map[com.mans[play.isNowMan].y][com.mans[play.isNowMan].x];
	play.map[y][x] = play.isNowMan;
	com.showPane(com.mans[play.isNowMan].x ,com.mans[play.isNowMan].y,x,y);	
	com.mans[play.isNowMan].x = x;
	com.mans[play.isNowMan].y = y;
	play.isNowMan = false;
	com.show();
	play.pace.push(pace+x+y);
	if (key == "j0") play.showWin(false);
	if (key == "J0") play.showWin(true);	
};
play.AIPlay=function(){//AI自动走棋		
	var pace=AI.init(play.pace.join(""));
	if (!pace || pace=="") {		
		play.showWin(true);
		return ;
	}
	var key=play.map[pace[1]][pace[0]];	
	play.isNowMan=key;	
	var key=play.map[pace[3]][pace[2]];	
	if (key){		
		play.AIclickMan(key,pace[2],pace[3]);	
	}
	else{		
		play.clickPoint(pace[2],pace[3],true);
	}
	
};
play.checkFoul = function(){//检查是否长将
	var p=play.pace;
	var len=parseInt(p.length,10);
	if (len>11&&p[len-1] == p[len-5] &&p[len-5] == p[len-9]){
		return p[len-4].split("");
	}
	return false;
};
play.showWin=function(bool){//显示结果	
	if(bool) alert("恭喜你，你赢了！");
	else alert("很遗憾，你输了！");
	play.reStart();
	$(".star").show();
	$(".con").hide();	
};
play.indexOfPs = function (ps,xy){//棋走位置是否在可走范围之内
	for (var i=0; i<ps.length; i++){
		if (ps[i][0]==xy[0]&&ps[i][1]==xy[1]) return true;
	}
	return false;
};
play.regret=function(){	//悔棋
	if(play.regrets.length==0) return;//开局点悔棋无效，并返回	
	var pace=play.pace, map=play.map;
	var _pace=[],_m=[];
	_pace.push(pace.pop());
	_pace.push(pace.pop());
	_m.push(play.regrets.pop());
	_m.push(play.regrets.pop());
	var _p1=com.copyArr(pace);
	_p=_p1.pop();
	var isBack=play.regrets.slice(play.regrets.length-1,play.regrets.length);	
	for(var i=0;i<_pace.length;i++)
	{	
		var p= _pace[i].split("");
		var x = parseInt(p[0], 10);//移动的key
		var y = parseInt(p[1], 10);
		var _x = parseInt(p[2], 10);//被吃掉的key
		var _y = parseInt(p[3], 10);	
		
		var key=_m[i][y][x];
		var _key=_m[i][_y][_x];	
			
		map[y][x]=key;			
		map[_y][_x]=_key; //如果吃掉则将吃掉的棋子加上去
		loadMan(_m[i]);//重新加载棋盘
		com.mans[key].x=x;
		com.mans[key].y=y;
		if(_p){
			var	_x1=	parseInt(_p[0], 10),
				_y1=	parseInt(_p[1], 10),
				_newX=	parseInt(_p[2], 10),	
				_newY=	parseInt(_p[3], 10);	
			com.showPane(_x1 ,_y1,_newX,_newY);
		}
		else //无可悔棋步数，恢复到最初
		com.pane.isShow=false;
	}	
	play.map=map;	
	com.show();
};
function loadMan(map){//加载棋盘map的棋子
	for (var i=0; i<map.length; i++){
		for (var n=0; n<map[i].length; n++){
			var key = map[i][n];
			if (key){
				com.mans[key].x=n;
				com.mans[key].y=i;
				com.mans[key].isShow = true;
			}
		}
	}	
};
play.regretPerson=function(){//双人对弈的悔棋
	if(play.regrets.length==0) return false;
	var _person= play.who==-1 ? "是否同意红方悔棋的请求" : "是否同意黑方悔棋的请求"; 
	if (!confirm(_person)) return false;	
	var pace=play.pace, map=play.map;
	var _pace=pace.pop(),_m=play.regrets.pop();
	var _p1=com.copyArr(pace);
	_p=_p1.pop();
	var p= _pace.split("");
	var x = parseInt(p[0], 10);
	var y = parseInt(p[1], 10);
	var _x = parseInt(p[2], 10);
	var _y = parseInt(p[3], 10);
	var key=_m[y][x];
	var _key=_m[_y][_x];		
	map[y][x]=key;
	map[_y][_x]=_key;
	loadMan(_m);
	com.mans[key].x=x;
	com.mans[key].y=y;
	if(_p){
		var	_x1=	parseInt(_p[0], 10),
			_y1=	parseInt(_p[1], 10),
			_newX=	parseInt(_p[2], 10),	
			_newY=	parseInt(_p[3], 10);	
		com.showPane(_x1 ,_y1,_newX,_newY);
	}
	else
	com.pane.isShow=false;
	play.map=map;
	play.who=-play.who;	
	com.show();	
};
play.reStart=function(){
	play.isPlay=false;
	play.map=com.copyArr(com.zx);
	play.pace=[];
	play.regrets=[];
	com.bg.show();
	com.pane.isShow=false;
};