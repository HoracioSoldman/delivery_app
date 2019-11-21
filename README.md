
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
7. Page 1: Login.
    This is where the user authenticates in order to access their dedicated page.
    After a successful authentication, the user would be redirected to the __Dashboard__ page if his/her role is `Manager` or the __TodoList__ page if the role is `Biker`.

8. Page 2: Dashboard.
    Here, the user can have an overview and the detailed list of all the shipments(50). By just hovering on the button `Assign to`, the manager can assign an unassigned order to a Biker who is selected from the available list.
    In addition, he/she can also `filter` the list by clicking on one of the Overview listed above.
    Whenever a biker has made a change to a shipment from his own device, the displayed data is updated in `Real Time` with a notification message on the navbar of the app.
    Then in order to leave the app, the user can `Logout` from the right top corner of on the page.

9. Page 3: TodoList.
    This third page is for Bikers. This user intrface contains an overview and a complete list of shipments which have been         assigned to him/her by the manager. The user can then input the time of the pickup or the delivery for each order. 
    Whenever he makes a change to one of the orders, the manager will be notified instantly. Likewise, if the manager assign    an order to this specific biker, the latter will be also notified in real time and the displayed data will be updated        accordingly.
   The process of the logout is the same as in the manager's page.


10. The entire app is mobile friendly and support a wide range of browsers.

11. On the server, I used a singleton pattern in order to handle an unique data for the system. The data are generated on the startup of the server with random status and users for shipments.
    A new random data will be only generated when we restart the server.
 

### `Test`
12. I have written 18 Unit and Integration tests in order to minimize the risk of bugs on the app.


### `Development mode`
13. In order to run the app on the development mode or __Runing the Test__, the following are the necessary steps:
    - Navigate to the root folder
    - Run: npm install
    - Run: `npm start` or `npm test` for the test.

### `Technologies`
14. On the front-end: React, Redux, Axios, Styled-components, Socket.io, Enzyme & Jest (for the test)
    
    On the Back-end: NodeJS, Express, Socket.io, JWT.

 
