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

package invitation

import (
	"dormitory-management/constant"
	"dormitory-management/model/entity"
	"dormitory-management/model/vo"
	"github.com/XiaoLFeng/go-general-utils/bcode"
	"github.com/XiaoLFeng/go-gin-util/berror"
	"github.com/XiaoLFeng/go-gin-util/bresult"
	"github.com/gin-gonic/gin"
)

// Delete
//
// # 删除邀请码
//
// 删除邀请码, 删除指定邀请码
func Delete(c *gin.Context) {
	var name vo.InviteDeleteDTO
	if err := c.ShouldBindQuery(&name); err != nil {
		_ = c.Error(berror.New(bcode.BadRequestInvalidInput, "输入内容错误或缺失"))
		return
	}
	// 删除邀请码
	var getInvitation *entity.InvitationCode
	constant.DB.First(&getInvitation, "id = ?", name.ID)
	if getInvitation.ID == 0 {
		_ = c.Error(berror.New(bcode.BadRequestInvalidInput, "邀请码不存在"))
		return
	}
	tx := constant.DB.Delete(&entity.InvitationCode{}, "id = ?", name.ID)
	if tx.Error != nil {
		_ = c.Error(berror.New(bcode.ServerDatabaseError, "删除失败"))
		return
	}
	bresult.Ok(c, "删除成功")
}
