/*
 * --------------------------------------------------------------------------------
 * Copyright (c) 2016-NOW(至今) 筱锋
 * Author: 筱锋(https://www.x-lf.com)
 *
 * 本文件包含 dormitory-management 的源代码，该项目的所有源代码均遵循MIT开源许可证协议。
 * --------------------------------------------------------------------------------
 * 许可证声明：
 *
 * 版权所有 (c) 2016-2024 筱锋。保留所有权利。
 *
 * 有关MIT许可证的更多信息，请查看项目根目录下的LICENSE文件或访问：
 * https://opensource.org/licenses/MIT
 * --------------------------------------------------------------------------------
 * 免责声明：
 *
 * 使用本软件的风险由用户自担。作者或版权持有人在法律允许的最大范围内，
 * 对因使用本软件内容而导致的任何直接或间接的损失不承担任何责任。
 * --------------------------------------------------------------------------------
 */

package school

import (
	"github.com/PuerkitoBio/goquery"
	"github.com/XiaoLFeng/go-gin-util/blog"
	"github.com/XiaoLFeng/go-gin-util/bresult"
	"github.com/gin-gonic/gin"
	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
	"io"
	"net/http"
)

// HasLogin
//
// # 查询校园网登录状态
//
// 查询校园网登录状态，返回校园网是否已登录
func HasLogin(c *gin.Context) {
	resp, err := http.Get("http://10.1.99.100")
	if err != nil {
		blog.Warnf("CRON", "无法获取校园网当前登录状态: %s", err.Error())
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			blog.Warnf("CRON", "关闭响应体失败: %s", err.Error())
		}
	}(resp.Body)

	// 检查信息是否获取成功
	if resp.StatusCode != 200 {
		blog.Warnf("CRON", "无法获取校园网当前登录状态: %s", resp.Status)
		return
	}
	newReader := transform.NewReader(resp.Body, simplifiedchinese.GBK.NewDecoder())
	reader, err := goquery.NewDocumentFromReader(newReader)
	if err != nil {
		blog.Warnf("CRON", "无法解析 HTML 页面: %s", err.Error())
		return
	}
	hasLogin := false
	reader.Find("title").Each(func(i int, selection *goquery.Selection) {
		if selection.Text() == "注销页" {
			blog.Debug("CRON", "校园网已登录")
			hasLogin = true
			return
		}
	})
	returnMap := make(map[string]interface{})
	returnMap["has_login"] = hasLogin
	bresult.OkWithData(c, "校园网登录状态", returnMap)
}
