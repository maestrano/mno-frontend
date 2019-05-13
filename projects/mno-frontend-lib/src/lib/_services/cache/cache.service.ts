import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { tap, share } from 'rxjs/operators'

import { CacheObject, CacheConfig } from '../../_models'

class DecoratorCacheService {
  static cacheService: CacheService = null
}

@Injectable()
export class CacheService {
  private cachedElements = {}
  public defaultObjectParameters: CacheConfig = {
    collection: true
  }

  constructor() {
    this.loadDecorator()
  }

  loadDecorator() {
    DecoratorCacheService.cacheService = this
  }

  public get(key: string): any {
    if (!this.has(key)) return null
    return this.getCacheObject(key).value
  }

  public set(key: string, value: any, configuration: CacheConfig = this.defaultObjectParameters) {
    this.cachedElements[key] = new CacheObject(key, value, configuration)
  }

  public getCacheObject(key: string): CacheObject {
    return this.cachedElements[key]
  }

  public update(key: string, value: any): void {
    const cachedObject = this.getCacheObject(key)
    if (!cachedObject) return

    if (cachedObject.configuration.collection) {
      cachedObject.value = cachedObject.value.concat(value)
    } else {
      cachedObject.value = value
    }
  }

  public remove(cacheKey: string, id?: string, idKey = 'id'): void {
    const cachedObject = this.getCacheObject(cacheKey)
    if (!cachedObject) return

    if (id && cachedObject.configuration.collection) {
      cachedObject.removeCollectionItem(idKey, id)
    } else {
      delete this.cachedElements[cacheKey]
    }
  }

  public has(key: string): boolean {
    return this.getCacheObject(key) !== undefined
  }

  public resetCache() {
    this.cachedElements = {}
  }
}

export function Cache(key: string, config?: CacheConfig): MethodDecorator {
  return function(_target, _fkey, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function() {
      const args = Object.assign([], arguments)

      if (DecoratorCacheService.cacheService.has(key)) {
        const cachedObjectValue = DecoratorCacheService.cacheService.get(key)
        return of(cachedObjectValue)
      }

      return originalMethod.apply(this, args).pipe(
        tap(results => DecoratorCacheService.cacheService.set(key, results, config)),
        share()
      )
    }
  }
}
