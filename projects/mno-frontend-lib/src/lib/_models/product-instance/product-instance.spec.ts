import { ProductInstance } from './product-instance'
import { itShouldBehaveLikeAJsonApiModel } from '../../../../testing/jsonapi-model-examples'
import { SyncStatus } from '../sync-status/sync-status'

describe('ProductInstance', () => {
  const type = 'product_instances'
  const attributes = [
    'uid',
    'api_key',
    'api_secret',
    'external_id',
    'oauth_keys_valid',
    'organization_id',
    'status',
  ]
  const relationships = {
    sync_status: {
      data: { id: '1', type: 'sync_statuses' },
    },
    product: {
      data: { id: '1', type: 'products' }
    }
  }

  itShouldBehaveLikeAJsonApiModel(ProductInstance, { type, attributes, relationships }, (datastore) => {
    const productInstance = new ProductInstance(datastore, { id: '1' })
    let status: string

    beforeEach(() => {
      productInstance.sync_status = new SyncStatus(datastore, { attributes: { status } })
    })

    describe('connectionStatus()', () => {
      beforeAll(() => status = 'connected')

      it('returns sync_status status', () => {
        expect(productInstance.connectionStatus()).toEqual('connected')
      })

      describe('when there is no sync_status', () => {
        beforeEach(() => productInstance.sync_status = undefined)

        it('should be disconnected', () => {
          expect(productInstance.connectionStatus()).toEqual('disconnected')
        })
      })
    })

    describe('isConnected', () => {
      describe('connected statuses', () => {
        ['success', 'enqueued', 'running'].forEach(s => {
          beforeAll(() => status = s)
          it('should not be disconnected', () => {
            expect(productInstance.isConnected()).toEqual(true)
          })
        })
      })
      describe('disconnected statuses', () => {
        ['error', 'disconnected'].forEach(s => {
          beforeAll(() => status = s)

          it(`with status '${s}', it should be disconnected`, () => {
            expect(productInstance.isConnected()).toEqual(false)
          })
        })
      })
    })

    describe('isDisconnected', () => {
      describe('disconnected statuses', () => {
        ['error', 'disconnected'].forEach(s => {
          beforeAll(() => status = s)

          it(`with status '${s}', it should be disconnected`, () => {
            expect(productInstance.isDisconnected()).toEqual(true)
          })
        })
      })

      describe('connected statuses', () => {
        ['success', 'enqueued', 'running'].forEach(s => {
          beforeAll(() => status = s)
          it('should not be disconnected', () => {
            expect(productInstance.isDisconnected()).toEqual(false)
          })
        })
      })
    })
  })
})
