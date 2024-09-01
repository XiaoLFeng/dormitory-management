package entity

// CampusNetworkUser
//
// # 校园网用户实体
//
// 用于记录用于登录校园网的用户账号与密码
//
// # 形参
//   - User: 用户名
//   - Pass: 用户登录密码
//   - Type: 校园网络类型
type CampusNetworkUser struct {
	User string `json:"user" gorm:"primaryKey;type:varchar(255);not null"`
	Pass string `json:"pass" gorm:"type:varchar(100);not null"`
	Type string `json:"type" gorm:"type:varchar(20);not null"`
}
