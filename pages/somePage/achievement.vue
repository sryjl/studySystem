<template>
	<view class="allContent">
		<u-alert-tips :show="true" type="primary"  :description="'成绩='+test+'%测试+'+work+'%作业'" :show-icon="true"></u-alert-tips>
		<view style="width: 50%;margin: auto;margin-top: 50%;" v-if="status==1">
			<u-alert-tips :show="true" type="success"  :description="'得分:'+point" :show-icon="true"></u-alert-tips>
		</view>
		<view style="width: 50%;margin: auto;margin-top: 50%;" v-if="status==0">
			<u-button type="primary" @click="change">修改成绩计算方式</u-button>
		</view>
		<u-popup v-model="show" mode="center">
			<view style="margin: 40rpx;width: 400rpx;" >
				<u-form-item label-width="150"  label="测试">
					<u-input  placeholder="请输入比例,合计100" v-model="testInput" type="number"></u-input>
				</u-form-item>
				<u-form-item label-width="150"  label="作业">
					<u-input  placeholder="请输入比例,合计100" v-model="workInput" type="number"></u-input>
				</u-form-item>
			</view>
			<u-button @click="submit" style="margin: 10rpx;">提交</u-button>
		</u-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:false,
				testInput:'',
				workInput:'',
				status:'',
				userid:'',
				teachid:'',
				test:0,
				work:0,
				achieveid:'',
				point:''
			}
		},
		methods:{
			async submit(){
				console.log(this.testInput+this.workInput)
				if(parseInt(this.testInput)+parseInt(this.workInput)!=100){
					return uni.showToast({
						icon: 'none',
						title: '请输入正确比例，合计为100，忽略小数',
						duration: 2000,
					});
				}
				const res = await this.$http({
					url: '/changeAchieve',
					data: {
						id: this.achieveid,
						test:parseInt(this.testInput)/100,
						work:parseInt(this.workInput)/100,
					},
					method: 'POST'
				})
				console.log(res)
				if (res.data.code !== 200) {
					return uni.showToast({
						icon: 'none',
						title: '修改失败，请重试!',
						duration: 2000,
					});
				}
				uni.showToast({
					icon: 'none',
					title: '修改成功',
					duration: 1000,
				});
				this.testInput=''
				this.workInput=''
				this.show=false
				this.getAchieve()
			},
			change(){
				this.show=true
			},
		    async getAchieve(){
				const res = await this.$http({
					url:'/getAchieve',
					data:{
						teachId:this.teachid
					}
				}) 
				this.test = res.data.data.achieve.test *100
				this.work = res.data.data.achieve.work *100
				this.achieveid =res.data.data.achieve.id
			},
			 async getPoint(){
				 const res = await this.$http({
				 	url:'/getScore',
				 	data:{
				 		teachId:this.teachid,
						studentId:this.userid
				 	}
				 }) 
				 this.point =res.data.data.score
			 }
		},
		onLoad(e){
			this.status = uni.getStorageSync('status')
			this.userid = uni.getStorageSync('userid')
			this.teachid = e.teachid
			this.getAchieve()
			if(this.status==1){
				this.getPoint()
			}
		}
	}
</script>

<style lang="less">
</style>