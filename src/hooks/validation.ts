export const validateEmail = (email: string): string => {
	const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return reg.test(email) ? '' : 'Invalid email';
};

export const validatePassword = (password: string): string => {
	if (password.length < 6) {
		return 'Password must be atleast 6 characters';
	} else {
		return '';
	}
};

export const validateUsername = (userName: string): string => {
	if (userName.length === 0) {
		return 'Username cannot be empty';
	} else {
		return '';
	}
};
