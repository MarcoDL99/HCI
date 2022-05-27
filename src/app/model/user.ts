export class User{
    username: string;
    favouriteID: number;
    password: string;
    constructor(username: string, password: string) {
        this.username=username;
        this.password=password;
        this.favouriteID = -1;
      }
    getUsername(): string{
        return this.username;
    }
    getPassword(): string{
        return this.password;
    }
}