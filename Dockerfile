FROM postgres:14.3-alpine
RUN localedef -i en-AU -c -f UTF-8 -A /usr/share/locale/locale.alias en-AU.UTF-8
ENV LANG en-AU.utf8