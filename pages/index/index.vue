<template>
	<view class="wrap">
		<u-swiper :list="list" mode='rect' :effect3d="true" :title="true"></u-swiper>
		<view class="mycourse">
			<view class="title1">
				<view class="myy">顶置的课程</view>
				<view>
					<u-button v-if="status==1" type="primary" ripple size='medium' :custom-style="customStyle" @click="show = true">+加入课程
					</u-button>
					<u-button v-else="status==1" type="primary" ripple size='medium' :custom-style="customStyle" @click="show = true">+创建课程
					</u-button>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="center">
			<view style="padding: 40rpx;" v-if="status===1">
<!-- 				<u-search placeholder="请输入搜索条件" v-model="keyword"></u-search> -->
				<u-checkbox-group @change="checkboxGroupChange" wrap >
					<u-checkbox  
					v-model="item.checked" 
					v-for="(item, index) in alist" 
					:key="index" 
					:name="item.id"
					:disabled="courselist.find((item1)=>item1.id ==item.id)!=null"
					>{{item.name}}
					</u-checkbox>
				</u-checkbox-group>
				<button @click ="joinTeach">提交</button>
			</view>
			<view  style="padding: 40rpx;"  v-else>
				<u-form-item :label-position="labelPosition" label="科目" prop="goodsType" label-width="150">
					<u-input :border="border" type="select" :select-open="selectShow" v-model="course" placeholder="请选择科目" @click="selectShow = true"></u-input>
				</u-form-item>
				<u-form-item label-width="150" :label-position="labelPosition" label="简介" prop="name">
					<u-input :border="border" placeholder="请输入简介" v-model="model.name" type="text"></u-input>
				</u-form-item>
				<button @click="submit">提交</button>
			</view>
		</u-popup>
		<u-popup v-model="show1" mode="center">
			<view style="margin: 40rpx;">
				<view style="margin-bottom: 10rpx;">
					<u-button type="primary" @click="changeTop">{{courseisTop?"取消顶置":"顶置课程"}}</u-button>
				</view>
				<u-button type="primary" @click="outcourse" v-if="status===1">退出课程</u-button>
				<u-button type="primary" @click="deleteCourse" v-else>删除课程</u-button>
			</view>
		</u-popup>
		<view class="courselistTop">
			<scroll-view scroll-x="true" class="Topcourselist" enable-flex="true">
				<view v-for="(item,index) in courselist" :key="item.resourceId" class="listItem" v-if="item.isTop">
					<view @click="gotoclass(item.content,item.time,item.id,item.courseid)">
						<image :src="item.imageUrl" mode="scaleToFill" lazy-load='true'></image>
						<view>{{item.content}}</view>
						<view>
							{{getTimes(item.time)+'-'+item.teacher}}
						</view>
						<text class="iconfont icon-xiaozu playCount">{{item.count}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="courseList">
			<view class="nav">
				<text>{{status===1?'我学的':'我教的'}}</text>
			</view>
			<view class="class">
				<view class="nav1">
					<text>课程列表</text>
					<image v-if="isopen" src="../../static/pic/down.png" mode="aspectFit" @click="changeOpen(false)">
					</image>
					<image v-else src="../../static/pic/up.png" mode="aspectFit" @click="changeOpen(true)"></image>
				</view>
				<view class="classContent" v-if="isopen">
					<view v-for="(item,index) in courselist" :key="item.resourceId" class="listItem">
						<view @click="gotoclass(item.content,item.time,item.id,item.courseid)">
							<image :src="item.imageUrl" mode="scaleToFill" lazy-load='true'></image>
							<view class="ourcontent">
								<view>{{item.content}}</view>
								<view>
									{{getTimes(item.time)+'-'+item.teacher}}
								</view>
								<text class="iconfont icon-xiaozu playCount">{{item.count}}人</text>
								<text class="diandiandian" @click.stop="thisdian(item.id,item.isTop)">...</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectList:[],
				course:'',
				courseid:'',
				selectShow:false,
				isopen:true,
				show1:false,
				activetech:'',
				keyword: '',
				userid:'',
				nickname:'',
				alist:[],
				commitlist:[],
				show: false,
				openList: [41],
				status: 0,
				courselist: [],
				courseisTop:false,
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				customStyle: {
					fontSize: '30rpx',
					height: '70rpx'
				},
				mainHeight: '',
				labelPosition: 'left',
				border: false,
				selectShow: false,
				model: {
					name: '默认简介',
				},
			}
		},
		methods: {
			selectConfirm(e) {
				this.course = '';
				this.courseid = ''
				console.log()
				e.map((val, index) => {
					this.course += this.course == '' ? val.label : '-' + val.label;
				})
				this.courseid = e[0].value
			},
			getTimes(e){
				console.log(e)
				if(e==42) return '大四下'
				if(e==41) return '大四上'
				if(e==32) return '大三下'
				if(e==31) return '大三上'
				if(e==22) return '大二上'
				if(e==21) return '大二上'
				if(e==12) return '大一下'
				if(e==11) return '大一上'
			},
			changeOpen(e){
				this.isopen = e
			},
			thisdian(id,top){
				this.show1=true,
				this.activetech = id
				this.courseisTop=top
			},
			gotoclass(id, lass,classid,courseid) {
				uni.navigateTo({
					url: '../class/index?className=' + id + '&class=' + this.getTimes(lass) + '&id=' +classid+'&courseid='+courseid
				})
			},
			checkboxGroupChange(e) {
				this.commitlist = e
				console.log(this.commitlist);
			},
			async submit(){
				if(this.courseid=="") return uni.showToast({
						icon: 'none',
						title: '请选择科目!',
						duration: 2000,
					});
				console.log(this.courseid)
				const res =await this.$http({
					url:'/createTeach',
					data:{
						teacherId:uni.getStorageSync('userid'),
						courseId:this.courseid,
						description:this.model.name
					},
					method:'POST'
				})
				console.log(res)
				if (res.data.code !== 200) {
					return uni.showToast({
						icon: 'none',
						title: '创建失败!',
						duration: 2000,
					});
				}
				uni.showToast({
					icon: 'none',
					title: '创建成功',
					duration: 1000,
				});
				this.show=false,
				this.course='',
				this.courseid=''
				this.model.name="默认简介"
				this.getTeach()		
			},
			labelPositionChange(index) {
				this.labelPosition = index == 0 ? 'left' : 'top';
			},
			async deleteCourse(){
				const res =await this.$http({
					url:'/deleteTeach',
					data:{
						teachId:this.activetech,
					},
				})
				console.log(res)
				if (res.data.code !== 200) {
					return uni.showToast({
						icon: 'none',
						title: '删除失败!',
						duration: 2000,
					});
				}
				uni.showToast({
					icon: 'none',
					title: '删除成功',
					duration: 1000,
				});
				this.show1=false,
				this.activetech = '',
				this.courseisTop= '',
				this.getTeach()
				},
			async changeTop(){
				const res =await this.$http({
					url:'/setTeachTop',
					data:{
						status:this.status,
						teachId:this.activetech,
						id:this.userid,
						isTop:!this.courseisTop
					},
					method:'POST'
				})
				console.log(res)
				if (res.data.code !== 200) {
					return uni.showToast({
						icon: 'none',
						title: '修改状态失败，请重试!',
						duration: 2000,
					});
				}
				uni.showToast({
					icon: 'none',
					title: '修改成功',
					duration: 1000,
				});
				this.show1=false,
				this.activetech = '',
				this.courseisTop= '',
				this.getTeach()
			},
			async outcourse(){
				const res = await this.$http({
					url:'/outTeach',
					data:{
						studentId:this.userid,
						teachId:this.activetech
					}
				})
				console.log(res)
				if (res.data.code !== 200) {
					return uni.showToast({
						icon: 'none',
						title: '退出课程失败，请重试',
						duration: 2000,
					});
				}
				uni.showToast({
					icon: 'none',
					title: '退出成功',
					duration: 1000,
				});
				this.show1=false,
				this.activetech = '',
				this.courseisTop= '',
				this.getTeach()
			},
			async joinTeach(){
				console.log('点击')
				if(this.commitlist.length === 0) return uni.showToast({
					icon:'none',
					title:'请选择课程后提交',
					duration:1000
				})
				const res = await this.$http({
					url:'/joinTeach',
					data:{
						studentId:this.userid,
						teachIds:this.commitlist
					},
					method:"POST"
				})
				console.log(res)
				if (res.data.code !== 200) {
					return uni.showToast({
						icon: 'none',
						title: '加入课程失败，请重试',
						duration: 2000,
					});
				}
				uni.showToast({
					icon: 'none',
					title: '加入成功',
					duration: 1000,
				});
				this.show=false,
				console.log(this.alist)
				this.alist.forEach((item,index)=>{
					this.alist[index].checked = false
				})
				this.commitlist = []
				this.getTeach()
			},
			async getAllTeach(){
				const res = await this.$http({
					url:'/getALLTeach',
				})
				let alist = []
				res.data.data.teaches.forEach((item,index)=>{
					alist.push({
						name:item.course.name+'-'+item.teacher.nickname,
						id:item.id,
						checked:false,
					})
				})
				// console.log(alist)
				this.alist = alist
			},
			async getTeach(){
				const res = await this.$http({
					url:'/getTeach',
					data:{
						id:this.userid,
						status:this.status
					}
				}) 
				let arr = []
				res.data.data.teaches.forEach((item,index)=>{
					arr.push({
						id:item.id,
						courseid:item.course.id,
						imageUrl: item.course.imgUrl,
						content: item.course.name,
						count: item.stuNum,
						class: '计嵌171',
						time: item.course.grade,
						isTop:item.top,
						teacher:item.teacher?item.teacher.nickname:'教学'
					})
				})
				this.courselist = arr
				if(this.status==0){
					this.getCourse()
				}
			},
			async getCourse(){
				const res = await this.$http({
					url:'/getAllCourse',
				}) 
				let arr = []
				res.data.data.courses.forEach((item,index)=>{
					if(this.courselist.find((item1)=>item.id == item1.courseid )!= null) return
					arr.push({
						value: item.id,
						label: item.name
					})
				})
				this.selectList = arr
			}
		},
		onLoad() {
			this.mainHeight = uni.getSystemInfoSync().windowHeight
			this.status = uni.getStorageSync('status')
			this.userid = uni.getStorageSync('userid')
			this.nickname = uni.getStorageSync('nickname')
			this.getTeach()
			this.getAllTeach()
			// if(status==0){
			// 	this.getCourse()
			// }
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		background-color: #F8F8F8;
	}
	.diandiandian{
		display: block;
		position: absolute;
		height: 60rpx;
		width: 60rpx;
		line-height: 60rpx;
		font-size: 48rpx;
		text-align: center;
		top: 10rpx;
		right: 20rpx;
	}
	.title1 {
		height: 70rpx;
		display: flex;
		justify-content: space-between;
		padding: 20rpx 40rpx;
		background-color: #FFF;
		box-sizing: content-box;

		.myy {
			height: 70rpx;
			font-size: 40rpx;
			line-height: 80rpx;
		}
	}

	.Topcourselist {
		margin: 20rpx;
		display: flex;
		white-space: nowrap;

		.listItem {
			background-color: #FFF;
			border-radius: 20rpx;
			display: inline-block;
			position: relative;
			width: 250rpx;
			margin-right: 20rpx;
			padding-bottom: 20rpx;
			vertical-align: top;

			image {
				width: 250rpx;
				height: 150rpx;
				margin-bottom: 30rpx;
				border-radius: 10rpx;
				filter: brightness(75%);
			}

			view {
				width: 250rpx;
				line-height: 30rpx;
				font-size: 25rpx;
				padding: 0 10rpx;
				white-space: normal;
				color: #808080;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}

			.playCount {
				position: absolute;
				top: 2%;
				right: 0;
				color: #FFF;
				font-size: 28rpx
			}
		}
	}

	.nav {
		margin: 20rpx 0;
		height: 60rpx;
		background-color: #FFF;

		text {
			display: inline-block;
			margin-left: 50rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-bottom: 1px solid #007AFF;
			color: #007AFF;
			font-weight: bold;
		}
	}

	.nav1 {
		margin: 10rpx 0 4rpx 0;
		height: 60rpx;
		background-color: #FFF;

		text {
			display: inline-block;
			margin-left: 40rpx;
			height: 60rpx;
			line-height: 60rpx;
			color: #007AFF;
			font-weight: bold;
		}

		image {
			height: 30rpx;
			width: 30rpx;
			float: right;
			margin-right: 40rpx;
			margin-top: 10rpx;
		}
	}

	.classContent {

		.listItem {
			background-color: #FFF;
			border-radius: 20rpx;
			display: inline-block;
			position: relative;
			width: 100%;
			padding: 20rpx;
			vertical-align: top;

			image {
				display: inline-block;
				width: 250rpx;
				height: 150rpx;
				border-radius: 10rpx;
				filter: brightness(75%);
				vertical-align: middle;
			}

			.ourcontent {
				margin-left: 30rpx;
				display: inline-block;
				vertical-align: middle;

				text {
					font-size: 28rpx
				}
			}
		}
	}
</style>
