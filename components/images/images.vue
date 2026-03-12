<template>
	<view class="waterfall-container">
		<view class="waterfall-item" v-for="(item,index) in info" @click="details" @mouseover="handleMouseOver(index)"
			@mouseout="handleMouseOut(index)" :key="item">
			<image :src="item.url" mode="widthFix" />
			<view class="mengceng" v-if="item.show">
				<view class="name">图片标签/{{ item.name }}</view>
				<view class="right">
					<up-icon name="arrow-downward" color="#fff" size="16"></up-icon>
					<text>下载</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref} from 'vue'
const props = defineProps({
	info: {
		type: Array,
		default: () => ([])
	}
})
const details = () => {
	uni.navigateTo({
		url: '/pages/index/details'
	});
}
const handleMouseOver = (index) => {
	props.info[index].show = true
}
const handleMouseOut = (index) => {
	props.info[index].show = false
}
</script>

<style lang="scss" scoped>
.waterfall-container {
	column-count: 4;
	margin: 20rpx 80rpx;

	.waterfall-item {
		width: 100%;
		break-inside: avoid-column !important;
		margin-bottom: 20rpx;
		position: relative;
		border-radius: 20rpx;
		overflow: hidden;

		.mengceng {
			width: 100%;
			height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: absolute;
			left: 0;
			bottom: 0;
			padding: 0 20rpx;
			box-sizing: border-box;
			color: #fff;

			.name {
				width: 60%;
				display: -webkit-box;
				overflow: hidden;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}

			.right {
				display: flex;
				background: rgba(236, 229, 229, 0.25);
				padding: 5rpx 20rpx;
				border-radius: 40rpx;
				border: 1rpx solid #fff;
				font-size: 24rpx;
			}
		}
	}

	image {
		width: 100%;

	}
}
</style>