import { Dashboard } from './dashboard'
import { Resource } from 'ngx-jsonapi'

describe('Dashboard', () => {
  it('should be a NgxJsonApi Resource', () => {
    const model = new Dashboard()
    expect(model instanceof Resource).toBe(true)
  })

  describe('constructor', () => {
    const model = new Dashboard({ id: '1' })
    it('allows dynamic attribute setting', () => expect(model.id).toEqual('1'))
  })
})
