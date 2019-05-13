import { TestBed, fakeAsync, tick } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NgxJsonapiModule, Service, DocumentCollection } from 'ngx-jsonapi'
import { of } from 'rxjs'

import { DashboardService } from './dashboard.service'
import { FrontendLibConfigService } from '../../frontend-lib-config.service'
import { UserService } from '../user/user.service'
import { User, Dashboard, Organization } from '../../_models'
import { CacheService } from '../cache/cache.service'

describe('DashboardService', () => {
  const org = new Organization()
  org.attributes.uid = 'org-uid'
  const organizations = new DocumentCollection<Organization>()
  organizations.data = [org]
  const user = new User({ id: '1', relationships: { organizations } })
  let userServiceSpy: jasmine.SpyObj<UserService>
  let service: DashboardService
  let cacheService: CacheService

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['fetchLatest'])
    userServiceSpy.fetchLatest.and.returnValue(of(user))

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxJsonapiModule.forRoot({ url: 'ngx-route/' })
      ],
      providers: [
        { provide: FrontendLibConfigService, useValue: { currency: 'AUD' } },
        { provide: UserService, useValue: userServiceSpy },
        CacheService
      ]
    })

    cacheService = TestBed.get(CacheService)
    service = TestBed.get(DashboardService)
  })

  it('should be a NgxJsonApi Service', () => {
    expect(service instanceof Service).toBe(true)
    expect(service.resource).toEqual(Dashboard)
    expect(service.type).toEqual('dashboards')
  })

  describe('add(dashboard: Dashboard)', () => {
    const dashboard = new Dashboard()
    dashboard.id = '1'

    it('should add the dashboard to the internal dashboards BehaviourSubject state', () => {
      expect(service['dashboards']['getValue']()).toEqual([])
      service.add(dashboard)
      expect(service['dashboards']['getValue']()).toContain(
        jasmine.objectContaining({ id: dashboard.id })
      )
    })
  })

  describe('fetchAll()', () => {
    const expectedDashboards = [new Dashboard({ id: '1' }), new Dashboard({ id: '2' })]
    const dashboards = new DocumentCollection<Dashboard>()
    // let allReqSpy: jasmine.Spy

    beforeAll(() => {
      dashboards.is_loading = false
      dashboards.data = expectedDashboards
    })

    beforeEach(() => spyOn(service, 'all').and.returnValue(of(dashboards)))

    it('should emit the dashboards list to observers', () => {
      service.fetchAll().subscribe(result => {
        expect(result).toEqual(expectedDashboards)
      })
    })

    it('should cache the observable result & return the cached value', () => {
      service.fetchAll().subscribe()
      service.fetchAll().subscribe()
      service.fetchAll().subscribe(cached => {
        expect(cached).toEqual(expectedDashboards)
      })
      expect(service.all).toHaveBeenCalledTimes(1)
    })

    it('should update the internal dashboard BehaviourSubject state', () => {
      service.fetchAll().subscribe(() => {
        expect(service['dashboards']['getValue']()).toEqual(expectedDashboards)
      })
    })

    it('should only retrieve the users dashboards', () => {
      const filters = { 'owner_id.in': user.id }
      service.fetchAll().subscribe()
      expect(service.all).toHaveBeenCalledWith(jasmine.objectContaining({ remotefilter: filters }))
    })

    it('should multicast new results to all observers until unsubscribed', fakeAsync(() => {
      const newExpectedResult = [new Dashboard()]
      let invoked = 0
      const sub = service.fetchAll().subscribe(results => {
        if (invoked > 1) expect(results).toEqual(newExpectedResult)
        invoked++
      })
      tick(1000)
      service['dashboards'].next(newExpectedResult)
      sub.unsubscribe()
      service['dashboards'].next(newExpectedResult)
      expect(invoked).toEqual(2)
    }))

    describe('when resource is loading', () => {
      beforeAll(() => dashboards.is_loading = true)

      it('should filter out the observable notification', () => {
        let invoked = 0
        service.fetchAll().subscribe(res => invoked++)
        expect(invoked).toEqual(0)
      })
    })
  })

  describe('create(params: DashboardCreateParams)', () => {
    const newDashboard = new Dashboard()
    const params = { name: 'Dashy' }

    beforeEach(() => {
      spyOn(service, 'new').and.returnValue(newDashboard)
      spyOn(newDashboard, 'save').and.returnValue(of(newDashboard))
      spyOn(service, 'add')
      spyOn(cacheService, 'update')
    })

    it('should create a dashboard', () => {
      service.create(params).subscribe(res => {
        expect(res).toEqual(newDashboard)
        expect(res.attributes).toEqual(jasmine.objectContaining({
          owner_type: 'User',
          owner_id: user.id,
          organization_ids: [org.attributes.uid],
          name: params['name'],
          settings: {
            currency: 'AUD'
          }
        }))
      })
      expect(newDashboard.save).toHaveBeenCalled()
    })

    it('should add the dashboard to internal dashboards BehaviourSubject', () => {
      service.create(params).subscribe(() => {
        expect(service.add).toHaveBeenCalledWith(newDashboard)
      })
    })

    it('should update the CacheService dashboards cache', () => {
      service.create(params).subscribe(() => {
        expect(cacheService.update).toHaveBeenCalledWith('dashboards', newDashboard)
      })
    })
  })
})
