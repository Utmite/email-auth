# Node.js Email Verification Login API

This Node.js API project focuses on providing secure authentication using a login system based on email and verification code. The API utilizes Express for routing and includes functionality to generate verification codes, send emails, and manage JWT tokens.

## Project Setup

Before getting started, make sure to set up the environment variables in a `.env` file at the project's root. The file should include the following variables:

```env
EMAIL=your-email@example.com
EMAIL_PASSWORD=your-email-password
JWT_SECRET=your-secret-key
SERVER_PORT=3000
```

- `EMAIL`: The email address from which verification codes will be sent.
- `EMAIL_PASSWORD`: The password for the email address.
- `JWT_SECRET`: The secret key used to sign authentication tokens.
- `SERVER_PORT`: The port on which the server will listen.

Ensure that you do not share or store this file in a public location, as it contains sensitive information.

## Installing Dependencies

Before running the project, install the dependencies using the following command:

```bash
npm install
```

This command will install all the necessary dependencies for the project.

## Running the Project

After installing the dependencies, start the server with the following command:

```bash
npm start
```

The server will run on the port specified in your `.env` file (default: port 3000).

## API Usage

Once the server is running, you can interact with the API to perform the login process. Here's a basic example using the `curl` tool:

1. **Request Verification Code:**

```bash
curl -X POST http://localhost:3000/prelogin -d '{"email": "user@example.com"}' -H 'Content-Type: application/json'
```

2. **Verify Code and Get Token:**

```bash
curl -X POST http://localhost:3000/realogin -d '{"email": "user@example.com", "verifycode": "123456"}' -H 'Content-Type: application/json'
```

3. **Verify Token:**

```bash
curl -X POST http://localhost:3000/verify -d '{"token": "your-authentication-token"}' -H 'Content-Type: application/json'
```

Make sure to replace "user@example.com," "123456," and "your-authentication-token" with the corresponding email, verification code, and authentication token.

Feel free to explore and customize this project according to your needs!