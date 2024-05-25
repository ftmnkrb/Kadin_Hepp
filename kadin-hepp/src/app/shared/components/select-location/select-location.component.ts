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
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserLocationService } from '../../services/user-location.service';
import { UserLocation } from '../../models/user-location';
import { PostLocation } from 'src/app/modules/homepage/models/post';

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
    private ddconf: DynamicDialogConfig,
    private cdr: ChangeDetectorRef
  ) {}

  cities: any;
  neighborhoods: any;

  selectedCity: any;
  selectedDistrict: any;
  selectedHood: any;

  userLocation: UserLocation | null = null;

  isForPost = false;

  ngOnInit(): void {
    this.citiesService.getCities().subscribe((res) => {
      this.cities = res;
    });

    const data = this.ddconf?.data;
    if (!data.isForPost) {
      this.userLocation = this.uls.activeUserLocation$.getValue();

      this.selectedCity = this.userLocation?.location.city;
      this.selectedDistrict = this.userLocation?.location.district;
      this.selectedHood = this.userLocation?.location.hood;
    } else {
      this.isForPost = true;
      this.selectedCity = data.l.il;
      this.selectedDistrict = data.l.ilce.value;
      this.selectedHood = data.l.mahalle.value;
    }

    if (this.selectedDistrict) {
      this.getNeighborhoods();
    }
  }

  getNeighborhoods() {
    this.citiesService
      .getNeighborhoods(this.selectedDistrict.id)
      .subscribe((r) => {
        this.neighborhoods = r;
      });
  }

  editLocation() {
    if (this.isForPost) {
      const value = {
        il: this.selectedCity,
        ilce: {
          il: this.selectedCity,
          value: this.selectedDistrict,
        },
        mahalle: {
          il: this.selectedCity,
          ilce: this.selectedDistrict,
          value: this.selectedHood,
        },
      };
      this.ddref.close(value);
      return;
    }

    const userıd = this.as.userState.getValue()?.user._id;
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
            this.ddref.close();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
