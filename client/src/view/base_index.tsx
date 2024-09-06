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

import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {AuthorizationUtil} from "../assets/ts/utils/authorization_util.ts";
import {UserCurrentAPI} from "../assets/ts/apis/user_api.ts";
import {BaseHome} from "./base_home.tsx";
import {BaseAuth} from "./base_auth.tsx";
import {InitModeAPI} from "../assets/ts/apis/init_api.ts";
import {message} from "antd";
import {HomeIndex} from "./home/home_index.tsx";
import {HomeUser} from "./home/home_user.tsx";
import {HomeInvite} from "./home/home_invite.tsx";
import {HomeSchool} from "./home/home_school.tsx";
import {HomeSetting} from "./home/home_setting.tsx";
import {PageNotFounded} from "./page_not_founded.tsx";
import {BaseInit} from "./base_init.tsx";

export function BaseIndex() {
    const navigate = useNavigate();
    const location = useLocation();

    // 检查用户是否登录
    useEffect(() => {
        setTimeout(async () => {
            // 检查是否初始化
            const getData = await InitModeAPI();
            console.log(getData!!.data);
            if (getData?.output === "Ok") {
                if (getData.data?.init_mode) {
                    navigate("/init", {replace: true});
                } else {
                    if (!location.pathname.startsWith("/auth")) {
                        if (AuthorizationUtil.getAuthorization() === "") {
                            console.debug("[Main] 用户未登录，跳转至登录页面");
                            const getData = await UserCurrentAPI();
                            if (getData?.output === "Deny") {
                                navigate("/auth", {replace: true});
                            }
                        }
                    }
                }
            } else {
                message.warning("系统初始化失败，请联系管理员");
            }
        })
    }, []);

    return (
        <Routes>
            <Route path={"/"} element={<BaseHome/>}>
                <Route path={"/"} element={<HomeIndex/>}/>
                <Route path={"/user"} element={<HomeUser/>}/>
                <Route path={"/invite"} element={<HomeInvite/>}/>
                <Route path={"/school"} element={<HomeSchool/>}/>
                <Route path={"/setting"} element={<HomeSetting/>}/>
            </Route>
            <Route path={"/init"} element={<BaseInit/>}/>
            <Route path={"/auth/*"} element={<BaseAuth/>}/>
            <Route path={"/*"} element={<PageNotFounded/>}/>
        </Routes>
    )
}
