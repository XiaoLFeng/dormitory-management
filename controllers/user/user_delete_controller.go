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

package user

import (
	"dormitory-management/constant"
	"dormitory-management/model/entity"
	"dormitory-management/model/vo"
	"github.com/XiaoLFeng/go-general-utils/bcode"
	"github.com/XiaoLFeng/go-general-utils/butil"
	"github.com/XiaoLFeng/go-gin-util/berror"
	"github.com/XiaoLFeng/go-gin-util/bresult"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// Delete
//
// # 删除用户
//
// 删除用户操作, 删除指定用户
func Delete(c *gin.Context) {
	var getQuery vo.UserDeleteVO
	if err := c.Bind(&getQuery); err != nil {
		_ = c.Error(berror.New(bcode.BadRequestInvalidInput, "输入内容错误或缺失"))
		return
	}
	// 删除用户
	var getUser *entity.User
	constant.DB.First(&getUser, "uuid = ?", getQuery.UUID)
	if getUser.UUID == uuid.Nil {
		_ = c.Error(berror.New(bcode.BadRequestInvalidInput, "用户不存在"))
		return
	}
	// 检查是否删除用户为自己
	tokenUUID := butil.ConvertStringToUUID(butil.TokenRemoveBearer(c.GetHeader("Authorization")))
	var token *entity.Token
	constant.DB.First(&token, "token_uuid = ?", tokenUUID)
	if token.UserUUID == getUser.UUID {
		_ = c.Error(berror.New(bcode.BadRequestInvalidInput, "不能删除自己"))
		return
	}
	tx := constant.DB.Delete(&entity.User{}, "uuid = ?", getQuery.UUID)
	if tx.Error != nil {
		_ = c.Error(berror.New(bcode.ServerDatabaseError, "删除失败"))
		return
	}
	bresult.Ok(c, "删除成功")
}
