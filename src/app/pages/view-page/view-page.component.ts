import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './view-page.component.html',
  styleUrl: './view-page.component.scss'
})
export class ViewPageComponent {
  constructor(public router: Router, public route: ActivatedRoute, private http: HttpClient) { }

  coverPhotoPreviewSrc: string = ""
  profilePhotoPreviewSrc: string = ""

  usernameValue: string = "usernameValue"
  nicknameValue: string = "nicknameValue"
  firstnameValue: string = "firstnameValue"
  lastnameValue: string = "lastnameValue"
  positionValue: string = "positionValue"
  nationalityValue: string = "nationalityValue"
  telephoneNumberValue: string = "telephoneNumberValue"
  startingDateValue: string = "startingDateValue"

  addressValue: string = "addressValue"
  subDistrictValue: string = "subDistrictValue"
  districtValue: string = "districtValue"
  provinceValue: string = "provinceValue"
  postalCodeValue: string = "postalCodeValue"
  facebookValue: string = "facebookValue"
  lineIDValue: string = "lineIDValue"
  instagramValue: string = "instagramValue"

  educations: { "year": string, "name": string }[] = []
  experiences: { "detail": string, "position": string }[] = []
  skills: { "name": string, "level": number }[] = []
  interests: string[] = []
  guildInformationList: string[] = []

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      if (!name) {
        this.router.navigate(['/'], { replaceUrl: true });
      } else {
        console.log('Name:', name);
        this.http.get('http://localhost:3000/view/' + name).subscribe(
          (res) => {
            if (!isViewType(res)) {
              alert("response not correct type")
              return
            }

            this.coverPhotoPreviewSrc = res.cover ? res.cover : ""
            this.profilePhotoPreviewSrc = res.profile ? res.profile : ""

            this.usernameValue = res.data.username
            this.nicknameValue = res.data.nickname
            this.firstnameValue = res.data.firstname
            this.lastnameValue = res.data.lastname
            this.positionValue = res.data.position
            this.nationalityValue = res.data.nationality
            this.telephoneNumberValue = res.data.telephoneNumber
            this.startingDateValue = res.data.startingDate

            this.addressValue = res.data.address
            this.subDistrictValue = res.data.subDistrict
            this.districtValue = res.data.district
            this.provinceValue = res.data.province
            this.postalCodeValue = res.data.postalCode
            this.facebookValue = res.data.facebook
            this.lineIDValue = res.data.lineID
            this.instagramValue = res.data.instagram

            this.educations = res.data.educations
            this.experiences = res.data.experiences
            this.skills = res.data.skills
            this.interests = res.data.interests
            this.guildInformationList = res.data.guild
          },
          (err) => {
            console.log(err)
            if (!(err instanceof HttpErrorResponse)) {
              alert("something went wrong")
              console.log(err)
              return
            }
            if (err.status === 404) {
              alert("name not found")
              this.router.navigate(['/'], { replaceUrl: true })
            }
          }
        )
      }
    });
  }
}

interface viewData {
  "username": string,
  "nickname": string,
  "firstname": string,
  "lastname": string,
  "position": string,
  "nationality": string,
  "telephoneNumber": string,
  "startingDate": string,

  "address": string,
  "subDistrict": string,
  "district": string,
  "province": string,
  "postalCode": string,
  "facebook": string,
  "lineID": string,
  "instagram": string,

  "educations": { "year": string, "name": string }[],
  "experiences": { "detail": string, "position": string }[],
  "skills": { "name": string, "level": number }[],
  "interests": string[],
  "guild": string[]
}

interface viewType {
  profile: string,
  cover: string,
  data: viewData
}

function isViewType(obj: unknown): obj is viewType {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const viewObj = obj as viewType;

  return 'profile' in viewObj &&
    'cover' in viewObj &&
    'data' in viewObj &&
    isViewData(viewObj.data);
}

function isViewData(obj: unknown): obj is viewData {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const viewDataObj = obj as viewData;

  return 'username' in viewDataObj &&
    'nickname' in viewDataObj &&
    'firstname' in viewDataObj &&
    'lastname' in viewDataObj &&
    'position' in viewDataObj &&
    'nationality' in viewDataObj &&
    'telephoneNumber' in viewDataObj &&
    'startingDate' in viewDataObj &&
    'address' in viewDataObj &&
    'subDistrict' in viewDataObj &&
    'district' in viewDataObj &&
    'province' in viewDataObj &&
    'postalCode' in viewDataObj &&
    'facebook' in viewDataObj &&
    'lineID' in viewDataObj &&
    'instagram' in viewDataObj &&
    'educations' in viewDataObj &&
    'experiences' in viewDataObj &&
    'skills' in viewDataObj &&
    'interests' in viewDataObj &&
    'guild' in viewDataObj;
}

function numberArrayToBase64(numbers: number[]): string {
  // Convert the number array to a Uint8Array
  const uint8Array = new Uint8Array(numbers);
 
  // Convert the Uint8Array to a Base64 string
  let binary = '';
  const len = uint8Array.byteLength;
  for (let i = 0; i < len; i++) {
     binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
 }