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

import React, {useRef} from "react";
import {InitUserDTO} from "../assets/ts/model/dto/init_user_dto.ts";
import {message} from "antd";
import {InitAPI} from "../assets/ts/apis/init_api.ts";
import {useNavigate} from "react-router-dom";

export function BaseInit() {
    const navigate = useNavigate();

    const thisYear = new Date().getFullYear();
    const initForm = useRef<InitUserDTO>({} as InitUserDTO);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        // 对数据进行检查
        if (initForm.current.username === undefined || initForm.current.password === undefined) {
            message.warning("请填写完整的账号信息");
            return;
        }
        // 提交数据
        const getData = await InitAPI(initForm.current);
        if (getData?.output === "Ok") {
            message.success("初始化账号成功");
            setTimeout(() => {
                navigate("/auth/login", {replace: true});
            })
        } else {
            message.warning(getData?.error_message);
        }
    }

    return (
        <section className="bg-gray-100 min-h-dvh grid items-center">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                    <div className="lg:col-span-2 lg:py-12">
                        <p className="max-w-xl text-lg">
                            一款宿舍管理的小工具，帮你轻松搞定宿舍日常管理，还能自动登录校园网，再也不用担心忘记登录啦，简简单单就能享受方便生活！
                        </p>
                        <div className="mt-8 grid gap-1">
                            <a href="https://blog.x-lf.com/"
                               className="text-2xl font-bold text-pink-600">筱锋の宿舍管理</a>
                            <span className="mt-2 not-italic">
                            Copyright &copy; 2016-{thisYear} 筱锋xiao_lfeng.
                            <br/>
                            All Rights Reserved.
                        </span>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 grid items-center">
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label className="sr-only" htmlFor="username">用户名</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="用户名(英文)"
                                    type="text"
                                    id="username"
                                    onChange={e => {
                                        initForm.current.username = e.target.value;
                                    }}
                                />
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="password">密码</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="密码"
                                    type="password"
                                    id="password"
                                    onChange={e => {
                                        initForm.current.password = e.target.value;
                                    }}
                                />
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                >
                                    初始化账号
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
