import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UserRB } from '../shared/classes/userRB';
import { DateService } from '../shared/services/date.service';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    userName: string;
    password: string;

    constructor(private authService: AuthService, private dateService: DateService) { }

    ngOnInit() { }

    login() {
        if (this.password && this.userName) {
            let user: UserRB = this.makeUser(this.password, this.userName);
            this.authService.login(user).subscribe(
                () => {
                    this.dateService.setNow();
                }
            );
        }
    }

    register() {
        if (this.password && this.userName) {
            let user: UserRB = this.makeUser(this.password, this.userName);
            this.authService.register(user);
        }
    }

    private makeUser(password: string, userName: string): UserRB { // toroljem ?
        let user: UserRB = {
            name: userName,
            password: password
        };

        return user;
    }
}