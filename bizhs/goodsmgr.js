({  
    appDir: './',  
    baseUrl: './ebusi/goodsmgr',  
    dir: './goodsmgr1',  
    modules: [  
        {name: 'goodsAbnormal'}, 
		{name: 'goodsAdd'}, 
		{name:'goodsBarcodeTemplate'},
		{name: 'goodsCls'}, 
		{name: 'goodsClsPop'}, 
		{name: 'goodsFormat'},
        {name: 'goodsImg'}, 
		{name: 'goodsManage'}, 
		{name: 'goodsMgr'}, 
		{name: 'goodsSingleSelect'},
		{name: 'goodsSku'},
		{name: 'goodsUnit'},
		{name: 'goodsUnitSelect'},
		{name:'printBarcode'}
    ],
    preserveLicenseComments:false,
    optimizeCss:"none",
    skipDirOptimize:true,
    fileExclusionRegExp: /^(r|goodsmgr)\.js$/, 
    removeCombined: true,  
    shim: {
		"underscore": {
			exports: "_"
		}
	},
	paths: {		
		"jquery.grid":"../../element/jqGrid/js/jquery.jqGrid.src",
		"jquery.grid.zh":"../../element/jqGrid/src/i18n/grid.locale-cn",
		"ajax":"../../base/ajax",
		"dict":"../../base/dict",
		"bindjqgrid":"../../base/bindjqgrid",		
		"jquery.from":"../../base/jquery-form.min",
		"jquery.dropdown":"../../base/jquery-dropDown",
		"jquery.upload":"../../base/uploadimg",
		"verify":"../../base/verify",
		"jquery.barcode":"addBarcodeTemplate",
		"jquery.ztree":"../../element/ztree/js/jquery.ztree.core-3.5",		
		"jquery.LodopFuncs":"../../base/lodop/LodopFuncs",
		"jquery.printBarcodeModel":"../../base/lodop/printBarcodeModel",
		"jquery.printBarcodeUtil":"../../base/lodop/printBarcodeUtil",
		"jquery.cookie":"../../base/jquery.cookie"		
	}
}) 