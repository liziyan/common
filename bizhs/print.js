({  
    appDir: './',  
    baseUrl: './ebusi/printtemplatemgr',  
    dir: './printtemplatemgr1',  
    modules: [ 
        {name: 'eticketAccountEdit'},//快递单模板选择默认网点
        {name: 'printBatchInfo'}, 
        {name: 'printSysEffectPicSet'}, 
        {name: 'sendTemplateHot'}, //发货单模板-热敏
        {name: 'sendTemplateList'}, //发货单模板-列表
        {name: 'sendTemplateNormal'}, //发货单模板-普通
        {name: 'sendTemplateNormalView'}, //发货单模板-预览
        {name: 'sendTemplateSmall'}, //发货单模板-小票
        {name: 'templateAdd'},
        {name: 'templateCaiNiaoEdit'},
        {name: 'templateMgr'},
        {name: 'templateNetworkEdit'},
        {name: 'templateNormalEdit'},
        {name: 'templateSysAdd'},
        {name: 'templateSystemMgr'}
    ],
    preserveLicenseComments:false,
    optimizeCss:"none", 
    skipDirOptimize:true,  
    fileExclusionRegExp: /^(r|printtemplatemgr)\.js$/, 
    removeCombined: true,  
    shim: {
		"underscore": {
			exports: "_"
		}
	},
	paths: {
		"jquery.printUtil" : "../../base/lodop/printUtil",
		"jquery.LodopFuncs" : "../../base/lodop/LodopFuncs",
		"jquery.cookie" : "../../base/jquery.cookie",
		"jquery.form" : "../../base/jquery-form.min",
		"jquery.dropdown" : "../../base/jquery-dropDown",
		"jquery.grid" : "../../element/jqGrid/js/jquery.jqGrid.src",
		"jquery.grid.zh" : "../../element/jqGrid/src/i18n/grid.locale-cn",
		"verify" : "../../base/verify",
		"ajax" : "../../base/ajax",
		"bindjqgrid" : "../../base/bindjqgrid",
		"com" : "templateCommon",
		"sendCom":"sendTemplateCommon"
	}
}) 