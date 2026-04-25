import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {

    window.location.href = '/inicio';
    return false;
  }

  return true;
};


// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


// import { CanActivateFn } from '@angular/router';
