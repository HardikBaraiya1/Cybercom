import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/sevices/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userPersonalInfo:any;

  addMobileOn:boolean = false;
  addAddressOn:boolean = false;
  
  addressForm!: FormGroup;

  constructor(private userService: UserService,private formBuilder: FormBuilder){

  }


  ngOnInit(): void {
    // this.getData();
    this.getUserDetails();
    this.addressForm = this.formBuilder.group({
      address_line_1: ['', Validators.required],
      address_line_2: [''], // Not required
      landmark: [''], // Not required
      isDefault: [false], // Not required
      city: ['', Validators.required]
    });
  }

  // async getData() {
  //   const storedPersonalInfo = localStorage.getItem('userPersonalInfo');
  //   if (storedPersonalInfo) {
  //     this.userPersonalInfo = JSON.parse(storedPersonalInfo);
  //   } else {
  //     localStorage.setItem('userPersonalInfo', JSON.stringify(this.userPersonalInfo));
  //   }
  // }

  getUserDetails(){
      this.userService.getUserDetails().subscribe({
        next: (res:any)=>{
          this.userPersonalInfo = res;
          console.log(this.userPersonalInfo, typeof(this.userPersonalInfo));
        },
        error: (err:any)=>{
          console.log(err);
        }
      })
  }


  addMobile = () => this.addMobileOn =true;
  addAddress = () => this.addAddressOn =true;

  addMobileSubmit(){
    const id = this.userPersonalInfo.id;
    // const newNumber = this.userPersonalInfo.mobile_number;
    const data = {
      "mobile_number": this.userPersonalInfo.mobile_number
  }
      this.userService.updateMobile(id,data).subscribe({
        next: (res:any) =>{
          console.log(res)
          this.addMobileOn = false;
        },
        error: (err:any) =>{
          console.log(err)
        }
      })
  }

  addAddressSubmit(){
    
    if (this.addressForm.valid) {
        // Form is valid, prepare data
        const formData = {
          data: {
            user_details: 5,
            address_line_1: this.addressForm.value.address_line_1,
            address_line_2: this.addressForm.value.address_line_2,
            landmark: this.addressForm.value.landmark,
            isDefault: this.addressForm.value.isDefault,
            city: this.addressForm.value.city
          }
        };
  
        console.log('Form data:', formData);
        // Here you can proceed with further actions like submitting the data to an API
      } else {
        // Form is invalid, display error or prevent submission
        console.log('Please fill out all required fields.');
        console.log(this.addressForm.errors);
        
      }
    

    const data = {
      "data": {
        "user_details": 5,
        "address_line_1": "Vikas Nagar",
        "address_line_2": " Near Vraj Garden",
        "landmark": "Raju Chock",
        "isDefault": true,
        "city": 1
      }}
  }

  saveChanges() {
    // You can perform save operation here
  }
}

