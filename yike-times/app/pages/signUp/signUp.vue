<template>
	<view class="sign-in">
		<view class="top">
			<image src="../../static/images/back.png" @click="returnSignin"></image>
		</view>
		<view class="logo">
			<image src="../../static/images/logo.png" ></image>
		</view>
		<view class="intro">
			<text class="title">注 册</text>
			<text class="welcome">您好，欢迎注册「逸刻时光」账号！</text>
		</view>
		<view class="login-form">
			<form @submit="formSubmit">
				<view>
					<input @focus="handleFocus" name="username" placeholder="注册邮箱" placeholder-class="ph" />
					<input @focus="handleFocus" name="username" placeholder="取一个名字" placeholder-class="ph" />
					<input @focus="handleFocus" :password="!showPwd" name="password" placeholder="用户密码" placeholder-class="ph">
						<image v-if="!showPwd" src="../../static/svg/eye.svg" @click="showOrHidePwd" style="height: 26rpx; margin-top: -100rpx;"></image>
						<image v-if="showPwd" src="../../static/svg/eye-open.svg" @click="showOrHidePwd"></image>
					</input>
					<text v-if="showTip" class="tip">{{tipContent}}</text>
				</view>
				<view>
					<button form-type="submit">注 册</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import { test } from '../../api/user.js'
	
	export default {
		data() {
			return {
				showTip: false,
				showPwd: false,
				tipContent: '',
			}
		},
		methods: {
			returnSignin: function() {
				uni.navigateBack()
			},
			showOrHidePwd: function() {
				this.showPwd = !this.showPwd;
			},
			handleFocus: function() {
				this.showTip = false;
				this.tipContent = '';
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				if (!formdata.username || !formdata.password) {
					this.showTip = true;
					this.tipContent = '请填写用户名或密码';
				} else {
					test({
						...formdata
					}).then(res => {
						console.log('登录：', res)
					})
					uni.showModal({
						content: '表单数据内容：' + JSON.stringify(formdata),
						showCancel: false
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.sign-in {
	padding-top: var(--status-bar-height);
	
	.top {
		height: 60rpx;
		padding: 20rpx;
		display: flex;
		align-items: center;
		
		image {
			width: 48rpx;
			height: 48rpx;
		}
	}
	
	.logo {
		display: flex;
		justify-content: center;
		padding-top: 256rpx;
		
		image {
			width: 194rpx;
			height: 92rpx;
		}
	}
	
	.intro {
		display: flex;
		flex-direction: column;
		margin-top: 54rpx;
		margin-left: 62rpx;
		
		.title {
			font-size: 56rpx;
			font-weight: 500;
		}
		
		.welcome {
			font-size: 40rpx;
			color:rgba(39,40,50,0.5);
		}
	}
	
	.login-form {
		display: flex;
		margin: 72rpx 62rpx 0;
		
		.ph {
			font-size: 12px;
			color: $uni-text-color-disable;
		}
		
		form {
			width: 100%;
			
			.tip {
				float: left;
				margin-top: -40rpx;
				font-size: 28rpx;
				color: $uni-color-error;
			}
			
			input {
				height: 44rpx;
				line-height: 44rpx;
				margin: 60rpx 0;
				border-bottom: 1px solid $uni-border-color;
				padding: 0 0 10rpx 20rpx;
			}
			
			image {
				width: 46rpx;
				height: 46rpx;
				position: absolute;
				right: 72rpx;
				margin-top: -112rpx;
			}
			
			button {
				margin-top: 120rpx;
				width: 520rpx;
				height:96rpx;
				border-radius: 48rpx;
				background: $uni-color-primary;
				box-shadow:0px 25px 16px -18px rgba(255,228,49,0.4);
			}
		}
	}
}
</style>
