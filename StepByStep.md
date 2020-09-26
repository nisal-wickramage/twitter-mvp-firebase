# Steps
1. Create a firebase porject
2. Add a web app
3. Login to firebase project with firebase cli
```
firebase login
```
4. Initialize firebase project with firebase cli. Go with existing firebase project and select the newly created project.
```
firebase init
```
5. Run following to run the project locally
```
firebase serve --only hosting
```
6. Browse to http://localhost:5000 to see the initialized project.
7. Deploying web app to firebase project
```
firebase deploy --only hosting
```
8. Browse and see the deployed web app

Setting up auth

1. Create a sign-in method