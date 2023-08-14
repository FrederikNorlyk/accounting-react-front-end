# Accounting frontend
Simple frontend for an accounting application, built using the React framework Next.js.

### Technologies
- Next.js 13 (React)
- Typescript
- Tailwind CSS

### What can it do?
The application is modeled on an old PHP project, that I wrote to keep track of the expenses involved with restoring my sailboat. It keeps track of expenses, projects, and merchants.

### Why did I make this application?
In an attempt to learn Python and React, I started working on this project. The front-end is the React side of that attempt. Check out my other repository [accounting-api](https://github.com/FrederikNorlyk/accounting-api) which covers the Python part.

### Try it out!
The project is hosted [here on Render](https://accounting-react-frontend.onrender.com/). Beware that it is running on their free tier which is quite slow. The first time you visit the address, Render will spin up the server, so please be patient. When creating a new user some random demo data is generated.

### Run it yourself ###
Add a file in the root directory called <code>.env</code> with the following properties:
```
NEXTAUTH_SECRET=verySecretKey
NEXTAUTH_URL=http://localhost:3000/
NEXT_PUBLIC_BACKEND_DOMAIN=http://localhost:8000/
```

In a terminal navigate to the source code and run the following commands
```
npm install
npm run dev
```
The frontend does not work without a backend so you will also need to deploy the [API](https://github.com/FrederikNorlyk/accounting-api).
