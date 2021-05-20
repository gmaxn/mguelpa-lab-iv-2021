import { Component, OnInit } from '@angular/core';
import { Specialist } from 'src/app/models/specialist';
import { SpecialistService } from 'src/app/services/specialist/specialist.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  public users: any;
  private errorMessage: string = '';

  constructor(
    private ss: SpecialistService
    
  ) { }

  ngOnInit(): void {
    this.ss.getAllUsers().subscribe({
      next: users => {
        this.users = users.filter(u => u.claims.roles.includes('specialist'));
        console.log(this.users);
      }, 
      error: err => this.errorMessage = err
    });
  }

  changeStatus(user:any) {
    const uid = user.claims.uid;
    const status = !user.claims.isActiveUser;

    this.ss.updateStatus(uid, status);
  }

  // eventCheck(event:any) {

  //   //console.log(event.target.checked);

  //   let userId = event.target.id
  //   let privilegeId;
  //   switch(event.target.name)
  //   {
  //     case "Admin": 
  //     privilegeId = 1;
  //     break;
  //     case "User":
  //     privilegeId = 11;
  //     break;
  //     case "Employee":
  //     privilegeId = 21;
  //     break;
  //   }
  //   let status = event.target.checked ? 1 : 0;
  

  
  //   this.userService.updatePrivileges(userId, privilegeId, status).subscribe(
  //     () => {
  //       //this.router.navigate(['/home']);
  //     },
  //     (error) => {
  //       // this.showAddError = true;
  //       console.log(error);
  //     }
  //   );

  // }

  // onSubmit() {

  // }

}
