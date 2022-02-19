import { Server } from "miragejs";

export default function mock() {
    new Server({
        routes() {
            this.namespace = "";

            // verify email
            this.get("/preauth", (scheme, request) => {
                const { email } = request.queryParams;

                // email ends in @yoppworks.com exists, otherwise not exists
                return {
                    exists: email.endsWith('@a.com'),
                }
            });

            // user
            this.get("/user", (scheme, request) => {
                const { token } = request.queryParams;
                if (token.length > 10) {
                    return {
                        name: 'Jim',
                    }
                } else {
                    return new Response(401, {}, { errors: ['Illegal token'] })
                }
            });

            // login
            this.post("/sign-in", (scheme, request) => {
                const { email, password } = JSON.parse(request.requestBody);

                // password === '123' is correct, otherwise 401
                if (password === '123') {
                    return {
                        success: true,
                        token: `dummytoken-${email}-${Date.now()}`,
                    }
                } else {
                    // ! status code not working
                    return new Response(401, {}, { errors: ['password not match'] });
                }
            });

            // register
            this.post("/register", (scheme, request) => {
                const { email } = JSON.parse(request.requestBody);

                // email ends in @google.com exists
                if (!email.endsWith('@google.com')) {
                    return {
                        success: true,
                        token: `dummytoken-${email}-${Date.now()}`,
                    }
                } else {
                    return new Response(400, {}, { errors: ['Email already registered'] });
                }
            });
        }
    });
}