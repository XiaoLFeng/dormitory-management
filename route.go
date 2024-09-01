package main

import (
	"dormitory-management/controllers/auth"
	"dormitory-management/controllers/initial"
	"dormitory-management/controllers/school"
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

	// 初始化路由表
	initGroup := r.Group("/initial")
	{
		initGroup.GET("/mode", initial.InitMode)
		initGroup.GET("", initial.Initial)
	}

	// 校园网路由表
	schoolGroup := r.Group("/school")
	{
		schoolGroup.POST("", school.AddUser)
	}

	// 无路由匹配路由
	r.NoRoute(bmiddle.NoRouteMiddleware())

	return r
}
