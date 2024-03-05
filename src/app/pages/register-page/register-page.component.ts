import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  constructor(public router: Router,private http: HttpClient) { }

  coverPhotoPreviewSrc: string | ArrayBuffer | null = "nan"
  coverPhotoSrc: Blob | null = null;
  profilePhotoPreviewSrc: string | ArrayBuffer | null = "nan"
  profilePhotoSrc: Blob | null = null;
  educationInformationList: { "year": string, "name": string }[] = []
  experienceInformationList: { "detail": string, "position": string }[] = []
  skillInformationList: { "name": string, "level": number }[] = []
  interestInformationList: string[] = []
  guildInformationList: string[] = []

  addEducation(e: MouseEvent, year: HTMLInputElement, name: HTMLInputElement) {
    if (year.value === "" || name.value === "") {
      alert("ใส่ข้อมูลให้ครบทั้งปีและชื่อ")
      return
    }

    this.educationInformationList.push({ year: year.value, name: name.value })

    year.value = ""
    name.value = ""
  }

  removeEducation(e: MouseEvent, year: HTMLParagraphElement, name: HTMLParagraphElement) {
    const index = this.educationInformationList.findIndex((value) => {
      return (value.year === year.textContent && value.name === name.textContent)
    })
    if (index !== -1) {
      this.educationInformationList.splice(index, 1)
    }
  }

  addExperience(e: MouseEvent, detail: HTMLInputElement, position: HTMLInputElement) {
    if (detail.value === "" || position.value === "") {
      alert("ใส่ข้อมูลให้ครบทั้งรายละเอียดและตำแหน่ง")
      return
    }

    this.experienceInformationList.push({ detail: detail.value, position: position.value })

    detail.value = ""
    position.value = ""
  }

  removeExperience(e: MouseEvent, detail: HTMLParagraphElement, position: HTMLParagraphElement) {
    const index = this.experienceInformationList.findIndex((value) => {
      return (value.detail === detail.textContent && value.position === position.textContent)
    })
    if (index !== -1) {
      this.experienceInformationList.splice(index, 1)
    }
  }

  addSkill(e: MouseEvent, name: HTMLInputElement, level: HTMLInputElement) {
    if (name.value === "" || level.value === "" || parseInt(level.value) > 10 || parseInt(level.value) < 0) {
      alert("ใส่ข้อมูลให้ครบทั้งชื่อและระดับ และข้อมูลระดับไม่เกิน 10 และมากกว่า 0")
      return
    }

    this.skillInformationList.push({ name: name.value, level: parseInt(level.value) })

    name.value = ""
    level.value = ""
  }

  removeSkill(e: MouseEvent, name: HTMLParagraphElement, level: HTMLParagraphElement) {
    const index = this.skillInformationList.findIndex((value) => {
      return (value.name === name.textContent && value.level === parseInt(level.textContent ? level.textContent : "0"))
    })
    if (index !== -1) {
      this.skillInformationList.splice(index, 1)
    }
  }

  addInterest(e: MouseEvent, interest: HTMLInputElement) {
    if (interest.value === "") {
      alert("ไม่สามารถเว้นว่างได้")
      return
    }

    this.interestInformationList.push(interest.value)

    interest.value = ""
  }

  removeInterest(e: MouseEvent, interest: HTMLParagraphElement) {
    const index = this.interestInformationList.findIndex((value) => {
      return value === interest.textContent
    })

    if (index !== -1) {
      this.interestInformationList.splice(index, 1)
    }
  }

  addGuild(e: MouseEvent, guild: HTMLInputElement) {
    if (guild.value === "") {
      alert("ไม่สามารถเว้นว่างได้")
      return
    }

    this.guildInformationList.push(guild.value)

    guild.value = ""
  }

  removeGuild(e: MouseEvent, guild: HTMLParagraphElement) {
    const index = this.guildInformationList.findIndex((value) => {
      return value === guild.textContent
    })

    if (index !== -1) {
      this.guildInformationList.splice(index, 1)
    }
  }

  onUploadCoverPhoto(coverPhotoElement: HTMLInputElement) {
    if (coverPhotoElement.files === null || (coverPhotoElement.files as FileList).length !== 1) {
      alert("something went wrong coverPhotoElement file length")
      return
    }

    const file = coverPhotoElement.files[0]
    const reader = new FileReader();
    reader.onload = () => {
      this.coverPhotoPreviewSrc = reader.result;
      this.coverPhotoSrc = this.dataURItoBlob(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  onUploadProfilePhoto(profilePhotoElement: HTMLInputElement) {
    if (profilePhotoElement.files === null || (profilePhotoElement.files as FileList).length !== 1) {
      alert("something went wrong profilePhotoElement file length")
      return
    }

    const file = profilePhotoElement.files[0]
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePhotoPreviewSrc = reader.result;
      this.profilePhotoSrc = this.dataURItoBlob(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  submitData(
    username: HTMLInputElement,
    nickname: HTMLInputElement,
    firstname: HTMLInputElement,
    lastname: HTMLInputElement,
    position: HTMLInputElement,
    nationality: HTMLInputElement,
    telephoneNumber: HTMLInputElement,
    startingDate: HTMLInputElement,
    address: HTMLInputElement,
    subDistrict: HTMLInputElement,
    district: HTMLInputElement,
    province: HTMLInputElement,
    postalCode: HTMLInputElement,
    facebook: HTMLInputElement,
    lineID: HTMLInputElement,
    instagram: HTMLInputElement,
  ) {
    console.log("username value::",username.value)
    console.log("nickname value::",nickname.value)
    console.log("firstname value::",firstname.value)
    console.log("lastname value::",lastname.value)
    console.log("position value::",position.value)
    console.log("nationality value::",nationality.value)
    console.log("telephoneNumber value::",telephoneNumber.value)
    console.log("startingDate value::",startingDate.value)
    console.log("address value::",address.value)
    console.log("subDistrict value::",subDistrict.value)
    console.log("district value::",district.value)
    console.log("province value::",province.value)
    console.log("postalCode value::",postalCode.value)
    console.log("facebook value::",facebook.value)
    console.log("lineID value::",lineID.value)
    console.log("instagram value::",instagram.value)
    console.log("education value::",this.educationInformationList)
    console.log("experience value::",this.experienceInformationList)
    console.log("skill value::",this.skillInformationList)
    console.log("guild value::",this.guildInformationList)

    if(
      username.value === "" ||
      nickname.value === "" ||
      firstname.value === "" ||
      lastname.value === "" ||
      position.value === "" ||
      nationality.value === "" ||
      telephoneNumber.value === "" ||
      startingDate.value === "" ||
      address.value === "" ||
      subDistrict.value === "" ||
      district.value === "" ||
      province.value === "" ||
      postalCode.value === "" ||
      facebook.value === "" ||
      lineID.value === "" ||
      instagram.value === "" ||
      this.educationInformationList.length <= 0 ||
      this.experienceInformationList.length <= 0 ||
      this.skillInformationList.length <= 0 ||
      this.guildInformationList.length <= 0
    ){
      alert("ใส่ข้อมูลให้ครบ")
    }

    const postBody = {
      username:username.value,
      nickname:nickname.value,
      firstname:firstname.value,
      lastname:lastname.value,
      position:position.value,
      nationality:nationality.value,
      telephoneNumber:telephoneNumber.value,
      startingDate:startingDate.value,
    
      address:address.value,
      subDistrict:subDistrict.value,
      district:district.value,
      province:province.value,
      postalCode:postalCode.value,
      facebook:facebook.value,
      lineID:lineID.value,
      instagram:instagram.value,
    
      educations:this.educationInformationList,
      experiences:this.experienceInformationList,
      skills:this.skillInformationList,
      interests:this.interestInformationList,
      guild:this.guildInformationList
    }

    const formData = new FormData()
    formData.append('data',JSON.stringify(postBody))
    this.profilePhotoSrc && formData.append('profile',this.profilePhotoSrc) 
    this.coverPhotoSrc && formData.append('cover',this.coverPhotoSrc)

    this.http.post('http://localhost:3000/save',formData).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }
}

