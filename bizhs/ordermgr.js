({  
    appDir: './',  
    baseUrl: './ebusi/ordermgr',  
    dir: './ordermgr1',  
    modules: [
        {name: 'doAccountMgr'},//电子面单
        {name: 'gdsInfo'}, 
        {name: 'goodsInfo'},
        {name: 'modRecvMsg'}, 
        {name: 'newScanOrder'}, 
        {name: 'newWeightOrder'}, 
        {name: 'orderAdd'}, 
        {name: 'orderDown'},
        {name: 'orderInfo'}, 
        {name: 'orderMod'},
        {name: 'orderPrint'},
        {name: 'orderSearch'},
        {name: 'orderSendMgr'},
        {name: 'orderUpload'},
        {name: 'orderVerify'},
        {name: 'orderView'},
        {name: 'processOper'},//process/processOper
        {name: 'returnRegistration'},
        {name: 'searchSync'},//吕建清的查询
        {name: 'selectModel'},
        {name: 'senderInfoDelete'},
        {name: 'senderInfoEdit'},
        {name: 'senderInfoMgrNew'},
        {name: 'waybillAccountMgr'},//电子面单
        {name: 'waybillCancel'},//waybillMgr
		{name: 'waybillCancelRecords'}//waybillMgr
    ], 
    preserveLicenseComments:false,
    optimizeCss:"none", 
    skipDirOptimize:true, 
    fileExclusionRegExp: /^(r|ordermgr)\.js$/, 
    removeCombined: true,  
    shim: {
		"underscore": {
			exports: "_"
		}
	},
	paths: {
		"jquery.grid":"../../element/jqGrid/js/jquery.jqGrid.src",
		"jquery.grid.zh":"../../element/jqGrid/src/i18n/grid.locale-cn",
		"jquery.dropdown":"../../base/jquery-dropDown",
		"jquery.laydate":"../../element/date/dateRange",
		"jquery.LodopFuncs":"../../base/lodop/LodopFuncs",
		"jquery.printUtil":"../../base/lodop/printUtil",
		"jquery.printTool":"../printTool",	
		"jquery.scroll": "../../base/jquery-divscroll",
		"jquery.qrcode":"../../base/jquery.qrcode.min",
		"jquery.form":"../../base/jquery-form.min",	
		"jquery.upload":"../../base/uploadimg",
		"loadingBar":"../../base/loadingBar",
		"area":"../../base/area.min",
		"ajax":"../../base/ajax",
		"bindDate":"../../base/bindDate",
		"bindjgrid":"../../base/bindjqgrid",
		"com":"orderStartCommon",
		"dict":"../../base/dict",
		"detail":"orderVerifyDetail",
		"printDetail":"orderPrintDetail",
		"templateCom" : "../printtemplatemgr/templateCommon",
		"verify":"../../base/verify",	
		"verifyCom":"orderVerifyAndPrint"
	}
}) 