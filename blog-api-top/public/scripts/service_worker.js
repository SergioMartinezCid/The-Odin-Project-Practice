self.addEventListener('fetch', async function (event) {
        event.request.headers.append('Authorization', `Bearer ${localStorage.getItem('loginToken')}`);
        const newRequest = new Request(event.request, {
            method: request.method,
            headers: request.headers,
            mode: 'same-origin', // need to set this properly
            credentials: request.credentials,
            redirect: 'manual'   // let browser handle redirects
        });
        event.respondWith(fetch(newRequest));
});
