class CacheManager {
    items: Map<string, any>;

    constructor() {
        this.items = new Map<string, any>();
    }

    static promisifyCall(callback: () => any): Promise<any> {
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

    static serializeKey(key: string|Array<string>): string {
        if (Array.isArray(key)) {
            return key.join('_');
        }

        return key;
    }

    getDirect(key: string|Array<string>, ttl: number = 0): any {
        const result = this.items.get(CacheManager.serializeKey(key));

        if (result === undefined) {
            return null;
        }

        if (ttl > 0 && Date.now() - result.updatedAt > ttl) {
            return null;
        }

        return result.value;
    }

    setDirect(key: string|Array<string>, value: any): void {
        const data = {
            updatedAt: Date.now(),
            value: value,
        };

        this.items.set(CacheManager.serializeKey(key), data);
    }

    invalidate(key: string|Array<string>): void {
        this.items.delete(CacheManager.serializeKey(key));
    }

    get(key: string|Array<string>, callback: () => any, ttl: number = 0): any {
        const result = this.getDirect(key, ttl);

        if (result !== null) {
            return result;
        }

        const newItem = CacheManager.promisifyCall(callback);

        this.setDirect(key, newItem);

        return newItem;
    }

    cached(cacheKey: string|Array<string>, ttl: number = 0) {
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
