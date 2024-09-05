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
	"github.com/XiaoLFeng/go-general-utils/bcode"
	"github.com/XiaoLFeng/go-general-utils/butil"
	"github.com/XiaoLFeng/go-gin-util/berror"
	"github.com/XiaoLFeng/go-gin-util/bresult"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// Current
//
// # 获取当前用户信息
//
// 获取当前用户信息
func Current(c *gin.Context) {
	// 根据获取的 Token 信息，获取当前用户信息
	tokenUUID := butil.ConvertStringToUUID(butil.TokenRemoveBearer(c.GetHeader("Authorization")))
	// 获取当前用户信息
	var token *entity.Token
	tx := constant.DB.First(&token, "token_uuid = ?", tokenUUID)
	if token.TokenUUID == uuid.Nil {
		_ = c.Error(berror.New(bcode.UnauthorizedTokenExpired, "Token 已过期"))
		return
	}
	// 获取用户信息
	var user *entity.User
	tx = constant.DB.First(&user, "uuid = ?", token.UserUUID)
	user.Password = ""
	if tx.Error != nil {
		_ = c.Error(berror.New(bcode.ServerDatabaseError, tx.Error.Error()))
		return
	}
	bresult.OkWithData(c, "获取成功", user)
}
