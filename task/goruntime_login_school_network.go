package task

import (
	"dormitory-management/constant"
	"dormitory-management/model/dto"
	"dormitory-management/model/entity"
	"encoding/json"
	"github.com/PuerkitoBio/goquery"
	"github.com/XiaoLFeng/go-gin-util/blog"
	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
	"io"
	"math/rand"
	"net/http"
	"time"
)

// goRuntimeLoginSchoolNetwork
//
// # Go Runtime 登录校园网
//
// 通过 Go Runtime 的方式登录校园网，该方法会在晚上 11 点到早晨 6 点之间进行登录操作；
// 如果用户数据为空，则会关闭自动登录任务；
// 如果校园网已登录，则不会进行登录操作；
// 如果校园网未登录，则会随机选择一个用户进行登录操作。
func (r *runtime) goRuntimeLoginSchoolNetwork() func() {
	return func() {
		// 检查是否开启了自动登录
		if !constant.AutoLogin {
			blog.Trace("CRON", "自动登录已关闭")
			return
		}
		// 根据全局变量的开始时间和结束时间进行决策
		nowTime := time.Now()
		if constant.LoginStartTime > nowTime.Format("15:04") || nowTime.Format("15:04") > constant.LoginEndTime {
			blog.Trace("CRON", "不在登录时间范围内")
			return
		}
		// 获取用户数据
		var campusUser []*entity.CampusNetworkUser
		constant.DB.Find(&campusUser)
		if len(campusUser) == 0 {
			blog.Trace("CRON", "用户数据为空，关闭自动校园网登录任务")
			return
		}
		blog.Info("CRON", "正在检查是否需要登录校园网...")
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
		if !hasLogin {
			blog.Info("CRON", "校园网未登录，正在尝试登录...")
			client, err := http.NewRequest("GET", "http://10.1.99.100:801/eportal/portal/login", nil)
			if err != nil {
				blog.Errorf("CRON", "创建登录请求失败: %v", err)
				return
			}
			// 随机获取一位用户进行登录
			i := rand.Intn(len(campusUser))
			query := client.URL.Query()
			query.Add("callback", "dr1003")
			query.Add("login_method", "1")
			query.Add("user_account", ",0,"+campusUser[i].User+"@"+campusUser[i].Type)
			query.Add("user_password", campusUser[i].Pass)
			query.Add("lang", "zh")
			client.URL.RawQuery = query.Encode()
			blog.Trace("CRON", client.URL.String())
			resp, err := http.DefaultClient.Do(client)
			if err != nil {
				blog.Errorf("CRON", "登录请求失败: %v", err)
				return
			}
			defer func(Body io.ReadCloser) {
				err := Body.Close()
				if err != nil {
					blog.Warnf("CRON", "关闭响应体失败: %s", err.Error())
				}
			}(resp.Body)

			// 对获取的数据进行清洗
			readAll, err := io.ReadAll(resp.Body)
			if err != nil {
				blog.Warnf("CRON", "数据流信息获取失败: %s", err.Error())
			}
			getData := string(readAll)[10 : len(string(readAll))-2]
			blog.Tracef("CRON", "修改前信息: %s, 修改后信息 %s", string(readAll), getData)
			// 数据解析为 JSON 数据
			var resultMap dto.SchoolLoginDTO
			err = json.Unmarshal([]byte(getData), &resultMap)
			if err != nil {
				blog.Warnf("CRON", "JSON 数据解析失败")
			}
			// 检查是否登录成功
			if resultMap.Result == 1 {
				blog.Info("CRON", resultMap.Msg)
			} else {
				blog.Warnf("CRON", "%s - [%v]", resultMap.Msg, resultMap.RetCode)
			}
		}
	}
}
