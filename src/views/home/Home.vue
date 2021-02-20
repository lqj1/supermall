<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore" >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" 
                  :titles="['流行','新款','精选']" 
                  @tabClick="tabClick" />
      <goods-list :goods="showGoods"/>
    </scroll>

    <!-- native监听组件元素的原生事件，不然没法监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import HomeSwiper from './ChildComps/HomeSwiper'
  import RecommendView from './ChildComps/RecommendView'
  import FeatureView from './ChildComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from 'network/home'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list:[]},
          'new': {page: 0, list:[]},
          'sell': {page: 0, list:[]},
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    created() {
      // 1. 请求多个数据
      this.getHomeMultidata()
      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
      
    },
    methods: {
      /**
       * 事件监听相关的
       */
      loadMore() {
        // console.log('首页上拉加载更多')
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.scroll.refresh();
      },
      contentScroll(position) {
        this.isShowBackTop = -position.y > 1000
      },
      backClick() {
        // 访问组件内部data(scroll)属性，并调用方法
        this.$refs.scroll.scroll.scrollTo(0,0,500);
      },
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        console.log(index);
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res=>{
          // this.result = res;
          // console.log(res.data)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      // 请求三种不同的分类数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  /* 
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .content{
      overflow: hidden;
      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
  }
</style>