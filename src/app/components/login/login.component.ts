import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token: string;
  public identity: {};

  constructor(private _userService: UserService,
              private _router: Router,
              private _route: ActivatedRoute) {

    this.page_title = 'Iniciar sesión';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form) {

    Swal.fire({
      title: 'Espere',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this._userService.signup(this.user).subscribe(
      resp => {

        if (resp.status != 'error') {
          
          this.status = 'success';
          this.token = resp;

          this._userService.signup(this.user, true).subscribe(
            resp => {
              this.identity = resp;

              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              this._router.navigate(['inicio']);
              Swal.close();
            }
          )

        } else {
          this.status = 'error';

          Swal.fire({
            title: 'Inicio de sesión incorrecto, compruebe sus credenciales',
            icon: 'error'
          });
        }
      }, error => {

        Swal.fire({
          title: 'Ocurrió un error, inténtelo más tarde',
          icon: 'error'
        });
      }
    )
  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if (logout === 1) {

        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;
        this._router.navigate(['inicio']);
      } else {
        
      }
    })
  }

}
