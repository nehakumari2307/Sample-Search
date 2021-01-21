import { SearchStatus } from 'Common/Constants';
import { IRoleDef } from './Role';

export interface RoleListProp {
  roleDefs: RoleListReduxProp;
  theme?: any;
}

export interface RoleListReduxProp {
  result: IRoleDef[];
  status: SearchStatus;
  message: string;
}
