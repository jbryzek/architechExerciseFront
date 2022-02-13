import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../services/user.service";

@Component({
  selector: "my-app",
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  output!: String;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Za-z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).+$/)]]
    });
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.userService.register(this.registerForm.value)
      .subscribe(
        data => {
          this.output = data;
        });
  }

  getErrorUsername() {
    return this.registerForm.get('username')!.hasError('required') ? 'Username is required' :
      this.registerForm.get('username')!.hasError('pattern') ? 'Username must be alpha-numeric' :
        this.registerForm.get('username')!.hasError('minlength') ? 'Username must be at least 5 characters' : '';
  }

  getErrorPassword() {
    return this.registerForm.get('password')!.hasError('required') ? 'Password is required' :
      this.registerForm.get('password')!.hasError('minlength') ? 'Username must be at least 8 characters' :
        this.registerForm.get('password')!.hasError('pattern') ? 'Password must contain at least 1 number, 1 uppercase, 1 lowercase' : '';
  }
}
