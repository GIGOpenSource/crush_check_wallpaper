<template>
	<view class="page">
		<!-- 头部 -->
		<view class="fixed" :style="current === 1 ? { boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.3)' } : {}">
			<view class="top">
				<view class="topLeft">
					<image src="/static/logo.png" class="logo" mode="widthFix" />
					<view class="search" v-if="current">
						<image src="/static/search.png" mode="widthFix" @click="search" />
						<input type="text" placeholder="电脑壁纸4K..." v-model="name" @confirm="search">
						<view class="type">
							<up-select v-model:current="media_live" :label="media_live ? '动态' : '静态'"
								:options="cateList" @select="selectItem"></up-select>
						</view>
					</view>

				</view>
				<view class="topRight">
					<view>
						<up-select v-model:current="current" :label="current == 0 ? '电脑壁纸' : '手机壁纸'"
							:options="shebeiType" @select="current = item.id"></up-select>
					</view>
					<text class="tiaokuan">条款</text>
					<view class="btn" @click="uni.navigateTo({ url: '/pages/index/down' })">
						<image src="/static/down.png" mode="widthFix" />
						<text>下载移动端</text>
					</view>
				</view>
			</view>
			<!-- 手机分类 -->
			<view class="catetory" v-if="current == 1">
				<swiper class="swiper" @change="changeCatetory">
					<swiper-item class="swiper-item" v-for="item in tagNum" :key="item">
						<up-icon name="arrow-left" color="#6B6B6B" size="20" @click="catetoryDown"
							v-if="tagspages > 1"></up-icon>
						<view class="sign" v-for="(item, index) in tagList" :key="index">
							<view :class="catetory == index ? 'current' : ''"
								@click="catetory = index, tag_id = item.tag">
								{{ item.nav_name }}</view>
						</view>
						<up-icon name="arrow-right" color="#6B6B6B" size="20" @click="catetoryUp"
							v-if="tagspages !== tagNum"></up-icon>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view style="height:300rpx" v-if="current == 1"></view>
		<view style="height:150rpx" v-else></view>
		<!-- 轮播 -->
		<view class="swiper-wrapper" v-if="current == 0">
			<swiper indicator-dots autoplay circular class="swiper" indicator-active-color="#fff"
				indicator-color="rgba(255, 255, 255, .4)">
				<swiper-item v-for="(item, index) in 3" :key="index" class="swiper-item">
					<image src="/static/swiper.png" />
				</swiper-item>
			</swiper>
			<view class="content">
				<view class="t1">WallpaperCicada</view>
				<view class="search search1">
					<image src="/static/search2.png" mode="widthFix" @click="search" />
					<input type="text" placeholder="电脑壁纸4K..." v-model="name" @confirm="search"
						placeholder-style="color:#fff">
					<view class="type">
						<up-select v-model:current="media_live" :label="media_live ? '动态' : '静态'" :options="cateList"
							@select="selectItem"></up-select>
					</view>
				</view>
				<view class="catetory-swiper-wrapper">

					<swiper class="catetory-swiper" @change="changeCatetory">
						<swiper-item class="catetory-swiper-item" v-for="item in tagNum" :key="item">
							<up-icon name="arrow-left" color="#fff" size="20" @click="catetoryDown"
								v-if="tagspages > 1"></up-icon>
							<view class="sign" v-for="(item, index) in tagList" :key="index">
								<view :class="catetory == index ? 'current' : ''"
									@click="catetory = index, tag_id = item.tag">
									{{ item.nav_name }}</view>
							</view>
							<up-icon name="arrow-right" color="#fff" size="20" @click="catetoryUp"
								v-if="tagspages !== tagNum"></up-icon>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<!-- 内容 -->
		<images :info="list" :dataItem="{ name, tag_id, media_live, platform: current == 0 ? 'PC' : 'PHONE' }"></images>
	</view>
</template>

<script setup>
import { getWallpapersList, getWallpapersTags } from '@/api/index.js'
import { onReachBottom } from '@dcloudio/uni-app'
import { ref, onMounted, watch } from 'vue'
const current = ref(0)
const catetory = ref(0)
const pages = ref(1)//当前页面
const name = ref('')
const list = ref([]) //壁纸列表
const tagList = ref([]) //标签

const tag_id = ref('')
const media_live = ref(false)
const totalPages = ref('') //总页码

const tagspages = ref(1) //标签当前页
const tagNum = ref('') //总计
const cateList = ref([
	{
		id: false,
		name: '静态'
	}, {
		id: true,
		name: '动态'
	}
])
const shebeiType = [{ id: 0, name: '电脑壁纸' }, { id: 1, name: '手机壁纸' }]
//初始化数据
const init = () => {
	pages.value = 1
	list.value = []
	getlist()
}
// 选择 
const selectItem = (item) => {
	console.log(item);
	media_live.value = item.id
};
//获取壁纸列表
const getlist = () => {
	let params = {
		currentPage: pages.value,
		pageSize: 20,
		name: name.value,
		tag_id: tag_id.value,//标签id
		media_live: media_live.value,//静态false或动态true
		platform: current.value == 0 ? 'PC' : 'PHONE',
	}
	getWallpapersList(params).then(res => {
		let end = res.data.results.map(item => {
			return {
				...item,
				show: false
			}
		})
		list.value = [...list.value, ...end]
		totalPages.value = res.data.pagination.total_pages
	})
}
//获取导航
const getTags = () => {
	let params = {
		currentPage: tagspages.value,
		pageSize: 10
	}
	getWallpapersTags(params).then(res => {
		tagList.value = res.data.results
		tagNum.value = res.data.pagination.total_pages
		tag_id.value = res.data.results[0].tag
		console.log(tagList.value, 'tagList.value')
		init()
	})

}
const search = () => {
	init()
}
//分类下一页
const catetoryUp = () => {
	if (tagspages.value == tagNum.value) return
	catetory.value = 0
	tagList.value = []
	tagspages.value++
	getTags()

}

const catetoryDown = () => {
	if (tagspages.value == 1) return
	catetory.value = 0
	tagList.value = []
	tagspages.value--
	getTags()
}
//滑动
const changeCatetory = (e) => {
	catetory.value = 0
	tagList.value = []
	tagspages.value = e.detail.current + 1
	getTags()

}
//导航刷新
onReachBottom(() => {
	if (pages.value == totalPages.value) return
	pages.value++
	getlist()
})
onMounted(() => {

	getTags()
})

watch(() => [current.value, media_live.value, tag_id.value],
	() => {
		init()
	}
)
</script>

<style lang="scss" scoped>
.page {
	// padding: 0 80rpx;
	font-size: 28rpx;
}

.search {
	width: 40vw;
	height: 70rpx;
	border-radius: 60rpx;
	background: rgba(216, 216, 216, 0.35);
	display: flex;
	align-items: center;
	margin-left: 100rpx;

	input {
		text-indent: 25rpx;
		font-size: 26rpx;
		width: 88%;
		// background: pink;
	}

	image {
		width: 40rpx;
		margin-left: 20rpx;
	}
}
.fixed{
		position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	z-index: 999;
}
.top {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #fff;
	box-sizing: border-box;
	padding: 30rpx 80rpx;
	height: 150rpx;
	


	.topLeft {
		display: flex;
		align-items: center;

		.logo {
			width: 250rpx;
			vertical-align: middle;
		}

		.type {
			display: flex;
			align-items: center;

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


	}

	.topRight {
		display: flex;
		align-items: center;

		.btn {
			// margin-left: 50rpx;
			background: #F8A705;
			color: #fff;
			font-size: 26rpx;
			display: flex;
			align-items: center;
			padding: 10rpx 20rpx;
			border-radius: 40rpx;

			image {
				width: 30rpx;
				margin-top: 7rpx;
			}
		}

		.tiaokuan {
			margin: 0 30rpx;
		}
	}
}

//轮播
.swiper-wrapper {
	margin: 0 80rpx;
	position: relative;

	.swiper {
		height: 450rpx;
		width: 100%;
	}

	.swiper-item {
		width: 100%;
		height: 100%;

		image {
			width: 100%;
			height: 100%;
			border-radius: 20rpx;
		}
	}

	.content {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 450rpx;
		width: 100%;
		z-index: 11;
		color: #fff;

		.search1 {
			background: rgba(255, 255, 255, 0.4);
			margin: 40rpx 0;
		}

		.t1 {
			font-weight: bold;
			font-size: 70rpx;

		}

		.catetory-swiper-wrapper {
			width: 40vw;

			.catetory-swiper {
				width: 100%;
				height: 100rpx;
				overflow-x: scroll;

				.catetory-swiper-item {
					display: flex;
					align-items: center;
					overflow-x: scroll;

					.sign {
						view {
							margin-right: 20rpx;
							padding: 10rpx 30rpx;
							text-align: center;
							border-radius: 40rpx;
							background: rgba(255, 255, 255, 0.4);
						}
					}

					.current {
						background: #fff !important;
						color: #000;
					}
				}
			}
		}
	}
}

.catetory {
	margin: 0 80rpx;
	padding-top: 20rpx;
	height: 100rpx;
	background: #fff;

	.swiper {
		width: 100%;
		height: 80rpx;
	}

	.swiper-item {
		width: 100%;
		display: flex;
		align-items: center;

		.sign {
			width: 10%;

			view {
				width: 60%;
				padding: 10rpx 0;
				text-align: center;
				border-radius: 40rpx;
			}
		}

		.current {
			background: #000;
			color: #fff;
		}
	}
}
</style>
<style>
.uni-swiper-dot-active,
.uni-swiper-dot {
	width: 60rpx !important;
	height: 10rpx !important;
	border-radius: 10rpx !important;
}
</style>
