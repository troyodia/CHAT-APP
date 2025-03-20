# RA-**_SEND_**-GAN

A websockets based one-to-one messenger application inspired by my interest in anime, written in javascript.

## Key Features

- ✅ File sharing and downloading.
- ✅ Voice recording.
- ✅ Message replies.
- ✅ Unread messages notifications.
- ✅ Online/Offline status.

## Quick Start

To install the application for development, do the following:

```
$ git clone https://github.com/troyodia/RA-SEND-GAN.git
$ cd client
$ npm install
$ cd api
$ npm install
```

### Additional Requirements

To run the application locally please create the following files:

- A `.env` to the api folder, the required env variables are shown in the api `sample.env`.
- A `.env` to the client folder, the required env variables are shown in the client `sample.env`.

## Note On Deployment and CI/CD

The application is deployed to an AWS ec2 instance using Caddy, Docker and Docker-compose, but it is not currently live. If you wish to deploy the application in the same way, please feel free to make use of my set-up but make sure to add the following file:

- A `.env` to the root of the application, the required env variables are shown in the root `sample.env`.

To make use of the github workflow files for CI/CD please create the required github secret variables shown in `./.github/githubsecrets.txt`.
