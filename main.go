package main

import (
	"dormitory-management/config/startup"
	"dormitory-management/task"
	"github.com/XiaoLFeng/go-gin-util/bconfig"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/sirupsen/logrus"
)

func main() {
	// 配置文件初始化
	bconfig.LogConfiguration(".logs", "logger", true, logrus.TraceLevel)

	// 配置文件
	startup.Config()

	// 定时器
	task.GoRuntime()

	// 启动服务
	r := gin.Default()
	r = Route(r)

	err := r.Run(":8080")
	if err != nil {
		panic(err)
	}
}
