import { atom } from 'recoil';

export const tokenState = atom({
	key: 'token',
	default: null,
});

export const userIdState = atom({
	key: 'userId',
	default: null,
});

export const usernameState = atom({
	key: 'username',
	default: null,
});

export const websiteState = atom({
	key: 'website',
	default: 'landing',
});

export const modalState = atom({
	key: 'modalState',
	default: false,
});
