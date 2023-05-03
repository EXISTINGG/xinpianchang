// 导入pinia
import { defineStore, createPinia } from 'pinia'
// 导入持久化插件
// import piniaPluginPersist from 'pinia-plugin-persist'
import {getSelect, getloadMore, getMust, getCommend,getCateRecommend, getHot,getCateHot,getCateListById,getCateSelection,getCateSelectionById,getVmovier,getCateHotMore,getCateSelectionMore} from '@/api/home'
import {getCateArticles,getDiscoveryMore} from '@/api/discover'
import { showToast } from 'vant';
// 创建pinia实例
const pinia = createPinia()
// 挂载piniaPluginPersist实例
// pinia.use(piniaPluginPersist)

export const useVideoDataStore = defineStore('videoData', {
  state: () => {
    return {
      // 视频
      videoData: {
        selectVideo: [] as any, // 无banner
        mustVideo: [] as any, // 无banner
        commendVideo: [] as any,
        CateRecommendVideo: [] as any,
        hotVideo: [] as any,
        // 分类视频(不包含'全球案例','周榜单')
        cateVideo: [] as any,
        // 全球案例视频数据
        vmovierVideo: [] as any,
      },
      // 当前tab
      currentTab: '',
      // 加载更多url
      loadMoreUrl: '',
      // 精选视频页面title
      videoCardTitle: '',
      // 推荐分类的link
      recommendLink: '',
      // 轮播图
      banner: [],
      // 热门页面分类按钮
      hotFunction: [],
      // 分类视频标签
      categories: [] as any,
      // 是否在加载(加载更多)
      loading: true, // 刚进来时不需要刷新页面.改为true
      // 是否在下拉刷新
      refreshing: false, 
      // 是否没有内容了
      finished: false
    }
  },

  getters: {
    
  },

  actions: {
    // 每日精选视频
    async getSelectList () {
      const {data} = await getSelect()
      this.videoData.selectVideo = data.data.children.filter((item: any) => item.type != 'mTitle')
      this.videoCardTitle = data.data.children[0].model.title
      this.changeCurrenBanLoad(data, false, true)
      console.log('this.videoData.selectVideo', this.videoData.selectVideo);  
    },
    // 必看视频
    async getMustList () {
      const {data} = await getMust()
      this.videoData.mustVideo = data.data.children
      this.changeCurrenBanLoad(data, false, true) 
    },
    // 推荐视频
    async getCommendList () {
      const {data} = await getCommend()      
      this.videoData.commendVideo = data.data.children.filter((item: any) => item.type != 'uiBanner')
      this.changeCurrenBanLoad(data, true, true)    
    },

    // 推荐视频分类-首页
    async getCateRecommendList(recommendLink: string) {
      this.videoData.CateRecommendVideo = []
      this.banner = []
      this.loadMoreUrl = ''
      this.refreshing = false
      this.loading = false
      this.finished = false
      const {data} = await getCateRecommend(recommendLink)
      console.log('getCateRecommendList:',data); 
      console.log('有数据',data.data !== null);       
      if (data.data !== null) {
        this.videoData.CateRecommendVideo = data.data.children.filter((item: any) => item.type != 'uiBanner')
        this.changeCurrenBanLoad(data, true, true)

       /*  页面先执行加载函数,在执行视频列表函数,
            如果当前页面无数据,finish会变成true,
            执行视频列表函数,如果有数据,将当前finish变成false
            否则会判断当前页面数据加载完毕 */  
        this.finished = false
      }     
    },

    // 热门视频
    async getHotList() {
      const {data} = await getHot()
      console.log(data);
      this.videoData.hotVideo = data.data.children.filter((item: any) => item.type != 'uiBanner' && item.type != 'uiFunction')
      this.hotFunction = data.data.children.filter((item: any) => item.type == 'uiFunction')[0].children
      this.changeCurrenBanLoad(data, true, true)
    },

    // 热门-分类热门(数据带有标签)
    async getCateHotList() {
      const {data} = await getCateHot()
      console.log('初始化',data)
      this.changeCateVideo(data)     
    },
    // 热门分类(根据标签id分类)
    async getCateListByIdList(id: string) {
      const {data} = await getCateListById(id)
      console.log('byIdData: ',data);
      this.changeCateVideo(data)
      // this.videoData.cateVideo = data.data.list
    },

    // 热门-分类精选(数据带有标签)
    async getCateSelectionList() {
      const {data} = await getCateSelection()
      console.log(data);
      this.changeCateVideo(data)
    },
    // 分类精选(根据标签id分类)
    async getCateSelectionByIdList(id: string) {
      const {data} = await getCateSelectionById(id)
      this.changeCateVideo(data)
      // this.videoData.cateVideo = data.data.list
    },

    // 全球案例
    async getVmovierList() {
      const {data} = await getVmovier()
      console.log(data);
      this.videoData.vmovierVideo = data.data.children
      this.changeCurrenBanLoad(data,false,true)
    },

    // discover页面分类
    async getCateArticles(id: string, isAll?: boolean) {
      const {data} = await getCateArticles(id)
      console.log(data);
      if (isAll) {
        // 全部
        this.changeCateVideo(data, false, id)
      } else {
        this.changeCateVideo(data, true, id)
      }
    },

    // 加载更多-分类
    async getCateMoreList(onRefresh: boolean, title?: string) {
      if(this.loadMoreUrlIsNull()) return
      switch (title) {
        // 分类热门
        case '分类热门':
          const {data: hotMoreData} = await getCateHotMore(this.loadMoreUrl)
          console.log(hotMoreData); 
          this.pushCateHotData(hotMoreData, onRefresh)   
          break;
        // 分类精选
        case '分类精选':
          const {data: selectionMoreData} =  await getCateSelectionMore(this.loadMoreUrl)
          console.log('分类精选: ',selectionMoreData);
          this.pushCateHotData(selectionMoreData, onRefresh)
          break;
        default:
          // 其他:discover页面
          const {data: discoveryMore} = await getDiscoveryMore(this.loadMoreUrl)
          this.pushCateHotData(discoveryMore, onRefresh)
          break;
      }       
    },

    // 加载更多-分类(将数据加入数组)
    pushCateHotData(data: any, onRefresh: boolean) {  
      if (onRefresh) {
        // 上拉刷新(新数据在前,旧数据在后)
        this.videoData.cateVideo.splice(0, 0, ...data.data.list)  
      } else {
        // 加载(新数据在后,旧数据在前)
        this.videoData.cateVideo.splice(this.videoData.cateVideo.length, 0, ...data.data.list)
      }
      this.loadMoreUrl = data.data.next_page_url 
      // 多少条数据
      let num = data.data.list.length
      this.loadEnd(num) 
    },

    // 加载更多-全球案例
    async getVmovierMoreList(onRefresh: boolean) {
      if(this.loadMoreUrlIsNull()) return
      const {data} = await getloadMore(this.loadMoreUrl)
      console.log(data);
      if (onRefresh) {
        this.videoData.vmovierVideo.splice(0,0,...data.data.children)
      } else {
        this.videoData.vmovierVideo.splice(this.videoData.vmovierVideo.length,0,...data.data.children)
      }
      this.changeCurrenBanLoad(data,false,true)
      let num = data.data.children.length
      this.loadEnd(num) 
    },

    // 更改分类视频数据,标签,加载更多url
    changeCateVideo(data: any ,isDiscover?: boolean, id?:string) {
      this.videoData.cateVideo = data.data.list
      console.log('isDiscover: ',isDiscover); 
      try {
          // 是否是discvoer页面的数据
        if (isDiscover) {
          if (data.data?.header?.categories.filter((item: any) => item.value == id)[0].sub != null) {
            this.categories = [{title: '全部', value: -1},...data.data.header.categories.filter((item: any) => item.value == id)[0].sub]
          } else {
            // 防止categories为null,不渲染页面
            this.categories= [{title: '全部', value: -1}]
          }
        } else {
          // 有标签,手动增加'全部'标签      
          if (data.data?.header?.categories) {
            this.categories = [{title: '全部', value: -1},...data.data.header.categories]
          }
        }
      } catch {
        
      }    
      this.loadMoreUrl = data.data.next_page_url     
    },

    // 更改当前banner,loadMoreurl
    changeCurrenBanLoad(data: any, isBanner: boolean, isLoadUrl:boolean) {
      if(isBanner) {
        // console.log(data.data.children.some((item: any) => item.type === 'uiBanner'));
        if (data.data.children.some((item: any) => item.type === 'uiBanner')) {
          this.banner = data.data.children.filter((item: any) => item.type === 'uiBanner')[0].children
        } else {          
          this.banner = []
        }
      }
      if (isLoadUrl) {
        this.loadMoreUrl = data.data.loadMoreURL
        console.log('changeUrl: ',this.loadMoreUrl);       
      }
    },

    // 加载结束
    loadEnd(num: string) {
      console.log('loagEndFunction start');
      
        this.refreshing = false   
        this.finished = false //只有data为null,才完成        
        this.loading = false // 此次加载完毕  
        
        showToast({
          message: `为你更新${num}条数据`,
          position: 'top',
        });
        console.log('loadEnd: ',this.refreshing,this.finished,this.loading);
    },

    // 检查loadMoreUrl
    loadMoreUrlIsNull() {
      if (this.loadMoreUrl === '') {
          this.refreshing = false
          this.loading = false
          this.finished = true
        return true     
      } else {
        return false
      }
    },

    // 首页-加载更多(onRefresh:是否是刷新, tab:哪个tab页面)
    async getMore (onRefresh: boolean, tab: string)  {      
      if(this.loadMoreUrlIsNull()) return console.log('url null');

      const {data} = await getloadMore(this.loadMoreUrl, this.currentTab)
      
      // 上拉刷新(新数据在前,旧数据在后)
      // if (onRefresh) {
        switch (tab) {
          case 'selection':
            console.log('is selection on');          
            // this.videoData.selectVideo = [data.data.children.filter((item: any) => item.type != 'mTitle'),...this.videoData.selectVideo]

            // this.videoData.selectVideo = data.data.children.filter((item: any) => item.type != 'mTitle')
            if (onRefresh) {
              // 上拉刷新(新数据在前,旧数据在后)
              this.videoData.selectVideo.splice(0, 0, ...data.data.children.filter((item: any) => item.type != 'mTitle'))
            } else {
              // 加载(新数据在后,旧数据在前)
              this.videoData.selectVideo.splice(this.videoData.selectVideo.length, 0, ...data.data.children.filter((item: any) => item.type != 'mTitle'))
            }
            this.changeCurrenBanLoad(data, false, true)
            // this.videoData.selectVideo.splice(0, 0, ...data.data.children.filter((item: any) => item.type != 'mTitle'))
            // console.log(this.videoData.selectVideo);
            break;
          case 'recommend':
            console.log('is recommend on');          
            // this.videoData.commendVideo = data.data.children.filter((item: any, i: number) => i != 0)
            // this.videoData.commendVideo = [data.data.children.filter((item: any) => item.type != 'uiBanner'), ...this.videoData.commendVideo]

            // this.videoData.commendVideo = data.data.children.filter((item: any) => item.type != 'uiBanner')
            if (onRefresh) {
              // 上拉刷新(新数据在前,旧数据在后)
              this.videoData.commendVideo.splice(0, 0, ...data.data.children.filter((item: any) => item.type != 'uiBanner'))
            } else {
              // 加载(新数据在后,旧数据在前)
              this.videoData.commendVideo.splice(this.videoData.commendVideo.length, 0, ...data.data.children.filter((item: any) => item.type != 'uiBanner'))
            }
            this.changeCurrenBanLoad(data, true, true)
      // this.videoData.commendVideo = data.data.children.filter((item: any) => item.type === 'uiMiddleCard')
            break;
          case 'hot':
            console.log('is hot on');
            if (onRefresh) {
              // 上拉刷新(新数据在前,旧数据在后)
              this.videoData.hotVideo.splice(0, 0, ...data.data.children.filter((item: any) => item.type != 'uiBanner' && item.type != 'uiFunction'))
            } else {
              // 加载(新数据在后,旧数据在前)
              this.videoData.hotVideo.splice(this.videoData.hotVideo.length, 0, ...data.data.children.filter((item: any) => item.type != 'uiBanner' && item.type != 'uiFunction'))
            }
            this.changeCurrenBanLoad(data, true, true)
            
            break;
          // case 'plot' || 'creative' || 'photography' || 'travel' || 'backstage' || 'mixCut' || 'equipment' || 'animation' || 'vlog' || 'antiquity' || 'advertise':
          default:
            console.log("'plot' || 'creative' || 'photography' || 'travel' || 'backstage' || 'mixCut' || 'equipment' || 'animation' || 'vlog' || 'antiquity' || 'advertise'");
            console.log('清空所有数据2',data.data == null);       
            if (data.data == null) {
              this.banner = []
              this.loadMoreUrl = ''
              this.refreshing = false
              this.loading = false
              this.refreshing = false
              return
            }  
            // this.videoData.CateRecommendVideo = [data.data.children.filter((item: any) => item.type != 'uiBanner'),...this.videoData.CateRecommendVideo]
            // this.videoData.CateRecommendVideo = data.data.children.filter((item: any) => item.type != 'uiBanner')
            // 不影响响应式数据插入新数据
            if (onRefresh) {
              // 上拉刷新(新数据在前,旧数据在后)
              this.videoData.CateRecommendVideo.splice(0, 0, ...data.data.children.filter((item: any) => item.type != 'uiBanner'))
            } else {
              // 加载(新数据在后,旧数据在前)
              this.videoData.CateRecommendVideo.splice(this.videoData.CateRecommendVideo.length, 0, ...data.data.children.filter((item: any) => item.type != 'uiBanner'))
            }
            if (data.data.children.some((item: any) => item.type === 'uiBanner')) {
                // 新数据有banner
                this.changeCurrenBanLoad(data, true, true)
            } else {
                // 新数据没有banner
              this.changeCurrenBanLoad(data, false, true)
            }
            
        }
        // 多少条数据
        let num = data.data.children.filter((item: any) => item.type != 'uiBanner').length
        this.loadEnd(num)
}   
  },

   // 开启数据缓存
  //  persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: 'my_video', // 默认以 store 的 id 作为 key
  //       storage: localStorage, // 数据默认存在 sessionStorage 里,通过storeage属性修改
  //       // 默认所有 state 都会进行缓存，通过 paths 指定要长久化的字段
  //       // paths: ['count', 'arr']
  //     }
  //   ]
  // }
})