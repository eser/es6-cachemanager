class CacheManager {
    items: { [key: string]: any };

    constructor() {
        this.items = {};
    }

    static promisifyCall(callback): Promise<any> {
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

    getDirect(key, ttl = 0): any {
        const result = this.items[key];

        if (result === undefined) {
            return null;
        }

        if (ttl > 0 && Date.now() - result.updatedAt > ttl) {
            return null;
        }

        return result.value;
    }

    setDirect(key, value): void {
        const data = {
            updatedAt: Date.now(),
            value: value
        };

        this.items[key] = data;
    }

    invalidate(key): void {
        delete this.items[key];
    }

    get(key, callback, ttl = 0): any {
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
                return this.get(
                    cacheKey,
                    async () => {
                        const result = fn.apply(target, arguments);

                        if (result instanceof Promise) {
                            return await result;
                        }

                        return result;
                    },
                    ttl
                );
            };

            return descriptor;
        };
    }
}

const cacheManager = new CacheManager();

export {
    CacheManager,
    cacheManager,
};

export default cacheManager;
