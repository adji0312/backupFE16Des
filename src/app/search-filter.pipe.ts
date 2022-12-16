import { Pipe, PipeTransform } from '@angular/core';
import { SearchModel, User } from './user/user';

@Pipe({
  name: 'searchFilter',
  pure: false
})
export class SearchFilterPipe implements PipeTransform {

  transform(users: User[], search: SearchModel): any {
    // console.log(search, 'd');
    //tidak ada data
    if(!users || users.length === 0) return users;

    // blank search
    if(!search || !search.user_id && !search.user_name && !search.role) return users;

    // debugger;
    // console.log(search);

    return users.filter((user) => {
      // console.log(user.user_name);
        return (!search.user_id || user.user_id.toLowerCase().includes(search.user_id)) &&
            (!search.user_name || user.user_name.toLowerCase().includes(search.user_name)) && 
            (!search.role || user.role.role_name.toLowerCase().includes(search.role));
    })
  }
}
