# Brokero Cli
Installer shell script for open source Paraffin microservice IoT platform. See [Paraffin Platform](https://paraffiniot.github.io)


## About
Brokero cli is a simple command line utility for setting up paraffin server and config locally.

## Run locally

Install dependencies 

 * `npm install`
 *  `npm link`
 * Now use it like this
 
```sh
> brokero --help  for list of commands
```

|  COMMAND        |       DESCRIPTION         | 
| ---------------- | ------------------------- |
|  brokero login |    Login to parraffin server to use brokero |
| brokero signup  |    Create a new paraffin account    |
|  brokero configure     |    Sets up brokero locally. It installs docker and docker compose if not available. And builds paraffin server image |







#### Paraffin is IoT platform based on node.js and mongodb with MQTT, HTTP and CoAP bridge.

Paraffin will enable you to put your IoT API services on your own server simply and painless in one command. It supports the popular MQTT and CoAP protocols in sync with HTTP. It is in javascript and by Parse Server api server will be able to authorize your device list so broker perform authentication by your entry data in MongoDB by api server.


## Features

* Simple and Scalable.
* HTTP, MQTT and CoAP connections together as a bridge.
* MQTT 3.1 and 3.1.1 compliant.
* Sercured with authentication and JWT.

