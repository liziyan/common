var gobang=gobang||{};
gobang.page={
	//创建棋盘
	init:function(){
		this.w=$(window).width() > $(window).height() ? Math.floor(Math.ceil($(window).height()* 0.9)/15) :Math.floor(Math.ceil($(window).width()* 0.9)/15);
		var ul=$('<ul class="box"></ul>');
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){
				var li=$('<li data-i="'+i+'" data-j="'+j+'"><span></span></li>');
				if(i===0 && j===0) li.addClass("tl");
				else if(i===14 && j===0) li.addClass("bl");
				else if(i===0 && j===14) li.addClass("tr");
				else if(i===14 && j===14) li.addClass("br");				
				else if(i===0 && j!==0) li.addClass("top");
				else if(i===14 && j!==14) li.addClass("bottom");
				else if(i!==0 && j===0) li.addClass("left");
				else if(i!==14 && j===14) li.addClass("right");
				else if((i===7 && j===7) || (i===3 && j===11) || (i===11 && j===3) || (i===3 && j===3) || (i===11 && j===11)) 
					li.addClass("dot");
				ul.append(li);
			}	
		}
		$('.pane').append(ul);
		this._change();		
		this._left=$(".pane").offset().left;
		this._top=$(".pane").offset().top;		
		this._hover();	
		gobang.play.init();		
	},
	_hover:function(){
		var obj=this;
		$('.pane').hover(function(){$(".hover").show();},function(){$(".hover").hide();})	
		$(".box li").hover(function(){			
			var i=parseInt($(this).attr("data-i"))+1,
				j=parseInt($(this).attr("data-j"))+1,
				w=$(".hover").width(),				
				top=obj._getlen(i,w) + obj._top,
				left=obj._getlen(j,w) + obj._left;					
			$(".hover").css({"top":top+"px","left":left+"px"});	
		})
	},
	_change:function(){//改变棋盘大小		
		var ulwidth=this.w*15,
			spanwidth=Math.floor(this.w * 0.8);
		$(".pane").css({"width":ulwidth+"px",height:ulwidth+"px"});
		$(".box").css({"width":ulwidth+"px",height:ulwidth+"px"});
		$(".box li").css({"width":this.w+"px",height:this.w+"px"});
		$(".box li span").css("background-size",spanwidth+"px auto");
		$(".star").css("top",ulwidth/2-80+"px");
	},
	_getlen:function(i,w){//根据坐标和元素的长宽计算出距离		
		return Math.floor(this.w * i - this.w / 2 - w / 2);	
	},
	clear:function(){//清空棋盘
		$(".pane").html("");
		for(var i=0;i<15;i++){//初始化棋子状态			
			for(var j=0;j<15;j++){
				gobang.play.chessArr[i][j]=0;	
			}	
		}
		gobang.play.regrets.length=0;
		this.init();
		
	}
};
$(window).resize(function(){
	gobang.page._change();	
})
gobang.play={
	isAI:false,//电脑下棋	
	who:1,//谁先下，默认player
	isPlay:false,//是否允许走棋
	person:false,//是否双人对弈
	chessArr:[],//存放已下的棋子
	regrets:[],//用于存放棋子便于悔棋
	color:"black",//当前棋子颜色
	init:function(){
		for(var i=0;i<15;i++){//初始化棋子状态
			this.chessArr[i]=[];
			for(var j=0;j<15;j++){
				this.chessArr[i][j]=0;	
			}	
		}
		this.liclick();//开始走棋
	},
	liclick:function(){
		var obj=this;
		$(".star a").click(function(){			
			obj.isPlay=true;
			$("#star").hide();
			if($(this).hasClass("tyroPlay"))
			{
				obj.person=false;
				$(".news").addClass("current");
				$(".superPlay").removeClass("current");
				gobang.AI.level=1;
				gobang.page.clear();
				$(".con1").show();
			}else if($(this).hasClass("back")){
				$(".star").hide();
				obj.isPlay=true;
			}else
			{
				obj.person=true;
				gobang.page.clear();
				$(".con2").show();	
			}
		});
		$(".reChange").click(function(){			
			obj.isPlay=false;			
			$(".back").show();
			$(".con").hide();
			$(".star").show();
		});
		$(".regretBn").click(function(){
			obj._regrets();
		});
		$(".superPlay").click(function(){
			gobang.AI.level=2;
			$(".news").removeClass("current");
			$(this).addClass("current");
			gobang.page.clear();
		});
		$(".news").click(function(){
			gobang.AI.level=1;
			$(".superPlay").removeClass("current");
			$(this).addClass("current");
			gobang.page.clear();
		});				
		$(".box li").live("click",function(){
			if(!obj.isPlay) return;	
			var i=parseInt($(this).attr("data-i")),
				j=parseInt($(this).attr("data-j")),
				re=i+"="+j;	
			if(obj.chessArr[i][j]!==0) return;			
			obj.regrets.push(re);//将步骤存入数组用于悔棋
			$(".black_last").addClass("black").removeClass("black_last");	
			$(".white_last").addClass("white").removeClass("white_last");			
			$(this).find("span").removeClass().addClass(obj.color+"_last");
			obj.chessArr[i][j]=obj.color;			
			obj._win(i,j,obj.color);
			if(obj.person){
				obj.color = obj.color==="black" ? "white" : "black";
			}else{
				gobang.AI.init(i,j);	
			}
		});		
	},
	_win:function(i,j,color){//判断结果
		var num=1,m,n;			
		//上
		for(m=i-1;m>=0;m--){			
			if(this.chessArr[m][j]===color) num++;
			else break;
		}				
		//下
		for(m=i+1;m<15;m++){			
			if(this.chessArr[m][j]===color) num++;	
			else break;
		}		
		if(num>=5){
			this._result(color);
			return;	
		}else num=1;
		//左
		for(n=j-1;n>=0;n--){
			if(this.chessArr[i][n]==color) num++;
			else break;	
		}
		//右
		for(n=j+1;n<15;n++){
			if(this.chessArr[i][n]===color) num++;
			else break;	
		}		
		if(num>=5){
			this._result(color);
			return;	
		}else num=1;
		//左斜上
		for(n=j-1,m=i-1;n>=0 && m>=0;m--,n--){
			if(this.chessArr[m][n]===color) num++;
			else break;		
		}
		//右斜下
		for(n=j+1,m=i+1;n<15 && m<15;m++,n++){
			if(this.chessArr[m][n]===color) num++;
			else break;		
		}		
		if(num>=5){
			this._result(color);
			return;	
		}else num=1;
		//右斜上
		for(n=j+1,m=i-1;n<15 && m>=0;m--,n++){
			if(this.chessArr[m][n]===color) num++;
			else break;		
		}
		//左斜下
		for(n=j-1,m=i+1;n>=0 && m<15;n--,m++){
			if(this.chessArr[m][n]===color) num++;
			else break;		
		}
		if(num>=5){
			this._result(color);
			return;	
		}else num=1;
	},
	_result:function(color){
		this.isPlay=false;
		if(color=="black") alert("black！")
		else alert("white！");
	},
	_regrets:function(){//悔棋
		var a=this.regrets.pop();
		var i=a.split("=")[0],
			j=a.split("=")[1];
		this.chessArr[i][j]=0;
		$("li[data-i="+i+"][data-j="+j+"]").find("span").removeClass();
		if(this.person){//双人对弈			
			this.color=this.color==="black" ? "white" : "black";
		}else{//人机对战的悔棋
			var b=this.regrets.pop();
			var _i=b.split("=")[0],
				_j=b.split("=")[1];
			this.chessArr[_i][_j]=0;
			$("li[data-i="+_i+"][data-j="+_j+"]").find("span").removeClass();			
		}
		var c=this.regrets[this.regrets.length-1];		
		if(c){
			var m=c.split("=")[0],
				n=c.split("=")[1];
			var obj=$("li[data-i="+m+"][data-j="+n+"]").find("span");
			var _c=obj.attr("class")+"_last";
			obj.removeClass().addClass(_c);
		}		
	}
};