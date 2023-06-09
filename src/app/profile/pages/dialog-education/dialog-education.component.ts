import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { InstitutionType } from 'src/app/models/Education/InstitutionTypeDto';
import { addEducationDto } from 'src/app/models/Education/addEducationDto';
import { updateEducation } from 'src/app/models/Education/updateEducation';
import { ResponseDto } from 'src/app/models/response';
import { EducationService } from 'src/app/service/education.service';
import { fileHelper } from 'src/app/shared/fileHelper';

@Component({
  selector: 'app-dialog-education',
  templateUrl: './dialog-education.component.html',
  styleUrls: ['./dialog-education.component.css']
})
export class DialogEducationComponent implements OnInit {

  public formulario: FormGroup;
  InstitutionTypeList: InstitutionType[];
  updateDto: updateEducation;
  public previewDoc: string;
  public previewName: string;

  public files: any = [];

  isUpdate: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private educationService: EducationService,
    private dialogRef: MatDialogRef<DialogEducationComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {


    if (typeof this.data == "number") {

      this.formulario = this.formBuilder.group({
        institutionName: ['', [Validators.maxLength(30), Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
        degree: ['', [Validators.maxLength(30), Validators.required,Validators.pattern('[a-zA-Z ]*')]],
        admissionDate: ['', [Validators.required]],
        expeditionDate: ['', [Validators.required]],
        institutionType: ['', [Validators.required]]
      })
      this.formulario.setValidators(this.validatorDate());


    } else {
      this.isUpdate = true;
      this.updateDto = this.data;

      this.formulario = this.formBuilder.group({

        institutionName: [data.institutionName, [Validators.maxLength(30), 
          Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
        degree: [data.degree, [Validators.maxLength(30), Validators.required,Validators.pattern('[a-zA-Z ]*')]],
        admissionDate: [this.formatoFecha(data.admissionDate), [Validators.required]],
        expeditionDate: [this.formatoFecha(data.expeditionDate), [Validators.required]],
        institutionType: [data.idInstitutionType, [Validators.required]]
      });
      //poner el validator al fomrulario entero
      this.formulario.setValidators(this.validatorDate());
    }
  }

  ngOnInit(): void {
    this.getEducationType();
  }

  update() {
    event?.preventDefault()
    if (this.formulario.valid) {
      const data: updateEducation = {
        id: this.data.id,
        InstitutionName: this.formulario.value.institutionName,
        Degree: this.formulario.value.degree,
        AdmissionDate: this.formulario.value.admissionDate,
        ExpeditionDate: this.formulario.value.expeditionDate,
        IdInstitutionType: this.formulario.value.institutionType
      };
      this.educationService.Update(data).subscribe({
        next: (dataResponse: ResponseDto) => {
          this.dialogRef.close(dataResponse.message);
        }, error: () => console.error('ocurrio un error inesperado')
      })
    }

  }

  create() {
    event?.preventDefault()
    if (this.formulario.valid) {
      const data: addEducationDto = {
        InstitutionName: this.formulario.value.institutionName,
        Degree: this.formulario.value.degree,
        AdmissionDate: this.formulario.value.admissionDate,
        ExpeditionDate: this.formulario.value.expeditionDate,
        IdInstitutionType: this.formulario.value.institutionType,
        IdProfile: this.data
      };
      this.educationService.Insert(data).subscribe({
        next: (dataResponse: ResponseDto) => {
          this.dialogRef.close(dataResponse.message);
        }, error: () => console.error('ocurrio un error inesperado')
      })
    }
  }

  getEducationType() {
    this.educationService.GetAllInstitutionType().subscribe({
      next: (data: ResponseDto) => {
        this.InstitutionTypeList = data.result;
      }
    })
  }

  formatoFecha(fechaConvertir: Date): string {

    const fecha = new Date(fechaConvertir);
    const formatoFinal = fecha.toISOString().split('T')[0];
    return formatoFinal;
  }

  validatorDate(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const admissionDate = formGroup.get('admissionDate').value;
      const expeditionDate = formGroup.get('expeditionDate').value;
      if (admissionDate <= expeditionDate) return null;
      return { dateComparison: true };

    };
  }


    //CV
    captureFile(event: any): any {

      const archivoCapturado = event.target.files[0];
      fileHelper.extraerBase64(archivoCapturado)
        .then((img: any) => {
  
          this.previewDoc = img.base;
          this.previewName = fileHelper.truncateString(archivoCapturado.name, 10);

        });
      this.files.push(archivoCapturado);
      console.log();
    }

   

    
}

