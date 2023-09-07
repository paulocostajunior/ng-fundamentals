import { Injectable } from "@angular/core";

declare let toastr: any

@Injectable()
export class ToastrService {
    success(message: string, title?: string) {
        return toastr.success(message, title)
    }
    warning(message: string, title?: string) {
        return toastr.warning(message, title)
    }
    info(message: string, title?: string) {
        return toastr.info(message, title)
    }
    error(message: string, title?: string) {
        return toastr.error(message, title)
    }
}