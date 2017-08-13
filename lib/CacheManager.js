"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CacheManager {
    constructor() {
        this.items = new Map();
    }
    static promisifyCall(callback) {
        try {
            const result = callback();
            if (result instanceof Promise) {
                return result;
            }
            return Promise.resolve(result);
        }
        catch (ex) {
            return Promise.reject(ex);
        }
    }
    static serializeKey(key) {
        if (Array.isArray(key)) {
            return key.join('_');
        }
        return key;
    }
    getDirect(key, ttl = 0) {
        const result = this.items.get(CacheManager.serializeKey(key));
        if (result === undefined) {
            return null;
        }
        if (ttl > 0 && Date.now() - result.updatedAt > ttl) {
            return null;
        }
        return result.value;
    }
    setDirect(key, value) {
        const data = {
            updatedAt: Date.now(),
            value: value,
        };
        this.items.set(CacheManager.serializeKey(key), data);
    }
    invalidate(key) {
        this.items.delete(CacheManager.serializeKey(key));
    }
    get(key, callback, ttl = 0) {
        const result = this.getDirect(key, ttl);
        if (result !== null) {
            return result;
        }
        const newItem = CacheManager.promisifyCall(callback);
        this.setDirect(key, newItem);
        return newItem;
    }
    cached(cacheKey, ttl = 0) {
        return (target, name, descriptor) => {
            const fn = descriptor.value;
            descriptor.value = () => {
                return this.get(cacheKey, async () => {
                    const result = fn.apply(target, arguments);
                    if (result instanceof Promise) {
                        return await result;
                    }
                    return result;
                }, ttl);
            };
            return descriptor;
        };
    }
}
exports.CacheManager = CacheManager;
const cacheManager = new CacheManager();
exports.cacheManager = cacheManager;
exports.default = cacheManager;
//# sourceMappingURL=CacheManager.js.map