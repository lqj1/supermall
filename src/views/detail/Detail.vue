<template>
  <div id="detail">
    <!-- 导航 -->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>

  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import Scroll from 'components/common/scroll/Scroll'

import { getDetail, Goods, Shop, GoodsParam } from 'network/detail'
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    }
  },
  methods: {
    imageLoad () {
      this.$refs.scroll.refresh()
    }
  },
  created () {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid
    // 2. 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result
      // 2.1 获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages
      // 2.2 获取商品信息，通过构造函数将不同字段的数据归到统一对象中
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 2.3 创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
      // 2.4 保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 2.5 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)


    }).catch((err) => {
      console.log(err);
    });
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}

.back-top {
  position: fixed;
  right: 10px;
  bottom: 65px;
}
</style>