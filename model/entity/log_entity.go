package entity

import (
	"github.com/google/uuid"
	"time"
)

// Log
//
// # 日志实体类
//
// 用于记录日志的实体信息
//
// # 形参
//   - LogUUID: 日志 UUID 信息主键
//   - Log: 日志信息
//   - RecordTime: 日志记录时间
type Log struct {
	LogUUID    uuid.UUID `json:"log_uuid" gorm:"primaryKey;type:uuid;not null"`
	User       string    `json:"user" gorm:"type:varchar(255);not null"`
	Log        string    `json:"log" gorm:"type:text;not null"`
	RecordTime time.Time `json:"record_time" gorm:"type:timestamp;not null"`
}
