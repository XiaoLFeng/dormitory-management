package startup

import (
	"dormitory-management/constant"
	"dormitory-management/model/entity"
	"github.com/XiaoLFeng/go-gin-util/blog"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func initDatabase() {
	db, err := gorm.Open(sqlite.Open("dormitory.db"), &gorm.Config{})
	if err != nil {
		blog.Panicf("INIT", "数据库初始化失败: %v", err)
		return // 如果数据库初始化失败，直接返回，避免后续代码执行
	}

	err = db.AutoMigrate(&entity.User{})
	if err != nil {
		blog.Warn("INIT", "数据库迁移创建失败: %v", err)
		return // 如果数据库迁移失败，直接返回
	}
	constant.DB = db
}
