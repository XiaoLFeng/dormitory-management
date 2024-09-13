package route

import (
	"dormitory-management/controllers/auth"
	"dormitory-management/controllers/initial"
	"dormitory-management/controllers/invitation"
	"dormitory-management/controllers/school"
	"dormitory-management/controllers/user"
	"dormitory-management/handler"
	"embed"
	"github.com/XiaoLFeng/go-gin-util/bmiddle"
	"github.com/gin-gonic/gin"
	"io/fs"
	"net/http"
)

func Route(r *gin.Engine, staticFile embed.FS) *gin.Engine {
	// APIv1 路由
	api := r.Group("/api/v1")
	{
		// 全局中间件
		api.Use(bmiddle.CrossDomainClearingMiddleware())
		api.Use(bmiddle.ReturnResultMiddleware())

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
				schoolGroup.GET("/has-login", school.HasLogin)
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
				userGroup.DELETE("", user.Delete)
				userGroup.GET("/current", user.Current)
				userGroup.GET("/list", user.List)
			}
		}
	}

	// 无路由匹配
	st, _ := fs.Sub(staticFile, "client/dist/assets")
	r.StaticFS("/assets", http.FS(st))
	r.GET("/favicon.ico", func(c *gin.Context) {
		file, _ := staticFile.ReadFile("client/dist/favicon.ico")
		c.Data(http.StatusOK, "image/x-icon", file)
	})
	r.GET("/favicon.png", func(c *gin.Context) {
		file, _ := staticFile.ReadFile("client/dist/favicon.png")
		c.Data(http.StatusOK, "image/png", file)
	})
	r.NoRoute(func(c *gin.Context) {
		file, _ := staticFile.ReadFile("client/dist/index.html")
		c.Data(http.StatusOK, "text/html", file)
	})

	return r
}
