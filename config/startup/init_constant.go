package startup

import (
	"dormitory-management/constant"
	"dormitory-management/model/entity"
	"strconv"
)

func (i *Init) initConstant() {
	var result1 *entity.Info
	constant.DB.First(&result1, "key = ? ", "system_initial_mode")
	constant.InitialMode, _ = strconv.ParseBool(result1.Value)

	var result2 *entity.Info
	constant.DB.First(&result2, "key = ? ", "system_auto_login")
	constant.AutoLogin, _ = strconv.ParseBool(result2.Value)

	var result3 *entity.Info
	constant.DB.First(&result3, "key = ? ", "system_auto_login_start_time")
	constant.LoginStartTime = result3.Value

	var result4 *entity.Info
	constant.DB.First(&result4, "key = ? ", "system_auto_login_end_time")
	constant.LoginEndTime = result4.Value
}
