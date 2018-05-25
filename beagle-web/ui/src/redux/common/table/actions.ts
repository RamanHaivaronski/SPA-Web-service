import { createAction } from 'typesafe-actions';
import {
  TableActions,
  Pagination,
  DataType,
} from './types';

export const loadData = (prefix: string) => createAction(`${prefix}/${TableActions.LOAD_DATA}`, resolve => {
  return (pagination: Pagination) => resolve({ pagination })
});

export const loadDataSuccess = (prefix: string) => createAction(`${prefix}/${TableActions.LOAD_DATA_SUCCESS}`, resolve => {
  return (data: DataType, pagination: Pagination) => resolve({ data, pagination })
});

export const loadDataFailure = (prefix: string) => createAction(`${prefix}/${TableActions.LOAD_DATA_FAILURE}`, resolve => {
  return (error: string) => resolve({ error })
});

export const searchData = (prefix: string) => createAction(`${prefix}/${TableActions.SEARCH_DATA}`, resolve => {
  return (value: string) => resolve({ value })
});

export const removeData = (prefix: string) => createAction(`${prefix}/${TableActions.REMOVE_DATA}`, resolve => {
  return (id: string) => resolve({ id })
});