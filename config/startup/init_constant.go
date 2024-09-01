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
}
