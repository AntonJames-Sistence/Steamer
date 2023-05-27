const csrfFetch = async (url, options = {}) => {
    // sets default headers object to empty
    options.headers ||= {};

    // sets default get method
    options.method ||= 'GET';

    // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json" and the "X-CSRF-Token" header to the value of the 
    // "X-CSRF-Token" cookie
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] ||= 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }

    // call fetch with the url and the updated options hash
    const res = await fetch(url, options);

    // if the response status code is 400 or above, then throw an error with the
    // error being the response
    if (res.status >= 400) throw res;

    // if the response status code is under 400, then return the response to the
    // next promise chain
    return res;
}

export const restoreCSRF = async () => {
    // getting X-CSRF-Token from backend
    const res = await csrfFetch("/api/session");

    // helper method to store X-CSRF-Token in sessionStorage inside browser 
    storeCSRFToken(res);

    // return response
    return res;
}

export const storeCSRFToken = (response) => {
    // taking X-CSRF-Token from header object of the response
    const csrfToken = response.headers.get("X-CSRF-Token");

    // if token exists saves it in sessionStorage in browser
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export default csrfFetch;