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

import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {UserLoginDTO} from "../../assets/ts/model/dto/user_login_dto.ts";
import React, {useRef} from "react";
import {UserLoginAPI} from "../../assets/ts/apis/auth_api.ts";
import {AuthorizationUtil} from "../../assets/ts/utils/authorization_util.ts";
import {message} from "antd";

export function AuthLogin() {
    const navigate = useNavigate();
    const [getParams] = useSearchParams();

    const userLogin = useRef<UserLoginDTO>({} as UserLoginDTO);

    /**
     * # 登录表单提交
     * 用于提交登录表单，验证用户登录信息
     *
     * @param event 事件对象
     */
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // 检查数据是否为空
        if (userLogin.current.username === undefined || userLogin.current.password === undefined) {
            message.warning("用户名或密码不能为空");
            return;
        }
        // 调用登录接口
        const getData = await UserLoginAPI(userLogin.current);
        if (getData?.output === "Ok") {
            // 记录登录信息存入 Cookie
            AuthorizationUtil.saveAuthorization(getData.data!!.token_uuid, 12, true);
            message.success(`登录成功, 你好 ${getData.data!!.user.username}`);
            setTimeout(() => {
                if (getParams.get("fallback")) {
                    navigate(getParams.get("fallback") as string, {replace: true});
                } else {
                    navigate("/", {replace: true});
                }
            }, 500);
        } else {
            message.warning(getData?.error_message);
        }
    }
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">筱锋の宿舍管理</h1>
                <p className="mt-4 text-gray-500">
                    这是一个宿舍管理系统，用于学校宿舍校园网自动登录操作。
                </p>
            </div>

            <form onSubmit={onSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <label htmlFor="email" className="sr-only">用户名</label>
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="输入用户名"
                            onChange={e => {
                                userLogin.current.username = e.target.value;
                            }}
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <div>
                    <label htmlFor=" password" className="sr-only">密码</label>
                    <div className="relative">
                        <input
                            type="password"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="输入密码"
                            onChange={e => {
                                userLogin.current.password = e.target.value;
                            }}
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        <span>没有账号？</span>
                        <Link className="underline"  to={"/auth/register"}>注册</Link>
                    </p>

                    <button
                        type="submit"
                        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    >
                        登 录
                    </button>
                </div>
            </form>
        </div>
    );
}
