eval(function(p,a,c,k,e,r){e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'([3-9a-cefhjkn-qstwzA-Z]|1\\w)'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 Tile(4,c,G){e 9=8,x=8.x=G%c.Y,y=8.y=Math.floor(G/c.Y),H=8.H=x+\',\'+y,M=new RegExp(\'0\',\'g\'),h=[],z=A,B=A;e 6={k:\'k\',n:\'n\',o:\'o\',p:\'p\'};8.id1=H+\'=\'+1;8.id2=H+\'=\'+2;7 N(){I(0)}7 C(Z,10){e 11=x+Z,12=y+10;3 c.f(11,12)}7 O(){3 5(6.n)};7 P(){3 5(6.k)};7 Q(){3 5(6.o)};7 R(){3 5(6.p)};7 5(t){13(t){q 6.n:3 C(1,0);q 6.k:3 C(-1,0);q 6.o:3 C(0,-1);q 6.p:3 C(0,1)}}7 I(v){4=v;c.I(x,y,G,v);a(!c.rendered)c.render();else{e $f=$(\'#f-\'+x+\'-\'+y);$f.14().15(\'f f-\'+4)}3 9}7 S(){e J=K,v=4;a(!v)3 K;e l=6.k,r=6.n;J=(5(l).4==v&&5(l).5(l).4==v)||(5(r).4==v&&5(r).5(r).4==v)||(5(l).4==v&&5(r).4==v);3 J}7 T(){e L=K,v=4;a(!v)3 K;e u=6.o,d=6.p;L=(5(u).4==v&&5(u).5(u).4==v)||(5(d).4==v&&5(d).5(d).4==v)||(5(u).4==v&&5(d).4==v);3 L}7 U(){3 J()||L()}7 V(b){a(4>0)3 9;h=[1,2];B=A;z=A;16(e v=1;v<=2;v++){e W=v==1?2:1;16(e t in 6){a(5(t).4==v&&5(t).5(t).4==v){h=[W];a(b&&b.w)b.j(9,v==2?s.17:s.18);3 9}}a((5(6.k).4==v&&5(6.n).4==v)||(5(6.o).4==v&&5(6.p).4==v)){h=[W];a(b&&b.w)b.j(9,v==2?s.17:s.18);3 9}}e D=c.getRowInfo(y);a(D.19>=c.1a){h=[2];a(b&&b.w)b.j(9,s.1b);3 9}a(D.1c>=c.1a){h=[1];a(b&&b.w)b.j(9,s.1b);3 9}a(D.1d==2){D.1e.1f(M,7(m,i){a(i!=9.x)B=c.f(i,9.y)})}e E=c.getColInfo(x);a(E.19>=c.1g){h=[2];a(b&&b.w)b.j(9,s.1h);3 9}a(E.1c>=c.1g){h=[1];a(b&&b.w)b.j(9,s.1h);3 9}a(E.1d==2){E.1e.1f(M,7(m,i){a(i!=9.y)z=c.f(9.x,i)})}3 9}7 j(){e $f=$(\'#f-\'+x+\'-\'+y);$f.15(\'1i\');3 9}7 X(){e $f=$(\'#f-\'+x+\'-\'+y);$f.14(\'1i\');3 9};8.O=O;8.P=P;8.Q=Q;8.R=R;8.5=5;8.N=N;8.V=V;8.j=j;8.X=X;8.S=S;8.T=T;8.U=U;8.F(\'4\',7(){3 4});8.1j(\'4\',7(v){3 I(v)});8.F(\'isEmpty\',7(){3 4==0});8.F(\'h\',7(){3 h});8.1j(\'h\',7(v){h=v});8.F(\'B\',7(){3 B});8.F(\'z\',7(){3 z})}7 opposite(4){13(4){q 6.n:3 6.k;q 6.k:3 6.n;q 6.o:3 6.p;q 6.p:3 6.o}3 A}',[],82,'|||return|value|move|Directions|function|this|self|if|hint|grid||var|tile||possibleValues||mark|Left|||Right|Up|Down|case||HintType|dir|||active|||emptyColPairWith|null|emptyRowPairWith|traverse|rowInfo|colInfo|__defineGetter__|index|id|setValue|partOfTripleX|false|partOfTripleY|reg0|clear|right|left|up|down|isPartOfTripleX|isPartOfTripleY|isPartOfTriple|collect|opp|unmark|width|hor|ver|newX|newY|switch|removeClass|addClass|for|MaxTwoBlue|MaxTwoRed|nr1s|maxPerRow|RowMustBeBalanced|nr2s|nr0s|str|replace|maxPerCol|ColMustBeBalanced|marked|__defineSetter__'.split('|'),0,{}))