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

import {CheckCircleOutlined, HomeOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {SchoolHasLoginAPI} from "../../assets/ts/apis/school_api.ts";

export function HomeIndex() {

    document.title = "筱锋の宿舍管理 - 概览";

    const [hasLogin, setHasLogin] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(async () => {
            const getData = await SchoolHasLoginAPI();
            if (getData?.output === "Ok") {
                setHasLogin(getData.data!!.has_login);
            } else {
                console.warn(getData?.error_message);
            }
        })
    }, []);

    function LoginType(): JSX.Element {
        if (hasLogin) {
            return (
                <div className={"text-green-500 font-bold flex items-center gap-1"}>
                    <CheckCircleOutlined/>
                    <span>已登录校园网</span>
                </div>
            );
        } else {
            return (
                <div className={"text-red-500 font-bold flex items-center gap-1"}>
                    <span>未登录校园网</span>
                </div>
            );
        }
    }

    return (
        <div className={"grid gap-3"}>
            <div className={"text-2xl font-bold flex items-center gap-3"}>
                <HomeOutlined/>
                <span>概览</span>
            </div>
            <div className={"grid gap-3 grid-cols-12"}>
                <div
                    className={"bg-white rounded-xl p-6 shadow-lg col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"}>
                    <div className={"font-bold flex items-center gap-3"}>
                        <HomeOutlined/>
                        <span>校园网登录</span>
                    </div>
                    <div className={"mt-3 grid justify-center"}>
                        <LoginType/>
                    </div>
                </div>
                <div className={"bg-white rounded-xl p-6 shadow-lg col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"}>
                    <div className={"font-bold flex items-center gap-3"}>
                        <HomeOutlined/>
                        <span>登录账号</span>
                    </div>
                    <div className={"mt-3 grid justify-center font-bold"}>
                        { hasLogin.toString() }
                    </div>
                </div>
                <div className={"bg-white rounded-xl p-6 shadow-lg col-span-12"}>
                    <div className={"font-bold flex items-center gap-3"}>
                        <HomeOutlined/>
                        <span>日志信息</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
