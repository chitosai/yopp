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

            // login
            this.post("/sign-in", (scheme, request) => {
                console.log(scheme)
                const { email, password } = JSON.parse(request.requestBody);
                console.log(1, email, password)

                // password === '123' is correct, otherwise 401
                if (password === '123') {
                    return {
                        success: true,
                        token: `dummytoken-${email}-${Date.now()}`,
                    }
                } else {
                    // ! status code not working
                    return new Response(42, {}, { errors: ['password not match'] });
                }
            });
        }
    });
}