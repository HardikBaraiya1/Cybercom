import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/sevices/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userPersonalInfo: any;
  userAddress: any;
  addMobileOn: boolean = false;
  addAddressOn: boolean = false;

  // {
  //   "data": {
  //     "user_details": "string or id",
  //     "address_line_1": "string",
  //     "address_line_2": "string",
  //     "landmark": "string",
  //     "isDefault": true,
  //     "city": "string or id"
  //   }
  // };
  userAddressUpdate = {
    address_line_1: '',
    address_line_2: '',
    landmark: '',
    isDefault: false,
    cityId: null // Assuming you'll store the selected city's ID
  };
  selectedState: number = -1; // To store the selected state ID

  stateData : any;
  states: any[] = []; // Array to store states
  cities: any[] = []; // Array to store cities



  constructor(private userService: UserService) {

  }


  ngOnInit(): void {
    // this.getData();
    this.getUserDetails();
  }


  getStates() {
    this.userService.getStates().subscribe({
      next: (res: any) => {
        console.log('states: ', res);
        res.data.forEach((state: { id: any; attributes: { name: any; }; }) => {
          let tempData = {
            id: state.id,
            state_name: state.attributes.name
          }
          this.states.push(tempData);
        });
        console.log('states data: ', this.states);
        // this.states = res.data;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  getStateCities() {
    // const id =-1;
    console.log('state id: ',this.selectedState);
    if(this.selectedState != -1){
    // Make HTTP request to fetch cities based on the selected state
    this.userService.getCitiesFromState(this.selectedState).subscribe({
      next: (res: any) => {
        console.log('cities: ', res)
        res.data.forEach((city: { id: any; attributes: { name: any; }; }) => {
          let tempData = {
            id: city.id,
            city_name: city.attributes.name
          }
          this.cities.push(tempData);
        });
        console.log('cities data: ', this.cities)
        // this.cities = res.data;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
}

  // async getData() {
  //   const storedPersonalInfo = localStorage.getItem('userPersonalInfo');
  //   if (storedPersonalInfo) {
  //     this.userPersonalInfo = JSON.parse(storedPersonalInfo);
  //   } else {
  //     localStorage.setItem('userPersonalInfo', JSON.stringify(this.userPersonalInfo));
  //   }
  // }

  getUserDetails() {
    this.userService.getUserDetails().subscribe({
      next: (res: any) => {
        this.userPersonalInfo = res;
        console.log(this.userPersonalInfo, typeof (this.userPersonalInfo));
        this.userAddress = this.userPersonalInfo.user_addresses
        console.log(this.userAddress)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }


  addMobile = () => this.addMobileOn = true;
  addAddress = () => {
    this.getStates();
    this.getStateCities();
    this.addAddressOn = true;
  }

  addMobileSubmit() {
    const id = this.userPersonalInfo.id;
    // const newNumber = this.userPersonalInfo.mobile_number;
    const data = {
      "mobile_number": this.userPersonalInfo.mobile_number
    }
    this.userService.updateMobile(id, data).subscribe({
      next: (res: any) => {
        console.log(res)
        this.addMobileOn = false;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  addAddressSubmit() {
    // Implement your logic to submit the address data
    console.log('updates data are: ',this.userAddressUpdate);

    if(this.userAddressUpdate.address_line_1 != '' && this.userAddressUpdate.cityId != null){
      const userId = Number(JSON.parse(localStorage.getItem('user') || '').id);
    
      const cred = {
        "data": {
          "user_details": userId,
          "address_line_1": this.userAddressUpdate.address_line_1,
          "address_line_2": this.userAddressUpdate.address_line_2,
          "landmark": this.userAddressUpdate.landmark,
          "isDefault": this.userAddressUpdate.isDefault,
          "city": Number(this.userAddressUpdate.cityId)
        }
      }
      console.log(cred);
        this.userService.updateAddress(cred).subscribe({
          next: (res: any) => {
            console.log('address updated: ',res)
            this.addAddressOn = false;
            this.getUserDetails();
          },
          error: (err: any) => {
            console.log(err)
          }
        })
    }

  }



  saveChanges() {
    // You can perform save operation here
  }
}

