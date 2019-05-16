import { Injectable } from '@angular/core'
import * as _ from 'lodash'

export interface FormattedJsonApiResponse {
  data: any
  meta: { record_count: number }
  links: {
    first: string
    last: string
  }
}

@Injectable()
export class JsonApiHelperService {

  constructor() { }

  /**
   * Format a json api Response into a frontend display friendly format.
   * @param           res A json api resource Response.
   *                      Example:
   *                      {
   *                        // data can also be Array<Object> for #index requests
   *                        data: {
   *                          id: '1',
   *                          type: 'jobs',
   *                          links: {...},
   *                          attributes: {...},
   *                          relationships: {...}
   *                        },
   *                        included: [{...}]
   *                      }
   * @return               A plain object (or Array of objects) with flattened resource
   *                      attributes, relationships & nested relationships.
   *                      Example:
   *                      {
   *                        id: '1',
   *                        title: 'A job title',
   *                        venue: {
   *                          id: '1',
   *                          name: 'a venue name'
   *                        }
   *                      }
   */
  public format(res): FormattedJsonApiResponse {
    if (_.isEmpty(res)) return res

    const data = _.isArray(res.data)
      ? _.map(res.data, record => this.formatter(record, res))
      : this.formatter(res.data, res)

    return _.extend({ data }, _.pick(res, 'meta', 'links')) as FormattedJsonApiResponse
  }

  private formatter(record, res) {
    _.each(record.relationships, (rel, relName) => {
      // Associate included relationships to records, and format into simple attributes objects
      if (rel.data && res.included) {
        // Format hasMany & hasOne relationships / nested relationships
        if (_.isArray(rel.data)) {
          const includedRels = _.filter(res.included, (includedRel) => {
            const relDataIds = _.map(rel.data, relData => relData.id)
            // rel.data is grouped by relationship, so all items should be of same type.
            return includedRel.type === _.get(rel, 'data[0].type') && _.includes(relDataIds, includedRel.id)
          })
          record.relationships[relName] = _.map(includedRels, iRel => this.formatter(iRel, res))
        } else {
          const includedRel = _.find(res.included, { type: rel.data.type, id: rel.data.id })
          includedRel ?
            record.relationships[relName] = this.formatter(includedRel, res) :
            // Edge case when relationship is listed on record but no 'included' resource found
            // matching relation id & type.
            delete record.relationships[relName]
        }
      } else {
        // Remove unwanted attributes e.g links
        delete record.relationships[relName]
      }
    })
    return _.extend({ id: record.id }, record.attributes, record.relationships)
  }
}
