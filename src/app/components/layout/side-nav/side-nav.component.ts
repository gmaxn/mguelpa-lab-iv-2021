import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @HostListener('click', ['$event'])
  documentClick(event: any): void {
    let input: HTMLElement = (event.target as HTMLElement);

    if(input === this.elRef.nativeElement) {
      this.closeNav.emit(false);
    }
  }

  @Output() closeNav: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    
  }

}
