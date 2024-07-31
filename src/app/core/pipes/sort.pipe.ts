import { Pipe, PipeTransform } from '@angular/core';

export interface sortProps {
  key?: string;
  dir?: 'asc' | 'des' | undefined;
}

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {
  transform<T>(value: T[], order: 'asc' | 'desc' = 'asc', field?: keyof T): T[] {
    if (!value) return [];
    if (value.length <= 1) return value;
    if (!!field && typeof value[0] === 'object' && value[0]?.[field as keyof typeof value[0]]) {
      return value.sort((a, b) => {
        if (order === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        } else if (order === 'desc') {
          return a[field] < b[field] ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    return value.sort((a, b) => {
      if (order === 'asc') {
        return a > b ? 1 : -1;
      } else if (order === 'desc') {
        return a < b ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
