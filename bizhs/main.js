({  
    appDir: './',  
    baseUrl: './main',  
    dir: './main1',  
    modules: [  
        {name: 'findPWD'},
		{name: 'frame'}, 
		{name: 'newRegister'}
    ], 
    preserveLicenseComments:false,
    optimizeCss:"none", 
    skipDirOptimize:true, 
    fileExclusionRegExp: /^(r|main)\.js$/, 
    removeCombined: true,  
    shim: {
		"underscore": {
			exports: "_"
		}
	},
	paths: {
		"jquery.form": "../base/jquery-form.min",
		"jquery.scroll": "../base/jquery-divscroll",
		"jquery.cookie":"../base/jquery.cookie",
		"ajax":"../base/ajax",
		"regCommon":'registerCommon',
		"verify":"../base/verify",
		"auth":"../ebusi/auth",
		"index":"indexMain",
		"cookie":"../base/cookie",
		"pwd":"../base/pwd",
		"active":"active"//首页的各种活动和弹出层	
	}
}) 