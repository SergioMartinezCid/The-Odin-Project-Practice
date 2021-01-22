if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/scripts/sw.js').catch(function (error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
} else {
    window.alert('The browser does not support serviceWorkers');
}
