package initial

import (
	"dormitory-management/constant"
	"github.com/XiaoLFeng/go-gin-util/blog"
	"github.com/XiaoLFeng/go-gin-util/bresult"
	"github.com/gin-gonic/gin"
)

// InitMode
//
// # 查看初始化模式
//
// 用于查看初始化模式，检查系统是否处于初始化模式下
func InitMode(c *gin.Context) {
	// 检查当前状态是否是初始化模式
	blog.Tracef("CONT", "当前是否是初始化模式 [%v]", constant.InitialMode)
	str := struct {
		InitMode bool `json:"init_mode"`
	}{}
	str.InitMode = constant.InitialMode
	bresult.OkWithData(c, "输出完成", str)
}
