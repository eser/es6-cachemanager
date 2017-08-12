declare class CacheManager {
    items: {
        [key: string]: any;
    };
    constructor();
    static promisifyCall(callback: any): Promise<any>;
    getDirect(key: any, ttl?: number): any;
    setDirect(key: any, value: any): void;
    invalidate(key: any): void;
    get(key: any, callback: any, ttl?: number): any;
    cached(cacheKey: any, ttl?: number): (target: any, name: any, descriptor: any) => any;
}
declare const cacheManager: CacheManager;
export { CacheManager, cacheManager };
export default cacheManager;
