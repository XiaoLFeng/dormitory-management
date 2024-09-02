package main

import (
	"dormitory-management/controllers/auth"
	"dormitory-management/controllers/initial"
	"dormitory-management/controllers/school"
	"dormitory-management/handler"
	"github.com/XiaoLFeng/go-gin-util/bmiddle"
	"github.com/gin-gonic/gin"
)

func Route(r *gin.Engine) *gin.Engine {
	// 全局中间件
	r.Use(bmiddle.CrossDomainClearingMiddleware())
	r.Use(bmiddle.ReturnResultMiddleware())

	// APIv1 路由
	api := r.Group("/api/v1")
	{
		// 初始化路由表
		initGroup := api.Group("/initial")
		{
			initGroup.GET("/mode", initial.InitMode)
			initGroup.GET("", initial.Initial)
		}
		// 登录路由表
		authGroup := api.Group("/auth")
		{
			authGroup.Use(handler.CheckHasInitModeMiddleware())
			authGroup.POST("/login", auth.Login)
			authGroup.POST("/register", auth.Register)
			authGroup.GET("/logout", auth.Logout)
		}
		// 校园网路由表
		schoolGroup := api.Group("/school")
		{
			schoolGroup.Use(handler.CheckHasInitModeMiddleware())
			schoolGroup.Use(handler.UserHasLoginMiddleware())
			schoolGroup.POST("", school.AddUser)
		}
	}

	// 无路由匹配路由
	r.NoRoute(bmiddle.NoRouteMiddleware())

	return r
}
