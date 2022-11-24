import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class FlashService {
  constructor(private toast: ToastrService) {}

  error(message: string, title: string) {
    this.toast.error(message, title, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }
  success(message: string, title: string) {
    this.toast.success(message, title, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }
  info(message: string, title: string) {
    this.toast.info(message, title, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }
  warning(message: string, title: string) {
    this.toast.warning(message, title, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }
}
