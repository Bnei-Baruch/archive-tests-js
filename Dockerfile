FROM alpine:latest

ENV BROWSERSTACK_DISPLAY_RESOLUTION="1600x1200"
ENV BROWSERSTACK_USE_AUTOMATE=1

RUN apk --no-cache add ca-certificates wget nodejs nodejs-npm git && \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk && \
    apk add glibc-2.28-r0.apk && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-bin-2.28-r0.apk && \
    apk add glibc-bin-2.28-r0.apk


RUN npm install testcafe testcafe-browser-provider-browserstack
RUN git clone https://github.com/Bnei-Baruch/archive-tests-js.git
