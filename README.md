# Food hut

## Introduction


This is a food app built with Node.js and Express.js. It allows users to view a menu, order meals, create/edit/delete meals (admin only), book orders, and view profiles.


![Preview](https://github.com/Bgyurov/Restaurant-ExpressJsProject/static/images/foodhut2.png)

## Getting Started

To get a local copy up and running follow these simple steps:

1. Clone the repository:
2. npm install
3. npm run dev


![Preview](https://github.com/Bgyurov/Restaurant-ExpressJsProject/static/images/foodhut3.png)

##Features
- Authentication: Users can sign up, log in, and log out.
- Authorization: Admin users have additional permissions to create, edit, and delete meals.
- Menu Display: Users can view the available menu items.
- Ordering: Users can place orders for meals.
- CRUD Operations: Admin users can perform CRUD operations on meals.
- Booking: Users can book orders.
- Profile Viewing: Users can view their profiles.
- Error Handling: Proper error handling and error pages.

  ![Preview](https://github.com/Bgyurov/Restaurant-ExpressJsProject/static/images/foodhut4.png)
##Routes
/: Home page
/about: About page
/gallery: Gallery page
/menu: Menu page
/createmeal: Create meal page (accessible to admin users only)
/details/:mealId: Details page for a specific meal
/order/:mealId: Order page for a specific meal
/edit/:mealId: Edit page for a specific meal (accessible to admin users only)
/delete/:mealId: Delete functionality for a specific meal (accessible to admin users only)
/book: Booked orders page
/profile/:profileId: Profile page for a specific user
/noaccess: Access denied page
