import { CacheObject } from './cache-object'

describe('CacheObject', () => {
  describe('creation', () => {
    it('sets attributes', () => {
      const model = new CacheObject('key', 'value')
      expect(model.key).toEqual('key')
      expect(model.value).toEqual('value')
      expect(model.configuration).toEqual({ collection: true })
    })

    it('sets custom config', () => {
      const model = new CacheObject('key', 'value', { collection: false })
      expect(model.configuration).toEqual({ collection: false })
    })
  })

  describe('update(value: any, configuration: CacheConfig)', () => {
    it('updates value & config', () => {
      const model = new CacheObject('key', 'value')
      model.update('new-value', { collection: false })
      expect(model.value).toEqual('new-value')
      expect(model.configuration).toEqual({ collection: false })
    })
  })

  describe('removeCollectionItem(key: string, value: any)', () => {
    it('should return true and remove the collection item from the cache', () => {
      const model  = new CacheObject('key', [{ id: '1', name: 'bob' }, { id: '2' }])
      expect(model.removeCollectionItem('id', '1')).toEqual(true)
      expect(model.value).toEqual([{id: '2'}])
    })

    describe('when the cache object is not a collection', () => {
      it('should return false and not remove the value', () => {
        const model = new CacheObject('key', 'value', { collection: false })
        expect(model.removeCollectionItem('id', '1')).toEqual(false)
        expect(model.value).toEqual('value')
      })
    })
  })
})
