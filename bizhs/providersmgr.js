({  
    appDir: './',  
    baseUrl: './ebusi/providersmgr',  
    dir: './providersmgr1',  
    modules: [  
        {name: 'providerDetail'}, 
		{name: 'providersMgr'},
		{name: 'userSruvey'},
		{name: 'authReg'},
		{name: 'authLogin'},
		{name: 'asynUpDownLoadMgr'}
    ],
    preserveLicenseComments:false, 
    optimizeCss:"none",
    skipDirOptimize:true,  
    fileExclusionRegExp: /^(r|providersmgr)\.js$/, 
    removeCombined: true,  
    shim: {
		"underscore": {
			exports: "_"
		}
	},
	paths: {
		"ajax":"../../base/ajax",
		"dict":"../../base/dict",
		"jquery.grid":"../../element/jqGrid/js/jquery.jqGrid.src",
		"jquery.grid.zh":"../../element/jqGrid/src/i18n/grid.locale-cn",
		"jquery.form" : "../../base/jquery-form.min",
		"bindjqgrid":"../../base/bindjqgrid",
		"jquery.cookie": "../../base/jquery.cookie",
		"jquery.laydate":"../../element/date/dateRange",
		"bindDate":"../../base/bindDate",
		"verify":"../../base/verify",
		"pwd":"../../base/pwd",
		"regCommon":'../../main/registerCommon'
	}
}) 