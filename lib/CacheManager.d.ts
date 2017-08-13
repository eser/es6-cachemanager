declare class CacheManager {
    items: Map<string, any>;
    constructor();
    static promisifyCall(callback: () => any): Promise<any>;
    static serializeKey(key: string | Array<string>): string;
    getDirect(key: string | Array<string>, ttl?: number): any;
    setDirect(key: string | Array<string>, value: any): void;
    invalidate(key: string | Array<string>): void;
    get(key: string | Array<string>, callback: () => any, ttl?: number): any;
    cached(cacheKey: string | Array<string>, ttl?: number): (target: any, name: any, descriptor: any) => any;
}
declare const cacheManager: CacheManager;
export { CacheManager, cacheManager };
export default cacheManager;
