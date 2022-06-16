import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[selected]'
})
export class SelectedDirective {
  @HostBinding('class.item-task-toggle')  isOpen: any = false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
        
    }
    constructor(private elRef: ElementRef) {}
}