import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-update-password-profile',
  templateUrl: './update-password-profile.component.html',
  styleUrls: ['./update-password-profile.component.css']
})
export class UpdatePasswordProfileComponent implements OnInit {

  formUpdatePass: FormGroup;

  constructor(
    private auth: AuthService,
    private formB: FormBuilder,
  ) {
    this.formUpdatePass = this.formB.group({
      confirmPass: ['', Validators.required],
      currentPass: ['', Validators.required],
      newPass: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)]]
    },{validator: this.checkPassword});
  }

  ngOnInit(): void {
  }

  updatePassword(){
    
  }

  checkPassword(group: FormGroup) {
    const _newPass = group.get("newPass").value;
    const _confirmPass = group.get("confirmPass").value;
    if(_newPass!==_confirmPass){
      group.get("confirmPass").setErrors({notSame:true});
    }else{
      group.get("confirmPass").setErrors(null)
    }
  }

}

