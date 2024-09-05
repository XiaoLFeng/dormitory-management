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
import {InviteCodeEntity} from "../../assets/ts/model/entity/invite_entity.ts";
import {InviteCreateAPI, InviteDeleteAPI, InviteListAPI} from "../../assets/ts/apis/invite_api.ts";
import {message} from "antd";
import copy from "copy-to-clipboard";

export function HomeInvite() {

    const [inviteCode, setInviteCode] = useState({} as InviteCodeEntity[]);
    const [newCode, setNewCode] = useState({} as InviteCodeEntity);
    const [hasDelete, setHasDelete] = useState(false);

    useEffect(() => {
        setHasDelete(false);
        setTimeout(async () => {
            const getData = await InviteListAPI();
            if (getData?.output === "Ok") {
                setInviteCode(getData.data!!);
            } else {
                console.error(getData?.error_message);
            }
        })
    }, [newCode, hasDelete]);

    async function copyCode(code: string) {
        copy(code);
        message.success(`复制 ${code} 成功`);
    }

    async function createCode() {
        const getData = await InviteCreateAPI();
        if (getData?.output === "Ok") {
            message.success(`创建邀请码 ${getData.data!!.code} 成功，并已复制到剪贴板`);
            copy(getData.data!!.code);
            setNewCode(getData.data!!);
        } else {
            message.error(getData?.error_message);
        }
    }

    async function deleteCode(id: number) {
        const getData = await InviteDeleteAPI(id);
        if (getData?.output === "Ok") {
            message.success(`邀请码删除成功`);
            setNewCode(getData.data!!);
            setHasDelete(true);
        } else {
            message.error(getData?.error_message);
        }
    }

    function RangList(): JSX.Element[] {
        let list: JSX.Element[] = [];
        for (let i = 0; i < inviteCode.length; i++) {
            list[i] = (
                <tr className="odd:bg-gray-50" key={i}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{inviteCode[i].id}</td>
                    <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">{inviteCode[i].code}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{inviteCode[i].user.username}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{new Date(inviteCode[i].created_at).toLocaleString()}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex gap-3 justify-end">
                        <button onClick={() => copyCode(inviteCode[i].code)}
                                className={"px-3 py-1 bg-blue-500 text-white rounded-md transition hover:scale-105"}>
                            复制
                        </button>
                        <button onClick={() => deleteCode(inviteCode[i].id)}
                                className={"px-3 py-1 bg-red-500 text-white rounded-md transition hover:scale-105"}>
                            删除
                        </button>
                    </td>
                </tr>
            );
        }
        return list;
    }

    return (
        <div className={"grid gap-3"}>
            <div className={"text-2xl font-bold flex items-center gap-3"}>
                <UserOutlined/>
                <span>邀请码</span>
            </div>
            <div className={"w-full grid justify-end"}>
                <button onClick={() => createCode()}
                        className={"px-4 py-2 bg-blue-500 text-white rounded-md transition hover:scale-105"}>
                    创建邀请码
                </button>
            </div>
            <div className={"bg-white rounded-xl p-6 shadow-lg"}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-xl">
                        <thead className="text-left">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">序号</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">激活码</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">创建者</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">创建时间</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-end">操作</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        <RangList/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
