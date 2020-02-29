const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express()
    //set static path 

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

const publicVapidKey = 'BIUPAoe-ovOOaRvpWhJiGOie2gH0UDhuuo4NpOk_4Qo9EJPJyFUVMF9hapzFKsMUaUMhdF2wtN-PpXUQ2LBLmHU';
const privateVapidKey = 'cY5Lu12GCUXu59JYWlbHG2sRp98j6QW5jY5dLQWqpTY';

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

//subsrcribe route

app.post('/subscribe', (req, res) => {
    // get push subscription object
    const subscription = req.body;

    //send 201 resource created successfully

    res.status(201).json({});

    //create payload

    const payload = JSON.stringify({ title: 'push test' })

    //pass the object in send notification function

    webPush.sendNotification(subscription, payload).catch(err => console.log(err));
})

const port = 5000;
app.listen(port, () => {
    console.log("server started on port -> ", 5000)
})