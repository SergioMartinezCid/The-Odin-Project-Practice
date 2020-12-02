// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Custom_responses_to_requests
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/scripts/service_worker.js').catch(function (error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
} else {
    window.alert('The browser does not support serviceWorkers');
}
