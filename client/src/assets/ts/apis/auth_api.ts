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

import {BaseResponse} from "../model/base_response.ts";
import {UserLoginEntity} from "../model/entity/auth_entity.ts";
import {BaseApi, MethodType} from "../base_api.ts";
import {UserLoginDTO} from "../model/dto/user_login_dto.ts";

/**
 * # 用户登录接口
 * 用于用户登录，返回用户登录信息
 *
 * @param data 用户登录数据传输对象
 * @constructor
 */
const UserLoginAPI = (data: UserLoginDTO): Promise<BaseResponse<UserLoginEntity> | undefined> => {
    return BaseApi<UserLoginEntity>(
        MethodType.POST,
        "/api/v1/auth/login",
        data,
        null,
        null,
        null
    )
}

/**
 * # 用户注册接口
 * 用于用户注册，返回用户注册信息
 *
 * @param data 用户登录数据传输对象
 * @constructor
 */
const UserRegisterAPI = (data: UserLoginDTO): Promise<BaseResponse<UserLoginEntity> | undefined> => {
    return BaseApi<UserLoginEntity>(
        MethodType.POST,
        "/api/v1/auth/register",
        data,
        null,
        null,
        null
    )
}

export {UserLoginAPI, UserRegisterAPI}
