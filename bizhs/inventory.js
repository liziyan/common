({  
    appDir: './',  
    baseUrl: './ebusi/inventory',  
    dir: './inventory1',  
    modules: [  
        {name: 'checkAdd'}, 
		{name: 'checkDetail'}, 
		{name: 'checkMgr'}, 
		{name: 'goodsSel'}, 
		{name: 'importStkAmt'}, 
        {name: 'operlogDetail'}, 
		{name: 'persionSelect'}, 
		{name: 'storeHouseMgr'}, 
		{name: 'storeMgr'},
		{name: 'storeWarning'},
		{name: 'warehouseDetail'},
		{name: 'warehouseMgr'}		
    ], 
    preserveLicenseComments:false,
    optimizeCss:"none", 
    skipDirOptimize:true, 
    fileExclusionRegExp: /^(r|inventory)\.js$/, 
    removeCombined: true,  
    shim: {
		"underscore": {
			exports: "_"
		}
	},
	paths: {		
		"jquery.grid":"../../element/jqGrid/js/jquery.jqGrid.src",
		"jquery.grid.zh":"../../element/jqGrid/src/i18n/grid.locale-cn",
		"printTool":"../printTool",
		"lodop":"../../base/lodop/LodopFuncs",
		"ajax":"../../base/ajax",
		"bindjqgrid":"../../base/bindjqgrid",		
		"jquery.laydate":"../../element/date/dateRange",
		"jquery.dropdown":"../../base/jquery-dropDown",
		"dict":"../../base/dict",
		"bindDate":"../../base/bindDate",
		"jquery.ztree":"../../element/ztree/js/jquery.ztree.core-3.5",
		"verify":"../../base/verify",
		"jquery.form":"../../base/jquery-form.min",
		"jquery-upload":"../../base/uploadimg"		
	}
}) 