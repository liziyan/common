eval(function(p,a,c,k,e,r){e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'([457-9abd-fhjkm-uwzA-Z]|[1-3]\\w)'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('9 1J(T,m,G){5 d=b,G=G||\'board\';e=T,m=m||T,A=[],1K=0,U=r;1L=t 2t(-99,d,-99),H=I.2v(e/2),1M=I.2v(m/2),wreg=t J(\'[12]{\'+e+\'}\'),hreg=t J(\'[12]{\'+m+\'}\'),1e=t J(\'1{3}|2{3}\'),1N=t J(\'1{3}\'),1O=t J(\'2{3}\'),1P=t J(\'[^0]\',\'g\'),1Q=t J(\'[^1]\',\'g\'),count2reg=t J(\'[^2]\',\'g\'),1f=r,1g=0,E=1R;5 k=d.k=t State(b);5 f=d.f=t Hint(b);9 K(2w){n(5 i=0;i<A.h;i++){5 x=i%e,y=I.1S(i/e),4=A[i],1r=2w.call(4,x,y,i,4);7(1r)1s}8 d}9 1t(N,1T){7(N){e=m=I.sqrt(N.h);7(1T)d.k.1h(\'1i\',1T)}A=[];n(5 i=0;i<e*m;i++){5 o=N?N[i]:0;A[i]=t 2t(o,d,i)}V();8 d}9 1j(x,y){7(x<0||x>=e||y<0||y>=m)8-1;8 y*e+x}9 V(){}9 1U(2x){7(U)8;clearTimeout(1K);7(!2x){1K=setTimeout(9(){1U(p)},0);8}1f=r;5 W=\'<2y 1V-X="\'+G+\'" G="X" cellpadding=0 cellspacing=0>\';n(5 y=0;y<m;y++){W+=\'<tr>\';n(5 x=0;x<e;x++){5 2A=1j(x,y),4=A[2A],2B=4?((4.o>0)?4.o:\'\'):\'\';5 1W=(x+(y%2))%2;W+=\'<td 1V-x="\'+x+\'" 1V-y="\'+y+\'" 1X="\'+(1W?\'even\':\'1W\')+\'"><1u G="4-\'+x+\'-\'+y+\'" 1X="4 4-\'+2B+\'"><1u 1X="inner"></1u></1u></td>\'}W+=\'</tr>\'}W+=\'</2y>\';$(\'#\'+G).W(W);Game.resize();1f=p;8 d}9 1v(x,y){7(2D(x))8 1L;7(2D(y)){5 i=x;x=i%e,y=I.1S(i/e)}7(x<0||x>=e||y<0||y>=m)8 1L;8 A[1j(x,y)]}5 4=1v;9 s(){K(9(){b.s()});8 d}9 Y(){5 u=[];K(9(){7(b.1Y)u.q(b)});8 u}9 1k(){5 1r=13(p);d.k.1h(\'1i\');8 1r}9 1Z(1l){8 13(1l,p)}9 20(21){5 u=Y(),2E=21?I.1S((21/22)*u.h):1;7(!u.h)8 d;F.1m(u);n(5 i=0;i<2E;i++){5 4=u[i];4.o=d.k.2F(\'1i\',4.x,4.y)}8 d}9 13(1l,23){5 C=0,4,u,w=A;d.k.s();U=p;7(1l||23){5 w=A.1w();F.1m(w)}7(E){5 24=[],25=[],26=[];K(9(x,y,i){7(x==E.x)25.q(b);D 7(y==E.y)24.q(b);D 26.q(b)});w=24.1w(25,[E],26)}5 2G=e*m*50;1n(C++<2G){u=[];5 O=r;n(5 i=0;i<w.h;i++){4=w[i];7(!4.1Y)27;5 2H=28(4);7(2H){7(f.14)8;O=4;1s}D{u.q(4)}}7(E&&O&&E.x==O.x&&E.y==O.y){8 p}7(!O&&u.h&&1l){4=u[0];5 29=F.pick(4.1o);4.o=29;d.k.q(4);7(!P()){d.k.2a(4);4.o=29==1?2:1;d.k.q(4);7(!P()){d.k.2a(4)}}27}7(O){d.k.q(O);7(!P()){d.k.2a()}}D 1s;7(23){1s}}U=r;V();8 Y().h==0}9 2b(){5 Z=[],1e=t J(\'0{3}|1{3}\',\'g\');U=p;9 2I(){n(5 i=0,l=I.pow(2,e);i<l;i++){5 c=F.padLeft((i).toString(2),e);7(c.match(1e)||(c.2J(0).h-1)>H||(c.2J(1).h-1)>H)27;Z.q(c)}}2I();F.1m(Z);9 2c(y){n(5 x=0;x<e;x++){5 4=1v(x,y);4.s()}5 10=1x[y];7(10){Z.q(10);delete 1x[y]}}5 y=0,1x=[],C=F.2d(0,0,e);do{C[y]++;5 10=Z.shift();n(5 x=0;x<e;x++){5 4=1v(x,y);4.o=(10.charAt(x)*1)+1}7(P()){1x[y]=10;y++}D{Z.q(10);2c(y);7(C[y]>=Z.h){C[y]=0;5 2e=1;n(5 y2=2e;y2<y;y2++){2c(y2);C[y2]=0}y=2e}}}1n(y<m);d.k.1h(\'1i\');U=r}9 28(4){4.collect(f);7(d.k.2f){7(d.k.2f[4.id2])4.1o=[1];D 7(d.k.2f[4.id1])4.1o=[2]}7(4.1o.h==1){7(f.14)8 p;4.o=4.1o[0];8 p}7(4.2g){7(2h(4,4.2g)){7(f.14){4.s();5 Q=15.SinglePossibleRowCombo,R=[];7(f.16.h){Q=15.2L;R=f.16}D 7(f.17.h){Q=15.2M;R=f.17}f.S(4,Q,4.2g,R);8 p}8 p}}7(4.2i){7(2h(4,4.2i)){7(f.14){4.s();5 Q=15.SinglePossibleColCombo,R=[];7(f.16.h){Q=15.2L;R=f.16}D 7(f.17.h){Q=15.2M;R=f.17}f.S(4,Q,4.2i,R);8 p}8 p}}8 r}9 2h(4,1y){n(5 18=1;18<=2;18++){4.o=18;1y.o=18==1?2:1;7(!P()){4.o=18==1?2:1;1y.s();8 p}};4.s();1y.s();8 r}5 z={L:[],M:[],1z:[],1A:[]};n(5 i=0;i<e;i++){z.L[i]=F.2d(0,0,m);z.M[i]=F.2d(0,0,e)}9 2j(x,y,i,v){z.L[x][y]=v;z.M[y][x]=v;z.1z[x]=0;z.1A[y]=0}9 1B(i){5 a=z.1z[i];7(!a){5 j=z.L[i].2N(\'\');a=z.1z[i]={col:i,j:j,19:j.1C(1P,\'\').h,1a:j.1C(1Q,\'\').h,1b:1e.1c(j),};7(a.1b){a.2O=1N.1c(j),a.2P=1O.1c(j)}a.1D=a.19==0;a.1E=m-a.19-a.1a;a.1F=a.1a>H||a.1E>H||a.1b}8 a}9 1G(i){5 a=z.1A[i];7(!a){5 j=z.M[i].2N(\'\');a=z.1A[i]={row:i,j:j,19:j.1C(1P,\'\').h,1a:j.1C(1Q,\'\').h,1b:1e.1c(j)};7(a.1b){a.2O=1N.1c(j),a.2P=1O.1c(j)}a.1D=a.19==0;a.1E=e-a.19-a.1a;a.1F=a.1a>H||a.1E>H||a.1b}8 a}9 P(1q){f.16=[];f.17=[];5 M={},L={};n(5 i=0;i<e;i++){5 a=1B(i);7(a.1F&&!1q)8 r;7(a.1D){7(L[a.j]){a.1H=r;a.2Q=L[a.j]-1;7(f.14)f.16.q(L[a.j]-1,i);7(!1q)8 r}D{a.1H=p;L[a.j]=i+1}}5 a=1G(i);7(a.1F&&!1q)8 r;7(a.1D){7(M[a.j]){a.1H=r;a.2Q=M[a.j]-1;7(f.14)f.17.q(M[a.j]-1,i);7(!1q)8 r}D{a.1H=p;M[a.j]=i+1}}}8 p}9 2k(){5 4,w=A.1w(),i=0;F.1m(w);5 1d=[];1n(i<w.h){4=w[i++];5 2R=4.o;4.s();7(!28(4)){4.o=2R;1d.q(4)}D{4.s()}}1g=I.2S(22*(Y().h/(e*m)));8 1d}9 2l(1d){5 C=0,4,w=1d||A.1w();E=1R;d.k.s();7(!1d)F.1m(w);5 i=0;1n(i<w.h&&C++<6){4=w[i++];E=4;5 2T=4,2U=4.o;4.s();d.k.1h(\'2m\');7(13()){d.k.2V(\'2m\');C=0}D{d.k.2V(\'2m\');2T.o=2U}}E=1R;d.k.1h(\'empty\');1g=I.2S(22*(Y().h/(e*m)));K(9(){7(!b.1Y)b.system=p})}9 2n(y){n(5 x=0;x<e;x++)4(x,y).S();8 d}9 2o(y){n(5 x=0;x<e;x++)4(x,y).11();8 d}9 2p(x){n(5 y=0;y<m;y++)4(x,y).S();8 d}9 2q(x){n(5 y=0;y<m;y++)4(x,y).11();8 d}9 11(x,y){7(2W x==\'2X\'&&2W y==\'2X\'){4(x,y).11();8 d}n(5 y=0;y<m;y++)n(5 x=0;x<e;x++)4(x,y).11();8 d}9 S(x,y){4(x,y).S();8 d}9 2Y(){5 1I=[];K(9(x,y,i,4){5 2r=4.o,2Z=d.k.2F(\'1i\',x,y);7(2r>0&&2r!=2Z)1I.q(4)});8 1I}9 2s(){5 N=[];K(9(){N.q(b.o)});8 N};b.K=K;b.V=V;b.1j=1j;b.4=4;b.1k=1k;b.2b=2b;b.2l=2l;b.2k=2k;b.s=s;b.1t=1t;b.13=13;b.1Z=1Z;b.P=P;b.20=20;b.T=T;b.2n=2n;b.2o=2o;b.2p=2p;b.2q=2q;b.S=S;b.11=11;b.2s=2s;b.2j=2j;b.1B=1B;b.1G=1G;b.activateDomRenderer=9(){V=b.V=1U;U=r};b.B(\'A\',9(){8 A});b.B(\'e\',9(){8 e});b.B(\'m\',9(){8 m});b.B(\'30\',9(){8 Y().h});b.B(\'u\',9(){8 Y()});b.B(\'1I\',9(){8 2Y()});b.B(\'1f\',9(){8 1f});b.B(\'G\',9(){8 G});b.B(\'1g\',9(){8 1g});b.B(\'a\',9(){8 z});b.B(\'H\',9(){8 H});b.B(\'1M\',9(){8 1M});b.B(\'f\',9(){8 f});1t()}1J.1k=9(T){5 X,C=0;do{X=t 1J(T);X.1k()}1n(X.30>0&&C++<1)8 X}',[],187,'||||tile|var||if|return|function|info|this||self|width|hint||length||str|state||height|for|value|true|push|false|clear|new|emptyTiles||pool|||gridInfo|tiles|__defineGetter__|attempts|else|tileToSolve|Utils|id|maxPerRow|Math|RegExp|each|cols|rows|values|tileChanged|isValid|hType|doubleRowOrCol|mark|size|noRender|render|html|grid|getEmptyTiles|combos|combo|unmark||solve|active|HintType|doubleColFound|doubleRowFound|valueForTile1|nr0s|nr1s|hasTriple|test|remainingTiles|tripleReg|rendered|quality|save|full|getIndex|generate|isGenerating|shuffle|while|possibleValues||ignoreInvalidState|result|break|load|div|getTile|concat|comboUsed|tile2|colInfo|rowInfo|getColInfo|replace|isFull|nr2s|isInvalid|getRowInfo|unique|wrongTiles|Grid|renderTOH|emptyTile|maxPerCol|tripleRedReg|tripleBlueReg|count0reg|count1reg|null|floor|fullStateValues|domRenderer|data|odd|class|isEmpty|step|ease|percentage|100|stepByStep|sameRow|sameCol|pool2|continue|solveTile|valueToTry|pop|generateFast|clearRow|fillArray|clearFromY|currentState|emptyRowPairWith|findCombo|emptyColPairWith|setValue|breakDownSimple|breakDown|breakdown|markRow|unmarkRow|markCol|unmarkCol|currentValue|getValues|Tile||ceil|handler|direct|table||index|label||isNaN|easeCount|getValueForTile|totalAtt|tileCanBeSolved|generateCombos|split||ColsMustBeUnique|RowsMustBeUnique|join|hasTripleRed|hasTripleBlue|similar|prevValue|round|clearedTile|clearedTileValue|restore|typeof|number|getWrongTiles|okValue|emptyTileCount'.split('|'),0,{}))