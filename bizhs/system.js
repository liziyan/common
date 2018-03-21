({  
    appDir: './',  
    baseUrl: './system',  
    dir: './system1',  
    modules: [  
        {name: 'noticeShow'}, 
		{name: 'oper'}, 
		{name: 'role'}, 
		{name: 'roleAuthEdit'}, 
		{name: 'storeAddAuth'}, 
		{name: 'storemgr'}, 
		{name: 'user'}, 
		{name: 'user_add'}, 
		{name: 'user_pwd'}, 
		{name: 'user_role'}, 
		{name: 'user_upd'}, 
		{name: 'user_verify_phone'}, 
		{name: 'storemgrAddLocal'}, 
		{name: 'editStore'}
    ],  
    preserveLicenseComments:false,
    optimizeCss:"none",
    skipDirOptimize:true, 
    fileExclusionRegExp: /^(r|system)\.js$/, 
    removeCombined: true,
    shim: {
		"underscore": {
			exports: "_"
		}
	},
	paths: {
		"jquery.form": "../base/jquery-form.min",
		"jquery.grid":"../element/jqGrid/js/jquery.jqGrid.src",
		"jquery.grid.zh":"../element/jqGrid/src/i18n/grid.locale-cn",
		"jquery.laydate":"../element/date/dateRange",
		"ajax":"../base/ajax",
		"area":"../base/area.min",
		"pwd":"../base/pwd",
		"dict":"../base/dict",
		"verify":"../base/verify",
		"bindjqgrid":"../base/bindjqgrid",
		"bindDate":"../base/bindDate",
		"auth":"../ebusi/auth"
	}
}) 