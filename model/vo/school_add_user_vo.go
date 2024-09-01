package vo

// SchoolAddUser
//
// # 学校添加用户
//
// 用于定义学校添加用户视图对象，包含用户名，密码，类型
//
// # 参数
//   - User	string	用户名
//   - Pass	string	密码
//   - Type	string	类型
type SchoolAddUser struct {
	User string `json:"user" form:"user" binding:"required" example:"admin" description:"用户名"`
	Pass string `json:"pass" form:"pass" binding:"required" example:"admin" description:"密码"`
	Type string `json:"type" form:"type" binding:"required" example:"admin" description:"类型"`
}
