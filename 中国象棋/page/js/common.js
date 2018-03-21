// JavaScript Document
var com=com || {};
com.stype={
	stype1:{
		width:325,//画布宽
		height:423,//画布高
		spaceX:35,//棋子间隔横距离
		spaceY:36,	//棋子间隔纵距离
		pointStartX:5,//第一个棋子（車）横坐标
		pointStartY:19,//第一个棋子（車）纵坐标
		page:"stype_1"	//图片目录
	},
	stype2:{
		width:530,		//画布宽度
		height:567, 		//画布高度
		spaceX:57,		//着点X跨度
		spaceY:57,		//着点Y跨度
		pointStartX:-2,		//第一个着点X坐标;
		pointStartY:0,		//第一个着点Y坐标;
		page:"stype_2"	//图片目录
	}	
};
com.init=function(stype){	
	var stype = com.stype[stype];		
	com.canvas=document.getElementById("chess");
	com.ct=com.canvas.getContext("2d");
	document.write("<link href='img/"+stype.page+"/css.css' rel='stylesheet' type='text/css' />");
	
	com.canvas.width=stype.width;
	com.canvas.height=stype.height;
	com.spaceX=stype.spaceX;
	com.spaceY=stype.spaceY;
	com.pointStartX=stype.pointStartX;
	com.pointStartY=stype.pointStartY;
	com.page=stype.page;
	
	com.childList=com.childList||[];
	
	com.loadImages(com.page);
};
com.loadImages=function(src){
	//绘制棋盘
	com.bgImg=new Image();
	com.bgImg.src="img/"+src+"/bg.png";	
	
	//绘制提示点
	com.dotImg=new Image();
	com.dotImg.src="img/"+src+"/dot.png";	
	//绘制棋子外边框
	com.paneImg=new Image();
	com.paneImg.src="img/"+src+"/r_box.png";
	//绘制棋子
	for(var i in com.args){	
		com[i]={};
		com[i].img=new Image();
		com[i].img.src="img/"+src+"/"+ com.args[i].img;		
	}
};
//显示移动的棋子外框
com.showPane  = function (x,y,newX,newY){	
	com.pane.isShow=true;
	com.pane.x= x ;
	com.pane.y= y ;
	com.pane.newX= newX ;
	com.pane.newY= newY ;
};
com.copyArr=function(arr){	//复制数组
	var newArr=[];
	for (var i=0; i<arr.length ; i++){	
		newArr[i] = arr[i].slice();
	}
	return newArr;
};
com.value = {
	c:[//车价值
		[206, 208, 207, 213, 214, 213, 207, 208, 206],
		[206, 212, 209, 216, 233, 216, 209, 212, 206],
		[206, 208, 207, 214, 216, 214, 207, 208, 206],
		[206, 213, 213, 216, 216, 216, 213, 213, 206],
		[208, 211, 211, 214, 215, 214, 211, 211, 208],
		
		[208, 212, 212, 214, 215, 214, 212, 212, 208],
		[204, 209, 204, 212, 214, 212, 204, 209, 204],
		[198, 208, 204, 212, 212, 212, 204, 208, 198],
		[200, 208, 206, 212, 200, 212, 206, 208, 200],
		[194, 206, 204, 212, 200, 212, 204, 206, 194]
	],
	m:[//马价值
		[90, 90, 90, 96, 90, 96, 90, 90, 90],
		[90, 96,103, 97, 94, 97,103, 96, 90],
		[92, 98, 99,103, 99,103, 99, 98, 92],
		[93,108,100,107,100,107,100,108, 93],
		[90,100, 99,103,104,103, 99,100, 90],
		
		[90, 98,101,102,103,102,101, 98, 90],
		[92, 94, 98, 95, 98, 95, 98, 94, 92],
		[93, 92, 94, 95, 92, 95, 94, 92, 93],
		[85, 90, 92, 93, 78, 93, 92, 90, 85],
		[88, 85, 90, 88, 90, 88, 90, 85, 88]
	],
	x:[//相价值
		[0, 0,20, 0, 0, 0,20, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0,23, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0,20, 0, 0, 0,20, 0, 0],
		
		[0, 0,20, 0, 0, 0,20, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[18,0, 0, 0,23, 0, 0, 0,18],
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0,20, 0, 0, 0,20, 0, 0]
	],
	s:[//士价值
		[0, 0, 0,20, 0,20, 0, 0, 0],
		[0, 0, 0, 0,23, 0, 0, 0, 0],
		[0, 0, 0,20, 0,20, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0,20, 0,20, 0, 0, 0],
		[0, 0, 0, 0,23, 0, 0, 0, 0], 
		[0, 0, 0,20, 0,20, 0, 0, 0]
	],
	j:[//将价值
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0], 
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0], 
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0]
	],
	p:[//炮价值
		[100, 100,  96, 91,  90, 91,  96, 100, 100],
		[ 98,  98,  96, 92,  89, 92,  96,  98,  98],
		[ 97,  97,  96, 91,  92, 91,  96,  97,  97],
		[ 96,  99,  99, 98, 100, 98,  99,  99,  96],
		[ 96,  96,  96, 96, 100, 96,  96,  96,  96], 
		
		[ 95,  96,  99, 96, 100, 96,  99,  96,  95],
		[ 96,  96,  96, 96,  96, 96,  96,  96,  96],
		[ 97,  96, 100, 99, 101, 99, 100,  96,  97],
		[ 96,  97,  98, 98,  98, 98,  98,  97,  96],
		[ 96,  96,  97, 99,  99, 99,  97,  96,  96]
	],
	z:[//卒价值
		[ 9,  9,  9, 11, 13, 11,  9,  9,  9],
		[19, 24, 34, 42, 44, 42, 34, 24, 19],
		[19, 24, 32, 37, 37, 37, 32, 24, 19],
		[19, 23, 27, 29, 30, 29, 27, 23, 19],
		[14, 18, 20, 27, 29, 27, 20, 18, 14],
		
		[ 7,  0, 13,  0, 16,  0, 13,  0,  7],
		[ 7,  0,  7,  0, 15,  0,  7,  0,  7], 
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0]
	]
};
//黑子为红字价值位置的倒置
com.value.C = com.copyArr(com.value.c).reverse();
com.value.M = com.copyArr(com.value.m).reverse();
com.value.X = com.value.x;
com.value.S = com.value.s;
com.value.J = com.value.j;
com.value.P = com.copyArr(com.value.p).reverse();
com.value.Z = com.copyArr(com.value.z).reverse();

com.args={//棋子
	//我方  中文名称、图片路径、我方、阵营、权重
	'c':{text:"車",img:'r_c.png',my:1,bl:"c",value:com.value.c},
	'm':{text:"马",img:'r_m.png',my:1,bl:"m",value:com.value.m},
	'x':{text:"相",img:'r_x.png',my:1,bl:"x",value:com.value.x},
	's':{text:"仕",img:'r_s.png',my:1,bl:"s",value:com.value.s},
	'j':{text:"将",img:'r_j.png',my:1,bl:"j",value:com.value.j},
	'p':{text:"炮",img:'r_p.png',my:1,bl:"p",value:com.value.p},
	'z':{text:"兵",img:'r_z.png',my:1,bl:"z",value:com.value.z},
	//敌方
	'C':{text:"车",img:'b_c.png',my:-1,bl:"c",value:com.value.C},
	'M':{text:"马",img:'b_m.png',my:-1,bl:"m",value:com.value.M},
	'X':{text:"象",img:'b_x.png',my:-1,bl:"x",value:com.value.X},
	'S':{text:"士",img:'b_s.png',my:-1,bl:"s",value:com.value.S},
	'J':{text:"帅",img:'b_j.png',my:-1,bl:"j",value:com.value.J},
	'P':{text:"炮",img:'b_p.png',my:-1,bl:"p",value:com.value.P},
	'Z':{text:"卒",img:'b_z.png',my:-1,bl:"z",value:com.value.Z}	
};
com.zx=[
	['C0','M0','X0','S0','J0','S1','X1','M1','C1'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,'P0',    ,    ,    ,    ,    ,'P1',    ],
	['Z0',    ,'Z1',    ,'Z2',    ,'Z3',    ,'Z4'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['z0',    ,'z1',    ,'z2',    ,'z3',    ,'z4'],
	[    ,'p0',    ,    ,    ,    ,    ,'p1',    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['c0','m0','x0','s0','j0','s1','x1','m1','c1']
];
com.mans={};
com.createMans=function(zx){
	for(var i=0;i<zx.length;i++)
	{
		for(var j=0;j<zx[i].length;j++)
		{
			var k=zx[i][j];
			if(k)
			{
				com.mans[k]=new com.class.Man(k);				
				com.mans[k].x=j;
				com.mans[k].y=i;
				com.childList.push(com.mans[k]);				
			}
		}		
	}
};
//绘画的类
com.class=com.class || {};
com.class.Man=function(key,x,y){
	var o=com.args[key.slice(0,1)];	
	this.img=com[key.slice(0,1)].img;
	this.x= x || 0;
	this.y= y || 0;
	this.alpha = 1;	
	this.isShow=false;
	this.my=o.my;	
	this.my = o.my;
	this.text = o.text;
	this.value = o.value;
	this.isShow = true;
	this.alpha = 1;
	this.ps = []; //着点
	this.show=function(){
		if(this.isShow){
			com.ct.save();
			com.ct.globalAlpha = this.alpha;
			com.ct.drawImage(this.img, com.spaceX * this.x + com.pointStartX ,com.spaceY * this.y + com.pointStartY);
			com.ct.restore();	
		}
	};	
	this.bl = function (map){
		var map = map || play.map;
		
		return com.bylaw[com.args[key.slice(0,1)].bl](this.x,this.y,map,this.my);
	}	
};
com.class.Bg=function(){//绘制背景
	this.isShow=false;
	this.show=function(){
		if(this.isShow)
		com.ct.drawImage(com.bgImg,0,0);
	}
};
com.class.pane=function(img,x,y){//绘制走的点
	this.isShow=false;	
	this.x=x || 0;
	this.y=y||0;
	this.newX = x||0; 
    this.newY = y||0;
	this.show=function(){
		if(this.isShow){
			com.ct.drawImage(com.paneImg, com.spaceX * this.x + com.pointStartX , com.spaceY *  this.y + com.pointStartY);			
			com.ct.drawImage(com.paneImg, com.spaceX * this.newX + com.pointStartX  , com.spaceY *  this.newY + com.pointStartY);	
		}	
	}
};
com.class.Dot = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.isShow = true;
	this.dots=[];	
	this.show = function (){
		for (var i=0; i<this.dots.length;i++){
			if (this.isShow) com.ct.drawImage(com.dotImg, com.spaceX * this.dots[i][0]+10  + com.pointStartX ,com.spaceY *  this.dots[i][1]+10 + com.pointStartY);
		}
	}
};
com.show=function(){
	com.ct.clearRect(0,0,com.canvas.width,com.canvas.height);	
	for(var k=0;k<com.childList.length;k++)
	{			
		com.childList[k].show();
	}	
};
window.onload=function(){
	com.bg=new com.class.Bg();
	com.pane=new com.class.pane();	
	com.dot=new com.class.Dot();	
	com.childList=[com.bg,com.pane,com.dot];
	com.createMans(com.zx);
	com.bg.isShow=true;	
	com.bg.show();
};
com.init("stype1");
$(".tyroPlay").click(function(){//人机、新手
	play.reStart();
	$(".star").hide();
	$(".con1").show();
	play.isPlay=true;	
	play.person=false;
	$(this).addClass("hover");
	$(".superPlay").removeClass("hover");
	play.depth=3;
	loadMan(com.zx);	
	com.show();
});
$(".superPlay").click(function(){//大师
	play.reStart();
	$(".star").hide();
	$(".con1").show();
	$(this).addClass("hover");
	$(".tyroPlay").removeClass("hover");
	play.isPlay=true;
	play.depth=4;
	loadMan(com.zx);	
	com.show();
});
$(".personPlay").click(function(){//双人对弈、红棋	
	play.reStart();
	$(".star").hide();
	$(".con2").show();
	$(this).addClass("hover");
	$(".blockPlay").removeClass("hover");
	play.isPlay=true;
	play.person=true;
	play.who=1;
	loadMan(com.zx);	
	com.show();
});
$(".blockPlay").click(function(){//黑棋
	play.reStart();
	$(".star").hide();
	$(".con2").show();	
	$(this).addClass("hover");
	$(".personPlay").removeClass("hover");
	play.isPlay=true;
	play.person=true;
	play.who=-1;
	loadMan(com.zx);	
	com.show();
});
$(".regretBn").click(function(){//悔棋
	if(play.person) play.regretPerson();
	else play.regret();
});
$(".reChange").click(function(){//重选模式
	play.reStart();
	$(".star").show();
	$(".con").hide();
});



