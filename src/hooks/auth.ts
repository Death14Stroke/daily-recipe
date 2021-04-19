import firebase from 'firebase';

type LoginParams = { email: string; password: string };
type SignupParams = LoginParams & { userName: string; photoURL?: string };
type UpdateParams = { photoURL?: string };

export const signupWithEmail = async ({
	email,
	password,
	userName,
	photoURL
}: SignupParams) => {
	try {
		const { user } = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password);
		if (user) {
			user.updateProfile({
				displayName: userName,
				photoURL
			});
			return Promise.resolve();
		}
	} catch (err) {
		switch (err.code) {
			case 'auth/email-already-in-use':
				return Promise.reject({
					message: 'This email is already in use'
				});
			default:
				return Promise.reject({
					message: 'Something went wrong. Please try again later'
				});
		}
	}
};

export const loginWithEmail = async ({ email, password }: LoginParams) => {
	try {
		await firebase.auth().signInWithEmailAndPassword(email, password);
		return Promise.resolve();
	} catch (err) {
		switch (err.code) {
			case 'auth/user-not-found':
				return Promise.reject({
					message: 'Cannot find an account with this email'
				});
			case 'auth/invalid-email':
			case 'auth/wrong-password':
				return Promise.reject({
					message: 'Invalid email or password'
				});
			default:
				return Promise.reject({
					message: 'Something went wrong. Please try again later'
				});
		}
	}
};

export const signOut = async () => {
	try {
		await firebase.auth().signOut();
		return Promise.resolve();
	} catch (err) {
		return Promise.reject({ message: 'Could not sign out' });
	}
};

export const useCurrentUser = () => {
	return firebase.auth().currentUser;
};

export const updateProfile = async (
	update: UpdateParams,
	onUpdated: (user: firebase.User) => void
) => {
	const user = firebase.auth().currentUser;
	if (!user) return;

	try {
		await user.updateProfile(update);
		await user.reload();
		onUpdated(user);
	} catch (err) {
		return Promise.reject({ message: 'Could not update profile' });
	}
};
