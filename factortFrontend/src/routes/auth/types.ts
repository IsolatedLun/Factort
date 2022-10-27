export interface Form_Signup {
	username: string;
	email_address: string;
	password: string;

	profile: File | null;
}

export interface Form_Login {
	email_address: string;
	password: string;
}
