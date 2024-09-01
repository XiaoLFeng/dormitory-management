package main

import (
	"dormitory-management/controllers/auth"
	"github.com/XiaoLFeng/go-gin-util/bmiddle"
	"github.com/gin-gonic/gin"
)

func Route(r *gin.Engine) *gin.Engine {
	// 全局中间件
	r.Use(bmiddle.CrossDomainClearingMiddleware())
	r.Use(bmiddle.ReturnResultMiddleware())

	// 登录路由表
	authGroup := r.Group("/auth")
	{
		authGroup.GET("/login", auth.Login)
	}

	// 无路由匹配路由
	r.NoRoute(bmiddle.NoRouteMiddleware())

	return r
}
