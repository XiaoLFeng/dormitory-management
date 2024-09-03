package invitation

import (
	"dormitory-management/constant"
	"dormitory-management/model/entity"
	"github.com/XiaoLFeng/go-general-utils/bcode"
	"github.com/XiaoLFeng/go-general-utils/butil"
	"github.com/XiaoLFeng/go-gin-util/berror"
	"github.com/XiaoLFeng/go-gin-util/bresult"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"time"
)

// Create
//
// # 创建邀请
//
// 创建邀请，用于用于注册后的用户创建邀请码
func Create(c *gin.Context) {
	// 根据 UUID 获取用户
	tokenUUID := butil.ConvertStringToUUID(butil.TokenRemoveBearer(c.GetHeader("Authorization")))
	var getToken *entity.Token
	tx := constant.DB.First(&getToken, "token_uuid = ?", tokenUUID)
	if getToken.User.UUID == uuid.Nil {
		_ = c.Error(berror.New(bcode.ForbiddenAccessDenied, "用户未登录"))
		return
	}
	tx.Create(&entity.InvitationCode{
		UserUUID:  butil.GenerateUUID(),
		Code:      butil.GenerateRandomString(10),
		CreatedAt: time.Now(),
	})
	if tx.Error != nil {
		_ = c.Error(berror.New(bcode.ServerDatabaseError, "创建邀请码失败"))
		return
	}
	bresult.Ok(c, "创建邀请码成功")
}
