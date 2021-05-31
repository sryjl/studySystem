<template>

	<view class="main" :style="{height:windowHeight+'px'}">
		<!-- 头部 -->
		<!-- 导航图片 -->
		<l-file ref="lFile" :logo="logo" @up-success="onSuccess"></l-file>
		<u-popup v-model="show5" mode="center">
			<view style="margin: 40rpx;">
				<u-form-item label-width="150" label="名字">
					<u-input placeholder="请输入文件名称" v-model="filename" type="text"></u-input>
				</u-form-item>
				<u-button type="primary" style="margin-top: 10rpx;" @tap="onUpload">上传</u-button>
			</view>
		</u-popup>
		<u-popup v-model="show1" mode="center">
			<view style="margin: 40rpx;">
				<u-button type="primary" @click="changeSomeDeatail" v-if="current==0||current==1||current==2"
					style="margin-bottom: 10rpx;">修改{{getname(current)}}</u-button>

				<u-button type="primary" @click="givescore" v-if="current==1||current==2" style="margin-bottom: 10rpx;">
					{{getname(current)}}评分</u-button>
				<u-button type="primary" @click="deletesomething">删除{{getname(current)}}</u-button>
				<u-button type="primary" @click="seetheTip(newware)" v-if="current==0||current==1"
					style="margin-top: 10rpx;">查看{{getname(current)}}</u-button>
				<u-button type="primary" @click="onDown" v-if="current==3" style="margin-top: 10rpx;">下载资料</u-button>
			</view>
		</u-popup>
		<u-modal v-model="show3" :content="Tipcontent" :title="getname(current)+'内容'"></u-modal>
		<u-popup v-model="show2" mode="center">
			<view style="margin: 40rpx;width: 400rpx;">
				<u-form-item label-width="150" label="名字">
					<u-input placeholder="请输入课程名字" v-model="warename" type="text"></u-input>
				</u-form-item>
				<u-form-item label-width="150" label="内容">
					<u-input placeholder="请输入课程内容" v-model="newware" type="textarea"></u-input>
				</u-form-item>
			</view>
			<u-button @click="submitnewware" style="margin: 10rpx;">提交</u-button>
		</u-popup>
		<u-popup v-model="show4" mode="center">
			<view style="margin: 40rpx;width: 400rpx;">
				<u-form-item label-width="150" label="名字">
					<u-input placeholder="请输入作业名字" v-model="workname" type="text"></u-input>
				</u-form-item>
				<u-form-item label-width="150" label="内容">
					<u-input placeholder="请输入作业内容" v-model="newwork" type="textarea"></u-input>
				</u-form-item>
			</view>
			<u-button @click="submitnewWork" style="margin: 10rpx;">提交</u-button>
		</u-popup>
		<image src="../../static/pic/banner2.png" mode="aspectFill" lazy-load='true'></image>
		<!-- 导航日期 -->
		<view class="date">
			<text class="day">{{thisDay}}</text>
			<text class="month">/{{thisMonth}}</text>
		</view>
		<view class="daylist">
			{{thisClass}}
		</view>
		<view class="describe" @click="show = true">
			课程简介>
		</view>
		<u-popup v-model="show" mode="center">
			<view style="padding: 40rpx;">{{content}}</view>
		</u-popup>
		<view class="content">
			<view class="navContainer">
				<view class="navItem" @click="toNewPage(0)">
					<text class="iconfont icon-qiandao"></text>
					<text class="icontxt">考勤</text>
				</view>
				<view class="navItem" @click="toNewPage(1)">
					<text class="iconfont icon-jiangpai"></text>
					<text class="icontxt">表现</text>
				</view>
				<view class="navItem" @click="toNewPage(2)">
					<text class="iconfont icon-chengji"></text>
					<text class="icontxt">成绩</text>
				</view>
			</view>
			<view
				style="width: 700rpx;padding-left: 75rpx;margin: auto;margin-top: 10rpx; box-shadow:0px 5px 10px -5px #e4e7ed;border-top: 1px solid  #e4e7ed">
				<u-tabs :list="list" :is-scroll="true" :current="current" @change="change"></u-tabs>
			</view>
			<view class="truecontent">
				<view class="navtitles">
					<text>资料列表</text>
					<text>{{ourlist.length}}个活动</text>
					<view v-if="status === 0">
						<u-button type="primary" ripple size='mini' v-if="current!=3" @click="handleCreate">创建
						</u-button>
						<u-button type="primary" ripple size='mini' v-else @click="changehandel">上传</u-button>
					</view>
				</view>
				<view class="contentClass">
					<view v-for="(item,index) in ourlist" :key="item.id" class="listItem">
						<view class="images">
							<image v-if="current===0" src="../../static/pic/class.png" mode="scaleToFill"
								lazy-load='true'></image>
							<image v-else-if="current===1" src="../../static/pic/work.png" mode="scaleToFill"
								lazy-load='true'></image>
							<image v-else-if="current===2" src="../../static/pic/test.png" mode="scaleToFill"
								lazy-load='true'></image>
							<image v-else src="../../static/pic/document.png" mode="scaleToFill" lazy-load='true'>
							</image>
						</view>
						<view class="newtitle">
							<view class="title">
								<text>{{item.name}}</text>
							</view>
							<view class="status">
								<text :style="item.turestatus===1?'color:#19be6b':''">{{item.status}}</text>
							</view>
						</view>
						<view style="display:inline-block;float: right;" v-if="status == 0">
							<text class="diandiandian" @click.stop="thisdian(item.id,item.name,item.content)">...</text>
						</view>
						<view style="display:inline-block;float: right;" v-if="status == 1&&current==2">
							<u-button type="primary" @click="gotostudent(item.id,item.isPush)">
								{{item.isPush?'查看':'参与'}}
							</u-button>
						</view>
						<view style="display:inline-block;float: right;" v-if="status == 1&&(current==1||current==0)">
							<u-button type="primary" @click="seetheTip(item.content)">
								查看
							</u-button>
						</view>
						<view style="display:inline-block;float: right;padding-right: 40rpx" v-if="status == 1">
							<text class="diandiandian" style="color:red;line-height: 86rpx;">{{item.score}}</text>
						</view>
						<view style="display:inline-block;float: right;" v-if="status == 1&&current==3">
							<u-button type="primary" @click="onDown1(item.content,item.id)">下载</u-button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show5: false,
				localPath: 'C:\Users\alice\Desktop\CMQTest',
				filename: '',
				logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F00%2F07%2F155788a6d8a5c42.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619847627&t=2da40b583002205c204d980b54b35040',
				warename: '',
				newware: '',
				workname: '',
				newwork: '',
				Tipcontent: '',
				waretype: '',
				show: false,
				show2: false,
				show1: false,
				show3: false, //查看作业内容
				show4: false,
				ourFN:'',
				content: '',
				classid: '',
				courseid: '',
				userid: '',
				status: '',
				windowHeight: 500,
				mainHeight: 500,
				thisDay: '',
				thisMonth: '',
				thisClass: '',
				worktype: '',
				list: [{
					name: '章节目录'
				}, {
					name: '作业',
				}, {
					name: '测试'
				}, {
					name: '资料'
				}, ],
				current: 0,
				ourlist: [{
						id: 10,
						name: '作业1',
						status: '已发布',
						turestatus: 0,
					},
					{
						id: 10086,
						name: '作业2',
						status: '已发布',
						turestatus: 0,
					}
				],
				activeopid: ''
			}
		},
		methods: {
			changehandel() {
				this.show5 = true
			},
			onDown1(e,id){
				this.ourFN = e
				this.activeopid =id
				this.onDown()
			},
			onDown() {
				let url = '/api/downloadMeans?id=' + this.activeopid;
				let dload = document.createElement("a");
				dload.download = this.ourFN; // 设置下载的文件名，默认是'下载'
				dload.href = url;
				document.body.appendChild(dload);
				dload.click();
				dload.remove(); // 下载之后把创建的元素删除
				this.ourFN=''
				this.show1=false
				return uni.showToast({
					icon: 'none',
					title: '下载成功',
					duration: 2000,
				});
			},
			/* 上传 */
			onUpload() {
				if (this.filename == '') return uni.showToast({
					title: '请输入名称后提交',
					icon: 'none'
				})
				this.show5 = false
				/**
				 * currentWebview: 当前webview
				 * url：上传接口地址
				 * name：附件key,服务端根据key值获取文件流，默认file,上传文件的key
				 * header: 上传接口请求头
				 */
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					// url: 'http://10.8.131.103:8080' + '/updateMeans', //替换为你的
					url:'/api' + '/updateMeans',
					name: 'file',
					header: { //根据你接口需求自定义
					},
					// body参数直接写key,value,如：
					fName: this.filename,
					teachId: this.classid
				});
			},
			onSuccess(res) {
				console.log('上传成功回调');
				uni.showToast({
					title: '上传成功',
					icon: 'none'
				})
				this.getMeanslist()
				this.filename = ''
			},
			seetheTip(content) {
				if (this.current == 0 || this.current == 1) {
					this.show1 = false
				}
				this.Tipcontent = content
				this.show3 = true
			},
			async submitchangesubmitware() {
				const res = await this.$http({
					url: '/changeCourseware',
					data: {
						id: this.activeopid,
						content: this.newware,
						name: this.warename,
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
				this.newware = "",
					this.warename = "",
					this.waretype = "",
					this.getwarelist()
				this.show2 = false
			},
			async submitchangesubmit() {
				const res = await this.$http({
					url: '/changeWork',
					data: {
						id: this.activeopid,
						content: this.newwork,
						name: this.workname,
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
				this.newwork = "",
					this.workname = "",
					this.worktype = "",
					this.getTeacherWorklist()
				this.show4 = false
			},
			async submitnewware() {
				if (this.newware == "" || this.warename == "") return uni.showToast({
					icon: 'none',
					title: '请输入必须信息!',
					duration: 2000,
				});
				if (this.waretype === 1) return this.submitchangesubmitware() //waretype为1时为修改work
				const res = await this.$http({
					url: '/createCourseware',
					data: {
						teachId: this.classid,
						content: this.newware,
						name: this.warename,
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
				this.newware = "",
					this.warename = "",
					this.waretype = "",
					this.getwarelist()
				this.show2 = false
			},
			async submitnewWork() {
				if (this.newwork == "" || this.workname == "") return uni.showToast({
					icon: 'none',
					title: '请输入必须信息!',
					duration: 2000,
				});
				if (this.worktype === 1) return this.submitchangesubmit() //worktype为1时为修改work
				const res = await this.$http({
					url: '/createWork',
					data: {
						teachId: this.classid,
						content: this.newwork,
						name: this.workname,
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
				this.newwork = "",
					this.workname = "",
					this.worktype = "",
					this.getTeacherWorklist()
				this.show4 = false
			},
			gotostudent(e, b) {
				uni.navigateTo({
					url: '../somePage/testDetail?testId=' + e + '&studentId=' + this.userid + '&ispush=' + b
				})
			},
			changeSomeDeatail() {
				if (this.current == 2) {
					uni.navigateTo({
						url: '../somePage/createTest?testId=' + this.activeopid
					})
				} else if (this.current == 1) {
					this.show1 = false
					this.worktype = 1
					this.show4 = true
				} else if (this.current == 0) {
					this.show1 = false
					this.waretype = 1
					this.show2 = true
				}
			},
			thisdian(id, name, content) {
				console.log(content)
				this.show1 = true
				this.activeopid = id
				if (this.current == 1) {
					this.workname = name
					this.newwork = content
				} else if (this.current == 0) {
					this.warename = name
					this.newware = content
				}else if(this.current ==3){
					this.ourFN =content
				}
			},
			getname(e) {
				if (e == 0) return "课件"
				if (e == 1) return "作业"
				if (e == 2) return "测试"
				if (e == 3) return "资料"
			},
			givescore() {
				if (this.current == 2) {
					this.show1 = false
					uni.navigateTo({
						url: '../somePage/studentList?testId=' + this.activeopid + '&teachId=' + this.classid
					})
				} else if (this.current == 1) {
					this.show1 = false
					uni.navigateTo({
						url: '../somePage/studentList?workId=' + this.activeopid + '&teachId=' + this.classid
					})
				}
			},
			change(index) {
				this.ourlist = []
				this.current = index;
				console.log(this.current)
				if (this.current == 2 && this.status == 0) {
					this.getTeacherTestlist()
				} else if (this.current == 2 && this.status == 1) {
					this.getStudentTestlist()
				} else if (this.current == 1 && this.status == 0) {
					this.getTeacherWorklist()
				} else if (this.current == 1 && this.status == 1) {
					this.getstudentWorklist()
				} else if (this.current == 0) {
					this.getwarelist()
				} else if (this.current == 3) {
					this.getMeanslist()
				}
			},
			async deletesomething() {
				let res
				if (this.current == 2) {
					res = await this.$http({
						url: '/deleteTest',
						data: {
							testId: this.activeopid
						}
					})
				} else if (this.current == 1) {
					res = await this.$http({
						url: '/deleteWork',
						data: {
							workId: this.activeopid
						}
					})
				} else if (this.current == 0) {
					res = await this.$http({
						url: '/deleteCourseware',
						data: {
							id: this.activeopid
						}
					})
				} else if (this.current == 3) {
					res = await this.$http({
						url: '/deleteMeans',
						data: {
							id: this.activeopid
						}
					})
				}
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
				this.show1 = false
				if (this.current == 2) {
					this.getTeacherTestlist()
				} else if (this.current == 1) {
					this.getTeacherWorklist()
				} else if (this.current == 0) {
					this.getwarelist()
				} else if (this.current == 3) {
					this.getMeanslist()
				}
			},
			async getwarelist() {
				const res = await this.$http({
					url: '/getCoursewareList',
					data: {
						teachId: this.classid
					}
				})
				console.log(res)
				let arr = []
				res.data.data.coursewares.forEach((item, index) => {
					arr.push({
						id: item.id,
						name: item.name,
						status: '可查看',
						turestatus: 1,
						content: item.content
					})
				})
				this.ourlist = arr
			},
			async getTeacherTestlist() {
				const res = await this.$http({
					url: '/getTeacherTestList',
					data: {
						teachId: this.classid
					}
				})
				console.log(res)
				let arr = []
				res.data.data.tests.forEach((item, index) => {
					arr.push({
						id: item.id,
						name: item.name,
						status: '已发布',
						turestatus: 1,
						content: ''
					})
				})
				this.ourlist = arr
			},
			async getTeacherWorklist() {
				const res = await this.$http({
					url: '/getTeacherWorkList',
					data: {
						teachId: this.classid
					}
				})
				console.log(res)
				let arr = []
				res.data.data.works.forEach((item, index) => {
					arr.push({
						id: item.id,
						name: item.name,
						status: '已发布',
						turestatus: 1,
						content: item.content
					})
				})
				this.ourlist = arr
			},
			async getStudentTestlist() {
				const res = await this.$http({
					url: '/getStudentTestList',
					data: {
						teachId: this.classid,
						studentId: this.userid
					}
				})
				console.log(res)
				let arr = []
				res.data.data.tests.forEach((item, index) => {
					arr.push({
						id: item.id,
						name: item.name,
						status: item.stuTest.isPush ? '已提交' : '未提交',
						score: item.stuTest.score ? item.stuTest.score : '',
						turestatus: 1,
						isPush: item.stuTest.isPush
					})
				})
				this.ourlist = arr
			},
			async getMeanslist() {
				const res = await this.$http({
					url: '/getMeanList',
					data: {
						teachId: this.classid,
					}
				})
				let arr = []
				console.log(res)
				res.data.data.means.forEach((item, index) => {
					arr.push({
						id: item.id,
						name: item.name,
						status: '可下载',
						content:item.address.slice(9),
						turestatus: 1,
					})
				})
				this.ourlist = arr
			},
			async getstudentWorklist() {
				const res = await this.$http({
					url: '/getStudentWorkList',
					data: {
						teachId: this.classid,
						studentId: this.userid
					}
				})
				console.log(res)
				let arr = []
				res.data.data.works.forEach((item, index) => {
					arr.push({
						id: item.id,
						name: item.name,
						status: item.stuWork.score ? '已评分' : '未评分',
						score: item.stuWork.score ? item.stuWork.score : '',
						turestatus: 1,
						content: item.content
					})
				})
				this.ourlist = arr
			},
			toNewPage(num) {
				switch (num) {
					case 0:
						uni.navigateTo({
							url: '../somePage/signIn?teachid=' + this.classid
						})
						break;
					case 1:
						uni.navigateTo({
							url: '../somePage/performance?teachid=' + this.classid
						})
						break;
					case 2:
						uni.navigateTo({
							url: '../somePage/achievement?teachid=' + this.classid
						})
						break;
					case 3:
						uni.navigateTo({
							url: '../somePage/analysis?id=' + this.userid + '&status=' + this.status
						})
						break;
					case 4:
						uni.navigateTo({
							url: '../somePage/wrong?id=' + this.userid + '&status=' + this.status
						})
						break;
					default:
				}
			},
			handleCreate() {
				if (this.current == 2) {
					uni.navigateTo({
						url: '../somePage/createTest?teachid=' + this.classid
					})
				} else if (this.current == 1) {
					this.newwork = "",
						this.workname = "",
						this.worktype = 0
					this.show4 = true
				} else if (this.current == 0) {
					this.newware = '',
						this.warename = '',
						this.waretype = 0
					this.show2 = true
				}
			},
			getDate() {
				let myDate = new Date();
				const month = myDate.getMonth() + 1
				const day = myDate.getDate()
				if (month < 10) {
					this.thisMonth = '0' + month
				} else {
					this.thisMonth = month
				}
				if (day < 10) {
					this.thisDay = '0' + day
				} else {
					this.thisDay = day
				}
			},
			async getCourse() {
				const res = await this.$http({
					url: '/getAllCourse',
				})
				let arr = []
				res.data.data.courses.forEach((item, index) => {
					if (item.id == this.courseid) {
						this.content = item.content
					}
				})
			}
		},
		onLoad(title) {
			uni.setNavigationBarTitle({
				title: title.className
			})
			this.classid = title.id
			console.log(this.classid)
			this.courseid = title.courseid
			this.thisClass = title.class
			this.status = uni.getStorageSync('status')
			this.userid = uni.getStorageSync('userid')
			this.getDate()
			this.getCourse()
			const Magnification = uni.getSystemInfoSync().windowWidth / 750
			this.mainHeight = uni.getSystemInfoSync().windowHeight - 400 * Magnification
			this.windowHeight = uni.getSystemInfoSync().windowHeight
			// this.getwarelist()
		},
		onShow() {
			this.status = uni.getStorageSync('status')
			this.userid = uni.getStorageSync('userid')
			if (this.current == 2 && this.status == 0) {
				this.getTeacherTestlist()
			} else if (this.current == 2 && this.status == 1) {
				this.getStudentTestlist()
			} else if (this.current == 1 && this.status == 0) {
				this.getTeacherWorklist()
			} else if (this.current == 1 && this.status == 1) {
				this.getstudentWorklist()
			} else if (this.current == 0) {
				this.getwarelist()
			} else if (this.current == 3) {
				this.getMeanslist()
			}
		}
	}
</script>

<style lang="less">
	.contentClass {
		.listItem {
			height: 100rpx;
			border-bottom: 1px solid #e4e7ed;
			margin: 0rpx 20rpx;

			.images {
				width: 70rpx;
				height: 100rpx;
				padding-left: 20rpx;
				display: inline-block;

				image {
					margin-top: 15rpx;
					width: 40rpx;
					height: 40rpx;
					background-color: #007AFF;
				}
			}

			.newtitle {
				display: inline-block;
				max-width: 50%;
				margin-left: 40rpx;

				.title {
					font-weight: bold;
				}

				.status {
					color: #C8C7CC;
					font-size: 28rpx;
				}
			}
		}
	}

	.main {
		position: relative;

		image {
			width: 100%;
			height: 525rpx;
			opacity: 0.7
		}

		.date {
			display: block;
			position: absolute;
			top: 120rpx;
			left: 50rpx;
			color: #FFFFFF;

			.day {
				font-size: 70rpx;
				text-shadow: 10rpx 10rpx 10rpx #000000;
			}

			.month {
				font-size: 40rpx;
			}
		}

		.daylist {
			position: absolute;
			width: 180rpx;
			height: 50rpx;
			background-color: rgba(192, 192, 192, 0.8);
			top: 220rpx;
			left: 40rpx;
			border-radius: 20rpx;
			text-align: center;
			font-size: 25rpx;
			line-height: 50rpx;

		}

		.describe {
			position: absolute;
			width: 180rpx;
			height: 50rpx;
			background-color: rgba(192, 192, 192, 0.8);
			top: 220rpx;
			right: 40rpx;
			border-radius: 20rpx;
			text-align: center;
			font-size: 25rpx;
			line-height: 50rpx;
		}
	}

	.content {
		position: absolute;
		top: 300rpx;
		height: 600rpx;
		width: 100%;
		background-color: #FFFFFF;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
	}

	.navContainer {
		display: flex;
		margin-top: 20rpx;
		margin-bottom: 20rpx;

		.navItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 33%;

			.iconfont {
				width: 80rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 40rpx;
				font-weight: bold;
				border-radius: 50%;
				background-color: #007AFF;
				color: #fff;
				text-align: center;
				margin-top: 20rpx;
				margin-bottom: 10rpx;
			}

			.icontxt {
				font-size: 25rpx;
				color: #909090;
			}
		}
	}

	.navtitles {
		height: 70rpx;
		display: flex;
		justify-content: space-between;
		margin: 20rpx 20rpx;
		background-color: #FFF;
		box-sizing: content-box;
		box-shadow: 0px 5px 10px -5px #e4e7ed;

		text {
			padding: 0 20rpx;
			height: 50rpx;
			font-size: 28rpx;
			line-height: 50rpx;
		}
	}

	.diandiandian {
		height: 60rpx;
		width: 60rpx;
		line-height: 60rpx;
		font-size: 48rpx;
		text-align: center;
		top: 10rpx;
		right: 20rpx;
	}
</style>
