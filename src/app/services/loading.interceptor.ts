import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { ToolsService } from './tools.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(ToolsService);

  busyService.busy();

  return next(req).pipe(finalize(() => busyService.idle()));
};
