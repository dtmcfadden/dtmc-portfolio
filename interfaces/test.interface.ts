export interface IstatusCodeList {
	l: number; // low status code
	h: number; // high status code
}

export interface ISelUrl {
	selector: string;
	urlAttr: string;
}

export interface IRequestStatusCheckProp {
	component: React.ReactNode;
	statusCodeList: IstatusCodeList[];
	checkIsOkStatusCode?: boolean;
	selector: ISelUrl;
}

export interface IHrefLinkStatusCheckProp {
	component: React.ReactNode;
	statusCodeList: IstatusCodeList[];
	checkIsOkStatusCode: boolean;
}
export interface IRequestStatusCheck {
	url: string;
	status?: number | null;
	statusMatch: boolean | null;
	isOkStatusCode: boolean | null;
}
export interface IRequestStatusCheckReturn {
	[url: string]: IRequestStatusCheck;
}
