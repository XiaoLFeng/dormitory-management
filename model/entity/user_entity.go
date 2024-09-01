package entity

import (
	"github.com/google/uuid"
	"time"
)

// User
//
// # 用户实体
//
// 用户实体，用于映射数据库中的用户表
//
// # 属性
//   - UUID: 用户唯一标识
//   - Username: 用户名
//   - Password: 密码
//   - CreatedAt: 创建时间
//   - UpdatedAt: 更新时间
type User struct {
	UUID      uuid.UUID `json:"uuid" gorm:"primaryKey;type:uuid;not null"`
	Username  string    `json:"username" gorm:"type:varchar(20);not null"`
	Password  string    `json:"password" gorm:"type:varchar(100);not null"`
	CreatedAt time.Time `json:"created_at" gorm:"type:timestamp;default:CURRENT_TIMESTAMP;not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"type:timestamp;default:CURRENT_TIMESTAMP;not null"`
}
