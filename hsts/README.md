# Implement HSTS (Strict-Transport-Security) policy

Without HTTP Strict Transport Security policy, your web app may be vulnerable to MITM attacks and cookie hijacking.

## Blog post

[Node.js Security: Strict Transport Security (HSTS) header](https://www.maxivanov.io/http-strict-transport-security)

## Example attack

Generate local root CA

```bash
mkcert -install
```

Generate certificate for localhost

```bash
mkcert -cert-file localhost-cert.pem -key-file localhost-key.pem localhost 127.0.0.1 ::1
```

Build Docker image

```bash
docker build -t mitmproxy-node - < Dockerfile
```

Start container

```bash
docker run -it \
    --rm \
    -v "$(pwd):/var/app" \
    -v "$(mkcert -CAROOT):/var/mkcert" \
    -p 127.0.0.1:80:80 \
    -p 127.0.0.1:443:443 \
    -p 127.0.0.1:8080:8080 \
    -w /var/app \
    mitmproxy-node bash
```

Start server

```bash
node index.js
```

In a separate tab, connect to the running container

```bash
docker exec -it -w /var/mitmproxy $(docker ps -a -q  --filter ancestor=mitmproxy-node) bash
```

Start mitmproxy

```bash
mitmproxy --set ssl_verify_upstream_trusted_ca=/var/mkcert/rootCA.pem -s sslstrip.py
```

Configure your browser to use HTTP proxy at `127.0.0.1:8080`

Visit http://localhost in the browser and click through the user flow

Observe credentials were intercepted in the `POST` request in the mitmproxy window

## Fix

PR url