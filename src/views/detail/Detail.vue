<template>
  <div id="detail">
    <!-- 导航 -->
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
    <h2>111111111111122</h2>
    <h2>111111111111122</h2>
    <h2>111111111111122</h2>
    <h2>111111111111122</h2>
    <h2>111111111111122</h2>
    <h2>111111111111122</h2>
    <h2>111111111111122</h2>
    < </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

import Scroll from 'components/common/scroll/Scroll'

import { getDetail, Goods, Shop } from 'network/detail'
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}
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
    }).catch((err) => {
      console.log(err);
    });
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100%-44px);
}
</style>