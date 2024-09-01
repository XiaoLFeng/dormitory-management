package startup

import (
	"dormitory-management/constant"
	"dormitory-management/model/entity"
	"github.com/XiaoLFeng/go-general-utils/butil"
	"github.com/XiaoLFeng/go-gin-util/blog"
	"github.com/google/uuid"
	"time"
)

func (i *Init) initData() {
	// 检查数据是否存在
	insertInfoData("web_title", "筱锋网管")
	insertInfoData("web_desc", "一个校园网自动登录系统")
	insertInfoData("system_initial_mode", "true")
}

func insertInfoData(key, value string) {
	// 获取数据检查数据是否存在
	var result *entity.Info
	constant.DB.First(&result, "key = ?", key)
	blog.Tracef("INIT", "数据 %s 是否存在: %v", key, result.InfoUUID != uuid.Nil)
	if result.InfoUUID == uuid.Nil {
		constant.DB.Create(&entity.Info{
			InfoUUID:  butil.GenerateUUID(),
			Key:       key,
			Value:     value,
			UpdatedAt: time.Now(),
		})
	}
}
