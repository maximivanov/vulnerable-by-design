const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost-cert.pem');

const httpPort = 80
const httpsPort = 443

const app = express()
    .use ((req, res, next) => {
        if (req.secure) {
            res.setHeader('Strict-Transport-Security', 'max-age=600; includeSubDomains')
            next()
        } else {
            res.redirect(`https://${req.get('host')}${req.url}`)
        }
    })
    .get('/', (req, res) => { res.send(page(`
        <h1>Trustworthy bank home page</h1>
        <a href="/login">Login</a>
    `)) })
    .get('/login', (req, res) => { res.send(page(`
        <form method="post">
            Username: <input type="text" name="username"><br>
            Password: <input type="password" name="password"><br>
            <button type="submit">Login</button>
        </form>
    `)) })
    .post('/login', (req, res) => { res.redirect('/account'); })
    .get('/account', (req, res) => { res.send(page(`
        <h1>You're logged in!</h1>
    `)) })

http.createServer(app).listen(httpPort);
https.createServer({key: key, cert: cert }, app).listen(httpsPort);

function page(content) {
    return `<html><head></head><body>${content}</body></html>`
}
