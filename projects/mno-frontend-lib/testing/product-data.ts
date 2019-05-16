import { Product } from '../src/lib/_models'

export function getTestProducts(): Product[] {
  return [
    new Product({
      id: '1',
      uid: 'app-1558',
      name: 'Xero',
      nid: 'xero',
      logo: 'logo',
      created_at: '2018-09-25T07:52:12.000Z',
      updated_at: '2018-09-25T07:52:12.000Z',
      values: [
        {
          id: '1',
          data: 'field data',
          created_at: '2018-09-25T07:52:12.000Z',
          updated_at: '2018-09-25T07:52:12.000Z',
          field: {
            id: '1',
            nid: 'field_name',
            name: 'field name',
            description: 'a field name',
            field_type: 'text',
            created_at: '2018-09-25T07:52:12.000Z',
            updated_at: '2018-09-25T07:52:12.000Z',
          },
        }
      ],
      assets: []
    }),
    new Product({
      id: '2',
      uid: 'app-1458',
      name: 'QBO',
      nid: 'quickbooks-online',
      logo: 'logo',
      created_at: '2018-09-25T07:52:12.000Z',
      updated_at: '2018-09-25T07:52:12.000Z',
      values: [
        {
          id: '2',
          data: 'field data',
          created_at: '2018-09-25T07:52:12.000Z',
          updated_at: '2018-09-25T07:52:12.000Z',
          field: {
            id: '2',
            nid: 'field_name',
            name: 'field name',
            description: 'a field name',
            field_type: 'text',
            created_at: '2018-09-25T07:52:12.000Z',
            updated_at: '2018-09-25T07:52:12.000Z',
          },
        }
      ],
      assets: []
    })
  ]
}

export function getTestJsonApiProductsResponse(): any {
  return {
    data: [
      {
        id: 'product-1',
        type: 'products',
        attributes: { name: 'Xero' },
        links: { removed: 'stuff' },
        relationships: {
          values: {
            data: [{ id: 'value-1', type: 'values' }]
          },
          tenant: {
            data: { id: 'tenant-1', type: 'tenants' }
          }
        },
      },
      {
        id: 'product-2',
        type: 'products',
        attributes: { name: 'QBO' },
        links: { removed: 'stuff' },
        relationships: {
          values: {
            data: [{ id: 'value-2', type: 'values' }]
          },
          // Edge case when relationship is listed on record but no 'included' resource found
          // matching relation id & type.
          lemon: {
            data: { id: 'lemon-1', type: 'lemons' }
          }
        },
      }
    ],
    included: [
      {
        id: 'tenant-1',
        type: 'tenants',
        attributes: { cool: 'attrs' },
        links: { noone: 'cares' }
      },
      {
        id: 'value-1',
        type: 'values',
        attributes: { fantastical: 'attrs' },
        relationships: {
          fields: {
            data: { id: 'field-1', type: 'fields' }
          }
        },
        links: { forever: 'alone' }
      },
      {
        id: 'value-2',
        type: 'values',
        attributes: { bored: 'attrs' },
        links: { forever: 'alone' }
      },
      {
        id: 'field-1',
        type: 'fields',
        attributes: { coolest: 'attrs' },
        links: { done: 'skies' }
      }
    ],
    links: { first: 'a/link/first', last: 'a/link/last' },
    meta: { record_count: 2 }
  }
}
