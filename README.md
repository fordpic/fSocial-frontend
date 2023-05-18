# fSocial

fSocial is a social site that allows users to view posts, upload posts, as well as leave comments on them, all with full CRUD functionality. fSocial users must first create an account on the site and log in, which will allow them to see other users' posts, comment on them, and make posts of their own, all from their own account. Passwords are encrypted on the backend and JWT is used for authentication, ensuring user info stays secure.

This repository holds the frontend code for fSocial; the backend code can be found [here](https://github.com/fordpic/fSocial-backend)

### Key Features

- Error handling with custom messages
- Recoil atoms used for storing data and persisting user sessions
- Posts conditionally render only when user is logged in
- Register a brand new user in the database

### Technologies Used

- NextJS + TypeScript as the framework
- TailwindCSS for styling
- Vercel for deployment
- Recoil for state management
- Axios for data fetching and posting
- Next Router for app page navigation

### Next Steps

fSocial is currently at MVP, with plans to continue adding functionality to it in the coming weeks and months. Looking ahead, I will be working to incorporate the following into the fSocial frontend:

- Custom types for everything
- DRY up the Tailwind code with specific classes
- SSR the data needed and pass to app using `getServerSideProps` (currently it is a combination of useState + Recoil)

### Contributing

If you have any feedback at all or would like to make some improvements / get a head start on the next steps above, please just make a PR and tag me (fordpic) so that I can review it for you!
