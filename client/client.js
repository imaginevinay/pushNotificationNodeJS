const publicVapidKey = 'BIUPAoe-ovOOaRvpWhJiGOie2gH0UDhuuo4NpOk_4Qo9EJPJyFUVMF9hapzFKsMUaUMhdF2wtN-PpXUQ2LBLmHU';

//check for service worker 🇧🇦 
if ('serviceWorker' in navigator) {
    send().catch(err => {
        console.error("error in send()", err)
    })
}

async function send() {
    // register service worker, register push, send push
    console.log("registering SW !");
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    })

    console.log("SW registered!")

    //register push
    console.log("registering push!")
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    console.log("push registered")

    // send push notif
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })

    console.log("push sent!!!!")
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}