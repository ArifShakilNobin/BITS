export class ServerResponse {
  constructor(
    public timestamp: Date,
    public status: number,
    public success: boolean,
    public message: string,
    public data: any,
    public count: number
  ) { }
}
export class LoginServerResponse {
  constructor(
    public Success?: boolean,
    public Message?: string,
    public Data?: any,
    public Count?: number
  ) { }
}


export interface ApiResponse {
  success: boolean;
  message: string;
  data: any;
  count?: number;
}
