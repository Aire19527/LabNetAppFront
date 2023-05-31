import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { AddProfileComponent } from './pages/add-profile/add-profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileSkillComponent } from './pages/profile-skill/profile-skill.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormBuilder,FormGroup,FormsModule,Validators } from '@angular/forms';


@NgModule({
  declarations: [
    AddProfileComponent,
    EditProfileComponent,
    ProfileSkillComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    FormsModule,
  ]
})
export class ProfileModule { }
