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

import {SettingOutlined} from "@ant-design/icons";

export function HomeSetting() {
    return (
        <div className={"grid gap-3"}>
            <div className={"text-2xl font-bold flex items-center gap-3"}>
                <SettingOutlined/>
                <span>系统设置</span>
            </div>
            <div className={"bg-white rounded-xl p-6 shadow-lg"}>
                <div className={"grid grid-cols-12 gap-3"}>
                    <div className={"col-span-12"}>
                        <div className={"text-xl font-bold"}>自动登录设置</div>
                        <div className={"text-gray-500"}>用于系统自动登录系统的登录配置系统</div>
                    </div>
                    <div className={"col-span-12 md:col-span-5"}>
                        <label
                            htmlFor="UserEmail"
                            className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <span className="text-xs font-medium text-gray-700"> Email </span>

                            <input
                                type="email"
                                id="UserEmail"
                                placeholder="anthony@rhcp.com"
                                className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                    </div>
                    <div className={"col-span-12 md:col-span-7 grid justify-end"}>
                        <div className={"text-xl font-bold"}>自动登录设置</div>
                        <div className={"text-gray-500"}>用于系统自动登录系统的登录配置系统</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
