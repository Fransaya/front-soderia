import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailServicesService {

  private serviceID = 'service_4i5wg4h';
  private templateID = 'template_5dbguqs';
  private userID = 'pC9Qaj5YE1AZkSJ_s';

  constructor() { }

  sendEmail(templateParams: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceID, this.templateID, templateParams, this.userID);
  }
}
