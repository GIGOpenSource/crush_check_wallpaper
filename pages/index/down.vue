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
                    <image src="/static/ios.png" mode="widthFix" @click="umengclick('to_appstore_click')"/>
                    <image src="/static/apk.png" mode="widthFix" @click="umengclick('to_apk_click')" />
                    <image src="/static/google.png" mode="widthFix" @click="umengclick('to_google_play_click')"/>
                </view>
            </view>
            <view class="left">
                <image src="/static/img2.png" mode="aspectFit" class="bizhi" />
            </view>
        </view>
    </view>
</template>

<script setup>
import QRCode from '@/utils/qrcode.js'
import { ref,onMounted,nextTick } from 'vue'
import { umengclick,umengstay } from '@/utils/umeng.js'
const qrCodeUrl = ref('')
const canvasWidth = ref(300)
const canvasHeight = ref(300)
const downloadLinks = ref({
    ios: 'https://apps.apple.com/cn/app/crushcheck/id6755988509',
    apk: 'https://www.crashcheck.net/apk/app.apk',
    google: 'https://open.weixin.qq.com/'
})
const generateQRCode = (type) => {
    // 根据点击的按钮类型，获取对应的链接
  let qrText = '';
  switch(type) {
    case 'ios':
      qrText = downloadLinks.ios;
      break;
    case 'apk':
      qrText = downloadLinks.apk;
      break;
    case 'google':
      qrText = downloadLinks.google;
      break;
    default:
      // 默认生成包含所有三个链接的二维码
      qrText = `${downloadLinks.ios}\n${downloadLinks.apk}\n${downloadLinks.google}`;
  }
  
  // 二维码尺寸（px）
  const qrSize = 300;
  canvasWidth.value = qrSize;
  canvasHeight.value = qrSize;
  
  // 等待 canvas 渲染完成
  nextTick(() => {
    // 使用 qrcode.js 生成二维码
    QRCode.toCanvas('qrCanvas', qrText, {
      width: qrSize,
      margin: 2,
      colorDark: '#000000',
      colorLight: '#FFFFFF',
      correctLevel: QRCode.CorrectLevel.M
    }, (error) => {
      if (error) {
        console.error('生成二维码失败:', error);
        showToast({
          title: '生成二维码失败',
          icon: 'none'
        });
      } else {
        // 将 canvas 转换为图片
        setTimeout(() => {
         uni.canvasToTempFilePath({
            canvasId: 'qrCanvas',
            width: qrSize,
            height: qrSize,
            destWidth: qrSize,
            destHeight: qrSize,
            success: (res) => {
              qrCodeUrl.value = res.tempFilePath;
            },
            fail: (err) => {
              console.error('转换图片失败:', err);
              showToast({
                title: '生成二维码失败',
                icon: 'none'
              });
            }
          });
        }, 100);
      }
    });
  });
}
const back = () => {
   
    uni.navigateBack()
    umengclick('download_back')
}
onMounted(() => {
     umengstay('page_stay')
    generateQRCode('ios')
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
            width: 500rpx;
            height: 500rpx;
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
</style>