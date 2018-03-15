//VUE SPA路由 设置
//404
import FalsePage from "views/false.vue"
//默认首页
import Main from "views/main.vue"
import About from "views/about.vue"
//pdf 页面
// import Pdf from "views/pdf.vue"  



export default [
	// {
	// 	//pdf
	// 	path: "/pdf",
	// 	component: Pdf
	// },
	{
		//对应导航
		path: "/",
		//模版
		component: Main,
		//子集导航
		children: [
			{

				path: "404",
				component: FalsePage,
			}
		]
	},
	{
		//对应导航
		path: "/about",
		//模版
		component: About,
		//子集导航
		children: [
			{
				path: ":id",
				component: About,
			}
		]
	},
	{
		//404
		path: "*",
		component: FalsePage
	}

]