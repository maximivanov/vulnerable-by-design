FROM node:14

RUN echo "Downloading mitmproxy..." && \
    mkdir -p /tmp/mitm-downloads && \
    curl -sSL -o /tmp/mitm-downloads/mitmproxy.tar.gz https://snapshots.mitmproxy.org/6.0.2/mitmproxy-6.0.2-linux.tar.gz && \
    tar -xf /tmp/mitm-downloads/mitmproxy.tar.gz -C /tmp/mitm-downloads && \
    mv -f /tmp/mitm-downloads/mitmproxy /usr/local/bin/ && \
    rm -rf /tmp/mitm-downloads

RUN echo "Downloading sslstrip script..." && \
    mkdir -p /var/mitmproxy && \
    curl -sSL -o /var/mitmproxy/sslstrip.py https://raw.githubusercontent.com/mitmproxy/mitmproxy/master/examples/contrib/sslstrip.py

ENV LANG en_US.UTF-8  
