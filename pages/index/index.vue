<template>
	<view class="page">
		<!-- 头部 -->
		<view class="fixed" :style="current === 1 ? { boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.3)' } : {}">
			<view class="top">
				<view class="topLeft">
					<image src="/static/logo.png" class="logo" mode="widthFix" />
					<view class="search" v-if="flag">
						<view class="searchleft">
						  <image src="/static/search.png" mode="widthFix" @click="search" />
						<input type="text" placeholder="4K Wallpaper..." v-model="name" @confirm="search" @input="umengclick('search_input')">
						</view>
						<view class="type">
							<up-select v-model:current="media_live" :label="media_live ? 'Live' : 'Static'"
								:options="cateList" @select="selectItem"></up-select>
						</view>
					</view>

				</view>
				<view class="topRight">
					<view>
						<up-select v-model:current="current" :label="current == 0 ? 'Desktop Wallpaper' : 'Mobile Wallpaper'"
							:options="shebeiType" @select="choosetype"></up-select>
					</view>
					<text class="tiaokuan" @click="umengclick('click_term')">Terms</text>
					<view class="btn" @click="uni.navigateTo({ url: '/pages/index/down' }),umengclick('click_download_mobile')">
						<image src="/static/down.png" mode="widthFix" />
						<text>Mobile Download</text>
					</view>
				</view>
			</view>
			<view class="catetory" v-if="flag">
				<up-icon name="arrow-left" color="#000" size="20" @click="catetoryDown" v-if="tagspages > 1"></up-icon>
				<view class="tabs">
					<up-tabs :list="tagList" lineWidth="0" lineColor="#f56c6c" :activeStyle="{
						color: '#fff',
						background: '#000',
						padding: '10rpx 30rpx',
						borderRadius: '40rpx',
						marginRight: '200rpx'
					}" :inactiveStyle="{
						color: '#000',
						padding: '10rpx 30rpx',
						borderRadius: '40rpx',
						marginRight: '200rpx'
					}"  :scrollable="true"  :current="chooseCurrent" @change="chooseCate">
					</up-tabs>

				</view>
				<up-icon name="arrow-right" color="#000" size="20" @click="catetoryUp"
					v-if="tagspages !== tagNum"></up-icon>
			</view>
		</view>
		<view style="height:300rpx" v-if="flag"></view>
		<view style="height:150rpx" v-else></view>
		<!-- 轮播 -->
		<view class="swiper-wrapper">
			<swiper indicator-dots autoplay circular class="swiper" indicator-active-color="#fff"
				indicator-color="rgba(255, 255, 255, .4)">
				<swiper-item v-for="(item, index) in 3" :key="index" class="swiper-item">
					<image src="/static/swiper.png" />
				</swiper-item>
			</swiper>
			<view class="content">
				<view class="t1">WallpaperCicada</view>
				<view class="search search1">
				    <view class="searchleft">
					  	<image src="/static/search2.png" mode="widthFix" @click="search" />
					<input type="text" placeholder="4K Wallpaper..." v-model="name" @confirm="search" @input="umengclick('search_input')"
						placeholder-style="color:#fff">
					</view>
					<view class="type">
						<up-select v-model:current="media_live" :label="media_live ? 'Live' : 'Static'" :options="cateList"
							@select="selectItem"></up-select>
					</view>
				</view>
				<view class="catetory-swiper-wrapper">
					<up-icon name="arrow-left" color="#fff" size="20" @click="catetoryDown"
						v-if="tagspages > 1"></up-icon>
					<view class="tabs">
						<up-tabs :list="tagList" lineWidth="0" lineColor="#f56c6c" :activeStyle="{
							color: '#000',
							background: '#fff',
							padding: '10rpx 30rpx',
							borderRadius: '40rpx'
						}" :inactiveStyle="{
							color: '#fff',
							background: 'rgba(255, 255, 255, 0.4)',
							padding: '10rpx 30rpx',
							borderRadius: '40rpx'
						}" :scrollable="true"  :current="chooseCurrent" @change="chooseCate">
						</up-tabs>

					</view>
					<up-icon name="arrow-right" color="#fff" size="20" @click="catetoryUp"
						v-if="tagspages !== tagNum"></up-icon>
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<images :info="list" :dataItem="{ name, tag_id, media_live, platform: current == 0 ? 'PC' : 'PHONE' }" :totalPages="totalPages" :tagspages="tagspages"></images>
		
	</view>
</template>

<script setup>
import { getWallpapersList, getWallpapersTags } from '@/api/index.js'
 import { onReachBottom } from '@dcloudio/uni-app'
 import { ref, onMounted, watch } from 'vue'
 import { usePageStay } from '@/utils/usePageStay.js'
 import {
   onPageScroll
} from '@dcloudio/uni-app'
import { umengclick} from '@/utils/umeng.js'
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
		name: 'Static'
	}, {
		id: true,
		name: 'Live'
	}
])
const shebeiType = [{ id: 0, name: 'Desktop Wallpaper' }, { id: 1, name: 'Mobile Wallpaper' }]

const chooseCurrent = ref(0)

const flag = ref(false)
usePageStay()
//初始化数据
const init = () => {
	pages.value = 1
	list.value = []
	getlist()
}
// 选择 
const selectItem = (item) => {
	media_live.value = item.id
	umengclick('filter_click_type')
};
//获取壁纸列表
const getlist = () => {
	let params = {
		currentPage: pages.value,
		pageSize: 20,
		name: name.value,
		tag_id: tag_id.value,//标签id
		media_live: media_live.value,//Staticfalse或Livetrue
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
		tagList.value = res.data.results.map(item => {
			return {
				...item,
				name: item.nav_name
			}
		})
		tagNum.value = res.data.pagination.total_pages
		tag_id.value = res.data.results[0].tag
		init()
	})

}
const search = () => {
	umengclick('search_click')
	if(!name.value){
		umengclick('search_empty')
	}
	init()
}
//分类下一页
const catetoryUp = () => {
	if (tagspages.value == tagNum.value) return
	catetory.value = 0
	tagList.value = []
	tagspages.value++
	chooseCurrent.value = 0
	getTags()

}

const catetoryDown = () => {
	if (tagspages.value == 1) return
	catetory.value = 0
	tagList.value = []
	tagspages.value--
	catetoryDown.value = 0
	getTags()
}
//滑动
const changeCatetory = (e) => {
	catetory.value = 0
	tagList.value = []
	tagspages.value = e.detail.current + 1
	getTags()

}
//选择分类
const chooseCate = (e) => {
	catetory.value = e.index
	tag_id.value = e.tag
	chooseCurrent.value = e.index
	umengclick('filter_click_tag')
}

const choosetype = (e) => {
	current.value = e.id
	umengclick('filter_click_device')
}

//页面滚动
 onPageScroll((e) => {
	if(e.scrollTop > 200){
		flag.value = true
	}else{
		flag.value = false
	}
 })
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
	justify-content: space-between;
	padding: 0 30rpx;
	box-sizing: border-box;
	.searchleft{
		display: flex;
		align-items: center;
	}

	input {
		text-indent: 25rpx;
		font-size: 26rpx;
		width: 30vw;
	}

	image {
		width: 40rpx;
		// margin-left: 20rpx;
	}
}

.fixed {
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
			// width: 7vw;
			width: 250rpx;
			vertical-align: middle;
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
			padding: 0.6vh 0.5vw;
			border-radius:40rpx;

			image {
				width: 30rpx;
				margin-top:0.2vw;
			}
		}

		.tiaokuan {
			margin: 0 0.7vw;
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
			display: flex;
			align-items: center;
			height: 80rpx;

			.tabs {
				width: 95%;
				margin-right: 4%;
			}

		}
	}
}

.catetory {
	display: flex;
	align-items: center;
	padding-bottom: 20rpx;
	margin:0 80rpx;
	background: #fff;

	.tabs {
		width: 95%;
		// background: red;
		margin-right: 4%;

	}
}
</style>
<style scoped>
:deep(.uni-swiper-dot) {
  width: 60rpx;
  height: 10rpx;
  border-radius: 10rpx;
}
</style>
