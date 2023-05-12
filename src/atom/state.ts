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
