import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export type Severity = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  addSingle(
    severity: Severity = 'success',
    summary: string = 'No Summary',
    detail?: string
  ) {
    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }

  // addMultiple() {
  //   this.messageService.addAll([
  //     {
  //       severity: 'success',
  //       summary: 'Service Message',
  //       detail: 'Via MessageService',
  //     },
  //     {
  //       severity: 'info',
  //       summary: 'Info Message',
  //       detail: 'Via MessageService',
  //     },
  //   ]);
  // }

  clear() {
    this.messageService.clear();
  }
}
