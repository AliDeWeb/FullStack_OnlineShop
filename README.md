# OnlineShop - FullStack 💪

The project is developed by Ali Moradi using **Nextjs**, **Nestjs**, **Mongodb**, and it's under **_MIT_** license.

## Installation with docker (Recommended) 🥇

1. Download and install **_docker_** and **_docker compose_** on your local machine.

- [Download Docker](https://www.docker.com)

2. Clone the project.

```bash
    git clone https://github.com/AliDeWeb/FullStack_OnlineShop.git
```

3. Run the **_.yaml_** file using docker compose to start project.

```bash
    docker compose up -d
```

### You can access to

- Client => on port 3000
- Server => on port 3001
- DB => on port 27017

## Installation using npm 🥈

1. Download and install **_nodejs_** on your local machine.

[Download Nodejs](https://nodejs.org/en)

2. Download and install **_mongodb_** on your local machine.

[Download Mongodb](https://www.mongodb.com)

3. Clone the project.

```bash
    git clone https://github.com/AliDeWeb/FullStack_OnlineShop.git
```

4. To install dependencies, select client and server roots and run the command bellow.

```bash
    npm install
```

5. Create an **_.env_** file in the server root directory and fill in the following values.

```ts
    NODE_ENV={{ dev or production }}

    DATABASE={{ Database Address }}

    JWT_SECRET={{ A very strong string }}
    JWT_EXPIRES_IN={{ Use Formats Like 1d, 2d, 3d, etc. }}

    SWAGGER_USER={{ Swagger Document Username }}
    SWAGGER_PASSWORD={{ Swagger Document Password }}

    PORT={{ Which Port Do You Want To Use For The Server }}
```

6. Run the following command in server and client roots directory to run the app.

```bash
npm run build
npm start
```

## Contributing 🛠️

We welcome contributions from developers interested in enhancing OnlineShop. Here’s how you can join and contribute:

1. Fork the Repository

   Click the "Fork" button at the top right of the project page to create a copy of the repository in your GitHub account.

2. Clone Your Fork Locally

   Clone the repository from your GitHub account.

3. Create a Feature Branch

   Create a new branch to work on your changes.

4. Make Your Changes
   Make your changes or add new features. Make sure to test them locally.

5. Commit and Push
   After making changes, commit and push them to your branch.

6. Submit a Pull Request
   Go to the original repository and submit a pull request from your branch. Please provide a clear description of the changes you made and any issues or features your code addresses.

## Notice ❌

If you're running the project using docker, you can edit server environment variables from **`server/Dockerfile`**, in the **Envs** section.
