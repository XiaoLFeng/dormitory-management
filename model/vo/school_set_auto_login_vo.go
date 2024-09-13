/*
 * --------------------------------------------------------------------------------
 * Copyright (c) 2016-NOW(至今) 筱锋
 * Author: 筱锋(https://www.x-lf.com)
 *
 * 本文件包含 dormitory-management 的源代码，该项目的所有源代码均遵循MIT开源许可证协议。
 * --------------------------------------------------------------------------------
 * 许可证声明：
 *
 * 版权所有 (c) 2016-2024 筱锋。保留所有权利。
 *
 * 有关MIT许可证的更多信息，请查看项目根目录下的LICENSE文件或访问：
 * https://opensource.org/licenses/MIT
 * --------------------------------------------------------------------------------
 * 免责声明：
 *
 * 使用本软件的风险由用户自担。作者或版权持有人在法律允许的最大范围内，
 * 对因使用本软件内容而导致的任何直接或间接的损失不承担任何责任。
 * --------------------------------------------------------------------------------
 */

package vo

// SchoolSetAutoLoginVO
//
// # 校园网设置自动登录
//
// 用于校园网设置自动登录的请求参数, 用于接收前端传递的设置自动登录的请求参数
//
// # 参数
//   - SetAutoLogin 	是否设置自动登录(bool)
//   - StartTime 		自动登录开始时间(string)
//   - EndTime 			自动登录结束时间(string)
type SchoolSetAutoLoginVO struct {
	SetAutoLogin bool   `json:"auto_login" form:"auto_login" example:"true" description:"是否设置自动登录"`
	StartTime    string `json:"start_time" form:"start_time" example:"08:00" description:"自动登录开始时间"`
	EndTime      string `json:"end_time" form:"end_time" example:"23:00" description:"自动登录结束时间"`
}
