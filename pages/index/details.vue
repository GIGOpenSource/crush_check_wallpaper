<template>
  <view class="top">
    <view class="name">{{ details.name }}</view>
    <view class="images">
      <view class="left" @click="back"><up-icon name="arrow-leftward" color="#272636" size="20"></up-icon></view>
      <image :src="details.url" mode="widthFix" />
      <view class="left" @click="up"><up-icon name="arrow-rightward" color="#272636" size="20"></up-icon></view>
    </view>
    <view class="bottom">
      <view> <text>尺寸：</text> {{ details.width }}*{{ details.height }} <text>宽高比：</text> {{ details.aspect_ratio }}
      </view>
      <view class="bottomright">
        <view @click="downloadImage(details.url)">
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
  <images :info="likeList"></images>
  <up-popup :show="share" @close="share = false" @open="share = true" mode="center" :round="20" :closeable="true">
    <view class="proup">
      <view class="p1">分享到你的社区</view>
      <view class="imageslist">
        <image v-for="(item, index) in imageslist" :key="index" :src="item.img" mode="widthFix"
          @click="share2(item.type)" />
      </view>
    </view>
  </up-popup>
</template>

<script setup>
import { ref } from 'vue'
import { getWallpapersList, guessLike } from '@/api/index.js'
import {
  onLoad
} from '@dcloudio/uni-app'
const share = ref(false)
const details = ref({})
const data = ref({})
const total = ref({})
const likeList = ref([])
const shareConfig = ref({
  url: '', // 必传：要分享的链接
  title: '', // 可选：分享文案标题
  image: ''
})
const islike = ref(false)
const imageslist = [
  {
    img: '/markwallpapers/static/icon1.png',
    type: 'whatsApp'
  },
  {
    img: '/markwallpapers/static/icon2.png',
    type: 'facebook'
  },
  {
    img: '/markwallpapers/static/icon3.png',
    type: 'twitter'
  },
  {
    img: '/markwallpapers/static/icon4.png',
    type: 'pinterest'
  }
]
onLoad((e) => {
  console.log(e, 'eee')
  if (e.params) {
    let params = JSON.parse(decodeURIComponent(e.params))
    data.value = params
    islike.value = false
    getdetails()
  } else if (e.like) {
    let like = JSON.parse(decodeURIComponent(e.like))
    details.value = like
    islike.value = true
    getlike()
  }

})
const getdetails = () => {
  getWallpapersList(data.value).then(res => {
    details.value = res.data.results[0]
    total.value = res.data.pagination.total
    getlike()
  })

}
//相关推荐
const getlike = () => {
  guessLike(details.value.id).then(res => {
    console.log('猜你喜欢', res.data)
    likeList.value = res.data
  })
}
//上一个
const back = () => {
  if (data.value.currentPage == 1) {
    data.value.currentPage = total.value
  } else {
    data.value.currentPage--
  }
  getdetails()
}
//下一个
const up = () => {
  if (data.value.currentPage == total.value) {
    data.value.currentPage = 1
  } else {
    data.value.currentPage++
  }
  getdetails()
}
const downloadImage = (url) => {
  const link = document.createElement('a');
  link.download = `img_${Date.now()}.png`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  uni.hideLoading();
  uni.showToast({
    title: '下载成功',
    icon: 'none'
  });
}
//分享
const share2 = (type) => {
  let params = islike ? details.value : data.value
  shareConfig.value.url = `https://markwallpapers.com#/pages/index/details?${islike ? 'like' : 'params'}=${encodeURIComponent(JSON.stringify(params))}`
  shareConfig.value.title = details.value.name
  shareConfig.value.image = details.value.url
  console.log(shareConfig.value,'shareConfig.value')
  if (type == 'twitter') {
    const { url, title } = shareConfig.value
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(twitterUrl, '_blank');
  } else if (type == 'facebook') {
    const { url, title } = shareConfig.value
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  } else if (type == 'whatsApp') {
    const { url, title } = shareConfig.value
    const text = `${title}\n${url}`;
    const link = `https://web.whatsapp.com/send?text=${encodeURIComponent(title)}`;
    window.open(link, "_blank");
  } else if (type == 'pinterest') {
    const { url,image,title } = shareConfig.value
    const link = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(title)}`;
    window.open(link, "_blank");
  }

}
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
  width: 20vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 440rpx;

  .p1 {
    font-size: 40rpx;
    font-weight: bold;
  }

  .imageslist {
    width: 75%;
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