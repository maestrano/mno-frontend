import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { of } from 'rxjs'

import { User } from '../../_models'
import { UserService } from './user.service'
import { AuthenticationService } from '../authentication/authentication.service'
import { DatastoreService } from '../datastore/datastore.service'
import { itMulticastsToObservers, itFinalizesObservable } from 'projects/mno-frontend-lib/testing/shared-examples'
import { itDefinesBehaviourSubjectAccessors } from '../../../../testing/shared-examples'

describe('UserService', () => {
  let datastoreSpy: jasmine.SpyObj<DatastoreService>
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>
  let service: UserService
  const user = new User(datastoreSpy, { id: '1' })

  beforeEach(() => {
    authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['fetchCurrentUserId'])
    authenticationServiceSpy.fetchCurrentUserId.and.returnValue(of(user.id))

    datastoreSpy = jasmine.createSpyObj('DatastoreService', ['findRecord'])
    datastoreSpy.findRecord.and.returnValue(of(user))

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: DatastoreService, useValue: datastoreSpy },
        { provide: AuthenticationService, useValue: authenticationServiceSpy }
      ]
    })

    service = TestBed.get(UserService)
  })

  itDefinesBehaviourSubjectAccessors(() => service, 'user', user)

  describe('fetch()', () => {
    it('should fetch & emit user to subscribers', () => {
      service.fetch().subscribe(res => {
        expect(res).toEqual(user)
        expect(datastoreSpy.findRecord).toHaveBeenCalledWith(User, user.id, { include: 'organizations' })
      })
    })

    itMulticastsToObservers(() => service.fetch(), 2, (sub) => {
      service.user = { ...user } as User
      sub.unsubscribe()
      service.user = { ...user } as User
    })

    it('should cache the observable result', () => {
      service.fetch().subscribe()
      service.fetch().subscribe()
      service.fetch().subscribe()
      expect(datastoreSpy.findRecord).toHaveBeenCalledTimes(1)
    })

    describe('when the user is logged out', () => {
      beforeEach(() => authenticationServiceSpy.fetchCurrentUserId.and.returnValue(of(null)))

      it('should emit null to subscribers', () => {
        service.fetch().subscribe(res => {
          expect(res).toEqual(null)
          expect(datastoreSpy.findRecord).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('fetchLatest()', () => {
    itFinalizesObservable(() => service.fetchLatest())
  })
})
