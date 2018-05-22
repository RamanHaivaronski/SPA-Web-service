import { createNamedTableReducer, tableReducer } from '@redux/common/table/reducer';
import { TableReducerNameSubscribers } from '@redux/common/table/types';

export const personsReducer = createNamedTableReducer(tableReducer, TableReducerNameSubscribers.PERSONS);