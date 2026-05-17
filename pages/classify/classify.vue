<template>
  <view class="classlayout pageBg">
	  <custom-nav-bar title="分类"></custom-nav-bar>
  	<view class="classify">
  		<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
  	</view>
  </view>
</template>
<script setup>
import {apiClassify} from "@/api/apis.js"
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
import { ref } from 'vue'
const classifyList = ref([])
const getClassify = async()=>{
	let res = await apiClassify({pageSize:15})
	classifyList.value = res.data
}
getClassify()
//分享给好友
onShareAppMessage((e)=>{
	return{
		title:"jShine壁纸,分类页面",
		path:"/pages/classify/classify"
		
	}
})
//分享朋友圈
onShareTimeline(()=>{
	return{
		title:"jShine壁纸,分类页面",
	}
})
</script>
<style lang="scss" scoped>
  .classlayout{
	  .classify{
		  display: grid;
		  grid-template-columns: repeat(3,1fr);
		  gap: 15rpx;
		  justify-content: space-between;
		  padding: 30rpx;
	  }
  }
</style>