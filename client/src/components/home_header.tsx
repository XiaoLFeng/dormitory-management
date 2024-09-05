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

import {HomeOutlined, LinkOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import {AppContext} from "../assets/ts/AppContext.ts";
import {UserCurrentEntity} from "../assets/ts/model/entity/user_entity.ts";

import myAvatar from "../assets/images/my_avatar.jpg";

export function HomeHeader() {
    const location = useLocation();

    function backgroundColor(route: string): string {
        if (location.pathname === route) {
            return "transition rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 flex items-center gap-2";
        } else {
            return "transition rounded-lg px-4 py-2 text-sm font-medium text-gray-500 flex items-center gap-2";
        }
    }

    return (
        <div className={"fixed left-0 top-0 w-56"}>
            <div className="flex h-screen flex-col justify-between border-e bg-white">
                <div className="px-4 py-6 textcen">
                    <div className={"flex justify-center items-center gap-2"}>
                        <img src="/favicon.png" alt={""} className={"size-8"} draggable={false}/>
                        <span className="grid font-bold">
                          筱锋の宿舍管理
                        </span>
                    </div>
                    <ul className="mt-6 space-y-1">
                        <li>
                            <Link className={backgroundColor("/")} to={"/"}>
                                <HomeOutlined/>
                                <span>首页</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={backgroundColor("/user")} to={"/user"}>
                                <UserOutlined/>
                                <span>用户管理</span>
                            </Link>
                            <Link className={backgroundColor("/invite")} to={"/invite"}>
                                <LinkOutlined/>
                                <span>邀请码</span>
                            </Link>
                            <Link className={backgroundColor("/setting")} to={"/setting"}>
                                <SettingOutlined/>
                                <span>系统设置</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                        <img
                            alt=""
                            src={myAvatar}
                            className="size-10 rounded-full object-cover"
                        />
                        <div>
                            <AppContext.Consumer>
                                {(value: UserCurrentEntity) => (
                                    <p className="text-sm font-medium text-gray-800">{value.username}</p>
                                )}
                            </AppContext.Consumer>
                            <p className="text-xs">
                                <span>201宿舍</span>
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
