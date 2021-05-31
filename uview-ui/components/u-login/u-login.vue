<template>
	<view>
		<!-- 账号密码框子 -->
		<u-input-box v-if="loginType === 1 " v-model="student" ref="input1" :verification="['isNull','isChineseEnlishAndNumber']" :verificationTip="['账号不能为空','请输入正确的账号']"
		 placeholder="请输入账号" maBtm="10" maxLength="100"></u-input-box>
		<u-input-box v-if="loginType === 2 " v-model="teacher" ref="input1" :verification="['isNull','isChineseEnlishAndNumber']"
		 :verificationTip="['账号不能为空','请输入正确的账号']" placeholder="请输入账号" maBtm="10" maxLength="11"></u-input-box>
		<u-input-box v-model="password" ref="input2" type="password" :verification="['isNull','isEnlishAndNumber']"
		 :verificationTip="['密码不能为空','']" placeholder="请输入密码" maBtm="10"></u-input-box>
		<button @click="onerification">登陆</button>
	</view>
</template>

<script>
	// 引入md5js插件
	import md5 from '../../../static/js/md5.js'
	export default {
		name: "ULogin",
		data() {
			return {
				student: '',
				password: '',
				status: '',
				userid: '',
				teacher: '',
				nickname:'',
			};
		},
		props: {
			loginType: {
				type: Number,
				default: 1
			}
		},
		methods: {
			// 登陆按钮的回调函数
			async onerification() {
				if (this.$refs.input1.getValue() && this.$refs.input2.getValue()) {
					// 发起登陆请求
					let res = {}
					if (this.loginType === 1) {
						res = await this.$http({
							url: '/login',
							data: {
								username: this.student,
								password: this.password,
							},
							method:'POST'
						});
						console.log("我先")
					} else {
						res = await this.$http({
							url: '/teacherLogin',
							data: {
								username: this.teacher,
								password: this.password,
							},
							method:'POST'
						});
					}
					if (res.data.code !== 200) {
						return uni.showToast({
							icon: 'none',
							title: '登录失败！用户名或者密码错误',
							// #ifdef MP-WEIXIN
							duration: 2000,
							// #endif
							// mask: true
						});
					}
					if(res.data.data.teacher){
						uni.setStorageSync('status',0 )
						uni.setStorageSync('userid', res.data.data.teacher.id)
						uni.setStorageSync('nickname',res.data.data.teacher.nickname)
					}else{
						uni.setStorageSync('status',1 )
						uni.setStorageSync('userid', res.data.data.student.id)
						uni.setStorageSync('nickname',res.data.data.student.nickname)
					}
					console.log(res)

					//document.cookie = this.cookietoken
					uni.showToast({
						icon: 'none',
						title: '登录成功',
						// #ifdef MP-WEIXIN
						duration: 1000,
						// #endif
						// mask: true
					});
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}, 1000);
				}
			}
		}
	}
</script>

<style lang="less">
	button {
		margin-top: 50rpx;
		color: #FFFFFF;
		width: 90%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		border-radius: 50px;
		border: 1px solid #0188FB;
		background-color: #0188FB;
	}
</style>
