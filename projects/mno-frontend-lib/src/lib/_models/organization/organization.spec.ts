import { Organization } from './organization'
import { Resource } from 'ngx-jsonapi'

describe('Organization', () => {
  const model = new Organization()

  it('should be a NgxJsonApi Resource', () => {
    expect(model instanceof Resource).toBe(true)
  })
})
