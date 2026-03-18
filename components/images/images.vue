<template>
	<view class="waterfall-container">
		<view class="waterfall-item" v-for="(item, index) in info" @click="details(index, item)"
			@mouseover="handleMouseOver(index)" @mouseout="handleMouseOut(index)" :key="index">
			<image :src="item.url" mode="widthFix" />
			<view class="mengceng" v-show="item.show">
				<view class="name">{{ item.name }}</view>
				<view class="right" @click.stop="downloadImage(item.url, item.name)">
					<up-icon name="arrow-downward" color="#fff" size="16"></up-icon>
					<text>下载</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
const { aplus_queue } = window;

const props = defineProps({
	info: {
		type: Array,
		default: () => ([])
	},
	dataItem: {
		type: Object,
		default: () => ({})
	}
})
const details = (index, item) => {
	console.log(111)
	//  aplus_queue.push({
	//              action: 'aplus.record',
	//               arguments: ['ceshi', 'CLK']
	//             });
	// aplus_queue.push({
	// 	 action: 'aplus.record',
	// 	 arguments: ['ceshi', 'CLK']
	// })
	// return
	if (props.dataItem.tag_id) {
		let params = {
			...props.dataItem,
			currentPage: index + 1,
			pageSize: 1,
		}
		uni.navigateTo({
			url: `/pages/index/details?params=${encodeURIComponent(JSON.stringify(params))}`
		});
	} else {
		uni.navigateTo({
			url: `/pages/index/details?like=${encodeURIComponent(JSON.stringify(item))}`
		});
	}

}
const handleMouseOver = (index) => {
	props.info[index].show = true
}
const handleMouseOut = (index) => {
	props.info[index].show = false
}
const downloadImage = (url, name) => {
	downloadImageH5(url, name);
}
const downloadImageH5 = (imgUrl, fileName = 'download_img') => {
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
				resolve('下载成功');
			}, 'image/png'); // 默认为 png 格式，可根据需要修改
		};

		// 图片加载失败
		image.onerror = (err) => {
			reject(`下载失败：${err.message}，可能是图片跨域限制或地址错误`);
		};
	});
};

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
				width: 70%;
				display: -webkit-box;
				overflow: hidden;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}

			.right {
				display: flex;
				background: rgba(236, 229, 229, 0.25);
				padding: 0.2vh 0.6vw;
				// width: 3vw;
				// height: 3vh;
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