package initial

import (
	"dormitory-management/constant"
	"dormitory-management/model/entity"
	"dormitory-management/model/vo"
	"github.com/XiaoLFeng/go-general-utils/bcode"
	"github.com/XiaoLFeng/go-general-utils/butil"
	"github.com/XiaoLFeng/go-gin-util/berror"
	"github.com/XiaoLFeng/go-gin-util/blog"
	"github.com/XiaoLFeng/go-gin-util/bresult"
	"github.com/gin-gonic/gin"
)

// Initial
//
// # 初始化模式
//
// 用于初始化默认应用，用于系统初始化时候创建默认用户
func Initial(c *gin.Context) {
	// 检查当前状态是否是初始化模式
	blog.Tracef("CONT", "当前是否是初始化模式 [%v]", constant.InitialMode)
	if !constant.InitialMode {
		_ = c.Error(berror.New(bcode.ForbiddenAccessDenied, "系统已完成初始化，不可重新初始化"))
		return
	}
	// 检查参数是否齐全
	var initUserVO vo.InitUserVO
	if err := c.ShouldBind(&initUserVO); err == nil {
		// 存入数据库中并修正代码为初始化完成阶段
		constant.DB.Create(&entity.User{
			UUID:     butil.GenerateUUIDFromString(initUserVO.Username),
			Username: initUserVO.Username,
			Password: butil.PasswordEncode(initUserVO.Password),
		})
		// 更新初始化模式
		var getInfo *entity.Info
		constant.DB.First(&getInfo, "key = ?", "system_initial_mode")
		getInfo.Value = "false"
		constant.DB.Save(getInfo)
		constant.InitialMode = false
		bresult.Ok(c, "初始化完成")
		return
	} else {
		_ = c.Error(berror.New(bcode.BadRequestInvalidInput, "输入内容错误或缺失"))
		return
	}
}
