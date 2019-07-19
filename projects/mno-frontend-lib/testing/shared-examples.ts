import { fakeAsync, tick } from '@angular/core/testing'
import { Observable, Subscription, BehaviorSubject } from 'rxjs'
import { finalize } from 'rxjs/operators'


// For methods that return behaviour subjects / subjects that are not completed, and continually
// emit results to subscribers until unsubscribed.
export function itMulticastsToObservers(
  method: () => Observable<any>,
  times: number,
  cb: (sub: Subscription) => void
) {
  describe('multicasting new results to observers until unsubscribed', () => {
    itNotifiesSubscriptionTimes(method, times, (sub) => {
      // Mock async, delay by 1 sec
      tick(1000)
      // Callback should emit more results to internal BehaviourSubject & unsubscribe
      // to result in the expected number of notifications.
      cb(sub)
    })
  })
}

export function itNotifiesSubscriptionTimes(
  method: () => Observable<any>,
  times: number,
  cb: (sub: Subscription) => void
) {
  it(`observable subscription is invoked ${times} times`, fakeAsync(() => {
    let invoked = 0
    const sub = method().subscribe(_res => {
      invoked++
    })
    cb(sub)
    expect(invoked).toEqual(times)
  }))
}

export function itFinalizesObservable(method: () => Observable<any>) {
  it('fires a completion event', () => {
    let invoked = 0
    method().pipe(finalize(() => invoked++)).subscribe()
    expect(invoked).toEqual(1)
  })
}

export function itDefinesBehaviourSubjectAccessors(
  service: () => any,
  accessor: string,
  value: any
) {
  describe('Accessors', () => {
    it(`gets and sets ${accessor}'s`, () => {
      service()[accessor] = value
      expect(service()[accessor]).toEqual(value)
      expect(service()[`_${accessor}`].getValue()).toEqual(value)
    })
  })
}

export function itIncludesProperties(obj: object, props: string[]) {
  it('should have properties', () => {
    expect(Object.getOwnPropertyNames(obj)).toEqual(jasmine.arrayContaining(props))
  })
}
