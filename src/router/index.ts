import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{ path: '/', redirect: '/lanchscreen' },
	{ path: '/lanchscreen', component: () => import('@/views/LanchScreen/index.vue') },
	// 首页
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/Home/index.vue'),
		redirect: '/home/recommend',
		children: [
			// tab页面
			{ path: 'mustsee', name: 'mustsee', component: () => import('@/views/Home/tab/MustSee.vue'), meta: { keepAlive: true } },
			{ path: 'recommend', name: 'recommend', component: () => import('@/views/Home/tab/Recommend.vue') },
			{ path: 'selection', name: 'selection', component: () => import('@/views/Home/tab/Selection.vue'), meta: { keepAlive: true } },
			{ path: 'hot', name: 'hot', component: () => import('@/views/Home/tab/Hot.vue') },
			// 
			{ path: 'caterecommend', name: 'caterecommend', component: () => import('@/views/Home/tab/CateRecommend.vue') },
		]
	},
	// 关注
	{ path: '/feed', name: "feed", component: () => import('@/views/Home/tab/Feed.vue'), meta: { isLogin: true } },
	// 手记页面
	{ path: '/notes',name: 'notes', component: () => import('@/views/Notes/index.vue') },
	// 发现页面
	{ path: '/discovery', component: () => import('@/views/Discovery/index.vue') },
	// 我的页面
	{ path: '/user', component: () => import('@/views/User/index.vue') },
	// 分类页面(热门/精选/搜索页面分类)
	{path: '/cate/:title/:id', name: 'cate', component: () => import('@/components/CateVideo.vue')},
	// 视频详情页
	{path: '/video/:id', name: 'video', component: () => import('@/views/video/index.vue')},
	// 搜索页面
	{path: '/search', name: 'search', component: () => import('@/views/Search/index.vue')},
	// 文章页面
	{path: '/article/:id',name: 'article', component: () => import('@/views/Article/index.vue')},
	// 手记详情页面
	{path: '/note/:id', name: 'note', component: () => import('@/views/Notes/NoteInfo.vue')},
	// 用户详情页
	{path: '/userinfo/:id', name: 'userinfo', component: () => import('@/views/User/userInfo/index.vue')},
	// 粉丝、关注列表页
	{path: '/userlist/:id/:title', name: 'userlist', component: () => import('@/views/User/userList/index.vue')},
	// 404
	{ path: '/404', component: () => import('@/views/NotFound.vue') },
	{ path: '/:pathMatch(.*)', redirect: '/404' }
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})


export default router