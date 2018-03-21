({  
    appDir: './',  
    baseUrl: './ebusi/supperlier',  
    dir: './supperlier1',  
    modules: [  
        {name: 'channelMgr'}, 
		{name: 'choseSupplier'}, 
		{name: 'orderDistribute'}, 
		{name: 'orderStartSplit'}, 
		{name: 'supperlierApply'}, 
		{name: 'supperlierMgr'} ,
		{name: 'shangTongDaiApply'} ,
		{name: 'shangTongDaiIndex'}
    ],
    preserveLicenseComments:false,
    optimizeCss:"none", 
    skipDirOptimize:true,
    fileExclusionRegExp: /^(r|supperlier)\.js$/, 
    removeCombined: true,  
    shim: {
		"underscore": {
			exports: "_"
		}
	},
	paths: {		
		"jquery.grid":"../../element/jqGrid/js/jquery.jqGrid.src",
		"jquery.grid.zh":"../../element/jqGrid/src/i18n/grid.locale-cn",
		"jquery.form":"../../base/jquery-form.min",
		"jquery.dropdown":"../../base/jquery-dropDown",
        "jquery.upload":"../../base/uploadimg",
		"ajax":"../../base/ajax",
		"dict":"../../base/dict",
		"bindjqgrid":"../../base/bindjqgrid",
		"area":"../../base/area.min",
        "area.std":"../../base/std.area.min",
		"verify":"../../base/verify"
	}
}) 