import { TestBed } from '@angular/core/testing'
import { CacheService } from '../../_services'
import { CacheObject } from '../../_models'

describe('CacheService', () => {
  let cacheService: CacheService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService],
    })

    cacheService = TestBed.get(CacheService)
  })

  it('should define defaultObjectParameters', () => {
    expect(cacheService.defaultObjectParameters).toEqual({ collection: true })
  })

  describe('get(key: string)', () => {
    describe('when the cache exists', () => {
      const cacheObject = new CacheObject('key', 'value')

      beforeEach(() => {
        spyOn(cacheService, 'has').and.returnValue(true)
        spyOn(cacheService, 'getCacheObject').and.returnValue(cacheObject)

      })
      it('should return the cached value', () => {
        expect(cacheService.get('key')).toEqual('value')
      })
    })

    describe('when the cache does not exist', () => {
      beforeEach(() => {
        spyOn(cacheService, 'has').and.returnValue(false)
      })

      it('should return null', () => {
        expect(cacheService.get('key')).toEqual(null)
      })
    })
  })

  describe('set(key: string, value: any, configuration: CacheConfig)', () => {
    beforeEach(() => {
      cacheService.set('key', ['value'])
      cacheService.set('key2', 'value', { collection: false })
    })

    it('should save a CacheObject to memory', () => {
      const cacheObject = cacheService['cachedElements']['key'] as CacheObject
      expect(cacheObject.key).toEqual('key')
      expect(cacheObject.value).toEqual(['value'])
      expect(cacheObject.configuration).toEqual({ collection: true })

      const cacheObject2 = cacheService['cachedElements']['key2'] as CacheObject
      expect(cacheObject2.value).toEqual('value')
      expect(cacheObject2.key).toEqual('key2')
      expect(cacheObject2.configuration).toEqual({ collection: false })
    })
  })

  describe('getCacheObject(key: string)', () => {
    it('returns the cached CacheObject', () => {
      const cacheObject = new CacheObject('foo', 'bar', { collection: false })
      cacheService['cachedElements']['foo'] = cacheObject
      expect(cacheService.getCacheObject('foo')).toEqual(cacheObject)
    })
  })

  describe('update(key: string, value: any)', () => {
    describe('when the cache object is configured as a collection', () => {
      beforeEach(() => {
        const cacheObject = new CacheObject('foo', ['foo'], { collection: true })
        cacheService['cachedElements']['foo'] = cacheObject
      })

      it('should add the new value to the existing collection', () => {
        cacheService.update('foo', 'bar')
        cacheService.update('foo', ['baz'])
        expect(cacheService['cachedElements']['foo'].value).toEqual(['foo', 'bar', 'baz'])
      })
    })

    describe('when the cache object is not configured as a collection', () => {
      beforeEach(() => {
        const cacheObject = new CacheObject('foo', 'foo', { collection: false })
        cacheService['cachedElements']['foo'] = cacheObject
      })

      it('should add the new value to the existing collection', () => {
        cacheService.update('foo', 'bar')
        cacheService.update('foo', 'baz')
        expect(cacheService['cachedElements']['foo'].value).toEqual('baz')
      })
    })
  })

  describe('remove(key: string, id?: string)', () => {
    let cacheObject

    describe('when the cache object is configured as a collection', () => {
      beforeEach(() => {
        cacheObject = new CacheObject('foo', ['foo'], { collection: true })
        cacheService['cachedElements']['foo'] = cacheObject
        spyOn(cacheObject, 'removeCollectionItem')
      })

      it('should remove the collection item from the cache', () => {
        cacheService.remove('foo', 'some-id')
        expect(cacheObject.removeCollectionItem).toHaveBeenCalledWith('id', 'some-id')
      })

      describe('when an idKey is provided', () => {
        it('should remove the collection item from the cache', () => {
          cacheService.remove('foo', 'some-id', 'some-id-key')
          expect(cacheObject.removeCollectionItem).toHaveBeenCalledWith('some-id-key', 'some-id')
        })
      })
    })

    describe('when the cache object is not configured as a collection', () => {
      beforeEach(() => {
        cacheObject = new CacheObject('foo', 'bar', { collection: false })
        cacheService['cachedElements']['foo'] = cacheObject
      })

      it('should delete the cache object', () => {
        cacheService.remove('foo')
        expect(cacheService['cachedElements']['foo']).not.toBeDefined()
      })
    })
  })
})
