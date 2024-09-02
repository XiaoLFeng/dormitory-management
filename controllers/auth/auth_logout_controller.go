package auth

import (
	"dormitory-management/constant"
	"dormitory-management/model/entity"
	"github.com/XiaoLFeng/go-general-utils/butil"
	"github.com/XiaoLFeng/go-gin-util/bresult"
	"github.com/gin-gonic/gin"
)

// Logout
//
// # 登出
//
// 登出接口，用于登出
func Logout(c *gin.Context) {
	tokenUUID := butil.ConvertStringToUUID(butil.TokenRemoveBearer(c.GetHeader("Authorization")))
	constant.DB.Delete(&entity.Token{}, "token_uuid = ?", tokenUUID)
	bresult.Ok(c, "登出成功")
}
