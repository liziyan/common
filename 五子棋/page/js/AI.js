/* 思路：
*/
var gobang=gobang||{};
gobang.AI={
	chessArr:gobang.play.chessArr,
	isAI:gobang.play.isAI,
	scoreWhite:[],	
	scoreBlack:[],
	level:1,
	regrets:gobang.play.regrets,
	init:function(i,j){	
		this._setScore();			
		this._getScore();
		this._play();
	},
	_play:function(){//开始下棋走子		
		var obj=this,ex=this._getFor("black");
		var i=ex.i,
			j=ex.j,
			re=i+"="+j;	
		obj.regrets.push(re);//将步骤存入数组用于悔棋
		$(".black_last").addClass("black").removeClass("black_last");	
		$(".white_last").addClass("white").removeClass("white_last");
		$(".box li[data-i="+i+"][data-j="+j+"]").find("span").removeClass().addClass("white_last");	
		obj.chessArr[i][j]="white";			
		gobang.play._win(i,j,"white");			
	},
	_getScore:function(){//获取最后的分数
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){
				if(this.chessArr[i][j]===0){			
					this.scoreBlack[i][j]=this._backScore(i,j,"black");
					this.scoreWhite[i][j]=this._backScore(i,j,"white");
				}
			}	
		}
	},
	_getFor:function(color){//找到最大值的坐标和值	
		//level=1,新手水平，只守不攻
		//level=2,大师水平，攻守同
		var _maxb=Math.max.apply(null,this.scoreBlack.join(",").split(",")),
			_maxw=Math.max.apply(null,this.scoreWhite.join(",").split(",")),
			_max=_maxb,
			items=this.scoreBlack;
		if(this.level===2){
			_max=_maxb-_maxw>=0 ? _maxb : _maxw;
			items=_maxb-_maxw>=0 ? this.scoreBlack : this.scoreWhite;
		}
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){	
				if(items[i][j]===_max){
					return {"_max": _max, "i": i, "j": j};
				}
			}
		}		
	},
	_backScore:function(i,j,color){		
		var m=this.putDirectX(i,j,color),
			n=this.putDirectY(i,j,color),
			t=this.putDirectXY(i,j,color),			
			h=this.putDirectYX(i,j,color);
		var score=this._score(m.nums,m.side1,m.side2,color) + this._score(n.nums,n.side1,n.side2,color) + this._score(t.nums,t.side1,t.side2,color)+this._score(h.nums,h.side1,h.side2,color);	
		return score;
	},
	_setScore:function(){//初始化数组
		for(var i=0;i<15;i++){
			this.scoreWhite[i]=[];
			this.scoreBlack[i]=[];
			for(var j=0;j<15;j++){
				if(i==7 && j==7){
					this.scoreWhite[i][j]=7;
					this.scoreBlack[i][j]=7;
				}else{
					this.scoreWhite[i][j]=0;
					this.scoreBlack[i][j]=0;
				}
			}	
		}
		
	},
	putDirectX:function(i,j,color){		
		var m, n,num = 1,side1 = false,side2 = false;		
		//左
		for (m = j - 1; m >= 0; m--) {			
			if (this.chessArr[i][m] === color) num++;
			else {
				if (this.chessArr[i][m] === 0) side1 = true;
				break;
			}
		}		
		//右
		for (m = j + 1; m < 15; m++) {		
			
			if (this.chessArr[i][m] === color) num++;
			else {
				if (this.chessArr[i][m] === 0) side2 = true;
				break;
			}
		}		
		return {"nums": num, "side1": !side1, "side2": !side2};
	},
	putDirectY:function(i,j,color){
		var m, n,num = 1,side1 = false,side2 = false;
		//上
		for (m = i - 1; m >= 0; m--) {
			if (this.chessArr[m][j] === color) num++;
			else {
				if (this.chessArr[m][j] === 0) side1 = true;
				break;
			}
		}
		//下
		for (m = i + 1; m < 15; m++) {
			if (this.chessArr[m][j] === color) num++;
			else {
				if (this.chessArr[m][j] ===0) side2 = true;
				break;
			}
		}
		return {"nums": num, "side1": !side1, "side2": !side2};
	},
	putDirectXY:function(i,j,color){
		var m, n,num = 1,side1 = false,side2 = false;
		//左上
		for (m = i - 1, n = j - 1; m >= 0 && n >= 0; m--, n--) {
			if (this.chessArr[m][n] === color) num++;
			else {
				if (this.chessArr[m][n] === 0) side1 = true;
				break;
			}
		}
		//右下
		for (m = i + 1, n = j + 1; m < 15 && n < 15; m++, n++) {
			if (this.chessArr[m][n] === color) num++;
			else {
				if (this.chessArr[m][n] === 0) side2 = true;
				break;
			}
		}
		return {"nums": num, "side1": !side1, "side2": !side2};
	},
	putDirectYX:function(i,j,color){
		var m, n,num = 1,side1 = false,side2 = false;	
		//左下
		for (m = i - 1, n = j + 1; m >= 0 && n < 15; m--, n++) {
			if (this.chessArr[m][n] === color) num++;
			else {
				if (this.chessArr[m][n] === 0) side1 = true;
				break;
			}
		}
		//右上
		for (m = i + 1, n = j - 1; m < 15 && n >= 0; m++, n--) {
			if (this.chessArr[m][n] === color) num++;
			else {
				if (this.chessArr[m][n] === 0) side2 = true;
				break;
			}
		}
		return {"nums": num, "side1": !side1, "side2": !side2};
		
	},
	_score:function(count,temptr1,temptr2,color){
		var a= color==="white"?true : false;
		
		//五棋联
		if(count===5) score= a ? 100000 : 100000;
		//活四 
		else if(count===4 && !temptr1 && !temptr2) score=a?5000:2000;
		//冲四
		else if(count===4 && ((!temptr1 && temptr2)||((temptr1) && !temptr2))) score=a?400:100;
		//活三
		else if(count===3 && !temptr1 && !temptr2) score=a?500:200;
		//冲三
		else if(count===3 && ((!temptr1 && temptr2)||((temptr1) && !temptr2))) score=a?30:20;
		//活二
		else if(count===2 && !temptr1 && !temptr2) score=a?100:50;
		//独二
		else if(count===2 && ((!temptr1 && temptr2)||((temptr1) && !temptr2))) score=a?15:10;
		//活一
		else if(count===1 && !temptr1 && !temptr2) score=a?10:5;
		//独一
		else if(count===1 && ((!temptr1 && temptr2)||((temptr1) && !temptr2))) score=1;
		
		return score;
	}
};
Array.max = function(array) {
return Math.max.apply(Math, array);

};