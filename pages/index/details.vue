<template>
  <view class="top">
    <view class="name">壁纸名称</view>
    <view class="images">
      <view class="left"><up-icon name="arrow-leftward" color="#272636" size="20"></up-icon></view>
      <image src="/static/img.png" mode="widthFix" />
      <view class="left"><up-icon name="arrow-rightward" color="#272636" size="20"></up-icon></view>
    </view>
    <view class="bottom">
      <view> <text>尺寸：</text> 3840*2180 <text>宽高比：</text> 16：9</view>
      <view class="bottomright">
        <view @click="uni.navigateTo({url:'/pages/index/down'})">
          <image src="/static/down2.png" mode="widthFix" />
          <text>下载</text>
        </view>
        <view @click="share = true">
          <image src="/static/share.png" mode="widthFix" />
          <text>分享</text>
        </view>
      </view>
    </view>
  </view>
  <view class="title">相关推荐</view>
  <images></images>
  <up-popup :show="share" @close="share = false" @open="share = true" mode="center" :round="20" :closeable="true">
    <view class="proup">
      <view class="p1">分享到你的社区</view>
      <view class="imageslist">
        <image v-for="(item, index) in imageslist" :key="index" :src="item.img" mode="widthFix" />
      </view>
    </view>
  </up-popup>
</template>

<script setup>
import { ref } from 'vue'
const share = ref(false)
const imageslist = [
  {
    img: '/static/icon1.png'
  },
  {
    img: '/static/icon2.png'
  },
  {
    img: '/static/icon3.png'
  },
  {
    img: '/static/icon4.png'
  }
]
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  margin-left: 100rpx;
  font-size: 36rpx;
  margin-bottom: 80rpx;
}

.top {
  width: 100%;
  box-sizing: border-box;
  padding: 30rpx 50rpx;

  .name {
    font-weight: bold;
    margin-left: 100rpx;
    font-size: 40rpx;
  }

  .images {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30rpx 0 10rpx 0;

    image {
      width: 50%;
    }

    .left {
      background: #FFFFFF;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
      padding: 15rpx;
      border-radius: 50%;
    }
  }

  .bottom {
    font-size: 28rpx;
    margin: 20rpx 90rpx;
    display: flex;
    justify-content: space-between;

    text {
      margin-left: 10rpx;
      color: #484848;
    }

    .bottomright {
      display: flex;
      align-items: center;

      view {
        border: 0.5px solid #CACACA;
        margin-left: 25rpx;
        padding: 10rpx 20rpx;
        border-radius: 50rpx;
      }
    }

    image {
      width: 30rpx;
      vertical-align: middle;
      margin-top: -5rpx;
    }
  }
}

.proup {
  width: 16vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 440rpx;
  .p1{
    font-size: 40rpx;
    font-weight: bold;
  }
  .imageslist{
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 60rpx;
  }
  image {
    width: 70rpx;
    // margin-right: 30rpx;
  }
}
</style>