<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="150"
				:label-position="labelPosition" label="用户名" prop="name">
				<u-input :border="border" placeholder="请输入用户名" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="密码" prop="password" label-width="150">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.password"
					placeholder="请输入密码"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="确认密码" label-width="150" prop="rePassword">
				<u-input :border="border" type="password" v-model="model.rePassword" placeholder="请确认密码"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="昵称" prop="nickname" label-width="150">
				<u-input :border="border" placeholder="请输入昵称" v-model="model.nickname" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="学校" prop="goodsType" label-width="150">
				<u-input :border="border" type="select" :select-open="selectShow" v-model="model.goodsType"
					placeholder="请选择学校" @click="selectShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="身份" prop="personaltype" label-width="150">
				<u-input :border="border" type="select" :select-open="selectShow2" v-model="model.personaltype"
					placeholder="请选择身份" @click="selectShow2 = true"></u-input>
			</u-form-item>
		</u-form>
		<view class="agreement">
			<u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
			<view class="agreement-text">
				勾选代表同意本软件的版权协议
			</view>
		</view>
		<u-button @click="submit">提交</u-button>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<u-select mode="single-column" :list="selectList2" v-model="selectShow2" @confirm="selectConfirm2"></u-select>
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				model: {
					name: '',
					agreement: false,
					region: '',
					password: '',
					rePassword: '',
					personaltype: '',
					goodsType: '',
					nickname: ''
				},
				selectList: [{
						value: '南通大学',
						label: '南通大学'
					},
					{
						value: '南通大学',
						label: '南通大学'
					},
					{
						value: '南通大学',
						label: '南通大学'
					}
				],
				selectList2: [{
						value: '0',
						label: '教师'
					},
					{
						value: '1',
						label: '学生'
					}
				],
				rules: {
					name: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur',
						},
						{
							min: 6,
							max: 12,
							message: '姓名长度在6到12个字符',
							trigger: ['change', 'blur'],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.enOrNum(value);
							},
							message: '用户必须为字母或数字',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						},
					],
					nickname: [{
							required: true,
							message: '请输入昵称',
							trigger: 'blur',
						},
						{
							min: 2,
							max: 12,
							message: '昵称长度在3到12个字符',
							trigger: ['change', 'blur'],
						},
					],
					goodsType: [{
						required: true,
						message: '请选择学校类型',
						trigger: 'change',
					}],
					personaltype: [{
						required: true,
						message: '请选择身份类型',
						trigger: 'change'
					}],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['change', 'blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: '需同时含有字母和数字，长度在6-12之间',
							trigger: ['change', 'blur'],
						}
					],
					rePassword: [{
							required: true,
							message: '请重新输入密码',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.model.password;
							},
							message: '两次输入的密码不相等',
							trigger: ['change', 'blur'],
						}
					],
				},
				border: false,
				check: false,
				selectShow: false,
				selectShow2: false,
				labelPosition: 'left',
				errorType: ['message'],
				navbarHeight: 44
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
			submit() {
				this.$refs.uForm.validate(async (valid) => {
					console.log(valid)
					if (valid) {
						if (!this.model.agreement) return this.$u.toast('请勾选协议');
						console.log('验证通过');
						const status = this.model.personaltype === '学生' ? 1 : 0
						const res = await this.$http({
							url: '/register',
							data: {
								username: this.model.name,
								password: this.model.password,
								status,
								nickname: this.model.nickname,
								school:this.model.goodsType
							},
							method: 'POST'
						})
						console.log(res)
						console.log(res)
						if (res.data.code === 200) {
							this.$refs.uTips.show({
								title: '注册成功，正在跳转登陆页面',
								type: 'success',
								duration: '1000'
							})
							setTimeout(()=>{
								uni.redirectTo({
									url:'./index'
								})
							},1000)
						}else{
							this.$refs.uTips.show({
								title: res.data.msg,
								type: 'error',
								duration: '1000'
							})
						}

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
				if (index == 0) this.errorType = ['message'];
				if (index == 1) this.errorType = ['toast'];
				if (index == 2) this.errorType = ['border-bottom'];
				if (index == 3) this.errorType = ['border'];
			}
		}
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
