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

package dto

// SchoolAutoLoginDTO
//
// # 学校自动登录数据传输对象
//
// 用于传输学校自动登录的数据，包括自动登录状态、开始时间和结束时间。
//
// # 参数
//   - AutoLogin: bool 是否自动登录
//   - LoginStartTime: string 自动登录开始时间
//   - LoginEndTime: string 自动登录结束时间
type SchoolAutoLoginDTO struct {
	AutoLogin      bool   `json:"auto_login"`
	LoginStartTime string `json:"start_time"`
	LoginEndTime   string `json:"end_time"`
}
