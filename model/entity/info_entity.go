package entity

import (
	"github.com/google/uuid"
	"time"
)

// Info
//
// # 信息实体
//
// 用于存放一些站点的基础信息
//
// # 形参
//   - InfoUUID: 信息主键
//   - Key: 键
//   - Value: 值
//   - UpdatedAt: 信息的修改时间
type Info struct {
	InfoUUID  uuid.UUID `json:"info_uuid" gorm:"primaryKey;type:uuid;not null"`
	Key       string    `json:"key" gorm:"type:varchar(64);not null"`
	Value     string    `json:"value" gorm:"type:text;not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"type:timestamp;not null;default:CURRENT_TIMESTAMP;"`
}
