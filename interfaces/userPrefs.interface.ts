export interface UserTheme {
	theme: UserThemePrefs;
}

export interface UserCustomTheme {
	useCustom: boolean;
	theme: UserThemePrefs;
}

export interface UserThemePrefs {
	isDark: boolean;
	useCustom: boolean;
	theme: ThemeTypes;
}

export interface ThemeTypes {
	0: ThemePrefs;
	1: ThemePrefs;
}

export interface ThemePrefs {
	variant: VariantColor;
	page: DefaultColor;
	bg: DefaultColor;
	text: TextColor;
	button: ButtonColor;
	border: BorderColor;
}
// export interface UserThemePrefs {
// 	isDark: boolean;
// 	page: DefaultColor;
// 	bg: DefaultColor;
// 	variant: DefaultColor;
// 	text: TextColor;
// 	border: BorderColor;
// }

// export enum ThemePrefs {
// 	'ISDARK' = 'isDark,Boolean',
// 	'PAGE' = 'page,DefaultColor',
// 	'BG' = 'bg,DefaultColor',
// 	'VARIANT' = 'variant,DefaultColor',
// 	'TEXT' = 'text,text',
// 	'BORDER' = 'border,border',
// }

export enum Boolean {
	'TRUE' = 'true',
	'FALSE' = 'false',
}

export enum VariantColor {
	'LIGHT' = 'light',
	'DARK' = 'dark',
}

export enum DefaultColor {
	'PRIMARY' = 'primary',
	'SECONDARY' = 'secondary',
	'SUCCESS' = 'success',
	'DANGER' = 'danger',
	'WARNING' = 'warning',
	'INFO' = 'info',
	'LIGHT' = 'light',
	'DARK' = 'dark',
	'WHITE' = 'white',
	'TRANSPARENT' = 'transparent',
}

export enum TextColor {
	'PRIMARY' = 'text-primary',
	'SECONDARY' = 'text-secondary',
	'SUCCESS' = 'text-success',
	'DANGER' = 'text-danger',
	'WARNING' = 'text-warning',
	'INFO' = 'text-info',
	'LIGHT' = 'text-light',
	'DARK' = 'text-dark',
	'MUTED' = 'text-muted',
	'WHITE' = 'text-white',
}

export enum ButtonColor {
	'PRIMARY' = 'btn-primary',
	'SECONDARY' = 'btn-secondary',
	'SUCCESS' = 'btn-success',
	'DANGER' = 'btn-danger',
	'WARNING' = 'btn-warning',
	'INFO' = 'btn-info',
	'LIGHT' = 'btn-light',
	'DARK' = 'btn-dark',
	'LINK' = 'btn-link',
}

export enum BorderColor {
	'PRIMARY' = 'border-primary',
	'SECONDARY' = 'border-secondary',
	'SUCCESS' = 'border-success',
	'DANGER' = 'border-danger',
	'WARNING' = 'border-warning',
	'INFO' = 'border-info',
	'LIGHT' = 'border-light',
	'DARK' = 'border-dark',
	'WHITE' = 'border-white',
}
