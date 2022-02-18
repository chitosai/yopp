export function get(url: string, data: any) {
    const params = Object.keys(data).map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
    return fetch(`${url}?${params}`);
}

export function post(url: string, data: any) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

const TOKEN_KEY = 'token';

export function saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}