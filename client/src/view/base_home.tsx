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

import {Route, Routes} from "react-router-dom";
import {HomeIndex} from "./home/home_index.tsx";
import {HomeHeader} from "../components/home_header.tsx";
import {useEffect, useState} from "react";
import {UserCurrentAPI} from "../assets/ts/apis/user_api.ts";
import {AppContext} from "../assets/ts/AppContext.ts";
import {UserCurrentEntity} from "../assets/ts/model/entity/user_entity.ts";
import {HomeUser} from "./home/home_user.tsx";
import {HomeInvite} from "./home/home_invite.tsx";
import {HomeSetting} from "./home/home_setting.tsx";
import {PageNotFounded} from "./page_not_founded.tsx";
import {HomeSchool} from "./home/home_school.tsx";
import {AuthorizationUtil} from "../assets/ts/utils/authorization_util.ts";

/**
 * # 基础首页
 * 这是一个基础的首页，用于展示首页内容
 *
 * @returns React 函数组件
 */
export function BaseHome() {
    const [userCurrent, setUserCurrent] = useState({} as UserCurrentEntity);

    // 检查用户登录信息
    useEffect(() => {
        setTimeout(async () => {
            const getData = await UserCurrentAPI();
            if (getData?.output === "Ok") {
                setUserCurrent(getData.data!!);
            } else {
                AuthorizationUtil.removeAuthorization();
                window.location.replace("/auth/login");
            }
        }, 0);
    }, []);
    return (
        <AppContext.Provider value={userCurrent}>
            <div className={"flex ps-56 bg-gray-100"}>
                <HomeHeader/>
                <div className={"min-h-dvh w-full p-8"}>
                    <Routes>
                        <Route path={"/"} element={<HomeIndex/>}/>
                        <Route path={"/user"} element={<HomeUser/>}/>
                        <Route path={"/invite"} element={<HomeInvite/>}/>
                        <Route path={"/school"} element={<HomeSchool/>}/>
                        <Route path={"/setting"} element={<HomeSetting/>}/>
                        <Route path={"/*"} element={<PageNotFounded/>}/>
                    </Routes>
                </div>
            </div>
        </AppContext.Provider>
    );
}
