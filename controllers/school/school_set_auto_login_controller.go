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

package school

import (
	"dormitory-management/constant"
	"dormitory-management/model/entity"
	"dormitory-management/model/vo"
	"github.com/XiaoLFeng/go-general-utils/bcode"
	"github.com/XiaoLFeng/go-gin-util/berror"
	"github.com/XiaoLFeng/go-gin-util/blog"
	"github.com/XiaoLFeng/go-gin-util/bresult"
	"github.com/gin-gonic/gin"
)

// SetAutoLogin
//
// # 设置自动登录
//
// 设置自动登录，如果设置为 true 则表示开启自动登录，否则关闭自动登录。
func SetAutoLogin(c *gin.Context) {
	var loginVO vo.SchoolSetAutoLoginVO
	if err := c.ShouldBindBodyWithJSON(&loginVO); err != nil {
		blog.Warnf("CONT", "设置自动登录失败: %v", err.Error())
		_ = c.Error(berror.New(bcode.BadRequestInvalidInput, "输入内容错误或缺失"))
		return
	}
	blog.Debugf("CONT", "数据建检查: %v", loginVO)
	// 操作自动登录
	var getInfo *entity.Info
	constant.DB.First(&getInfo, "key = ?", "system_auto_login")
	if loginVO.SetAutoLogin {
		getInfo.Value = "true"
	} else {
		getInfo.Value = "false"
	}
	constant.DB.Save(&getInfo)
	constant.AutoLogin = loginVO.SetAutoLogin
	// 设置开始时间
	constant.DB.First(&getInfo, "key = ?", "system_auto_login_start_time")
	getInfo.Value = loginVO.StartTime
	constant.DB.Save(&getInfo)
	constant.LoginStartTime = loginVO.StartTime
	// 设置结束时间
	constant.DB.First(&getInfo, "key = ?", "system_auto_login_end_time")
	getInfo.Value = loginVO.EndTime
	constant.DB.Save(&getInfo)
	constant.LoginEndTime = loginVO.EndTime
	// 返回结果
	bresult.Ok(c, "设置成功")
}
