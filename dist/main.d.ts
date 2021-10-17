export default class SpectreAssistant {
    private redis;
    private get;
    private setTempData;
    validate: (m: {
        id: string;
    }, type: string) => boolean;
    private readonly logins;
    constructor(redis_login: RedisLogin);
}
declare type RedisLogin = {
    host: string;
    password: string;
    port?: number;
};
export {};
