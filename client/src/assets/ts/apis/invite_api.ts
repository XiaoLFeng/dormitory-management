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
import {InviteCodeEntity} from "../model/entity/invite_entity.ts";
import {BaseResponse} from "../model/base_response.ts";

/**
 * # 邀请码创建
 * 创建一个邀请码, 用于邀请其他用户加入
 *
 * @returns Promise<BaseResponse<InviteCreateEntity> | undefined>
 */
const InviteCreateAPI = async (): Promise<BaseResponse<InviteCodeEntity> | undefined> => {
    return BaseApi<InviteCodeEntity>(
        MethodType.POST,
        "/api/v1/invite",
        null,
        null,
        null,
        {"Authorization": AuthorizationUtil.getAuthorization()}
    )
}

/**
 * # 邀请码删除
 * 删除一个邀请码
 *
 * @param id number 邀请码ID
 * @returns Promise<BaseResponse<InviteCodeEntity> | undefined>
 */
const InviteDeleteAPI = async (id: number): Promise<BaseResponse<InviteCodeEntity> | undefined> => {
    return BaseApi<InviteCodeEntity>(
        MethodType.DELETE,
        `/api/v1/invite`,
        null,
        {id: id},
        null,
        {"Authorization": AuthorizationUtil.getAuthorization()}
    )
}

/**
 * # 邀请码列表
 * 获取邀请码列表
 *
 * @returns Promise<BaseResponse<InviteCodeEntity[]> | undefined>
 */
const InviteListAPI = async (): Promise<BaseResponse<InviteCodeEntity[]> | undefined> => {
    return BaseApi<InviteCodeEntity[]>(
        MethodType.GET,
        "/api/v1/invite/list",
        null,
        null,
        null,
        {"Authorization": AuthorizationUtil.getAuthorization()}
    )
}

export {InviteCreateAPI, InviteDeleteAPI, InviteListAPI};
