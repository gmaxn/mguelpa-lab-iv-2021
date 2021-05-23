import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNameEventService } from 'src/app/services/layout/route-name-event.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  constructor(
    private routeName: RouteNameEventService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  redirect(mode:string) {
    const route = this.router.config.filter(c => c.path == 'signup')[0];
    switch (mode) {
      case 'specialist':
        route.data = { animation: 'SpecialistRegistration' }
        this.routeName.emitChange('specialist');
        this.router.navigate(['signup']);
        break;

      case 'patient':
        route.data = { animation: 'PatientRegistration' }
        this.routeName.emitChange('patient');
        this.router.navigate(['signup']);
        break;
    }
  }
}
