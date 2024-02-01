# Checklist

## G-TESTS

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

## VG-TESTS

### Users

1. Login user - 401 if password is wrong

### Products

1. Create product - If no token = 401
2. Get products from category
3. Create category
4. Get all categories

### Orders

1. Get all orders - If no key no access to orders
2. Add order for specific user - dynamic user id
3. Get orders for specific user - no key will result in no access
