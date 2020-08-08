<template>
	<view class="content">
		<view class="top">
			<view class="top-left">
				<image src="../../static/logo.png"></image>
			</view>
			<view class="top-center">
				<image src="../../static/images/index/logo.png"></image>
			</view>
			<view class="top-right">
				<image class="search" src="../../static/images/index/search.png"></image>
				<image src="../../static/images/index/add.png"></image>
			</view>
		</view>
		<view class="messages">
			<view hover-class="message-item-hover" class="message-item" v-for="(item,index) in messages" :key="index">
				<view class="avatar">
					<image src="../../static/logo.png"></image>
				</view>
				<view class="infos">
					<view class="up">
						<text class="name">开发者的惋惜</text>
						<text class="time">上午7:45</text>
					</view>
					<view class="down">
						<text class="message-view">就是你的那额，不用点开始速不用点开始速不用点开始速不用点开始速…</text>
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
				messages: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	 
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
		z-index: 999;
		
			
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
		padding-top: 88rpx;
		
		.message-item-hover {
			background-color: $uni-bg-color-grey;
		}
		
		.message-item {
			height: 96rpx;
			margin: 40rpx 0;
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			
			.avatar {
				image {
					width: 96rpx;
					height: 96rpx;
					border-radius: 24rpx;
					margin: 0 32rpx;
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
</style>
