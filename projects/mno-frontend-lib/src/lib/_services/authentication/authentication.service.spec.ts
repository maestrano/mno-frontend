import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { AuthenticationService } from './authentication.service'
import { FrontendLibConfigService, FrontendLibConfig } from '../../frontend-lib-config.service'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'
import { User } from '../../_models'

const expectedHeaders = (req: TestRequest) => {
  expect(req.request.headers.get('Accept')).toBe('application/json')
  expect(req.request.headers.get('Content-Type')).toBe('application/json')
}

describe('AuthenticationService', () => {
  const libConfigStub = {
    urls: {
      auth: {
        currentUser: 'current_user',
        signIn: 'sign_in',
        signOut: 'sign_out'
      }
    }
  }
  let httpClientService: HttpClient
  let httpTestingController: HttpTestingController
  let service: AuthenticationService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
        { provide: FrontendLibConfigService, useValue: libConfigStub }
      ]
    })

    httpClientService = TestBed.get(HttpClient)
    httpTestingController = TestBed.get(HttpTestingController)
    service = TestBed.get(AuthenticationService)
  })

  describe('isLoggedOn()', () => {
    let spyObj: jasmine.Spy
    beforeEach(() => spyObj = spyOn(service, 'fetchCurrentUserId').and.returnValue(of('1')))

    it('returns true', () => {
      service.isLoggedOn().subscribe((res) => expect(res).toEqual(true))
    })

    describe('when there is no current user', () => {
      beforeEach(() => spyObj.and.returnValue(of(null)))

      it('returns false', () => {
        service.isLoggedOn().subscribe((res) => expect(res).toEqual(false))
      })
    })
  })

  describe('fetchCurrentUserId()', () => {
    it('should fetch the current user id', () => {
      service.fetchCurrentUserId().subscribe(id => expect(id).toEqual('1'))

      const req = httpTestingController.expectOne('current_user')
      expect(req.request.method).toBe('GET')
      expectedHeaders(req)

      req.flush({ current_user: { logged_in: true, id: '1' } })
    })

    describe('when the user is logged out', () => {
      it('should return null', () => {
        service.fetchCurrentUserId().subscribe(id => expect(id).toBeNull())

        const req = httpTestingController.expectOne('current_user')
        req.flush({ current_user: { logged_in: false, id: null } })
      })
    })
  })

  describe('login(email: string, password: string)', () => {
    it('should login the user', () => {
      const user = new User({ id: '1' })
      service.login('email', 'password').subscribe(res => expect(res).toEqual(user))

      const req = httpTestingController.expectOne('sign_in')
      expect(req.request.method).toBe('POST')
      expectedHeaders(req)
      req.flush(user)
    })
  })

  describe('logout()', () => {
    it('should logout the user', () => {
      service.logout().subscribe(res => expect(res).toBeDefined())

      const req = httpTestingController.expectOne('sign_out')
      expect(req.request.method).toBe('DELETE')
      expectedHeaders(req)

      req.flush('stuff')
    })
  })
})
