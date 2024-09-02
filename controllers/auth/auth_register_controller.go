package auth

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

// Register
//
// # 注册
//
// 注册接口，用于注册
func Register(c *gin.Context) {
	var authRegisterVO *vo.AuthRegisterVO
	if err := c.ShouldBindBodyWithJSON(&authRegisterVO); err != nil {
		_ = c.Error(berror.New(bcode.BadRequestInvalidInput, "输入内容错误或缺失"))
		return
	}
	// 检查邀请码是否有效
	var getInviteCode *entity.InvitationCode
	tx := constant.DB.First(&getInviteCode, "code = ?", authRegisterVO.InvitationCode)
	if getInviteCode.ID == 0 {
		_ = c.Error(berror.New(bcode.ForbiddenAccessDenied, "邀请码无效"))
		return
	}
	// 删除邀请码
	tx.Delete(&getInviteCode)
	// 检查用户是否已经存在
	var getUser *entity.User
	tx.First(&getUser, "username = ?", authRegisterVO.Username)
	if getUser.UUID != uuid.Nil {
		_ = c.Error(berror.New(bcode.ConflictResourceAlreadyExists, "用户已存在"))
		return
	}
	// 创建用户
	tx.Create(&entity.User{
		UUID:     butil.GenerateUUIDFromString(authRegisterVO.Username),
		Username: authRegisterVO.Username,
		Password: butil.PasswordEncode(authRegisterVO.Password),
	})
	// 注册成功
	bresult.Ok(c, "注册成功")
}
