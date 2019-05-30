import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'

import { OrganizationService } from './organization.service'
import { DatastoreService } from '../datastore/datastore.service'
import { UserService } from '../user/user.service'
import { User } from '../../_models/user/user'
import { Organization } from '../../_models'
import {
  itDefinesBehaviourSubjectAccessors,
  itMulticastsToObservers,
  itFinalizesObservable
} from '../../../../testing/shared-examples'

describe('OrganizationService', () => {
  let service: OrganizationService
  let userServiceSpy: jasmine.SpyObj<UserService>
  const datastore: DatastoreService = undefined
  const user = new User(datastore, { id: '1' })
  const organizations = [
    new Organization(datastore, { id: '1' }),
    new Organization(datastore, { id: '2' })
  ]

  beforeEach(() => {
    user.organizations = organizations

    userServiceSpy = jasmine.createSpyObj('UserService', ['fetchLatest'])
    userServiceSpy.fetchLatest.and.returnValue(of(user))

    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    service = TestBed.get(OrganizationService)
  })

  itDefinesBehaviourSubjectAccessors(() => service, 'organizations', organizations)

  describe('fetchAll()', () => {
    it('should fetch & emit organizations', () => {
      service.fetchAll().subscribe(res => {
        expect(res).toEqual(user.organizations)
        expect(res.length).toEqual(2)
      })

      expect(userServiceSpy.fetchLatest).toHaveBeenCalled()
    })

    it('should cache the observable result', () => {
      service.fetchAll().subscribe()
      service.fetchAll().subscribe()
      service.fetchAll().subscribe()
      expect(userServiceSpy.fetchLatest).toHaveBeenCalledTimes(1)
    })

    itMulticastsToObservers(() => service.fetchAll(), 2, (sub) => {
      service.organizations = [...user.organizations]
      sub.unsubscribe()
      service.organizations = [...user.organizations]
    })
  })

  describe('fetchCurrent()', () => {
    it('fetches the current organization', () => {
      service.fetchCurrent().subscribe(res => {
        expect(res).toEqual(organizations[0])
        expect(res.id).toEqual('1')
      })
    })

    itMulticastsToObservers(() => service.fetchCurrent(), 2, (sub) => {
      service.organizations = [...organizations]
      sub.unsubscribe()
      service.organizations = [...organizations]
    })
  })

  describe('fetchCurrentLatest()', () => {
    itFinalizesObservable(() => service.fetchCurrentLatest())
  })
})
