interface ListFilters {
	isDeleted?: boolean;
	includeDeleted?: boolean;
}

export interface GetAllUsersFilters extends ListFilters {}
export interface GetAllSessionFilters extends ListFilters {}
export interface GetAllAccountFilters extends ListFilters {}
