<template>
    <view class="page">
        <view class="back" @click="back">
            <image src="/static/back.png" mode="widthFix" />
            <text>返回首页</text>
        </view>
        <view class="t1">WallpaperCicada移动端</view>
        <view class="t2">随时随地发现和设置精美壁纸</view>
        <view class="content">
            <view class="left">
                <image src="/static/img2.png" mode="aspectFit" class="bizhi" />
            </view>
            <view class="right">
                <image src="/static/logo2.png" mode="widthFix" class="logo" />
                <view class="bottom">
                    <image src="/static/ios.png" mode="widthFix" />
                    <image src="/static/apk.png" mode="widthFix" />
                    <image src="/static/google.png" mode="widthFix" />
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
const back = () => {
    uni.reLaunch({ url: '/pages/index/index' })
}
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
    image{
        width: 60rpx;
        margin-right: 10rpx;
    }
}

.t1 {
    font-weight: bold;
    font-size: 50rpx;
}

.t2 {
    font-size: 28rpx;
    margin-top: 20rpx;
}

.content {
    display: flex;
    align-items: center;
    margin-top: 80rpx;

    .left {
        width: 600rpx;
        height: 900rpx;
        margin-right: 200rpx;

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
            width: 200rpx;
        }
    }

    .bottom {
        display: flex;

        image {
            width: 200rpx;
            margin-right: 20rpx;
        }
    }
}
</style>