package startup

import (
	"dormitory-management/constant"
	"dormitory-management/model/entity"
	"strconv"
)

func (i *Init) initConstant() {
	var result *entity.Info
	constant.DB.First(&result, "key = ? ", "system_initial_mode")
	constant.InitialMode, _ = strconv.ParseBool(result.Value)
	constant.DB.First(&result, "key = ? ", "system_auto_login")
	constant.AutoLogin, _ = strconv.ParseBool(result.Value)
	constant.DB.First(&result, "key = ? ", "system_auto_login_start_time")
	constant.LoginStartTime = result.Value
	constant.DB.First(&result, "key = ? ", "system_auto_login_end_time")
	constant.LoginEndTime = result.Value
}
