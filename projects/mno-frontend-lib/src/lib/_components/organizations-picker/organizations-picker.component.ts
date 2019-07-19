import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core'
import { OrganizationService } from '../../_services'
import { Organization } from '../../_models'
import { Subscription } from 'rxjs'

@Component({
  selector: 'mno-organizations-picker',
  templateUrl: './organizations-picker.component.html'
})
export class OrganizationsPickerComponent implements OnInit, OnDestroy {
  organizations: Organization[]
  selectedOrgs: Organization[]
  orgsSub: Subscription

  @Input() selectedUids: string[]
  @Output() changed = new EventEmitter<Organization[]>()

  constructor(private organizationsService: OrganizationService) { }

  ngOnInit() {
    this.orgsSub = this.organizationsService.fetchAll().subscribe(orgs => {
      this.organizations = orgs
      this.selectedOrgs = orgs.filter(org => this.selectedUids.includes(org.uid))
    })
  }

  ngOnDestroy(): void {
    this.orgsSub.unsubscribe()
  }

  canRemoveOrgs(): boolean {
    return this.selectedOrgs.length > 1
  }

  disabledOption(orgUid: string): boolean {
    return !this.canRemoveOrgs() && !!this.selectedOrgs.find(org => org.uid === orgUid)
  }

  onChange(orgs: Organization[]) {
    this.changed.emit(orgs)
  }
}
