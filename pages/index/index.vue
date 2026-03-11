<template>
	<view class="page">
		<!-- 头部 -->
		<view class="top">
			<view class="topLeft">
				<image src="/static/logo.png" class="logo" mode="widthFix" />
				<view class="type">
					<text>静态</text>
					<view><up-icon name="arrow-down" color="#6B6B6B" size="20"></up-icon></view>
				</view>
				<view class="shebei">
					<view v-for="(item, index) in shebeiType" :key="item" :class="current == index ? 'current' : ''"
						@click="current = index">{{ item }}</view>
				</view>
				<view class="search">
					<input type="text" placeholder="电脑壁纸4K...">
					<image src="/static/search.png" mode="widthFix" />
				</view>
			</view>
			<view class="topRight">
				<up-icon name="more-dot-fill" color="#000" size="22"></up-icon>
				<view class="btn">
					<image src="/static/down.png" mode="widthFix" />
					<text>下载移动端</text>
				</view>
			</view>
		</view>
		<view style="height:150rpx"></view>
		<!-- 标题 -->
		<view class="title" v-if="current == 0">
			<view class="t1">WallpaperCicada</view>
			<view>这里是全网优质高清壁纸聚集地，汇集风景、动漫、简约、游戏、影视等多种风格...</view>
		</view>
		<!-- 分类 -->
		<view class="catetory">
			<swiper class="swiper">
				<swiper-item class="swiper-item">
					<view v-for="(item, index) in 10" :class="catetory == index ? 'current' : ''"
						@click="catetory = index">自然风景</view>
					<up-icon name="arrow-right" color="#6B6B6B" size="20"></up-icon>
				</swiper-item>
			</swiper>
		</view>
		<!-- 内容 -->
		<images></images>

	</view>
</template>

<script setup>
import { ref } from 'vue'
const shebeiType = ['电脑壁纸', '手机壁纸']
const current = ref(0)
const catetory = ref(0)
</script>

<style lang="scss" scoped>
.page {
	// padding: 0 80rpx;
	font-size: 28rpx;
}

.top {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #fff;
	box-sizing: border-box;
	padding: 30rpx 80rpx;
	height: 150rpx;
	border-bottom: 1rpx solid #E9E6E6;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;

	.topLeft {
		display: flex;
		align-items: center;

		.logo {
			width: 200rpx;
			vertical-align: middle;
		}

		.type {
			display: flex;
			align-items: center;
			margin: 0 50rpx;
			padding: 8rpx 20rpx;
			border: 1rpx solid #6B6B6B;
			border-radius: 40rpx;

			text {
				display: block;
				margin-top: -5rpx;
				margin-right: 5rpx;
			}
		}

		.shebei {
			display: flex;
			margin-right: 50rpx;
			border: 1rpx solid #6B6B6B;
			border-radius: 40rpx;
			overflow: hidden;

			view {
				padding: 5rpx 15rpx;

			}

			.current {
				background: #000;
				color: #fff;

			}
		}

		.search {
			width: 550rpx;
			height: 70rpx;
			border-radius: 60rpx;
			border: 1rpx solid #ACACAC;
			display: flex;
			align-items: center;

			input {
				text-indent: 25rpx;
				font-size: 26rpx;
				width: 90%;
			}

			image {
				width: 40rpx;
			}
		}
	}

	.topRight {
		display: flex;
		align-items: center;

		.btn {
			margin-left: 50rpx;
			background: #000;
			color: #fff;
			font-size: 26rpx;
			display: flex;
			align-items: center;
			padding: 10rpx 15rpx;
			border-radius: 40rpx;

			image {
				width: 30rpx;
			}
		}
	}
}

.title {
	width: 100%;
	margin: 40rpx 0;
	margin-bottom: 20rpx;
	text-align: center;
	font-size: 26rpx;

	.t1 {
		color: #000;
		font-family: Source Han Sans;
		font-weight: bolder;
		font-size: 60rpx;
		margin-bottom: 20rpx;

	}
}

.catetory {
	margin: 0 80rpx;
	margin-top: 20rpx;

	.swiper {
		width: 100%;
		height: 80rpx;
	}

	.swiper-item {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		view {
			padding: 5rpx 25rpx;
			border-radius: 40rpx;
		}

		.current {
			background: #000;
			color: #fff;
		}
	}
}

</style>
