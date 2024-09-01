package vo

// InitUserVO
//
// # 初始化用户视图对象
//
// 用于定义初始化用户视图对象，包含用户名，密码
//
// # 参数
//   - Username	string	用户名
//   - Password	string	密码
type InitUserVO struct {
	Username string `json:"username" form:"username" binding:"required" example:"admin" description:"用户名"`
	Password string `json:"password" form:"password" binding:"required" example:"admin" description:"密码"`
}
