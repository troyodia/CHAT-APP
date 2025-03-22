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

- A `.env` to the api folder, the required env variables are shown in the api `sample.env`. The file should contain the following:

```
NODE_ENV=current_node_envirnoment

APP_ORIGIN=localhost url eg http://localhost:PORT
MONGO_URI=my_mongo_uri
ACCESS_SECRET=my_access_secret
REFRESH_SECRET=my_refresh_secret
ACCESS_LIFETIME=access_time
REFRESH_LIFETIME=refresh_time
PORT=my_port

AWS_ACCESS_KEY_ID=my_aws_access_key
AWS_SECRET_ACCESS_KEY=my_aws_secret_key
AWS_REGION=my_aws_region
AWS_BUCKET_NAME=my_aws_bucket_name
```

- A `.env` to the client folder, the required env variables are shown in the client `sample.env`. The file should contain the following:

```
REACT_APP_LOCAL_BASE_URL=your_localhost_base_url e.g http://localhost:PORT/api/v1
REACT_APP_LOCAL_BASE_URL_NOT_VAILDATED=your_localhost_url e.g http://localhost:PORT

REACT_APP_SOCKET_URL_ENVIRONMENT=your_current_environment e.g production/development
REACT_APP_URL_ENVIRONMENT=your_current_environment e.g production/development
```

## Note On Deployment and CI/CD

The application is deployed to an AWS ec2 instance using Caddy, Docker and Docker-compose, but it is not currently live. If you wish to deploy the application in the same way, please feel free to make use of my set-up but make sure to add the following file:

- A `.env` to the root of the application, the required env variables are shown in the root `sample.env`. The file should contain the following:

```
DOMAIN_NAME=domain_name
```

To make use of the github workflow files for CI/CD please create the required github secret variables shown in `./.github/githubsecrets.txt`. The following secrets should be present:

```
AWS_ACCESS_KEY_ID=your_iam_generated_access_key_id
AWS_SECRET_ACCESS_KEY=your_iam_generated_access_key
AWS_INSTANCE_ID=your_ec2_instance_id
AWS_REGION=your_instance_aws_region

HOST_NAME=your_instance_public_ipv4_DNS_address
SSH_PRIVATE_KEY=your_instance_ssh_private_key
USER_NAME=your_instance_user_name

DOCKER_HUB_ACCESS_TOKEN=your_generated_docker_hub_token
DOCKER_HUB_USERNAME=your_dockerhub_user_name
```
