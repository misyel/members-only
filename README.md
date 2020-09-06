# members-only
members-only is an anonymous message board with three different membership tiers

# use

**Project is hosted [here](https://calm-refuge-32354.herokuapp.com)**

To run the project locally, clone the repository 
```
git clone https://github.com/misyel/members-only.git
```
Navigate to the project directory
```
cd members-only 
```
Install project dependencies using npm
```
npm install
```
Run the project on localhost:3000
```
npm run start
```

# features

Create an account with a username and password & login

* passwords are stored after hashing with bcryptjs
* passportjs is used to handle authorizations
* form data is sanitized & validated using express-validator

To gain access to a specific role, enter the passwords below after logging in:

| Role   | Password    |
| -------| ------------|
| admin  | admin       |
| member | membership  |

* admins can delete posts, create posts, and see who wrote the posts
* members can crete posts, and see who wrote the posts
* non-members can only see posts

**Sample accounts:**

| Username  | Password | Role     |
| --------- | -------- | -------- |
| admin     | admin    | admin    |
| member    | member   | member   |




