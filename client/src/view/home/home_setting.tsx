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
import {message, TimePicker} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {SchoolAutoLoginDTO} from "../../assets/ts/model/entity/school_entity.ts";
import {SchoolGetAutoLoginAPI, SchoolUpdateAutoLoginAPI} from "../../assets/ts/apis/school_api.ts";
import dayjs from "dayjs";

export function HomeSetting() {

    document.title = "筱锋の宿舍管理 - 系统设置";

    const autoLogin = useRef<SchoolAutoLoginDTO>({} as SchoolAutoLoginDTO);
    const [getForceUpdate, forceUpdate] = useState<number>(0);

    useEffect(() => {
        setTimeout(async () => {
            const getData = await SchoolGetAutoLoginAPI();
            if (getData?.output === "Ok") {
                autoLogin.current = getData.data!!;
                forceUpdate(1 + getForceUpdate);
                console.log(autoLogin.current);
            } else {
                console.warn(getData?.error_message);
            }
        }, 1);
    }, []);

    async function updateAutoLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const getData = await SchoolUpdateAutoLoginAPI(autoLogin.current);
        if (getData?.output === "Ok") {
            message.success(`更新自动登录设置成功`);
        } else {
            message.warning(getData?.error_message);
        }
    }

    return (
        <div className={"grid gap-3"}>
            <div className={"text-2xl font-bold flex items-center gap-3"}>
                <SettingOutlined/>
                <span>系统设置</span>
            </div>
            <div className={"bg-white rounded-xl p-6 shadow-lg"}>
                <form onSubmit={updateAutoLogin} className={"grid grid-cols-12 gap-3"}>
                    <div className={"col-span-12"}>
                        <div className={"text-xl font-bold"}>自动登录设置</div>
                        <div className={"text-gray-500"}>用于系统自动登录校园网的登录配置</div>
                    </div>
                    <div className={"col-span-12 md:col-span-5 grid gap-3"}>
                        <div>
                            <label htmlFor="HeadlineAct"
                                   className="block text-sm font-medium text-gray-900">自动登录</label>
                            <select
                                name="HeadlineAct"
                                id="HeadlineAct"
                                value={autoLogin.current.auto_login ? "true" : "false"}
                                onChange={(e) => {
                                    autoLogin.current.auto_login = e.target.value === "true";
                                    forceUpdate(1 + getForceUpdate);
                                }}
                                className="transition mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm border hover:border-blue-400"
                            >
                                <option value="true">开启</option>
                                <option value="false">关闭</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="HeadlineAct"
                                   className="block text-sm font-medium text-gray-900">开始时间</label>
                            <TimePicker format={"HH:mm"} value={dayjs(autoLogin.current.start_time, "HH:mm")}
                                        onChange={(e) => {
                                            autoLogin.current.start_time = e.format("HH:mm");
                                            forceUpdate(1 + getForceUpdate);
                                        }}
                                        className={"transition mt-1.5 hover:border hover:border-blue-400 w-full"}/>
                        </div>
                        <div>
                            <label htmlFor="HeadlineAct"
                                   className="block text-sm font-medium text-gray-900">结束时间</label>
                            <TimePicker format={"HH:mm"} value={dayjs(autoLogin.current.end_time, "HH:mm")}
                                        onChange={(e) => {
                                            autoLogin.current.end_time = e.format("HH:mm");
                                            forceUpdate(1 + getForceUpdate);
                                        }}
                                        className={"transition mt-1.5 hover:border hover:border-blue-400 w-full"}/>
                        </div>
                    </div>
                    <div className={"hidden md:grid col-span-4"} />
                    <div className={"col-span-12 md:col-span-3 grid"}>
                        <div className={"grid w-full"}>
                            <div className={"grid items-end justify-end"}>
                                <button onClick={() => {}} className={"transition rounded bg-blue-500 text-white px-8 py-2 hover:bg-blue-600 active:bg-blue-700"}>提交</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className={"bg-white rounded-xl p-6 shadow-lg grid grid-cols-12 gap-6"}>
                <div className={"col-span-12 md:col-span-6"}>
                    <div className={"text-xl font-bold"}>系统信息</div>
                    <div className={"text-gray-500"}>用于查看系统的基本信息</div>
                    <div className={"mt-3"}>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                <thead className="text-left">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">系统</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">信息</th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                <tr className="odd:bg-gray-50">
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">CPU状态</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">10%</td>
                                </tr>
                                <tr className="odd:bg-gray-50">
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">RAM状态</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">2048M / 4096M</td>
                                </tr>
                                <tr className="odd:bg-gray-50">
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">磁盘IO状态</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">20%</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={"col-span-12 md:col-span-6"}>
                    <div className={"text-xl font-bold"}>软件信息</div>
                    <div className={"text-gray-500"}>用于查看本软件的系统信息配置</div>
                    <div className={"mt-3"}>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                <thead className="text-left">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">系统</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">信息</th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                <tr className="odd:bg-gray-50">
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">软件版本</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">v1.0.0</td>
                                </tr>
                                <tr className="odd:bg-gray-50">
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">软件作者</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <a href="https://www.x-lf.com/" target={"_blank"} className={"text-blue-500"}>
                                            筱锋xiao_lfeng
                                        </a>
                                    </td>
                                </tr>
                                <tr className="odd:bg-gray-50">
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">开源协议</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <a href="https://opensource.org/licenses/MIT" target={"_blank"} className={"text-blue-500"}>
                                            MIT
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
