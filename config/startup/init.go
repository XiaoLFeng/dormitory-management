package startup

type Init struct{}

func newInit() *Init {
	return &Init{}
}

func Config() {
	init := newInit()

	init.initDatabase()
	init.initData()
	init.initConstant()
}
