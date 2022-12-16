import { User } from "../user/user";

export class BacklogDevelopment{

  id!: number;
  created_by!: string;
  created_date!: Date;
  modify_by!: string;
  modify_date! : Date;
  application!: Date;
  backlog_type!: string;
  backlog_code!: string;
  backlog_bpro!: string;
  backlog_desc!: string;
  backlog_kickoff!: string;
  backlog_status!: string;
  backlog_start!: Date;
  backlog_end!: Date;
}
