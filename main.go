package main

import (
	"dormitory-management/config/startup"
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

	r := gin.Default()
	r = Route(r)

	err := r.Run(":8080")
	if err != nil {
		panic(err)
	}
}
