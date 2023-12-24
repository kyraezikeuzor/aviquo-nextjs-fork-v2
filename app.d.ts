/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./auth/lucia").Auth;
	type DatabaseUserAttributes = {
		username: string;
        password: string;
        posts: Array<any>;
	};
	type DatabaseSessionAttributes = {};
}
