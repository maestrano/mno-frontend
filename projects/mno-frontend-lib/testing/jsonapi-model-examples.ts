import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import { JsonApiModel, JsonApiDatastore } from 'angular2-jsonapi'

import { itIncludesProperties } from './shared-examples'
import { DatastoreService } from '../src/lib/_services/datastore/datastore.service'

interface JsonApiRels {
  [key: string]: {
    'data': JsonApiRel | JsonApiRel[]
  }
}

interface JsonApiRel {
  id: string
  type: string
}

let datastore: DatastoreService

export function itShouldBehaveLikeAJsonApiModel(
  modelClass: any,
  { type, attributes, relationships }: { type: string, attributes?: string[], relationships?: JsonApiRels },
  accessTestBedCallback?: (datastore: DatastoreService) => void
) {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpClient,
        DatastoreService
      ]
    })

    datastore = TestBed.get(DatastoreService)
  })

  it('should be a JsonApiModel', () => {
    expect(modelClass.prototype instanceof JsonApiModel)
    expect(modelClass.prototype.modelConfig.type).toEqual(type)
  })

  if (attributes) itShouldDefineAttributes(modelClass, attributes)

  if (relationships) itShouldDefineRelationships(modelClass, relationships)

  if (accessTestBedCallback) accessTestBedCallback(datastore)
}

export function itShouldDefineAttributes(modelClass: any, attributes: string[]) {
  describe('Attributes', () => {
    itIncludesProperties(modelClass.prototype, attributes)
  })
}

export function itShouldDefineRelationships(modelClass: any, relationships: JsonApiRels) {
  describe('Relationships', () => {
    const data = {
      id: '1', // not important for testing rels
      relationships
    }

    it('defines relationships', () => {
      try {
        const model = new modelClass(datastore, data)
        const rels = Object.keys(relationships)
        const syncQueue = rels.map(rel => relationships[rel].data)
        syncQueue.forEach(relData => model.syncRelationships(data, relData))
        rels.forEach(rel => expect(model[rel]).toBeDefined())
      } catch (e) {
        // Logs a better error than just "[object Object] thrown"
        console.error(e)
        throw e
      }
    })
  })
}
