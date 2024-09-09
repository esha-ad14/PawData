CREATE TABLE Commands(
  command_id SERIAL PRIMARY KEY,
  command VARCHAR(255)
);

CREATE TABLE customers(
    customerID SERIAL PRIMARY KEY,
    customerType VARCHAR(255),
    customerPhone VARCHAR(255),
    customerEmail VARCHAR(255)
);

INSERT INTO Customers (customerID, customerType, customerPhone, customerEmail) VALUES
 ('1','Business','234-123-1234','bdoggie@gmail.com'), 
 ('2','Individual','534-654-2346','mydog@gmail.com'), 
 ('3','Business','888-564-3453','newdog@gmail.com'), 
 ('4','Individual','643-234-2342','tigdog@gmail.com');