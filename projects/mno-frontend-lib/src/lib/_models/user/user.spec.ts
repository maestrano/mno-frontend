import { User } from './user'
import { Resource, DocumentCollection } from 'ngx-jsonapi'
import { Organization } from '../organization/organization'

describe('User', () => {
  it('should be a NgxJsonApi Resource', () => {
    const model = new User()
    expect(model instanceof Resource).toBe(true)
  })

  describe('static readonly includedRels', () => {
    it('defines included relationships', () => expect(User.includedRels).toEqual(['organizations']))
  })

  describe('constructor', () => {
    const model = new User({ id: '1' })
    it('allows dynamic attribute setting', () => expect(model.id).toEqual('1') )
  })

  describe('get organizations', () => {
    const organizations = new DocumentCollection<Organization>()
    const expectedResult = [new Organization()]
    organizations.data = expectedResult
    const model = new User({ relationships: { organizations } })
    it('should return plain list of organizations from relationship collection', () => {
      expect(model.organizations).toEqual(expectedResult)
    })
  })
})
