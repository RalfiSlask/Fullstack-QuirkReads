# Checklist

## G

### Users

1. Get all users \*
2. Get one type of user \*
3. Create user \*
4. Login user \*

### Products

1. Get all products \*
2. Get specific product \*
3. Create product \*

### Orders

1. Add order for specific user \*
2. Get all orders \*

## VG

### Users

1. Modify: Login user - 401 if password is wrong \*

### Products

1. Modify: Create product - If no token = 401 \*
2. Get products from category \*
3. Create category \*
4. Get all categories \*

### Orders

1. Modify: Get all orders - If no key no access to orders \*
2. Modify: Add order for specific user - dynamic user id \*
3. Get orders for specific user - no key will result in no access \*

## VG-TESTS

### Users

- get all users - works!
- get specific user - works!
- create user - works!
- login user - works!

### Products

- get all products - works!
- get specific product - works!
- create product - works!

### Categories

- Create Category - works!
- Get all categories - works!

### Orders

- Get all orders - works!
- Create order - works!
- Get orders from a user - works!
