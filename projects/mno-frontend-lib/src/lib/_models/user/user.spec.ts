import { User } from './user'
import { itShouldBehaveLikeAJsonApiModel } from 'projects/mno-frontend-lib/testing/jsonapi-model-examples'

describe('User', () => {
  const type = 'users'
  const attributes = [
    'admin_role',
    'company',
    'email',
    'name',
    'surname',
    'phone',
    'phone_country_code',
    'sso_session'
  ]
  const relationships = {
    organizations: {
      data: [{
        id: '1',
        type: 'organizations'
      }]
    }
  }

  itShouldBehaveLikeAJsonApiModel(User, { type, attributes, relationships })
})
