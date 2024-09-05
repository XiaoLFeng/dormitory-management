package main

import (
	"dormitory-management/config/startup"
	"dormitory-management/route"
	"dormitory-management/task"
	"embed"
	_ "embed"
	"github.com/XiaoLFeng/go-gin-util/bconfig"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/sirupsen/logrus"
)

//go:embed "client/dist/**"
var staticFile embed.FS

func main() {
	// 配置文件初始化
	bconfig.LogConfiguration(".logs", "logger", true, logrus.TraceLevel)

	// 配置文件
	startup.Config()

	// 定时器
	task.GoRuntime()

	// 启动服务
	r := gin.Default()
	r = route.Route(r, staticFile)

	err := r.Run(":8080")
	if err != nil {
		panic(err)
	}
}
