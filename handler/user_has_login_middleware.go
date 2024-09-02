package handler

import (
	"dormitory-management/constant"
	"dormitory-management/model/entity"
	"github.com/XiaoLFeng/go-general-utils/bcode"
	"github.com/XiaoLFeng/go-general-utils/butil"
	"github.com/XiaoLFeng/go-gin-util/berror"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"time"
)

// UserHasLoginMiddleware
//
// # 用户是否已经登录
//
// 用于检查用户是否已经登录，如果没有登录则拒绝访问
func UserHasLoginMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		userToken := butil.TokenRemoveBearer(c.GetHeader("Authorization"))
		if userToken == "" {
			_ = c.Error(berror.New(bcode.ForbiddenAccessDenied, "用户未登录"))
			return
		}
		// 将令牌转换为 UUID 格式
		tokenUUID := butil.ConvertStringToUUID(userToken)
		var getToken *entity.Token
		constant.DB.First(&getToken, "token_uuid = ?", tokenUUID)
		if getToken.TokenUUID == uuid.Nil {
			_ = c.Error(berror.New(bcode.ForbiddenAccessDenied, "用户未登录"))
			return
		}
		// 检查是否过期
		if getToken.ExpiredAt.Before(time.Now()) {
			_ = c.Error(berror.New(bcode.ForbiddenAccessDenied, "用户登录已过期"))
			constant.DB.Delete(&getToken)
			return
		}
		c.Next()
	}
}
