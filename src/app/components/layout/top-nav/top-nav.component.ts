import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopNavService } from 'src/app/services/layout/top-nav.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor(
    private router: Router, 
    private eventService: TopNavService
  ) { }

  ngOnInit(): void {
  }

  goToSigninPage() {
    this.router.navigate(['signin']);
    this.eventService.hide(false)
  }

}
