/**
 * 聊天时间格式化
 * 	当天：返回 『 HH:mm 』
 * 	昨天：返回 『 昨天 HH:mm 』
 * 	其他：返回 『 YYYY/MM/DD HH:mm 』
 */
export const formatTime = (d) => {
	const fromDate = new Date(d)
	const currentDate = new Date()
	
	// 获取传入时间对应的年月日、时分秒
	const from_Y = fromDate.getFullYear()
	const from_M = fromDate.getMonth() + 1
	const from_D = fromDate.getDate()
	const from_H = fromDate.getHours()
	const from_m = fromDate.getMinutes()
	const from_s = fromDate.getTime()
	
	// 获取当前时间对应的年月日、时分秒
	const current_Y = currentDate.getFullYear()
	const current_M = currentDate.getMonth() + 1
	const current_D = currentDate.getDate()
	
	if (from_Y === current_Y && from_M === current_M && from_D === current_D) {
		// 当天
		return `${from_H < 10 ? '0' + from_H : from_H}:${from_m < 10 ? '0' + from_m : from_m}`
	} else if (from_Y === current_Y && from_M === current_M && from_D + 1 === current_D) {
		// 昨天
		return `昨天 ${from_H < 10 ? '0' + from_H : from_H}:${from_m < 10 ? '0' + from_m : from_m}`
	} else {
		// 其他
		return `${from_Y}/${from_M < 10 ? '0' + from_M : from_M}/${from_D < 10 ? '0' + from_D : from_D}  ${from_H < 10 ? '0' + from_H : from_H}:${from_m < 10 ? '0' + from_m : from_m}`
	}
}