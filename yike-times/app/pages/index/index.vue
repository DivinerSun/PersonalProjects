<template>
	<view class="container">
		<view class="top">
			<view class="top-left">
				<image src="../../static/images/logo.png"></image>
			</view>
			<view class="top-center">
				<image src="../../static/images/logo.png"></image>
			</view>
			<view class="top-right">
				<image class="search" src="../../static/images/search.png"></image>
				<image src="../../static/images/add.png"></image>
			</view>
		</view>
		<view class="messages">
			<view class="message-item" v-for="(item) in messages" :key="item.id">
				<view class="avatar">
					<text v-if="item.tip" class="tip">{{item.tip}}</text>
					<image :src="item.avatar"></image>
				</view>
				<view class="infos">
					<view class="up">
						<text class="name">{{item.name}}</text>
						<text class="time">{{parseTime(item.time)}}</text>
					</view>
					<view class="down">
						<text class="message-view">{{item.content}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { formatTime, getStorageItem } from '../../utils/index.js'
	import { messageArray } from '../../utils/mock.js'
	
	export default {
		data() {
			return {
				messages: [],
			}
		},
		onLoad() {
			this.checkLogin()
		},
		methods: {
			// 检测用户是否登录
			checkLogin() {
				const user = getStorageItem('user')
				if (!user) {
					uni.navigateTo({
						url: '../signIn/signIn'
					})
				} else {
					this.getMessages()
				}
			},
			// 时间处理
			parseTime(date) {
				return formatTime(date)
			},
			// 获取消息列表
			getMessages() {
				this.messages = messageArray
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	 
		.top {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 88rpx;
			position: fixed;
			top: 0;
			background: $uni-bg-color;
			box-shadow:0px 1px 0px 0px rgba(0,0,0,0.1);
			z-index: 999;
			padding-top: var(--status-bar-height);
				
			.top-left {
				padding-left: 32rpx;
				
				image {
					width:68rpx;
					height:68rpx;
					border-radius:16rpx;
				}
			}
			
			.top-center {
				image {
					width:88rpx;
					height:42rpx;
				}
			}
			
			.top-right {
				padding-right: 32rpx;
				
				.search {
					width: 52rpx;
					height: 52rpx;
					margin-right: 40rpx;
				}
				
				image {
					width:48rpx;
					height:48rpx;
				}
			}
		}
		
		.messages {
			width: 100%;
			padding-top: calc(var(--status-bar-height) + 88rpx);
			
			.message-item {
				height: 128rpx;
				margin: 40rpx 0;
				display: flex;
				align-items: center;
				
				&:active {
					background-color: $uni-bg-color-grey;
				}
				
				.avatar {
					.tip {
						display: inline-block;
						background: $uni-color-error;
						color: $uni-text-color-inverse;
						height: 36rpx;
						line-height: 36rpx;
						min-width: 36rpx;
						padding: 0 2rpx;
						border-radius: $uni-border-radius-circle;
						text-align: center;
						font-size: 24rpx;
						position: absolute;
						left: 100rpx;
						margin-top: -10rpx;
						z-index: 99;
					}
					
					image {
						width: 96rpx;
						height: 96rpx;
						border-radius: 24rpx;
						margin: 0 32rpx;
						background: $uni-color-primary;
					}
				}
				
				.infos {
					width: 558rpx;
					
					.up {
						.name {
							font-size: 36rpx;
							color: $uni-text-color;
						}
						
						.time {
							font-size: 24rpx;
							color: $uni-text-color-disable;
							float: right;
						}
					}
					
					.down {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						
						.message-view {
							font-size: 28rpx;
							color: $uni-text-color-grey;
						}
					}
				}
			}
		}
	}
</style>
