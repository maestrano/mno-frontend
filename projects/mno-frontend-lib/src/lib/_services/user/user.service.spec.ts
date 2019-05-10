import { TestBed, fakeAsync, tick } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NgxJsonapiModule, Service } from 'ngx-jsonapi'
import { of } from 'rxjs'

import { User } from '../../_models'
import { UserService } from './user.service'
import { AuthenticationService } from '../authentication/authentication.service'

describe('UserService', () => {
  const user = new User({ id: '1', is_loading: false })
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>
  let service: UserService

  beforeEach(() => {
    authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['fetchCurrentUserId'])
    authenticationServiceSpy.fetchCurrentUserId.and.returnValue(of(user.id))

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxJsonapiModule.forRoot({ url: 'ngx-route/' })
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceSpy }
      ]
    })

    service = TestBed.get(UserService)
  })

  it('should be a NgxJsonApi Service', () => {
    expect(service instanceof Service).toBe(true)
    expect(service.resource).toEqual(User)
    expect(service.type).toEqual('users')
  })

  describe('fetch()', () => {
    let getReqSpy: jasmine.Spy
    beforeEach(() => getReqSpy = spyOn(service, 'get').and.returnValue(of(user)))

    it('should fetch & emit user to subscribers', () => {
      service.fetch().subscribe(res => {
        expect(res).toEqual(user)
        expect(service.get).toHaveBeenCalledWith(user.id)
      })
    })

    it('should update the internal dashboard BehaviourSubject state', () => {
      service.fetch().subscribe()
      expect(service['user']['getValue']()).toEqual(user)
    })

    it('should multicast new results to all observers until unsubscribed', fakeAsync(() => {
      const newExpectedResult = new User({ ...user })
      let invoked = 0
      const sub = service.fetch().subscribe(results => {
        if (invoked > 1) expect(results).toEqual(newExpectedResult)
        invoked++
      })
      tick(1000)
      service['user'].next(newExpectedResult)
      sub.unsubscribe()
      service['user'].next(newExpectedResult)
      expect(invoked).toEqual(2)
    }))

    describe('when the user is logged out', () => {
      beforeEach(() => authenticationServiceSpy.fetchCurrentUserId.and.returnValue(of(null)))

      it('should emit null to subscribers', () => {
        service.fetch().subscribe(res => {
          expect(res).toEqual(null)
          expect(service.get).not.toHaveBeenCalled()
        })
      })
    })

    describe('when resource is loading', () => {
      const loadingUser = { ...user, is_loading: true }
      beforeEach(() => getReqSpy.and.returnValue(of(loadingUser)))

      it('should filter out the observable notification', () => {
        let invoked = 0
        service.fetch().subscribe(res => invoked++)
        expect(invoked).toEqual(0)
      })
    })
  })
})
