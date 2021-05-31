<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10" v-if="user.status===''">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-m-r-10" v-else>
				<u-avatar 
				:src="user.status==0?'https://iknow-pic.cdn.bcebos.com/e7cd7b899e510fb33aa1edb6db33c895d1430c52':'http://qqpublic.qpic.cn/qq_public/0/0-3176296969-A290A030DCD9565DB6D2E4BE381A2DF8/0?fmt=jpg&size=50&h=700&w=700&ppv=1/0'" 
				size="140"
				></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{user.name?user.name:'请登录'}}</view>
				<view class="u-font-14 u-tips-color">身份：{{getStatus(user.status)}}</view>
			</view>

		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="account" title="个人信息" @click="gettips()"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="课堂管理" @click="tobar()"></u-cell-item>
				<u-cell-item icon="bell" title="消息设置" @click="gettipss()"></u-cell-item>
				<u-cell-item icon="coupon" title="账号管理" @click="gotologinout()"></u-cell-item>
				<u-cell-item icon="heart" title="身份认证" @click='getRes()'></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置" @click="getad()"></u-cell-item>
			</u-cell-group>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:'',
				pic: 'https://uviewui.com/common/logo.png',
				show: true,
				user: {
					name: '请登录',
					status: ''
				},
				userid:''
			}
		},
		onLoad() {

		},
		methods: {
			getStatus(e) {
				if (e == 1) {
					return '学生'
				} else if (e == 0) {
					return '老师'
				} else {
					return '请登录'
				}
			},
			gettips() {
				if(this.status==1){
				return this.$refs.uToast.show({
					title: '南通大学，学生'+this.user.name,
					type:'success',
					icon: false
				})
				}else if(this.status==0){
					return this.$refs.uToast.show({
						title: '南通大学，教师'+this.user.name,
						type:'success',
						icon: false
					})
				}else{
					return this.$refs.uToast.show({
						title: '请登陆',
						type:'error',
						icon: false
					})
				}
			},
			tobar(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
			gettipss(){
				return this.$refs.uToast.show({
					title: '暂无消息',
					type:'primary',
					icon: false
				})
			},
			gotologinout(){
				if(this.status!=0&&this.status!=1){
					return this.$refs.uToast.show({
					title: '请先登录',
					type:'error',
					icon: false
				})
				}
				uni.navigateTo({
					url:'/pages/center/logout'
				})
			},
			getRes(){
				if(this.status==1){
				return this.$refs.uToast.show({
					title: '已认证！南通大学学生',
					type:'success',
					icon: false
				})
				}else if(this.status==0){
					return this.$refs.uToast.show({
						title: '已认证！南通大学教师',
						type:'success',
						icon: false
					})
				}else{
					return this.$refs.uToast.show({
						title: '请登陆',
						type:'error',
						icon: false
					})
				}
			},
			getad(){
				return this.$refs.uToast.show({
					title: '暂无设置',
					type:'error',
					icon: false
				})
			}
		},
		onLoad() {
			this.status = uni.getStorageSync('status')
			this.user.status = uni.getStorageSync('status')
			this.userid = uni.getStorageSync('userid')
			this.user.name = uni.getStorageSync('nickname')
		},
		onShow() {
			this.status = uni.getStorageSync('status')
			this.user.status = uni.getStorageSync('status')
			this.userid = uni.getStorageSync('userid')
			this.user.name = uni.getStorageSync('nickname')
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.user-box {
		padding-top: 30rpx;
		background-color: #fff;
	}
</style>
