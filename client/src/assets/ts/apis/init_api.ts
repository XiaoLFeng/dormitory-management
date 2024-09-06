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
import {InitModeEntity} from "../model/entity/init_entity.ts";
import {BaseResponse} from "../model/base_response.ts";
import {InitUserDTO} from "../model/dto/init_user_dto.ts";

/**
 * # 初始化模式
 * 获取初始化模式信息, 用于展示初始化模式信息
 *
 * @returns Promise<BaseResponse<InitModeEntity> | undefined>
 */
const InitModeAPI = async (): Promise<BaseResponse<InitModeEntity> | undefined> => {
    return BaseApi<InitModeEntity>(
        MethodType.GET,
        "/api/v1/initial/mode",
        null,
        null,
        null,
        null
    )
}

/**
 * # 初始化
 * 初始化用户信息, 用于初始化用户信息
 *
 * @param data 用户信息
 * @returns Promise<BaseResponse<void> | undefined>
 */
const InitAPI = async (data: InitUserDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<void>(
        MethodType.GET,
        "/api/v1/initial",
        null,
        data,
        null,
        null
    )
}

export {InitModeAPI, InitAPI}
