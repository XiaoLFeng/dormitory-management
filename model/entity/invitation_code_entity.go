package entity

import (
	"github.com/google/uuid"
	"time"
)

type InvitationCode struct {
	ID        uint      `json:"id" gorm:"primaryKey;autoincrement;not null"`
	UserUUID  uuid.UUID `json:"user_uuid" gorm:"type:uuid;not null"`
	Code      string    `json:"code" gorm:"type:varchar(255);not null"`
	User      User      `json:"user" gorm:"foreignKey:UserUUID;references:UUID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	CreatedAt time.Time `json:"created_at" gorm:"type:timestamp;not null"`
}
