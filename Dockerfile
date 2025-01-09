FROM php:8.2.27-apache

COPY ./src /var/www/html

EXPOSE 80