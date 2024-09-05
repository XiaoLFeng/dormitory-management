package route

import (
	"dormitory-management/controllers/auth"
	"dormitory-management/controllers/initial"
	"dormitory-management/controllers/invitation"
	"dormitory-management/controllers/school"
	"dormitory-management/controllers/user"
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
		// 需要登录
		needLogin := api.Group("")
		{
			needLogin.Use(handler.CheckHasInitModeMiddleware())
			needLogin.Use(handler.UserHasLoginMiddleware())
			// 校园网路由表
			schoolGroup := needLogin.Group("/school")
			{
				schoolGroup.POST("", school.AddUser)
				schoolGroup.GET("/list", school.List)
				schoolGroup.DELETE("", school.Delete)
			}
			// 邀请路由表
			inviterGroup := needLogin.Group("/invite")
			{
				inviterGroup.POST("", invitation.Create)
				inviterGroup.DELETE("", invitation.Delete)
				inviterGroup.GET("/list", invitation.List)
			}
			// 用户路由表
			userGroup := needLogin.Group("/user")
			{
				userGroup.GET("/current", user.Current)
				userGroup.GET("/list", user.List)
				userGroup.DELETE("", user.Delete)
			}
		}
	}

	// 无路由匹配路由
	r.NoRoute(bmiddle.NoRouteMiddleware())

	return r
}
