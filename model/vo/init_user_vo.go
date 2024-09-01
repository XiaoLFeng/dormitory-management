package vo

type InitUserVO struct {
	Username string `json:"username" form:"username" binding:"required" example:"admin" description:"用户名"`
	Password string `json:"password" form:"password" binding:"required" example:"admin" description:"密码"`
}
