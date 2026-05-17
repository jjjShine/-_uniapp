<template>
  <view class="classlist">
	  <view class="loadingLayout" v-if="!classList.length&& !noData">
	  	<uni-load-more status="loading" ></uni-load-more>
	  </view>
  	<view class="content">
  		<navigator :url="`/pages/preview/preview?id=${item._id}`" class="item" v-for = "item in classList" :key="item._id">
			<image :src="item.smallPicurl" mode="aspectFill"></image>
		</navigator>
  	</view>
	<view class="loadingLayout" v-if="classList.length||noData" >
		<uni-load-more :status="noData?'noMore':'loading'" ></uni-load-more>
	</view>
	<view class="safe-area-inset-bottom">
		
	</view>
  </view>
</template>
<script setup>
import { ref } from 'vue';
import {onLoad,onReachBottom,onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
import {apiGetClassList} from "@/api/apis.js"
import classStore from "@/stores/classList.js"
const classListStore = classStore()
const classList = ref([])
const noData = ref(false)
let pageName
const queryParams = {
	pageNum:1,
	pageSize:12
}
//获取分类列表网络数据
const getClassList = async()=>{
	let res = await apiGetClassList(queryParams)
	if(res.data.length<queryParams.pageSize)
	noData.value = true
	classList.value =[...classList.value,...res.data]
	classListStore.storeClass(classList.value)
}
onLoad((e)=>{
	let {id=null,name=null} = e;
	pageName = name
	queryParams.classid = id
	//修改导航标题
	uni.setNavigationBarTitle({
		title:name
	})
	//执行获取分类列表方法
	getClassList()
})
onReachBottom(()=>{
	if(noData.value)
	return 
	queryParams.pageNum++
	getClassList()
})
//分享给好友
onShareAppMessage((e)=>{
	return{
		title:"jShine壁纸-"+pageName,
		path:"/pages/classlist/classlist?id="+queryParams.classid+"&name="+pageName
		
	}
})
//分享朋友圈
onShareTimeline(()=>{
	return{
		title:"jShine壁纸,分类页面",
		query:"id="+queryParams.classid+"&name="+pageName
	}
})
</script>
<style lang="scss" scoped>
  .classlist{
	  .content{
		  display: grid;
		  grid-template-columns: repeat(3,1fr);
		  gap:5rpx;
		  padding:5rpx;
		  .item{
			  height: 440rpx;
			  image{
				  width: 100%;
				  height: 100%;
				  display: block;
			  }
		  }
	  }
  }
</style>