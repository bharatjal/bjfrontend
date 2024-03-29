
### Address of the App: http://3.108.223.75/

## Tables:

**1. Driver**: 

- **COLUMNS:** `['id', 'name'(String), 'driver_id'(Unique-public_id), 'email'(String), 'password'(String-hashed), 'aadhar_num'(String),'vehicle_num'(String), 'created'(Timestamp)]`

|     id      |      name          |        driver_id        |          email              |    aadhar_num    |     vehicle_num   |   created    |
| ----------- | ------------------ | ----------------------- | --------------------------- | ---------------- | ----------------- | ------------ |
| Sequential  |   String(30 char)  |     Public-ID(Unique)   |  String(Unique, NOT-NULL)   |     String(16)   |       String      |  timestamp   |
 



**2. Deliveries**

- **COLUMNS:** `['id', 'driver_name', 'driver_email', 'amount', 'temp', 'location','address','locality','city', 'timestamp','date','time','day' , thml_unit(200 ml unit), tfml_unit(250 ml unit), fhml_unit(500 ml unit), ol_unit(1l unit), thmlltrs(200 ml ltrs), tfmlltrs(250 ml ltrs), fhmlltrs(500 ml ltrs), olltrs(1l ltrs), sum_of_amount, sum_of_ltrs, incentive, warning, limit ltrs]`

- here driver_email is foreign key of Devices


## Colummns Explanation:

- thmlunit = db.Column(db.Integer)         --> 200 ml Unit

- tfmlunit = db.Column(db.Integer)        --> 250 ml Unit

- fhmlunit = db.Column(db.Integer)        --> 500 ml Unit

- olunit = db.Column(db.Integer)          --> 1L Unit

- thmlltrs = db.Column(db.Float)         --> 200 ml amount = [200 ml unit value/5]

- tfmlltrs = db.Column(db.Float)        --> 250 ml amount = [250 ml unit value/4]

- fhmlltrs = db.Column(db.Float)        --> 500 ml amount = [500 ml unit value/2]

- olltrs = db.Column(db.Float)          --> 1L amount  = [one l unit value]

- temp = db.Column(db.Float(10))

- sum_of_ltrs = db.Column(db.Float(20))    --> sum_of_ltrs = thmlltrs + tfmlltrs + fhmlltrs + olltrs

- sum_of_amount = db.Column(db.Float(20))  --> sum_of_amt = thmlunit*10 + tfmlunit*3 + fhmlunit*7 + olunit*10

- incentive = db.Column(db.Float(20))      --> incentive = thmlunit*2 + tfmlunit*0.25 + fhmlunit*0.5 + olunit*1

- limitltrs = db.Column(db.Integer())

- warning = db.Column(db.Integer())

<!-- ****************************** -->

**3. User**

- **COLUMNS:** `['id', 'public_id', 'username', 'password', admin]`

| id | public_id | username   |   password    | admin   |    
| -- |---------- | ---------- | ------------- | ------- | 
|    |  Unique   |   String   |  String(30)   | Boolean |

***********************************************************************************


## Basic Routes:

**NOTE: The routes that are protected will require a x-access-token generated by user 
login from Admin account**

### User Routes:

### 1. /user/create    [POST]

- for creating a user.

{
    "name":"New",
    "password":"password"
}

### 2. /user/all    [GET]

- Unprotected right now.
- To get all the users.


### 3. /user/<public_id>  [PUT]

- To promote the normal user to Admin.

### 4. /user/login   [GET]

- To get a token.

**Basic Auth**: 

- Username: Admin
- password: 12345



### Driver Routes

### 1. /driver/all    [GET]

- Details of all the Drivers 
- Protected (x-access-token need to be passed in the Header.)
- The token should be generated by only Admin user and not by any other user.
- The message `{'message' : 'User is not an authorized Admin!, Only Admin can access these records.'}` 
is generated that means the token provided is not generated with Admin account.

### 2. /driver/email    [GET]

**Sample address: http://3.108.223.75/driver/jaibhanu@gmail.com**

- Route to get one specific driver with the email.
- Unprotected right now.
- Make sure the email entered is present inside the database.

### 3. /driver/create  [POST]

- Just need to enter the name of the driver.
- Protected

{
    "email":"jaibhanu@gmail.com",
    "password":"mathur"
}

### 4. /driver/delete/id  [DELETE]

**Sample Url: http://3.108.223.75/driver/delete/3**

- Protected.
- x-access-token required in header
- Here id is a integer.
- Currently using sequential id to delete the user but it will be changed.


### 5 /driver/update/id  [PUT]

**Sample Address: http://3.108.223.75/driver/update/1**

- Here id is a integer.
- name, aadhar_num, reg_num
- This route is responsible for updating driver table.
- Unprotected.

{
"driver_name": "jai",
"aadhar_num": "454547877852",
"reg_num": "DL4V8907",
}


### 6. /driver/login  [GET]

- To get a token.

**Basic Auth**: 

- Username: (Should enter the email of driver)
- password: (Password of the driver account.)



### 7./driver/forgot-password    [GET, POST]

- This route will demand an email and return a json message that whether this email 
exist or not in the database.


### 8. /driver/reset-password/email    [GET, PUT]

**Sample Address: http://3.108.223.75/driver/reset-password/jaibhanu@gmail.com**

- Just need to pass new Password in the Body now.

`Sample JSON to enter in body: {"password":"Updatedfour"}`

### Deliveries routes: [Only Get is protected]

### 1. /deliveries/all    [GET]

- All the deliveries of all the Drivers.
- Protected (x-access-token need to be passed in the Header.)
- The token should be generated by only Admin user and not by any other user.
- The message `{'message' : 'User is not an authorized Admin!, Only Admin can access these records.'}` 
is generated that means the token provided is not generated with Admin account.

### 2. /deliveries/id    [GET]

**Sample address: http://3.108.223.75/delivery/1**

- To get Single Delivery.
- Make sure the id entered here is present in the database.
- Protected

### 3. /deliveries/create  [POST]

- driver_name, driver_email, location, amount, temp

{
    "driver_name": "jai",
    "driver_email":"jaibhanu@gmail.com"
    "location": "99000077.112N 3311.11S",
    "amount": 1001,
    "temp": 12.90
}

### 4. /delivery/date     [GET]

- Protected.
- Admin account access required.

**Sample output:**

```
[('27/08/2020', 3), ('25/08/2020', 2), ('28/08/2020', 2), ('22/08/2020', 1), ('26/08/2020', 1)]
```

### 4. /delivery/locality     [GET]

- Protected.
- Admin account access required.

**Sample output:**

```
[('Rohini Tehsil', 5), ('Kotwali Tehsil', 4)]

```

**NOTE:** 

**1. The ** marked routes are commented out right now.**

