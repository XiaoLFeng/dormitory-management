package vo

// AuthRegisterVO
//
// # 注册
//
// 注册接口，用于注册；
// 用于注册用户，需要提供用户名、密码、邀请码
//
// # 形参
//   - Username: string 用户名
//   - Password: string 密码
//   - InvitationCode: string 邀请码
type AuthRegisterVO struct {
	Username       string `json:"username" binding:"required" example:"admin" description:"用户名"`
	Password       string `json:"password" binding:"required" example:"admin" description:"密码"`
	InvitationCode string `json:"invitation_code" binding:"required" example:"123456" description:"邀请码"`
}
