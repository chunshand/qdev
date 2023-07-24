import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const qs = require('qs');
@Injectable()
export class ThridService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {

    }

    login(code: string, type: string) {
        let thrid_config = this.configService.get<object>('thrid');
        if (!thrid_config[type]) {
            return false;
        }
        let oauth_data = thrid_config[type];
        return this[type](oauth_data, code);
    }
    /**
     * 获取登录跳转地址
     */
    handleGetLoginUrl(type: string): string | boolean {
        let thrid_config = this.configService.get<object>('thrid');
        if (!thrid_config[type]) {
            return false;
        }
        return thrid_config[type];

    }
    // ------------------------------------------------------------------------------ 具体的登录调用
    /**
     * QQ登录获取用户信息
     */
    qq(oauth_data: object, code: string) {
        // 因rxjs版本即将弃用toPromise 所以采用了自己写Promise
        return new Promise(async (resolve) => {
            let getTokenData = await new Promise((r) => {
                let res = this.httpService.get(
                    'https://graph.qq.com/oauth2.0/token',
                    {
                        params: {
                            grant_type: "authorization_code",
                            client_id: oauth_data['app_key'],
                            client_secret: oauth_data['app_secret'],
                            code: code,
                            redirect_uri: oauth_data['callback'],
                            fmt: "json"
                        }
                    }
                );
                res.subscribe(
                    {
                        next: result => r(result.data),
                        error: err => r({ error: true, err }),
                        // complete: () => console.log('done'),
                    }
                );
            });
            if (getTokenData['error']) {
                // access_token
                resolve({
                    code: false,
                    data: null,
                    meta: getTokenData
                });
            }
            let access_token = getTokenData['access_token'];
            let getMeData = await new Promise((r) => {
                let res = this.httpService.get(
                    'https://graph.qq.com/oauth2.0/me',
                    {
                        params: {
                            access_token: access_token,
                            fmt: "json"
                        }
                    }
                );
                res.subscribe(
                    {
                        next: result => r(result.data),
                        error: err => r({ error: true, err }),
                        // complete: () => console.log('done'),
                    }
                );
            });
            if (getMeData['error']) {
                // access_token
                resolve({
                    code: false,
                    data: null,
                    meta: getMeData
                });
            }
            let openid = getMeData['openid'];
            resolve({
                code: true,
                data: openid,
                meta: getMeData
            });

        });

    }

    /**
     * 微信登录获取用户信息
     */
    weixin(oauth_data: object, code: string) {
        return new Promise(async (resolve) => {
            let getTokenData = await new Promise((r) => {
                let res = this.httpService.get(
                    'https://api.weixin.qq.com/sns/oauth2/access_token',
                    {
                        params: {
                            appid: oauth_data['app_key'],
                            secret: oauth_data['app_secret'],
                            code: code,
                            grant_type: "authorization_code",
                        }
                    }
                );

                res.subscribe(
                    {
                        next: result => r(result.data),
                        error: err => r({ error: true, err }),
                        // complete: () => console.log('done'),
                    }
                );
            });
            if (getTokenData['error']) {
                // access_token
                resolve({
                    code: false,
                    data: null,
                    meta: getTokenData
                });
            }
            let openid = getTokenData['openid'];
            resolve({
                code: true,
                data: openid,
                meta: getTokenData
            });
        });

    }

    /**
     * 微博登录获取用户信息
     */
    sina(oauth_data: object, code: string) {
        return new Promise(async (resolve) => {
            let getTokenData = await new Promise((r) => {
                const data = {
                    client_id: oauth_data['app_key'],
                    client_secret: oauth_data['app_secret'],
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: oauth_data['callback']
                };
                let res = this.httpService.request(
                    {
                        url: "https://api.weibo.com/oauth2/access_token?" + qs.stringify(data),
                        method: "post"
                    }

                );
                res.subscribe(
                    {
                        next: result => r(result.data),
                        error: err => r({ error: true, err }),
                        complete: () => console.log('done'),
                    }
                );
            });

            if (getTokenData['error']) {
                console.log(getTokenData);
                // access_token
                resolve({
                    code: false,
                    data: null,
                    meta: getTokenData
                });
            }
            let access_token = getTokenData['access_token'];
            let getMeData = await new Promise((r) => {
                const data = { access_token: access_token };
                let res = this.httpService.post(
                    'https://api.weibo.com/oauth2/get_token_info?' + qs.stringify(data),
                );
                res.subscribe(
                    {
                        next: result => r(result.data),
                        error: err => r({ error: true, err }),
                        // complete: () => console.log('done'),
                    }
                );
            });
            if (getMeData['error']) {
                // access_token
                resolve({
                    code: false,
                    data: null,
                    meta: getMeData
                });
            }
            let openid = getTokenData['uid'];
            resolve({
                code: true,
                data: openid,
                meta: getTokenData
            });
        });

    }

    /**
     * 钉钉登录获取用户信息
     */
    dingtalk(oauth_data: object, code: string) {
        return new Promise(async (resolve) => {
            let getTokenData = await new Promise((r) => {
                let res = this.httpService.get(
                    'https://oapi.dingtalk.com/sns/gettoken',
                    {
                        params: {
                            appid: oauth_data['app_key'],
                            appsecret: oauth_data['app_secret'],
                        }
                    }
                );
                res.subscribe(
                    {
                        next: result => r(result.data),
                        error: err => r({ error: true, err }),
                        // complete: () => console.log('done'),
                    }
                );
            });
            if (getTokenData['error']) {
                // access_token
                resolve({
                    code: false,
                    data: null,
                    meta: getTokenData
                });
            }
            let access_token = getTokenData['access_token'];
            let getMeData = await new Promise((r) => {
                let res = this.httpService.request(
                    {
                        url: "https://oapi.dingtalk.com/sns/get_persistent_code",
                        method: "post",
                        params: { access_token: access_token },
                        data: { tmp_auth_code: code }
                    }

                );
                res.subscribe(
                    {
                        next: result => r(result.data),
                        error: err => r({ error: true, err }),
                        // complete: () => console.log('done'),
                    }
                );
            });
            if (getMeData['error']) {
                // access_token
                resolve({
                    code: false,
                    data: null,
                    meta: getMeData
                });
            }
            let openid = getMeData['openid'];
            resolve({
                code: true,
                data: openid,
                meta: getMeData
            });

        });
    }
}
