import { TestBed } from '@angular/core/testing'

import { DashboardService } from './dashboard.service'
import { Dashboard, User } from '../../_models'
import { DatastoreService } from '../datastore/datastore.service'
import { of } from 'rxjs'
import { JsonApiQueryData } from 'angular2-jsonapi'
import { itDefinesBehaviourSubjectAccessors, itMulticastsToObservers } from '../../../../testing/shared-examples'
import { UserService } from '../user/user.service'

describe('DashboardService', () => {
  let service: DashboardService
  let datastoreSpy: jasmine.SpyObj<DatastoreService>
  let userServiceSpy: { user: User }
  let dashboards: Dashboard[]

  const user = new User(undefined, { id: '1' })

  beforeEach(() => {
    // Stubbing getter
    userServiceSpy = { user }

    dashboards = [new Dashboard(datastoreSpy, { id: '1' })]
    datastoreSpy = jasmine.createSpyObj('DatastoreService', ['findAll'])
    datastoreSpy.findAll.and.returnValue(of(new JsonApiQueryData(dashboards)))

    TestBed.configureTestingModule({
      providers: [
        { provide: DatastoreService, useValue: datastoreSpy },
        { provide: UserService, useValue: userServiceSpy }
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
})
