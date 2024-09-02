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
	"time"
)

// Login
//
// # 登录
//
// 登录接口，用于登录
func Login(c *gin.Context) {
	var authUserVO *vo.AuthLoginVO
	if err := c.ShouldBindBodyWithJSON(&authUserVO); err != nil {
		_ = c.Error(berror.New(bcode.BadRequestInvalidInput, "输入内容错误或缺失"))
		return
	}
	// 检查用户密码
	var getUser *entity.User
	constant.DB.First(&getUser, "username = ?", authUserVO.Username)
	if !butil.PasswordVerify(authUserVO.Password, getUser.Password) {
		_ = c.Error(berror.New(bcode.BadRequestInvalidInput, "用户名或密码错误"))
		return
	}
	// 生成Token
	newToken := butil.GenerateUUID()
	newEntity := &entity.Token{
		TokenUUID: newToken,
		UserUUID:  getUser.UUID,
		ExpiredAt: time.Now().Add(time.Hour * 24),
		CreatedAt: time.Now(),
	}
	constant.DB.Create(newEntity)
	newEntity.User = *getUser
	newEntity.User.Password = ""
	// 登录成功并且返回Token信息
	bresult.OkWithData(c, "登录成功", *newEntity)
}
