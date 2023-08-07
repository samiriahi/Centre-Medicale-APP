import { HttpStatusCode } from "@angular/common/http"

export interface CustomHttpRespone {
  httpStatusCode: number;
  httpStatus: string;
  reason: string;
  message: string;

}
