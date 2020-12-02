self.addEventListener("fetch", (event) => {
    var currentUrl = new URL(event.request.url);
    if (currentUrl.origin === location.origin) {
        var newRequest = new Request(event.request, {
            mode: "cors",
            credentials: "same-origin",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('loginToken')}`,
            }
        });
        event.respondWith(fetch(newRequest));
    }
    else {
        event.respondWith(fetch(event.request));
    }
});
