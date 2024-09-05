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

import {UserOutlined} from "@ant-design/icons";
import {JSX, useEffect, useState} from "react";
import {UserCurrentEntity} from "../../assets/ts/model/entity/user_entity.ts";
import {UserListAPI} from "../../assets/ts/apis/user_api.ts";
import {message} from "antd";

export function HomeUser() {
    document.title = "筱锋の宿舍管理 - 用户";

    const [userList, setUserList] = useState({} as UserCurrentEntity[]);

    useEffect(() => {
        setTimeout(async () => {
            const getData = await UserListAPI();
            if (getData?.output === "Ok") {
                setUserList(getData.data!!);
            } else {
                message.error(getData?.error_message);
            }
        })
    }, []);

    function RangeList(): JSX.Element[] {
        let list: JSX.Element[] = [];
        for (let i = 0; i < userList.length; i++) {
            list[i] = (
                <tr className="odd:bg-gray-50" key={i}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{userList[i].uuid}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{userList[i].username}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{new Date(userList[i].created_at).toLocaleString()}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{new Date(userList[i].updated_at).toLocaleString()}</td>
                </tr>
            );
        }
        return list;
    }

    return (
        <div className={"grid gap-3"}>
            <div className={"text-2xl font-bold flex items-center gap-3"}>
                <UserOutlined/>
                <span>用户管理</span>
            </div>
            <div className={"bg-white rounded-xl p-6 shadow-lg"}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-xl">
                        <thead className="text-left">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">用户序列号</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">用户名</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">注册时间</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">更新时间</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <RangeList />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
