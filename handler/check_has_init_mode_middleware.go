package handler

import (
	"dormitory-management/constant"
	"github.com/XiaoLFeng/go-general-utils/bcode"
	"github.com/XiaoLFeng/go-gin-util/berror"
	"github.com/gin-gonic/gin"
)

// CheckHasInitModeMiddleware
//
// # 检查是否是初始化模式
//
// 用于检查当前系统是否是初始化模式，如果是则拒绝访问
func CheckHasInitModeMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if constant.InitialMode {
			_ = c.Error(berror.New(bcode.ForbiddenAccessDenied, "当前系统出于初始化模式，请先进行初始化"))
			c.Abort()
			return
		}
		c.Next()
	}
}
