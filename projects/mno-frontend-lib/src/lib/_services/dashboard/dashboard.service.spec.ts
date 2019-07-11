import { TestBed } from '@angular/core/testing'

import { DashboardService } from './dashboard.service'
import { Dashboard, User, Organization } from '../../_models'
import { DatastoreService } from '../datastore/datastore.service'
import { of } from 'rxjs'
import { JsonApiQueryData } from 'angular2-jsonapi'
import { itDefinesBehaviourSubjectAccessors, itMulticastsToObservers } from '../../../../testing/shared-examples'
import { UserService } from '../user/user.service'
import { OrganizationService } from '../organization/organization.service'
import { FrontendLibConfigService } from '../../frontend-lib-config.service'

describe('DashboardService', () => {
  const libConfigStub = {
    currency: 'AUD'
  }
  let service: DashboardService
  let datastoreSpy: jasmine.SpyObj<DatastoreService>
  let userServiceSpy: { user: User }
  let organizationServiceSpy: jasmine.SpyObj<OrganizationService>
  let dashboards: Dashboard[]
  let dashboard: Dashboard

  const user = new User(undefined, { id: '1' })
  const currentOrg = new Organization(datastoreSpy, { id: '1', attributes: { uid: 'cool-uid' }})

  beforeEach(() => {
    // Stubbing getter
    userServiceSpy = { user }

    dashboard = new Dashboard(datastoreSpy, { id: '1' })
    dashboards = [dashboard]
    datastoreSpy = jasmine.createSpyObj('DatastoreService', ['findAll', 'createRecord', 'deleteRecord'])
    datastoreSpy.findAll.and.returnValue(of(new JsonApiQueryData(dashboards)))

    const unsavedDash = new Dashboard(datastoreSpy)
    datastoreSpy.createRecord.and.returnValue(unsavedDash)
    spyOn(unsavedDash, 'save').and.returnValue(of(dashboard))

    datastoreSpy.deleteRecord.and.returnValue(of({} as Response))

    organizationServiceSpy = jasmine.createSpyObj('OrganizationService', ['fetchCurrent'])
    organizationServiceSpy.fetchCurrent.and.returnValue(of(currentOrg))

    TestBed.configureTestingModule({
      providers: [
        { provide: DatastoreService, useValue: datastoreSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: OrganizationService, useValue: organizationServiceSpy },
        { provide: FrontendLibConfigService, useValue: libConfigStub }
      ],
    })
    service = TestBed.get(DashboardService)
  })

  itDefinesBehaviourSubjectAccessors(() => service, 'dashboards', dashboards)

  describe('fetchAll()', () => {
    it('should fetch & emit dashboards', () => {
      service.fetchAll().subscribe(res => expect(res).toEqual(dashboards))
      expect(datastoreSpy.findAll).toHaveBeenCalledWith(Dashboard, {
        filter: { 'owner_id.in': user.id }
      })
    })

    itMulticastsToObservers(() => service.fetchAll(), 2, (sub) => {
      service.dashboards = [...dashboards]
      sub.unsubscribe()
      service.dashboards = [...dashboards]
    })

    it('should cache the observable result', () => {
      service.fetchAll().subscribe()
      service.fetchAll().subscribe()
      service.fetchAll().subscribe()
      expect(datastoreSpy.findAll).toHaveBeenCalledTimes(1)
    })
  })

  describe('add(dashboard: Dashboard)', () => {
    it('adds dashboard to dashboard state', () => {
      service.add(dashboard)
      const dash2 = new Dashboard(datastoreSpy, { name: 'bro' })
      service.add(dash2)
      expect(service.dashboards).toEqual([dashboard, dash2])
    })
  })

  describe('remove(dashboardId: string)', () => {
    it('removes dashboard from dashboard state', () => {
      service.add(dashboard)
      const dash2 = new Dashboard(datastoreSpy, { name: 'bro' })
      service.add(dash2)
      service.remove(dashboard.id)
      expect(service.dashboards).toEqual([dash2])
    })
  })

  describe('create(params: DashboardCreateParams)', () => {
    beforeEach(() => spyOn(service, 'add'))

    it('should create the dashboard and update the dashboards state', () => {
      service.create({ name: 'cool dash' }).subscribe(res => expect(res).toEqual(dashboard))
      expect(datastoreSpy.createRecord).toHaveBeenCalledWith(Dashboard, {
        name: 'cool dash',
        owner: user,
        organization_ids: [currentOrg.uid],
        settings: {
          currency: libConfigStub.currency
        }
      })
      expect(service.add).toHaveBeenCalledWith(dashboard)
    })
  })

  describe('destroy(id: string)', () => {
    beforeEach(() => spyOn(service, 'remove'))
    fit('should destroy the dashboard and remove from state', () => {
      service.destroy(dashboard.id).subscribe()
      expect(datastoreSpy.deleteRecord).toHaveBeenCalledWith(Dashboard, dashboard.id)
      expect(service.remove).toHaveBeenCalledWith(dashboard.id)
    })
  })
})
