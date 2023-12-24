/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./auth/lucia").Auth;
	type DatabaseUserAttributes = {
		username: string;
        firstName: string,
		lastName: string, 
		email: string,
		pfp: string,
		bio: string,
		numFollowers: int,
		numFollowing: int,
	};
	type DatabaseSessionAttributes = {};
}
