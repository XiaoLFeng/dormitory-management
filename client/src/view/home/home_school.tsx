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

import {BookOutlined} from "@ant-design/icons";
import {message, Modal, notification} from "antd";
import {JSX, useEffect, useRef, useState} from "react";
import {SchoolCreateAPI, SchoolDeleteAPI, SchoolListAPI} from "../../assets/ts/apis/school_api.ts";
import {SchoolEntity} from "../../assets/ts/model/entity/school_entity.ts";
import {SchoolAddDTO} from "../../assets/ts/model/dto/school_add_dto.ts";
import {NotificationPlacement} from "antd/es/notification/interface";

export function HomeSchool() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const deleteUser = useRef<SchoolEntity>({} as SchoolEntity);
    const [hasChange, setHasChange] = useState(false);
    const account = useRef<SchoolAddDTO>({} as SchoolAddDTO);
    const rangeList = useRef([] as JSX.Element[]);
    const [getForceUpdate, forceUpdate] = useState<number>(0);

    useEffect(() => {
        setTimeout(async () => {
            const getData = await SchoolListAPI();
            if (getData?.output === "Ok") {
                let list: JSX.Element[] = [];
                for (let i = 0; i < getData.data!!.length; i++) {
                    list[i] = (
                        <tr className="odd:bg-gray-50" key={i}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{getData.data!![i].user}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{getData.data!![i].pass}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{getData.data!![i].type}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex gap-3 justify-end">
                                <button onClick={() => {

                                }}
                                        className={"px-3 py-1 bg-blue-500 text-white rounded-md transition hover:scale-105"}>
                                    修改
                                </button>
                                <button onClick={() => {
                                    setDeleteModalOpen(true);
                                    deleteUser.current = getData.data!![i];
                                }}
                                        className={"px-3 py-1 bg-red-500 text-white rounded-md transition hover:scale-105"}>
                                    删除
                                </button>
                            </td>
                        </tr>
                    );
                }
                rangeList.current = list;
                forceUpdate(1 + getForceUpdate);
            } else {
                console.error(getData?.error_message);
            }
            setHasChange(false);
        });
    }, [hasChange]);

    const handleOk = async () => {
        // 检查数据填写完整
        if (account.current.user === undefined || account.current.pass === undefined || account.current.type === undefined) {
            message.warning("请填写完整的账号信息");
            return;
        }
        const getData = await SchoolCreateAPI(account.current);
        if (getData?.output === "Ok") {
            setHasChange(true);
            openNotification("topLeft", account.current.user, account.current.pass);
        } else {
            message.warning(getData?.error_message);
        }
        setCreateModalOpen(false);
    };

    const handleDeleteOk = async () => {
        const getData = await SchoolDeleteAPI(deleteUser.current.user);
        if (getData?.output === "Ok") {
            setHasChange(true);
            message.success("删除账号成功");
        } else {
            message.warning(getData?.error_message);
        }
        setDeleteModalOpen(false);
    }

    const openNotification = (placement: NotificationPlacement, user: string, pass: string) => {
        notification.info({
            message: `账号添加成功`,
            description: `账号: ${user}，密码: ${pass}`,
            placement,
        });
    };

    const handleCancel = () => setCreateModalOpen(false);
    const handleDeleteCancel = () => setDeleteModalOpen(false);

    return (
        <>
            <div className={"grid gap-3"}>
                <div className={"text-2xl font-bold flex items-center gap-3"}>
                    <BookOutlined/>
                    <span>校园网账号管理</span>
                </div>
                <div className={"w-full grid justify-end"}>
                    <button onClick={() => setCreateModalOpen(true)}
                            className={"px-4 py-2 bg-blue-500 text-white rounded-md transition hover:scale-105"}>
                        添加账号
                    </button>
                </div>
                <div className={"bg-white rounded-xl p-6 shadow-lg"}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-xl">
                            <thead className="text-left">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">用户名</th>
                                <th className="whitespace-nowrap px-4 py-2 text-gray-700">密码</th>
                                <th className="whitespace-nowrap px-4 py-2 text-gray-700">网段</th>
                                <th className="whitespace-nowrap px-4 py-2 text-gray-700 text-end">操作</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">{rangeList.current}</tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal title="添加账号" open={createModalOpen} onCancel={handleCancel} footer={
                <div className={"flex gap-3 w-full justify-end"}>
                    <button key="back" onClick={handleCancel}
                            className="px-6 py-1.5 bg-red-500 text-white rounded-md transition hover:scale-105">
                        取消
                    </button>
                    <button key="submit" onClick={handleOk}
                            className="px-6 py-1.5 bg-blue-500 text-white rounded-md transition hover:scale-105">
                        确定
                    </button>
                </div>
            }>
                <div className={"grid gap-3"}>
                    <div>
                        <label htmlFor="account" className="font-medium text-gray-700 flex gap-1">
                            <span>校园网账号</span>
                            <span className={"text-red-500"}>*</span>
                        </label>
                        <input
                            type="text"
                            id="account"
                            placeholder="22344233"
                            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                            onChange={e => {
                                account.current.user = e.target.value;
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="font-medium text-gray-700 flex gap-1">
                            <span>校园网密码</span>
                            <span className={"text-red-500"}>*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="**********"
                            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                            onChange={e => {
                                account.current.pass = e.target.value;
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="type" className="font-medium text-gray-700 flex gap-1">
                            <span>校园网网段</span>
                            <span className={"text-red-500"}>*</span>
                        </label>
                        <input
                            type="text"
                            id="type"
                            placeholder="cmcc"
                            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                            onChange={e => {
                                account.current.type = e.target.value;
                            }}
                        />
                    </div>
                </div>
            </Modal>
            <Modal title="删除账号" open={deleteModalOpen} onCancel={handleDeleteCancel} footer={
                <div className={"flex gap-3 w-full justify-end"}>
                    <button key="back" onClick={handleDeleteCancel}
                            className="px-6 py-1.5 bg-red-500 text-white rounded-md transition hover:scale-105">
                        取消
                    </button>
                    <button key="submit" onClick={handleDeleteOk}
                            className="px-6 py-1.5 bg-blue-500 text-white rounded-md transition hover:scale-105">
                        确定
                    </button>
                </div>
            }>
                <div className={"flex gap-3"}>
                    <span>是否确定删除用户 </span>
                    <span className={"font-bold"}>{deleteUser.current.user}</span>
                </div>
            </Modal>
        </>
    );
}
