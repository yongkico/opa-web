# Oil Palm Assistant

## Requirements

-   NodeJS v.20++
-   NPM 10++
-   Apache or Nginx or any web server for Reverse Proxy

## Getting Started

Steps:

-   Clone the repository.
-   Navigate to your project.

```bash
cd opa
```

-   Run `npm install` to install all dependencies.
-   Copy `.env.example` to `.env.local` and fill it according to your credentials

```code
NEXT_PUBLIC_BACKEND_URL=<CHANGE_TO_YOUR_BACKEND_URL>
NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_BACKEND_URL}/api/v1"
NEXT_PUBLIC_ACCESS_TOKEN="access-token"
NEXT_PUBLIC_ROLE="role"
NEXT_PUBLIC_GOOGLE_API_KEY=<CHANGE_TO_YOUR_GOOGLE_MAP_API_KEY>
```

### Running locally in development mode

To running app in development mode just run

```bash
npm run dev
```

### Running in production mode

-   #### Build The Project
    To running app in production mode, firstly you have to build your project with `npm run build`

```bash
npm run build
```

-   #### Configure Web Server (Apache, Nginx, Etc)

    [How to configure Reverse Proxy with Apache](https://dev.to/aanis434/how-to-deploy-a-react-nextjs-application-with-apache2-on-ubuntu-in-aws-ec2-instance-221o)

-   #### Start The Project
    Simply you can just run `npm run start` to start your project.

```bash
npm run start
```

or you can start your project app using PM2 (or any other process manager you prefer):

```bash
npm install pm2 -g
pm2 start npm --name <YOUR_NEXT_JS_PROJECT> -- start -- -p <PORT>

```

more details [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
