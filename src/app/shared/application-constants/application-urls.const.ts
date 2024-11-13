import { read } from 'xlsx';
import { environment } from '../../../environment/environment';

export const applicationUrls = {
  authentication: {
    create: 'create-permission',
    read: 'read-permissions',
    update: 'update-permission',
    delete: 'delete-permission',
  },
  authorization: {
    create: 'create-permission',
    read: 'read-permissions',
    update: 'update-permission',
    delete: 'delete-permission',
  },
  user: {
    login: environment.baseApiUrl + 'api/v1/auth/login',
    register: environment.baseApiUrl + 'api/v1/auth/register',
  },
  product: {
    create: environment.baseApiUrl + 'api/v1/product',
    read: environment.baseApiUrl +'api/v1/product',
    readById: environment.baseApiUrl +'api/v1/product/',
    update: environment.baseApiUrl +'api/v1/product',
    delete: environment.baseApiUrl +'api/v1/product/',
  },

};
