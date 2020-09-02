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
					<input @focus="handleFocus" name="email" placeholder="注册邮箱" placeholder-class="ph" @blur="setEmail" />
					<input @focus="handleFocus" name="nickName" placeholder="个性的昵称" placeholder-class="ph" />
					<input @focus="handleFocus" :password="!showPwd" name="pwd" placeholder="用户密码" placeholder-class="ph">
						<image v-if="!showPwd" src="../../static/svg/eye.svg" @click="showOrHidePwd" style="height: 26rpx; margin-top: -100rpx;"></image>
						<image v-if="showPwd" src="../../static/svg/eye-open.svg" @click="showOrHidePwd"></image>
					</input>
					<view class="code">
						<input @focus="handleFocus" name="code" placeholder="验证码(区分大小写)" placeholder-class="ph" />
						<button :disabled="codeBtnStatus" :style="codeBtnStatus && 'background: #ccc; color: #999;'" @click="getEmailCode">{{!codeBtnStatus ? '获取邮箱验证码' : time + '秒后重新发送'}}</button>
					</view>
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
	import { getCode, signup } from '../../api/user.js'
	import { validateFormData } from '../../utils/index.js'
	
	export default {
		data() {
			return {
				showTip: false,
				showPwd: false,
				tipContent: '',
				rules: {
					email: { required: true, message: '邮箱不能为空', validate: this.validateEmail },
					pwd: { required: true, message: '密码不能为空' },
					nickName: { required: true, message: '昵称不能为空' },
					code: { required: true, message: '验证码不能为空' },
				},
				email: '',
				time: 60,
				codeBtnStatus: false,
			}
		},
		methods: {
			validateEmail: function(val) {
				const email = this.email
				const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				const res = reg.test(email)
				if (!res) {
					return '邮箱格式不正确'
				}
			},
			setEmail: function(e) {
				this.email = e.detail.value
			},
			returnSignin: function() {
				uni.navigateBack();
			},
			showOrHidePwd: function() {
				this.showPwd = !this.showPwd;
			},
			handleFocus: function() {
				this.showTip = false;
				this.tipContent = '';
			},
			getEmailCode: function() {
				if (!this.email) {
					this.showTip = true;
					this.tipContent = '请填写邮箱';
					return
				}
				if (this.validateEmail(this.email)) {
					this.showTip = true;
					this.tipContent = '邮箱格式不正确';
					return
				}
				getCode({
					email: this.email
				}).then(res => {
					if(res.code === 2000) {
						const timer = setInterval(() => {
							this.codeBtnStatus = true;
							this.time --;
							if (this.time === 0) {
								clearInterval(timer);
								this.codeBtnStatus = false;
								this.time = 60;
							}
						}, 1000)
					} else {
						this.showTip = true;
						this.tipContent = res.msg;
					}
				})
			},
			formSubmit: function(e) {
				const formdata = e.detail.value;
				const validate = validateFormData(formdata, this.rules);
				if (validate) {
					this.showTip = true;
					this.tipContent = validate;
				} else {
					signup({
						...formdata
					}).then(res => {
						if(res.code === 2000) {
							uni.showModal({
								title: '提示信息',
								content: res.msg,
								confirmText: '去登录',
								success: this.returnSignin,
							})
						} else {
							this.showTip = true;
							this.tipContent = res.msg;
						}
					})
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
		padding-top: 60rpx;
		
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
			font-size: 24rpx;
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
		
		.code {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: -60rpx;
			
			input {
				width: 60%;
			}
			
			button {
				width: 35%;
				height:56rpx;
				border-radius: 24rpx;
				font-size: 24rpx;
				margin: unset;
			}
		}
	}
}
</style>
