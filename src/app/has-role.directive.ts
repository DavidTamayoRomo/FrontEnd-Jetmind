import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ACLServiceService } from './acl/aclservice.service';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective {

  roles: string[];

  constructor(
    private aclService: ACLServiceService,
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input()
  set hasRole(val: any) {
    this.roles = Array.isArray(val) ? val : [val];
    this.updateView();
  }

  private updateView() {
    if (this.aclService.isRole(this.roles)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
