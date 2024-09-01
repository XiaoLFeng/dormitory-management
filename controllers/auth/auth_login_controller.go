package auth

import (
	"github.com/XiaoLFeng/go-gin-util/bresult"
	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	bresult.Ok(c, "OK")
}
