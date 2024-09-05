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

/**
 * # 类型工具类
 * 用于存放一些类型判断方法，方便调用
 */
export class TypeUtil {
    /**
     * ## 判断是否为 null
     * 用于判断传入的值是否为 null
     *
     * @param value 传入的值
     * @returns 是否为 null
     */
    public static isNull(value: any): boolean {
        return value === null;
    }

    /**
     * ## 判断是否为 undefined
     * 用于判断传入的值是否为 undefined
     *
     * @param value 传入的值
     * @returns 是否为 undefined
     */
    public static isUndefined(value: any): boolean {
        return value === undefined;
    }

    /**
     * ## 判断是否为 null 或 undefined
     * 用于判断传入的值是否为 null 或 undefined
     *
     * @param value 传入的值
     * @returns 是否为 null 或 undefined
     */
    public static isNullOrUndefined(value: any): boolean {
        return this.isNull(value) || this.isUndefined(value);
    }
}
