import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }
  url = 'https://script.google.com/macros/s/AKfycbwaa_p7tuk9JixDFOOprXVkKYA2CKsCpOeSv2Utnbe4is4EtFeU7O1jbyIxQMKCLrUdcg/exec';
  // sendFormData(data: any) {
  //   return this.http.post(this.url, data);
  // }

  sendFormData(data: any) {

    const body = new URLSearchParams();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        body.set(key, data[key]);
      }
    }

    return this.http.post(this.url, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'text' // Google Script risponde con testo, non JSON
    });
  }
}
