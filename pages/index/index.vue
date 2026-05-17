<template>
	<view class="home pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<view class="banner">
			<swiper indicator-dots indicator-color="rgb(255,255,255,0.5)" indicator-active-color="#fff" autoplay circular >
				<swiper-item v-for = "item in bannerList" :key="item._id">
					<navigator v-if="item.target=='miniProgram'" :url="item.url" target="miniProgram" :app-id="item.appid" class="like">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
					<navigator v-else :url="`/pages/classlist/classlist?${item.url}`" class="like">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text >公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay circular interval="1500" duration="300">
						<swiper-item v-for="item in noticeList" :key="item._id">
							<navigator :url="`/pages/notice/detail?id=${item._id}&name=公告详情`">
								{{item.title}}
							</navigator>
							</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
				
			</view>
		</view>
		<view class="select">
			<common-title>
				<template #name>
					每日推荐
				</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd号"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x="true" >
					<view class="box" v-for="item in randomWallList" :key="item._id" @click="goPreview(item._id)">			
							<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>
					专题精选
				</template>
				<template #custom>
				<navigator url="/pages/classify/classify" open-type="reLaunch" class="more">More+</navigator>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
	
</template>
<script setup>
import { ref } from 'vue';
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
import {apiGetBanner,apiGetRandomWall,apiGetNotice,apiClassify} from "@/api/apis.js"
import classStore from "@/stores/classList.js"
const classListStore = classStore()
const bannerList = ref([])
const randomWallList = ref([])
const noticeList = ref([]) 
const classifyList = ref([])
const getBanner =async ()=>{
	let res =await apiGetBanner()
		bannerList.value = res.data
	}
const getRandomWall = async ()=>{
let res =await apiGetRandomWall()
		randomWallList.value = res.data
	}
const getNotice = async ()=>{
	let res =await apiGetNotice({select:true})
			noticeList.value = res.data
		}
const getClassify = async()=>{
	let res = await apiClassify({select:true})
	classifyList.value = res.data
}
const goPreview = (id)=>{
	classListStore.storeClass(randomWallList.value)
		uni.navigateTo({
			url:"/pages/preview/preview?id="+id
		})
	}
getBanner()
getRandomWall()
getNotice()
getClassify()
//分享给好友
onShareAppMessage((e)=>{
	return{
		title:"jShine壁纸,推荐页面",
		path:"/pages/index/index"
		
	}
})
//分享朋友圈
onShareTimeline(()=>{
	return{
		title:"jShine壁纸,推荐页面",
		imageUrl:"/static/images/logo2.png"
	}
})
</script>
<style lang="scss" scoped>
	.home{
		.banner{
			width: 750rpx;
			padding: 30rpx 0;
			swiper{
				width: 750rpx;
				height: 340rpx;
				&-item{
					padding: 0 30rpx;
					.like{
						width: 100%;
						height: 100%;
						image{
							height: 100%;
							width: 100%;
							border-radius: 10rpx;
						}
					}
				}
			}
		}
		.notice{
			width: 690rpx;
			height: 80rpx;
			background-color: #f9f9f9;
			margin: 0 auto;
			border-radius: 80rpx;
			display: flex;
			line-height: 80rpx;
			.left{
				display: flex;
				align-items: center;
				width: 140rpx;
				justify-content: center;
				text{
					color: $theme-color;
					font-weight: 600;
					font-size: 28rpx;
				}
				:deep(){
				.uni-icons{
					color:$theme-color !important;
				}	
				}
			}
			.center{
				flex:1;
				swiper{
					height: 100%;
					&-item{
						font-size: 30rpx;
						color: #666;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
			.right{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 70rpx;
			}
		}
		.select{
			.date{
				display: flex;
				color: $theme-color;
				align-items: center;
				:deep(){
				.uni-icons{
					color:$theme-color !important;
				}
				}
				.text{
					margin-left: 5rpx;
				}
			}
			padding-top: 50rpx;
			.content{
				width: 720rpx;
				margin-left: 30rpx;
				margin-top:30rpx;
				scroll-view{
					white-space: nowrap;
					.box{
						width: 200rpx;
						height: 430rpx;
						display: inline-block;
						margin-right: 15rpx;
						image{
							width: 100%;
							height: 100%;
							border-radius:10rpx ;
						}
					}
					.box:last-child{
						margin-right: 30rpx;
					}
				}
			}
		}
		.theme{
			padding: 50rpx 0;
			.more{
				font-size: 32rpx;
				color: #888;
			}
			.content{
				margin-top: 30rpx;
				padding:0 30rpx;
				display: grid;
				gap:15rpx;
				grid-template-columns: repeat(3,1fr);
				
			}
		}
	}
</style>