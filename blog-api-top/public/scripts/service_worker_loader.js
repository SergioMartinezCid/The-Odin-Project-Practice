// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Custom_responses_to_requests
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('', { scope: './sw-test/' })
        .then((reg) => {
            // registration worked
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch((error) => {
            // registration failed
            console.log('Registration failed with ' + error);
        });
}