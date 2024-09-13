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
import {SchoolEntity, SchoolHasLoginEntity} from "../model/entity/school_entity.ts";
import {BaseApi, MethodType} from "../base_api.ts";
import {AuthorizationUtil} from "../utils/authorization_util.ts";
import {SchoolAddDTO} from "../model/dto/school_add_dto.ts";

/**
 * # 校园网账号列表
 * 获取校园网账号列表，用于展示校园网账号列表
 *
 * @returns Promise<BaseResponse<SchoolEntity> | undefined>
 */
const SchoolListAPI = async (): Promise<BaseResponse<SchoolEntity[]> | undefined> => {
    return BaseApi<SchoolEntity[]>(
        MethodType.GET,
        "/api/v1/school/list",
        null,
        null,
        null,
        {"Authorization": AuthorizationUtil.getAuthorization()}
    )
}

/**
 * # 校园网账号创建
 * 创建一个校园网账号
 *
 * @param school SchoolEntity 校园网账号信息
 * @returns Promise<BaseResponse<void> | undefined>
 */
const SchoolCreateAPI = async (school: SchoolAddDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<void>(
        MethodType.POST,
        "/api/v1/school",
        school,
        null,
        null,
        {"Authorization": AuthorizationUtil.getAuthorization()}
    )
}

/**
 * # 校园网账号删除
 * 删除一个校园网账号
 *
 * @param user string 用户名
 * @returns Promise<BaseResponse<void> | undefined>
 */
const SchoolDeleteAPI = async (user: string): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<void>(
        MethodType.DELETE,
        "/api/v1/school",
        null,
        {user: user},
        null,
        {"Authorization": AuthorizationUtil.getAuthorization()}
    )
}

/**
 * # 校园网账号是否登录
 * 检查校园网账号是否登录
 *
 * @returns Promise<BaseResponse<boolean> | undefined>
 */
const SchoolHasLoginAPI = async (): Promise<BaseResponse<SchoolHasLoginEntity> | undefined> => {
    return BaseApi<SchoolHasLoginEntity>(
        MethodType.GET,
        "/api/v1/school/has-login",
        null,
        null,
        null,
        {"Authorization": AuthorizationUtil.getAuthorization()}
    )
}

export {
    SchoolListAPI,
    SchoolCreateAPI,
    SchoolDeleteAPI,
    SchoolHasLoginAPI
}
