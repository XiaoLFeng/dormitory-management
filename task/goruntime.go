package task

import (
	"dormitory-management/constant"
	"github.com/XiaoLFeng/go-gin-util/blog"
	"github.com/robfig/cron/v3"
)

type runtime struct {
	cron *cron.Cron
}

func newRuntime(cron *cron.Cron) *runtime {
	return &runtime{cron: cron}
}

func GoRuntime() {
	// 初始化定时任务
	r := newRuntime(cron.New())

	// 自动登录校园网
	loginSchoolNetworkRuntime, err := r.cron.AddFunc("@every 5m", r.goRuntimeLoginSchoolNetwork())
	if err != nil {
		blog.Errorf("CRON", "定时任务启动失败: %v", err)
	}
	// 记录创建的定时任务，作为后续强制关闭的依据
	constant.RuntimeLoginSchoolNetwork = loginSchoolNetworkRuntime
	// 服务启动
	r.cron.Start()
}
