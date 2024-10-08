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

import {BaseApi, MethodType} from "../base_api.ts";
import {AuthorizationUtil} from "../utils/authorization_util.ts";
import {UserCurrentEntity} from "../model/entity/user_entity.ts";
import {BaseResponse} from "../model/base_response.ts";

/**
 * # 当前用户
 * 获取当前用户信息, 用于展示当前用户信息
 *
 * @returns Promise<BaseResponse<UserCurrentEntity> | undefined>
 */
const UserCurrentAPI = (): Promise<BaseResponse<UserCurrentEntity> | undefined> => {
    return BaseApi<UserCurrentEntity>(
        MethodType.GET,
        "/api/v1/user/current",
        null,
        null,
        null,
        {"Authorization": AuthorizationUtil.getAuthorization()}
    )
}

/**
 * # 用户列表
 * 获取用户列表, 用于展示用户列表
 *
 * @returns Promise<BaseResponse<UserCurrentEntity[]> | undefined>
 */
const UserListAPI = (): Promise<BaseResponse<UserCurrentEntity[]> | undefined> => {
    return BaseApi<UserCurrentEntity[]>(
        MethodType.GET,
        "/api/v1/user/list",
        null,
        null,
        null,
        {"Authorization": AuthorizationUtil.getAuthorization()}
    )
}

/**
 * # 用户删除
 * 删除用户, 用于删除用户
 *
 * @param uuid 用户 UUID
 * @returns Promise<BaseResponse<void> | undefined>
 */
const UserDeleteAPI = (uuid: string): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<void>(
        MethodType.DELETE,
        "/api/v1/user",
        null,
        {"uuid": uuid},
        null,
        {"Authorization": AuthorizationUtil.getAuthorization()}
    )
}

export {UserCurrentAPI, UserListAPI, UserDeleteAPI}
