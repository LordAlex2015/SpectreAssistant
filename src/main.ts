import * as Redis from 'redis';

export class SpectreAssistant {
    private redis: Redis.RedisClient;
    private get: (key: string) => Promise<string>;
    private setTempData: (key: string, value: string, expire: number) => boolean;
    public  validate: (m: { id: string }, type: string) => boolean;
    private readonly logins: RedisLogin;
    constructor(redis_login: RedisLogin) {
        this.logins = redis_login
        this.redis = Redis.createClient({
            host: redis_login.host,
            password: redis_login.password
        })
        this.redis.on('ready', () => {
            this.redis.sendCommand("config", ["set", "notify-keyspace-events", "Ex"])
        })
        this.get = (key: string) => {
            return new Promise(resolve => {
                this.redis.get(key, function(err, data) {
                    resolve(data)
                })
            })

        }
        this.setTempData = (key, value,expire) => {
            return this.redis.multi().set(key, value).expire(key, expire).exec()
        }
        this.validate = (m: {id: string}, type: string) => {
            return this.setTempData(`SpectreSystem:${type}:${m.id}`, `${Date.now()}`, 5000)
        }
    }
}

type RedisLogin = {host: string, password: string, port?: number}