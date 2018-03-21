({  
    appDir: './',  
    baseUrl: './ebusi/analyse',  
    dir: './analyse1', 
    modules: [  
        {name: 'analysedeliver'}, 
		{name: 'analyseprofile'}, 
		{name: 'analyseSaleData'}, 
		{name: 'selectArea'}, 
		{name: 'selectGdsCls'} 
    ],  
    preserveLicenseComments:false,
    optimizeCss:"none",
    skipDirOptimize:true, 
    fileExclusionRegExp: /^(r|analyse)\.js$/, 
    removeCombined: true,
    shim: {
		"underscore": {
			exports: "_"
		}
	},
	paths: {		
		"jquery.laydate":"../../element/date/dateRange",
		"ajax":"../../base/ajax",
		"bindDate":"../../base/bindDate",
		"analyseCommon":"analysecommon",
		"jquery.grid":"../../element/jqGrid/js/jquery.jqGrid.src",
		"jquery.grid.zh":"../../element/jqGrid/src/i18n/grid.locale-cn",
		"jquery-dropDown":"../../base/jquery-dropDown",
		"area":"../../base/area.min"
	}
}) 