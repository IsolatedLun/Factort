export interface Form_Signup {
	username: string;
	email: string;
	password: string;

	profile: File | null;
}

export interface Form_Login {
	email: string;
	password: string;
}
