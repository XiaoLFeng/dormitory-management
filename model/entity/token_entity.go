package entity

import (
	"github.com/google/uuid"
	"time"
)

// Token
//
// # Token 实体
//
// 用于存放用户的 Token 信息
//
// # 属性
//   - TokenUUID: Token UUID
//   - UserUUID: 用户 UUID
//   - ExpiredAt: 过期时间
//   - CreatedAt: 创建时间
//   - User: 用户实体(外键)
type Token struct {
	TokenUUID uuid.UUID `json:"token_uuid" gorm:"primaryKey;type:uuid;not null"`
	UserUUID  uuid.UUID `json:"user_uuid" gorm:"type:uuid;not null"`
	ExpiredAt time.Time `json:"expire_at" gorm:"type:timestamp;not null"`
	CreatedAt time.Time `json:"created_at" gorm:"type:timestamp;not null"`
	User      User      `json:"user" gorm:"foreignKey:UserUUID;references:UUID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}
