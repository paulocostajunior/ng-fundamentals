import { Component, OnInit } from '@angular/core'
import { Form, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em {float: right; color: #E05C65; padding-left: 10px;}
    .error input {background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder {color: #999;}
    .error ::-moz-placeholder {color: #999;}
    .error :-moz-placeholder {color: #999;}
    .error :ms-input-placeholder {color: #999;}
  `]
})

export class ProfileComponent implements OnInit{
  profileForm!: FormGroup
  private firstName!: FormControl
  private lastName!: FormControl

  constructor(private router: Router, private auth: AuthService) { }
  
  ngOnInit(): void {
    this.firstName = new FormControl(this.auth.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.lastName = new FormControl(this.auth.currentUser.lastName, Validators.required)

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  cancel() {
    this.router.navigate(['events'])
  }

  saveProfile(formValues:any) {
    if (this.profileForm.valid) {
      this.auth.updateCurrentUser(formValues.firstName, formValues.lastName)
    }
  }

  validateFirstName():boolean {
    if (this.firstName.invalid) {
      return false
    }
    return true
  }

  validateLastName() {
    if (this.lastName.invalid) {
      return false
    }
    return true
  }

    validateFirstNameCharacter() {
      if (this.firstName.hasError('pattern')) {
        return false
      }
      return true
    }
  }