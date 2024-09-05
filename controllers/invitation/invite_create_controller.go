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
	"gorm.io/gorm"
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
	newCode := entity.InvitationCode{
		Code:      butil.GenerateRandomString(10),
		CreatedAt: time.Now(),
	}
	err := constant.DB.Transaction(func(tx *gorm.DB) error {
		var getToken *entity.Token
		tx.First(&getToken, "token_uuid = ?", tokenUUID)
		var getUser *entity.User
		tx.First(&getUser, "uuid = ?", getToken.UserUUID)
		if getUser.UUID == uuid.Nil {
			return berror.New(bcode.ForbiddenAccessDenied, "用户未登录")
		}
		newCode.UserUUID = getUser.UUID
		tx.Create(&newCode)
		newCode.User = *getUser
		return nil
	})
	if err != nil {
		_ = c.Error(err)
		return
	}
	bresult.OkWithData(c, "创建邀请码成功", newCode)
}
