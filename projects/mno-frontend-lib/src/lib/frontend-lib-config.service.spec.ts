import { TestBed } from '@angular/core/testing'

import { FrontendLibConfigService } from './frontend-lib-config.service'

describe('FrontendLibConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FrontendLibConfigService, useValue: 'FrontendLibConfig' }]
    })
  })

  it('should be an injectable provider service', () => {
    const service = TestBed.get(FrontendLibConfigService)
    expect(service).toBe('FrontendLibConfig')
  })
})
