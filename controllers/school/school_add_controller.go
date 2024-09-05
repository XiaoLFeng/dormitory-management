package school

import (
	"dormitory-management/constant"
	"dormitory-management/model/entity"
	"github.com/XiaoLFeng/go-general-utils/bcode"
	"github.com/XiaoLFeng/go-gin-util/berror"
	"github.com/XiaoLFeng/go-gin-util/bresult"
	"github.com/gin-gonic/gin"
)

// AddUser
//
// # 添加登录用户
//
// 添加校园网登录用户
func AddUser(c *gin.Context) {
	var addUser *entity.CampusNetworkUser
	if err := c.ShouldBindJSON(&addUser); err == nil {
		// 添加用户
		tx := constant.DB.Create(&entity.CampusNetworkUser{
			User: addUser.User,
			Pass: addUser.Pass,
			Type: addUser.Type,
		})
		if tx.Error != nil {
			_ = c.Error(berror.New(bcode.ServerDatabaseError, tx.Error.Error()))
			return
		}
		bresult.Ok(c, "登录用户添加完成")
	} else {
		_ = c.Error(berror.New(bcode.BadRequestInvalidInput, "输入内容错误或缺失"))
		return
	}
}
