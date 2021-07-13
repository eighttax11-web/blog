import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;

  constructor(private _userService: UserService) { 
    this.page_title = 'Registro';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {

    Swal.fire({
      title: 'Espere',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    
    this._userService.register(this.user).subscribe(
      resp => {

        if(resp.status == 'success') {
          
          this.status = resp.status

          Swal.fire({
            title: 'El registro se ha realizado correctamente',
            icon: 'success'
          });

          form.reset();
        
        } else {
          this.status = 'error'
        }

      }, error => {
        
        Swal.fire({
          title: 'Ocurrió un error, inténtelo más tarde',
          icon: 'success'
        });
        
        this.status = 'error'
      }
    );
  }
}
