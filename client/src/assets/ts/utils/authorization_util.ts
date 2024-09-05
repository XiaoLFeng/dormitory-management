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

import cookie from 'js-cookie';

/**
 * # 授权工具库
 * 用于添加授权或删除授权的一种工具
 *
 * @author xiao_lfeng
 */
export class AuthorizationUtil {
    public static getAuthorization(): string {
        if (cookie.get("Authorization")) {
            return cookie.get("Authorization")!!
        }
        return "";
    }

    public static getNoBearerAuthorization(): string | undefined {
        if (this.getAuthorization()) {
            if (this.getAuthorization()?.startsWith("Bearer ")) {
                return this.getAuthorization()?.replace("Bearer ", "");
            } else {
                return this.getAuthorization();
            }
        } else {
            return undefined;
        }
    }

    public static saveAuthorization(token: string, hour: number, remember: boolean): void {
        const time = hour * 3600 * 1000;
        if (remember) {
            cookie.set("Authorization", "Bearer " + token, {
                expires: new Date(Date.now() + time),
            });
        } else {
            cookie.set("Authorization", "Bearer " + token);
        }
    }
}
