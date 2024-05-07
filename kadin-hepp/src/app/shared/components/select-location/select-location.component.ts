import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CitiesService } from '../../services/cities.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { take } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserLocationService } from '../../services/user-location.service';
import { UserLocation } from '../../models/user-location';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss'],
})
export class SelectLocationComponent implements OnInit {
  constructor(
    private citiesService: CitiesService,
    private uls: UserLocationService,
    private as: AuthService,
    private ddref: DynamicDialogRef,
    private cdr: ChangeDetectorRef
  ) {}

  cities: any;
  neighborhoods: any;

  selectedCity: any;
  selectedDistrict: any;
  selectedHood: any;

  userLocation: UserLocation | null = null;

  ngOnInit(): void {
    this.citiesService.getCities().subscribe((res) => {
      console.log(res);
      this.cities = res;
    });

    this.userLocation = this.uls.activeUserLocation$.getValue();

    this.selectedCity = this.userLocation?.location.city;
    this.selectedDistrict = this.userLocation?.location.district;
    this.selectedHood = this.userLocation?.location.hood;

    if (this.selectedDistrict) {
      this.getNeighborhoods();
    }
  }

  getNeighborhoods() {
    console.log('abi');
    this.citiesService
      .getNeighborhoods(this.selectedDistrict.id)
      .subscribe((r) => {
        this.neighborhoods = r;
      });
  }

  editLocation() {
    const userıd = this.as.userState.getValue()?.user._id;
    console.log(userıd);
    if (this.selectedCity && userıd) {
      this.uls
        .editUserLocation({
          userId: userıd,
          location: {
            city: this.selectedCity,
            district: this.selectedDistrict,
            hood: this.selectedHood,
          },
        })
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            console.log(res);
            this.ddref.close();
          },
        });
    }
    console.log(this.selectedCity);
    console.log(this.selectedDistrict);
    console.log(this.selectedHood);
  }
}
