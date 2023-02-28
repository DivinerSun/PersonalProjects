import { baseUrl } from '../config/index.js'

/**
 * 封装请求方法
 * 	config：请求参数
 * 		- url: 请求地址；必须
 * 		- method: 请求方法；为了兼容各平台，仅支持 GET 和 POST
 * 		- data: POST 请求参数
 * 		- params: GET 请求参数
 */
export default function request(config) {
	
	return new Promise((resolve, reject) => {
		const configNew = {
			url: `${baseUrl}${config.url}`,
			method: config.method || 'GET',
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		}
		const method = config.method || 'GET'
		const upM = method.toUpperCase()
		if (upM === 'GET') {
			const params = config.params
			let query = ''
			for (let key in params) {
				query += `${key}=${params[key]}&`
			}
			if (configNew.url.indexOf('?') === -1) {
				configNew.url = `${configNew.url}?${query}`
			} else {
				configNew.url = `${configNew.url}&${query}`
			}
		} else {
			configNew.data = config.data
		}
		
		uni.request(configNew)
	})
}