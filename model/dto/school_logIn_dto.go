package dto

// SchoolLoginDTO
//
// # 学校登录数据传输对象
//
// 用于接收学校登录的数据传输对象，包含了登录的消息、结果和返回码。
//
// # 参数
//   - Msg: 消息
//   - Result: 结果
//   - RetCode: 返回码
type SchoolLoginDTO struct {
	Msg     string `json:"msg"`
	Result  int    `json:"result"`
	RetCode int    `json:"ret_code"`
}
