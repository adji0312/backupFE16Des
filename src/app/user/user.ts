// import { Page } from "src/model/page";
import { Role } from "../role/role";

export class User{
    id!: number;
    created_by!: string;
    created_date!: Date;
    modify_by!: string;
    modify_date! : Date;
    user_id!: string;
    user_name!: string;
    user_desc!: string;
    role: Role = new Role;
    password!: string;

  //   toString(): string {
  //     return this.user_name + ' ' + this.user_desc + ' ' + this.role.role_name;
  // }
}

export class SearchModel {
  user_id!: string;
  user_name!: string;
  role!: string;
}
