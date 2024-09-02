package vo

// AuthLoginVO
//
// # 登录实体
//
// 登录实体，用于登录
//
// # 形参
//   - Username: 用户名
//   - Password: 密码
type AuthLoginVO struct {
	Username string `json:"username" form:"username" binding:"required" example:"admin" description:"用户名"`
	Password string `json:"password" form:"password" binding:"required" example:"admin" description:"密码"`
}
