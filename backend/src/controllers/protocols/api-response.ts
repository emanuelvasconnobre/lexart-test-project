export class ApiResponse<T> {
  message: string;
  data: T;
  constructor(data: T, message: string = "Sucess") {
    this.message = message;
    this.data = data;
  }
}
