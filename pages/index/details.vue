<template>
  <view class="top">
    <view class="name">{{ details.name }}</view>
    <view class="images">
      <view @click="back"><up-icon name="arrow-left" color="#000" size="20"></up-icon></view>
      <image :src="details.thumb_url || details.url" mode="widthFix" v-if="!details.is_live"/>
      <video :src="details.url" :id="`video-${details.id}`" v-else></video>
      <view @click="up"><up-icon name="arrow-right" color="#000" size="20"></up-icon></view>
    </view>
    <view class="bottom">
      <view> <text>Size：</text> {{ details.width }}*{{ details.height }} <text>Aspect Ratio：</text> {{
        details.aspect_ratio }}
      </view>
      <view class="bottomright">
        <view @click="downloadImage(details.url, details.name,details.is_live)">
          <image src="/static/down2.png" mode="widthFix" />
          <text>Download</text>
        </view>
        <view @click="share = true, umengclick('detail_share_click')">
          <image src="/static/share.png" mode="widthFix" />
          <text>Share</text>
        </view>
      </view>
    </view>
  </view>
  <view class="title">Related Recommendations</view>
  <images :info="likeList" :totalPages="1" :tagspages="1" type="1"></images>
  <up-popup :show="share" @close="share = false" @open="share = true" mode="center" :round="20" :closeable="true">
    <view class="proup">
      <view class="p1">Share to Your Community</view>
      <view class="imageslist">
        <image v-for="(item, index) in imageslist" :key="index" :src="item.img" mode="widthFix"
          @click="share2(item.type)" />
      </view>
      <view class="copy">
        <view class="copyurl">{{ copyurl }}</view>
        <view @click="copy">Copy</view>
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
import { umengclick } from '@/utils/umeng.js'
import { usePageStay } from '@/utils/usePageStay.js'
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
const copyurl = ref('')
usePageStay()
onLoad((e) => {
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
  let data1 = islike.value ? details.value : data.value
  copyurl.value = `https://markwallpapers.com#/pages/index/details?${islike.value ? 'like' : 'params'}=${encodeURIComponent(JSON.stringify(data1))}`

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
    likeList.value = res.data.map(item => {
      return {
        ...item,
        show: false,
        isImgError: false

      }
    })
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
  umengclick('detail_swipe_right')
  if (data.value.currentPage == total.value) {
    data.value.currentPage = 1
  } else {
    data.value.currentPage++
  }
  getdetails()
}
const downloadImage = (url, name,status) => {
  umengclick('detail_download_click')
  if(!status){
      downloadImageH5(url, name);
  }else{
    downloadVideoH5(url, name)
  }

}
const downloadImageH5 = (imgUrl, fileName = 'download_img') => {
  umengclick('download_start')
  return new Promise((resolve, reject) => {
    // 1. 处理本地图片路径（UniApp 本地路径转绝对路径）
    if (imgUrl.startsWith('uni://') || imgUrl.startsWith('/')) {
      imgUrl = uni.env.BASE_URL + imgUrl;
    }

    // 2. 创建图片对象，加载图片
    const image = new Image();
    // 关键：允许跨域（需后端配合配置跨域头 Access-Control-Allow-Origin）
    image.crossOrigin = 'Anonymous';
    image.src = imgUrl;

    // 图片加载完成
    image.onload = () => {
      // 3. 创建画布，将图片绘制到画布
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // 4. 将画布转为 Blob 数据（解决跨域下载问题）
      canvas.toBlob((blob) => {
        // 5. 创建下载链接
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        // 设置文件名（后缀自动匹配图片格式）
        a.download = `${fileName}.${imgUrl.split('.').pop() || 'png'}`;
        // 触发点击下载
        a.click();

        // 6. 释放资源
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        umengclick('download_success')
        resolve('下载成功');
      }, 'image/png'); // 默认为 png 格式，可根据需要修改
    };

    // 图片加载失败
    image.onerror = (err) => {
      umengclick('download_fail')
      reject(`下载失败：${err.message}，可能是图片跨域限制或地址错误`);
    };
  });
};

// 完全仿照你图片下载逻辑写的 —— 终极下载视频（解决跨域 + 不打开播放）
const downloadVideoH5 = (videoUrl, fileName = 'download_video') => {
	return new Promise((resolve, reject) => {
		try {
			// 1. 处理本地路径（和你图片逻辑一样）
			if (videoUrl.startsWith('uni://') || videoUrl.startsWith('/')) {
				videoUrl = uni.env.BASE_URL + videoUrl;
			}

			// 2. 创建隐藏 iframe 下载（不跨域、不打开新页面）
			const iframe = document.createElement('iframe');
			iframe.style.display = 'none'; // 隐藏
			iframe.src = videoUrl; // 视频地址

			// 3. 监听 iframe 加载
			iframe.onload = function () {
				try {
					// 强制触发下载
					const a = document.createElement('a');
					a.href = videoUrl;
					a.download = `${fileName}.mp4`;
					a.click();

					// 成功
					umengclick('download_success');
					resolve('视频下载已开始');
				} catch (e) {
					throw e;
				}

				// 移除 iframe
				setTimeout(() => {
					document.body.removeChild(iframe);
				}, 500);
			};

			// 加载失败
			iframe.onerror = () => {
				document.body.removeChild(iframe);
				umengclick('download_fail');
				reject('视频无法下载，服务器限制');
			};

			// 添加到页面
			document.body.appendChild(iframe);

		} catch (err) {
			umengclick('download_fail');
			reject('下载失败：浏览器限制');
		}
	});
};

//复制
const copy = () => {
  umengclick('copy_link_click')
  uni.setClipboardData({
    data: copyurl.value,
    success: () => {
      uni.showToast({ title: 'Copy Success', icon: 'none' });
    },
    fail: (err) => {
      uni.showToast({ title: 'Copy Fail', icon: 'none' });
    }
  });
}
//分享
const share2 = (type) => {
  shareConfig.value.url = copyurl.value
  shareConfig.value.title = details.value.name
  shareConfig.value.image = details.value.url
  console.log(shareConfig.value, 'shareConfig.value')
  if (type == 'twitter') {
    umengclick('share_to_x')
    const { url, title } = shareConfig.value
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(twitterUrl, '_blank');
  } else if (type == 'facebook') {
    umengclick('share_to_facebook')
    const { url, title } = shareConfig.value
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  } else if (type == 'whatsApp') {
    umengclick('share_to_whatsapp')
    const { url, title } = shareConfig.value
    const text = `${title}\n${url}`;
    const link = `https://web.whatsapp.com/send?text=${encodeURIComponent(title)}`;
    window.open(link, "_blank");
  } else if (type == 'pinterest') {
    umengclick('share_to_pinterest')
    const { url, image, title } = shareConfig.value
    const link = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(title)}`;
    window.open(link, "_blank");
  }
  umengclick('share_success')

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

    video {
      width: 50%;
      height: 50vh;
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
      color: #767676;

      view {
        border: 0.5px solid #767676;
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
  height: 520rpx;

  .p1 {
    font-size: 44rpx;
    font-weight: bold;
    padding-top: 40rpx;
  }

  .imageslist {
    width: 64%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 60rpx;
  }

  image {
    width: 70rpx;
    // margin-right: 30rpx;
  }

  .copy {
    width: 90%;
    border: 1px solid #E2E2E2;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
    margin-top: 50rpx;
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 30rpx;
    font-size: 24rpx;

    .copyurl {
      width: 80%;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
</style>