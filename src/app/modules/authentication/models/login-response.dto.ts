

export class LoginResponse {
  tokenExpirationDate!: Date;
  constructor(
    public id: number,
    public contactNo: string,
    public name: string,
    public userName: string,
    public password: string,
    public email: string,
    public positionId: number,
    public userUniqueId: string,
    public token: string,
    public tokenDuration: number,
    public userTypeId: number,
    public userImageUrl: string,
    // public permissions: PermissionDto[],
    public others: any,
    public userLocations: any,
    // public roles: Role[],
    public ghats: any[],
    public nid: string,
    public userId: number
  ) {}
}
