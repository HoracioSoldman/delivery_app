
### `Delivery App`


### `Running the App`
1. Cloning the repository: git clone https://github.com/HoracioSoldman/delivery_app.git

2. Moving to the server's directory: cd delivery_app/api

3. Installing dependencies: npm install

4. Running the app: npm start

5. Navigating to the http://localhost:3001

### `Use case`
6. User Accounts
    As described in the question, we have 11 accounts in for the app where 10 of them have __Biker__ as a role and the last one __Manager__.
    __Bikers Accounts:__
    Username: Biker_0   Password: biker_0
    .
    .
    .
    Username: Biker_9   Password: biker_9
    Username: Manager   Password: manager

### `Features`
The features of the app are available on three different pages.
7. Page 1: Login
    This is where the user authenticates in order to access their dedicated page.
    After a successful authentication, the user would be redirected to the __Dashboard__ page if his/her role is `Manager` or the __TodoList__ page if the role is `Biker`.

8. Page 2: Dashboard
    Here, the user can have an overview and the detailed list of all the shipments(50). By just hovering on the button `Assign to`, the manager can assign a shipment to a Biker selected from the available list.
    In addition, he/she can also `filter` the list by clicking on one of the Overview listed above.
    Whenever a biker has made a change to a shipment from his own device, the displayed data is updated in `Real Time` with a notification message on the navbar of the app.
    Then in order to leave the app, the user can `Logout` from the right top corner of on the page.

9. Page 3: 


npm install

npm start 
http://localhost:3001

11 Accounts:
Username:Biker_0
Password: Biker_1
.
.
.
Username:Biker_9
Password: Biker_9

Username:Manger
Password: manager

DEV
cd delivery_app
npm install
Test: npm test
More details will be available soon about the use case of the app.