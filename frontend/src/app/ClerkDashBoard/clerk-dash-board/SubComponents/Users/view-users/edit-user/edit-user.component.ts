import { first } from 'rxjs/operators';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import UserDTO from '../../../../../../dto/UserDTO';
import { AccessService } from '../../../../../../service/access.service';
import swal from 'sweetalert';
import LocoDTO from '../../../../../../dto/LocoDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  Roles: string[] = [
    'Supervisor',
    'Service Manager',
    'Clerk',
    'Chief Engineer',
  ];
  places = [
    { id: 1, value: 'Electric Locomotive Shed' },
    { id: 2, value: 'Running Shed' },
    { id: 3, value: 'Chief Engineering Ratmalana' },
  ];

  editUserGroup: FormGroup;
  filesToUpload: Array<File> = [];
  isVisble = true;
  urls = new Array<string>();
  imagePreview: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef,
    private accessService: AccessService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editUserGroup = this.formBuilder.group({
      userEmail: [''],
      userName: [''],
      userGender: [''],
      appointmentDate: [''],
      address: [''],
      userWorks: [''],
      userNic: [''],
      userMobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+94-?)|0)?[0-9]{10}$')],
      ],
      userRole: [''],
    });

    this.getOneUser();
  }

  getOneUser() {
    if (this.data.id != '') {
      this.accessService
        .getUser(this.data.id)
        .pipe(first())
        .subscribe((res) => {
          if (res != undefined) {
            console.log(res);
            this.editUserGroup.controls['userEmail'].setValue(res[0].userEmail);
            this.editUserGroup.controls['userName'].setValue(res[0].userName);
            this.editUserGroup.controls['userGender'].setValue(
              res[0].userGender
            );
            this.editUserGroup.controls['appointmentDate'].setValue(
              res[0].appointmentDate
            );
            this.editUserGroup.controls['address'].setValue(res[0].address);
            this.editUserGroup.controls['userWorks'].setValue(res[0].userWorks);
            this.editUserGroup.controls['userMobile'].setValue(
              res[0].userMobile
            );
            this.editUserGroup.controls['userNic'].setValue(res[0].userNic);
            this.editUserGroup.controls['userRole'].setValue(res[0].userRole);
            this.imagePreview = res[0].image;
          }
        });
    } else if (this.data.userNic != '') {
      this.accessService
        .getUserByNic(this.data.userNic)
        .pipe(first())
        .subscribe((res) => {
          if (res != undefined) {
            console.log(res);
            this.editUserGroup.controls['userEmail'].setValue(res[0].userEmail);
            this.editUserGroup.controls['userName'].setValue(res[0].userName);
            this.editUserGroup.controls['userGender'].setValue(
              res[0].userGender
            );
            this.editUserGroup.controls['appointmentDate'].setValue(
              res[0].appointmentDate
            );
            this.editUserGroup.controls['address'].setValue(res[0].address);
            this.editUserGroup.controls['userWorks'].setValue(res[0].userWorks);
            this.editUserGroup.controls['userMobile'].setValue(
              res[0].userMobile
            );
            this.editUserGroup.controls['userNic'].setValue(res[0].userNic);
            this.editUserGroup.controls['userRole'].setValue(res[0].userRole);
            this.imagePreview = res[0].image;
          }
        });
    }
  }

  updateUser() {
    if (window.confirm('Are you sure?')) {
      this.accessService.editUser(this.editUserGroup.value).subscribe((res) => {
        if (res != null) {
          swal({
            title: 'Saved!',
            icon: 'success',
          });

          setTimeout(() => {}, 3000);
        } else {
          swal({
            title: 'Not Saved',
            icon: 'error',
          });
          setTimeout(() => {
            // this.refresh();
          }, 3000);
        }
      });
    }
  }

  changeFiles(event) {
    this.isVisble = !this.isVisble;
    this.filesToUpload = event.target.files as Array<File>;
    this.urls = [];
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (
            file.type === 'image/jpeg' ||
            file.type === 'image/jpg' ||
            file.type === 'image/png'
          ) {
            if (Number(e.total) > 2e6) {
              alert(
                'Please make sure that you entered image size is less than 2MB'
              );
              this.filesToUpload = [];
              return;
            } else {
              this.urls.push(e.target.result);
            }
          } else {
            alert('Supported formats: .JPEG .JPG .PNG');
            this.filesToUpload = [];
            return;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  uploadFile(event) {
    const fileEvnet = event.target.files[0];
    const uploadData = new FormData();
    // uploadData.append('file', fileItem);
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.imagePreview = reader.result;
        this.imagePreview = reader.result as string;
        console.log(file.name);
        this.editUserGroup.patchValue({
          image: reader.result,
        });
      };
      this.cd.markForCheck();
    }
  }
}
