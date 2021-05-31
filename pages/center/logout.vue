<template>
	<view>
	<view class="allContent" style="width:350rpx;margin: auto;margin-top: 100rpx;">
		<u-button type="primary" @click="change()">修改密码</u-button>
	</view>
	<view class="allContent" style="width:350rpx;margin: auto;margin-top: 100rpx;">
		<u-button type="primary" @click="loginout()">退出登陆</u-button>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				status:'',
				id:'',
			}
		},
		methods:{
			async loginout(){
				const res =await this.$http({
					url:'/logout',
					data:{
						id:this.id,
						status:this.status
					}
				})
				console.log(res)
				if (res.data.code !== 200) {
					uni.showToast({
						icon: 'none',
						title: '退出登陆',
						duration: 1000,
					});
					uni.removeStorageSync('status')
					uni.removeStorageSync('userid')
					uni.removeStorageSync('nickname')
					setTimeout(()=>{
						uni.reLaunch({
						    url: '../login/index'
						});
					},1000)
					return
				}
				uni.showToast({
					icon: 'none',
					title: '退出登陆成功',
					duration: 1000,
				});
				uni.removeStorageSync('status')
				uni.removeStorageSync('userid')
				uni.removeStorageSync('nickname')
				setTimeout(()=>{
					uni.reLaunch({
					    url: '../login/index'
					});
				},1000)
			},
			change(){
				uni.navigateTo({
				    url: '../login/change'
				});
			}	
		},
		onload(){
			this.status = uni.getStorageSync('status')
			this.id = uni.getStorageSync('userid')
		},
		onShow() {
			this.status = uni.getStorageSync('status')
			this.id = uni.getStorageSync('userid')
		}
	}
</script>

<style lang="less">
</style>
