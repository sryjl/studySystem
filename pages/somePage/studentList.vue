<template>
	<view>
			<view class="listItem" v-for="(item,index) in studentList" :key="index">
				<view class="navtitle">
					<view class="time">
						{{item.name}}
					</view>
					<view class="pre">
						分数:{{item.score?item.score:'暂未评分'}}
					</view>
					<view v-if="workId==''" :style="item.isPush?'color:#4CD964;font-weight: bold':'color:#FF0033;font-weight: bold;'">
						{{item.isPush?'已提交':'未提交'}}
					</view>
				</view>
				<view class="status">
					<view style="margin-bottom: 4rpx;" v-if="item.isPush&&workId==''">
						<u-button @click="gotostudent(item.id)">查看试卷</u-button>
					</view>
					<u-button @click="setstudent(item.id,item.name)">{{workId==''?'测试':'作业'}}评分</u-button>
				</view>
			</view>
			<u-popup v-model="show1" mode="center">
				<view style="padding: 40rpx;">
					<view>
						{{activename}}:
					</view>
					<u-input :border="false" placeholder="请输入分数" v-model="score" type="number"></u-input>
				<u-button @click="givescore">评分</u-button>
				</view>
			</u-popup>
		</view>
</template>

<script>
	export default{
		data(){
			return{
				activename:'',
				show1:false,
				score:'',
				activestudentid:'',
				studentList:[],
				testId:'',
				teachId:'',
				workId:''
			}
		},
		methods:{
			async getstudentList() {
				const res = await this.$http({
					url: '/getStudentTestDetailList',
					data: {
						teachId: this.teachId,
						testId:this.testId
					},
				})
				console.log(res)
				const arr = []
				res.data.data.students.forEach((item, index) => {
					arr.push({
						score: item.stuTest.score,
						name: item.nickname,
						id: item.id,
						isPush:item.stuTest.isPush
					})
				})
				this.studentList = arr
			},
			async getstudentListWork() {
				const res = await this.$http({
					url: '/getStudentWorkDetailList',
					data: {
						teachId: this.teachId,
						workId:this.workId
					},
				})
				console.log(res)
				const arr = []
				res.data.data.students.forEach((item, index) => {
					arr.push({
						score: item.stuWork.score,
						name: item.nickname,
						id: item.id,
						isPush:item.stuWork.isPush
					})
				})
				this.studentList = arr
			},
			gotostudent(e){
				uni.navigateTo({
					url: '../somePage/testDetail?testId='+this.testId+'&studentId='+e
				})
			},
			setstudent(e,n){
				this.activestudentid = e
				this.activename =n
				this.show1=true
			},
			async givescore(){
				if(this.score == "") return uni.showToast({
						icon: 'none',
						title: '评分失败，请重试!',
						duration: 2000,
					});
				let res
				if(this.workId==""){
					res = await this.$http({
						url: '/giveTestScore',
						data: {
							testId: this.testId,
							studentId: this.activestudentid,
							score:this.score
						},
						method:'POST'
					})
				}else{
					res = await this.$http({
						url: '/giveWorkScore',
						data: {
							workId: this.workId,
							studentId: this.activestudentid,
							score:this.score
						},
						method:'POST'
					})
				}
				if (res.data.code !== 200) {
					return uni.showToast({
						icon: 'none',
						title: '评分失败，请重试!',
						duration: 2000,
					});
				}
				uni.showToast({
					icon: 'none',
					title: '评分成功',
					duration: 1000,
				});
				if(this.workId==''){
					this.getstudentList()
				}else{
					this.getstudentListWork()
				}
				this.score=""
				this.activename = ""
				this.activestudentid = ''
				this.show1 = false
			}
			
		},
		onLoad(e){
			if(e.testId){
				this.testId =e.testId,
				this.teachId =e.teachId
				this.getstudentList()
			}else if(e.workId){
				this.workId =e.workId,
				this.teachId =e.teachId
				this.getstudentListWork()
			}

		}
	}
</script>
<style lang="less">
	.listItem {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1px solid #e4e7ed;
	
		.navtitle {
			.time {
				font-size: 32rpx;
			}
	
			.pre {
				font-size: 28rpx;
				color: #909090;
			}
		}
	}
</style>