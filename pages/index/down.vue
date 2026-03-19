<template>
  <view class="page">
    <view class="back" @click="back">
      <image src="/static/back.png" mode="widthFix" />
      <text>返回首页</text>
    </view>
    <view class="content">
      <view class="right">
        <view class="t1">WallpaperCicada移动端</view>
        <view class="t2">立即开始你的壁纸之旅</view>
        <image src="/static/logo2.png" class="logo" />
        <view class="bottom">
          <image src="/static/ios.png" mode="widthFix" @click="umengclick('to_appstore_click'),type = 1,show = true" />
          <image src="/static/apk.png" mode="widthFix" @click="umengclick('to_apk_click'),type = 2,show = true" />
          <image src="/static/google.png" mode="widthFix" @click="umengclick('to_google_play_click'),type = 3,show = true" />
        </view>
      </view>
      <view class="left">
        <image src="/static/img2.png" mode="aspectFit" class="bizhi" />
      </view>
    </view>
  </view>
  <up-popup :show="show" @close="show = false" @open="show = true" mode="center" :round="20" :closeable="true">
    <view class="proup">
      <view class="title">{{ shebei[type] }} APP下载二维码</view>
      <view class="imageslist"><image :src="qrCodeUrl" class="logo" /></view>
      <view class="copy">
        <view>扫描二维码下载壁纸{{shebei[type]}}客户端</view>
      </view>
    </view>
  </up-popup>
</template>

<script setup>
import { ref, onMounted, nextTick ,watch} from 'vue'
import { umengclick } from '@/utils/umeng.js'
import { usePageStay } from '@/utils/usePageStay.js'
const show = ref(false)
const qrCodeUrl = ref('') //二维码
const type = ref(0)
const shebei = {1:'ios',2:'Android',3:'Google'}
const downloadLinks = ref({
  ios: 'https://apps.apple.com/cn/app/crushcheck/id6755988509',
  apk: 'https://www.crashcheck.net/apk/app.apk',
  google: 'https://open.weixin.qq.com/'
})
usePageStay()
const generateQRCode = async () => {
   const qrData = "https://baidu.com"
			try {
				const QRCode = await import('qrcode');
				const qrDataURL = await QRCode.toDataURL(qrData, {
					width: 300,
					height: 300,
					margin: 2,
					color: {
						dark: "#000000",
						light: "#ffffff"
					},
					errorCorrectionLevel: 'M'
				});
				qrCodeUrl.value = qrDataURL;
				console.log('H5二维码生成成功');
			} catch (error) {
				console.error('H5二维码生成失败:', error);
				// H5端备用方案：使用第三方API
				const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
				qrCodeUrl.value = qrApiUrl 
      }
}
const back = () => {

  uni.navigateBack()
  umengclick('download_back')
}
watch(() => [type.value],() => {
  console.log(type.value,'tyemana')
   if(type.value){
       generateQRCode()
   }
})
onMounted(() => {
  // generateQRCode('ios')
})
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.back {
  position: absolute;
  left: 80rpx;
  top: 50rpx;
  display: flex;
  align-items: center;

  image {
    width: 60rpx;
    margin-right: 10rpx;
  }
}

.t1 {
  font-weight: bold;
  font-size: 50rpx;
}

.t2 {
  font-size: 32rpx;
  margin-top: -60rpx;
}

.content {
  display: flex;
  align-items: center;
  margin-top: 80rpx;

  .left {
    width: 600rpx;
    height: 900rpx;
    margin-left: 200rpx;

    image {
      width: 100%;
      height: 100%;
      object-fit: fill;

    }
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 900rpx;

    .logo {
      width: 400rpx;
      height: 400rpx;
    }
  }

  .bottom {
    display: flex;

    image {
      width: 250rpx;
      margin-right: 20rpx;
    }
  }
}
.proup{
   width: 25vw;
   height: 45vh;
   display: flex;
   flex-direction: column;
   align-items: center;
  justify-content: center;
  image{
    width: 400rpx;
    height: 400rpx;
    margin: 40rpx 0;
  }
  .title{
    font-weight: bold;
    font-size: 40rpx;
  }
}
</style>