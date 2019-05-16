import { TestBed } from '@angular/core/testing'

import { JsonApiHelperService } from '../json-api-helper/json-api-helper.service'
import { getTestJsonApiProductsResponse } from '../../../../testing'

describe('JsonApiHelperService', () => {
  let service: JsonApiHelperService
  let jsonApiProductsResponse: any

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonApiHelperService]
    })
    service = TestBed.get(JsonApiHelperService)
    jsonApiProductsResponse = getTestJsonApiProductsResponse()
  })

  describe('format(res)', () => {
    describe('Collection resources', () => {
      it('formats plain objects with flattened relationships', () => {
        expect(service.format(jsonApiProductsResponse)).toEqual({
          data: [
            {
              id: 'product-1',
              name: 'Xero',
              values: [{
                id: 'value-1',
                fantastical: 'attrs',
                fields: {
                  id: 'field-1',
                  coolest: 'attrs'
                }
              }],
              tenant: {
                id: 'tenant-1',
                cool: 'attrs'
              }
            }, {
              id: 'product-2',
              name: 'QBO',
              values: [{
                id: 'value-2',
                bored: 'attrs'
              }]
            }
          ],
          meta: { record_count: 2 },
          links: { first: 'a/link/first', last: 'a/link/last' }
        })
      })
    })

    describe('Singular resource', () => {
      it('formats a plain object with flattened relationships', () => {
        jsonApiProductsResponse.data = jsonApiProductsResponse.data[1]
        expect(service.format(jsonApiProductsResponse)).toEqual(jasmine.objectContaining({
          data: {
            id: 'product-2',
            name: 'QBO',
            values: [{
              id: 'value-2',
              bored: 'attrs'
            }]
          }
        }))
      })
    })
  })
})
