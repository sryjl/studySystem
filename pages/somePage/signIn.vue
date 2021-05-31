<template>
	<view class="allContent">
		<view class="recordList" v-if="status==1">
			<view class="items">
				<view style="color: #4CD964;">
					{{thisStatus[0]}}
				</view>
				<view>
					出勤
				</view>

			</view>
			<view class="items">
				<view style="color: #DD524D;">
					{{thisStatus[1]}}
				</view>
				<view>
					未出勤
				</view>
			</view>
		</view>
		<view class="recordList" v-if="status==0">
			<u-button type="success" @click="show1=true">发布签到</u-button>
		</view>
		<view class="center">
		</view>
		<u-popup v-model="show1" mode="center">
			<view style="padding: 40rpx;">
				<u-form-item label-width="150" :label-position="labelPosition" label="考勤码">
					<u-input :border="border" placeholder="请设定考勤码" v-model="model.name" type="number"></u-input>
				</u-form-item>
				<u-form-item label-width="150" :label-position="labelPosition" label="考勤时间">
					<u-radio-group v-model="model.time" @change="radioGroupChange">
						<u-radio v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<button @click="submitCreate">提交</button>
			</view>
		</u-popup>
		<view>
			<view class="listItem" v-for="(item,index) in signInList" :key="index">
				<view class="navtitle">
					<view class="time">
						{{item.time}}
					</view>
					<view class="pre">
						{{item.pre}}
					</view>
				</view>
				<view class="status" v-if="item.status==0&&status==1">
					<u-button @click="openSigin(item.limit,item.master,item.id)">进行签到</u-button>
				</view>
				<view class="status" v-if="item.status!=0&&status==1"
					:style="item.status==='出勤'?'color:#4CD964;font-weight: bold':'color:#FF0033;font-weight: bold;'">
					{{item.status}}
				</view>
				<view class="status" v-if="status==0">
					<view style="margin-bottom: 4rpx;">
						<u-button @click="getStudentList(item.id)">查看签到</u-button>
					</view>
					<u-button @click="deletesgin1(item.id)">删除签到</u-button>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="center">
			<view style="margin: 40rpx;">
				<view style="margin-bottom: 10rpx;">
					<u-count-down :timestamp="timestamp" @end="timeout"></u-count-down>
					<u-input :border="false" placeholder="请输入签到码" v-model="mima" type="text"></u-input>
				</view>
				<u-button type="primary" @click="joinSignin">进行签到</u-button>
			</view>
		</u-popup>
		<u-popup v-model="show2" mode="center">
			<view style="padding: 40rpx;text-align: center;">
				<view>确认删除？</view>
				<view style="width: 150rpx;margin-top: 30rpx;display: inline-block;">
					<u-button type="error" @click="deletesgin">确认</u-button>
				</view>
				<view style="width: 150rpx;margin-top: 30rpx;margin-left: 20rpx;display: inline-block;">
					<u-button type="primary" @click="show2=false">取消</u-button>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="show3" mode="center">
			<view style="margin: 40rpx;width: 350rpx;">
				<u-table>
					<u-tr>
						<u-th>姓名</u-th>
						<u-th>签到情况</u-th>
					</u-tr>
					<u-tr v-for="(item,index) in studentList" :key="index">
						<u-td>{{item.stuName}}</u-td>
						<u-td :style="item.isSignin?'color:#71d5a1':'color:#fab6b6'">{{item.isSignin?"已签到":"未签到"}}
						</u-td>
					</u-tr>
				</u-table>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				studentList: [
				],
				master: '',
				timestamp: '',
				thisStatus: [0, 0],
				teachid: '',
				deleteNum: '',
				truetime: 0,
				show2: false,
				show3: false,
				activeSi: '',
				list: [{
						name: '5分钟',
						value: 300,
						disabled: false
					},
					{
						name: '10分钟',
						value: 600,
						disabled: false
					},
					{
						name: '15分钟',
						value: 900,
						disabled: false
					}
				],
				model: {
					name: '',
					time: '',
				},
				labelPosition: 'left',
				border: false,
				mima: "",
				show: false,
				show1: false,
				status: '',
				userid: '',
				signInList: [],
			}
		},
		methods: {
			openSigin(e, master, id) {
				const time1 = new Date().getTime()
				const time = (parseInt(e) - parseInt(time1)) / 1000
				if (time <= 0) {
					uni.showToast({
						icon: 'none',
						title: '已经超过时间期限，无法签到!',
						duration: 2000,
					});
					this.thisStatus = [0, 0]
					this.getStudentSign()
					this.master = ""
					this.activeSi = ''
					return
				} else {
					this.timestamp = time
					this.master = master
					this.activeSi = id
					this.show = true
					console.log(this.master)
				}
			},
			async joinSignin() {
				if (this.mima != this.master) {
					uni.showToast({
						icon: 'none',
						title: '签到码错误，请重新输入',
						duration: 2000,
					});
				} else {
					const res = await this.$http({
						url: '/joinSignin',
						data: {
							signinId: this.activeSi,
							studentId: this.userid
						},
					})
					if (res.data.code !== 200) {
						return uni.showToast({
							icon: 'none',
							title: '签到失败，请重试!',
							duration: 2000,
						});
					}
					uni.showToast({
						icon: 'none',
						title: '签到成功',
						duration: 1000,
					});
					this.thisStatus = [0, 0]
					this.getStudentSign()
					this.master = ""
					this.activeSi = ''
					this.mima=''
					this.show = false
				}
			},
			timeout() {
				uni.showToast({
					icon: 'none',
					title: '已经超过时间期限，无法签到!',
					duration: 2000,
				});
				this.thisStatus = [0, 0]
				this.getStudentSign()
				this.master = ""
				this.activeSi = ''
				this.show = false
			},
			async getStudentList(e) {
				const res = await this.$http({
					url: '/getSigninTeacher',
					data: {
						signinId: e
					},
				})
				console.log(res)
				this.studentList = res.data.data.signIn.stuSignDtos
				this.show3 = true
			},
			deletesgin1(e) {
				this.deleteNum = e
				this.show2 = true
			},
			async deletesgin() {
				const res = await this.$http({
					url: '/deleteSignin',
					data: {
						signinId: this.deleteNum
					},
				})
				console.log(res)
				if (res.data.code !== 200) {
					return uni.showToast({
						icon: 'none',
						title: '删除失败，请重试!',
						duration: 2000,
					});
				}
				uni.showToast({
					icon: 'none',
					title: '删除成功',
					duration: 1000,
				});
				this.show2 = false
				this.deleteNum = ''
				this.getSigninTeacher()
			},
			radioGroupChange(e) {
				if (e == '5分钟') return this.truetime = 300000
				if (e == '10分钟') return this.truetime = 600000
				if (e == '15分钟') return this.truetime = 900000
			},
			async submitCreate() {
				if (this.truetime == '' || this.model.name == '') return uni.showToast({
					icon: 'none',
					title: '请输入信息后提交!',
					duration: 2000,
				});
				const res = await this.$http({
					url: '/createSignin',
					data: {
						teachId: this.teachid,
						pre: '数字签到',
						status: this.model.name,
						startTime: Date.parse(new Date()),
						duringTime: this.truetime
					},
					method: 'POST'
				})
				console.log(res)
				if (res.data.code !== 200) {
					return uni.showToast({
						icon: 'none',
						title: '创建失败，请重试!',
						duration: 2000,
					});
				}
				uni.showToast({
					icon: 'none',
					title: '创建成功',
					duration: 1000,
				});
				this.show1 = false,
					this.model.time = '',
					this.model.name = '',
					this.turetime = ''
				this.getSigninTeacher()
			},
			async getSigninTeacher() {
				const res = await this.$http({
					url: '/getSigninList',
					data: {
						teachId: this.teachid,
					},
				})
				const arr = []
				res.data.data.signIns.forEach((item, index) => {
					arr.push({
						time: this.getDate(item.startTime),
						pre: '数字考勤',
						id: item.id
					})
				})
				this.signInList = arr
			},
			async getStudentSign() {
				const res = await this.$http({
					url: '/getSignin',
					data: {
						teachId: this.teachid,
						studentId: this.userid
					},
				})
				const arr = []
				console.log(res)
				res.data.data.signIns.forEach((item, index) => {
					const time1 = new Date(item.startTime).getTime()
					const time2 = parseInt(time1) + parseInt(item.duringTime)
					const time3 = new Date().getTime()
					if (time1 < time3 && time2 > time3 && item.stuSignin.isSignin == false) {
						arr.push({
							time: this.getDate(item.startTime),
							pre: '数字考勤',
							id: item.id,
							status: 0,
							limit: time2,
							master: item.status
						})
						if (item.stuSignin.isSignin) {
							this.thisStatus[0] += 1
						} else {
							this.thisStatus[1] += 1
						}
						return
					}
					arr.push({
						time: this.getDate(item.startTime),
						pre: '数字考勤',
						id: item.id,
						status: item.stuSignin.isSignin ? '出勤' : '未出勤'
					})
					if (item.stuSignin.isSignin) {
						this.thisStatus[0] += 1
					} else {
						this.thisStatus[1] += 1
					}
				})
				this.signInList = arr
			},
			getDate(e) {
				var date = new Date(e); //获取一个时间对象

				/**
				 1. 下面是获取时间日期的方法，需要什么样的格式自己拼接起来就好了
				 2. 更多好用的方法可以在这查到 -> http://www.w3school.com.cn/jsref/jsref_obj_date.asp
				 */
				const year = date.getFullYear(); // 获取完整的年份(4位,1970)
				const Month = date.getMonth() + 1; // 获取月份(0-11,0代表1月,用的时候记得加上1)
				const ri = date.getDate(); // 获取日(1-31)
				// const  date.getTime();  // 获取时间(从1970.1.1开始的毫秒数)
				const hours = date.getHours(); // 获取小时数(0-23)
				const min = date.getMinutes(); // 获取分钟数(0-59)
				const sec = date.getSeconds(); // 获取秒数(0-59)
				return year + '年' + Month + '月' + ri + '日-' + hours + '时' + min + '分'
			}
		},
		onLoad(e) {
			this.teachid = e.teachid
			console.log(this.teachid)
			console.log(uni.getStorageSync('status'))
			this.status = uni.getStorageSync('status')
			this.userid = uni.getStorageSync('userid')
			if (this.status == 0) {
				this.getSigninTeacher()
			} else if (this.status == 1) {
				this.getStudentSign()
			}
		},
		onShow(e) {
			this.status = uni.getStorageSync('status')
			this.userid = uni.getStorageSync('userid')
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

	.recordList {
		width: 80%;
		margin: auto;
		display: flex;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		padding: 20rpx;
		justify-content: space-between;
		background-color: #f3f4f6;
		border-bottom: 1px solid #e4e7ed;

		.items {
			width: 20%;

			view {
				text-align: center;
			}
		}
	}

	.center {
		width: 100%;
		height: 20rpx;
		background-color: #f3f4f6;
	}
</style>
