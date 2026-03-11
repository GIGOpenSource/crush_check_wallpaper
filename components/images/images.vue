<template>
    <view class="waterfall-container">
			<view class="waterfall-item" v-for="item in 10" @click="details">
				<image src="/static/img.png" mode="widthFix" />
			</view>
		</view>
</template>

<script>

</script>

<style lang="scss" scoped>
.waterfall-container {
	column-count: 4;
	margin: 20rpx 80rpx;
	.waterfall-item {
		width: 100%;
		break-inside: avoid-column !important;
		margin-bottom: 20rpx;
	}
	image {
		width: 100%;
		border-radius: 20rpx;
	}
}
</style>