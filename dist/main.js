"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("redis");
class SpectreAssistant {
    constructor(redis_login) {
        this.logins = redis_login;
        this.redis = Redis.createClient({
            host: redis_login.host,
            password: redis_login.password
        });
        this.redis.on('ready', () => {
            this.redis.sendCommand("config", ["set", "notify-keyspace-events", "Ex"]);
        });
        this.get = (key) => {
            return new Promise(resolve => {
                this.redis.get(key, function (err, data) {
                    resolve(data);
                });
            });
        };
        this.setTempData = (key, value, expire) => {
            return this.redis.multi().set(key, value).expire(key, expire).exec();
        };
        this.validate = (m, type) => {
            return this.setTempData(`SpectreSystem:${type}:${m.id}`, `${Date.now()}`, 5000);
        };
    }
}
exports.default = SpectreAssistant;
