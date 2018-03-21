
echo D:\JENKINS_HOME\workspace\flyfish-pipe\flyfish_ebusicrl_ReleaseBuild\flyfish.web\src\main\webapp\%~dp0

cd %~dp0
rd/s/q .\static\dist
md .\static\dist
md .\static\dist\ebusi

node .\bizjquery\r.js -o .\bizjquery\analyse.js
move .\bizjquery\analyse1\ebusi\analyse .\static\dist\ebusi\
rd/s/q .\bizjquery\analyse1

node .\bizjquery\r.js -o .\bizjquery\print.js
move .\bizjquery\printtemplatemgr1\ebusi\printtemplatemgr .\static\dist\ebusi\
rd/s/q .\bizjquery\printtemplatemgr1

node .\bizjquery\r.js -o .\bizjquery\goodsmgr.js
move .\bizjquery\goodsmgr1\ebusi\goodsmgr .\static\dist\ebusi\
rd/s/q .\bizjquery\goodsmgr1

node .\bizjquery\r.js -o .\bizjquery\inventory.js
move .\bizjquery\inventory1\ebusi\inventory .\static\dist\ebusi\
rd/s/q .\bizjquery\inventory1

node .\bizjquery\r.js -o .\bizjquery\ordermgr.js
move .\bizjquery\ordermgr1\ebusi\ordermgr .\static\dist\ebusi\
rd/s/q .\bizjquery\ordermgr1

node .\bizjquery\r.js -o .\bizjquery\providersmgr.js
move .\bizjquery\providersmgr1\ebusi\providersmgr .\static\dist\ebusi\
rd/s/q .\bizjquery\providersmgr1

node .\bizjquery\r.js -o .\bizjquery\supperlier.js
move .\bizjquery\supperlier1\ebusi\supperlier .\static\dist\ebusi\
rd/s/q .\bizjquery\supperlier1

node .\bizjquery\r.js -o .\bizjquery\system.js
move .\bizjquery\system1\system .\static\dist
rd/s/q .\bizjquery\system1

node .\bizjquery\r.js -o .\bizjquery\main.js
move .\bizjquery\main1\main .\static\dist
rd/s/q .\bizjquery\main1

