<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :label-position="labelPosition" label="原密码" prop="password1">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.password1" placeholder="请输入密码"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="密码" prop="password">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.password" placeholder="请输入密码"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="确认密码" label-width="150" prop="rePassword">
				<u-input :border="border" type="password" v-model="model.rePassword" placeholder="请确认密码"></u-input>
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
</view>
</template>

<script>
export default {
	data() {
		let that = this;
		return {
			model: {
				password1: '',
				password: '',
				rePassword: '',
			},
			rules: {
				password1: [
					{
						required: true,
						message: '请输入原密码',
						trigger: ['change','blur'],
					},
					{
						// 正则不能含有两边的引号
						pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
						message: '需同时含有字母和数字，长度在6-12之间',
						trigger: ['change','blur'],
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: ['change','blur'],
					},
					{
						// 正则不能含有两边的引号
						pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
						message: '需同时含有字母和数字，长度在6-12之间',
						trigger: ['change','blur'],
					}
				],
				rePassword: [
					{
						required: true,
						message: '请重新输入密码',
						trigger: ['change','blur'],
					},
					{
						validator: (rule, value, callback) => {
							return value === this.model.password;
						},
						message: '两次输入的密码不相等',
						trigger: ['change','blur'],
					}
				],
			},
			border: false,
			check: false,
			selectShow: false,
			selectShow2:false,
			labelPosition: 'left',
			errorType: ['message'],
		};
	},
	onLoad() {

	},
	computed: {
		borderCurrent() {
			return this.border ? 0 : 1;
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		async loginout(){
			const res =await this.$http({
				url:'/logout',
				data:{
					id:uni.getStorageSync('userid'),
					status:uni.getStorageSync('status'),
				}
			})
			console.log(res)
			if (res.data.code !== 200) {
				 uni.showToast({
					icon: 'none',
					title: '修改密码成功，退出登陆!',
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
				title: '修改密码成功，正在返回登陆页面',
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
			}
			,
		submit() {
			this.$refs.uForm.validate(async(valid) => {
				console.log(valid)
				if (valid) {
					const res =await this.$http({
						url:'/changePassword',
						data:{
							pwd:this.model.password1,
							password:this.model.password,
							id:uni.getStorageSync('userid'),
							status:uni.getStorageSync('status')
						},
						method:'POST'
					})
					console.log(res)
					if (res.data.code !== 200) {
						return uni.showToast({
							icon: 'none',
							title: '修改密码失败，请重试!',
							duration: 2000,
						});
					}
					this.loginout()
				} else {
					console.log('验证失败');
				}
			});
		},
		// 点击actionSheet回调
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.sex = this.actionSheetList[index].text;
		},
		// 勾选版权协议
		checkboxChange(e) {
			this.model.agreement = e.value;
		},
		// 选择商品类型回调
		selectConfirm(e) {
			this.model.goodsType = '';
			e.map((val, index) => {
				this.model.goodsType += this.model.goodsType == '' ? val.label : '-' + val.label;
			})
		},
		selectConfirm2(e) {
			this.model.personaltype = '';
			e.map((val, index) => {
				this.model.personaltype += this.model.personaltype == '' ? val.label : '-' + val.label;
			})
			console.log(this.model.personaltype)
		},
		borderChange(index) {
			this.border = !index;
		},
		labelPositionChange(index) {
			this.labelPosition = index == 0 ? 'left' : 'top';
		},
		codeChange(text) {
			this.codeTips = text;
		},
		errorChange(index) {
			if(index == 0) this.errorType = ['message'];
			if(index == 1) this.errorType = ['toast'];
			if(index == 2) this.errorType = ['border-bottom'];
			if(index == 3) this.errorType = ['border'];
		}
	},
};
</script>

<style scoped lang="scss">
.wrap {
	padding: 30rpx;
}

.agreement {
	display: flex;
	align-items: center;
	margin: 40rpx 0;

	.agreement-text {
		padding-left: 8rpx;
		color: $u-tips-color;
	}
}
</style>