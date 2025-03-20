# AnimeSpot - Simple Anime E-commerce Store

AnimeSpot is a lightweight, serverless e-commerce web app that allows users to browse and purchase anime-related products. The backend is built using AWS services, including DynamoDB, Lambda, and API Gateway.

## Features

- **Product Listing**: Fetches products from DynamoDB.
- **Shopping Cart**: Users can add or remove items dynamically.
- **Checkout & Order Processing**: Saves customer order details in DynamoDB.
- **Admin Panel**: Allows adding new products to the store.

## Technologies Used

- **Frontend**: HTML, JavaScript
- **Backend**: AWS Lambda, API Gateway, DynamoDB
- **AWS SDK**: Used for database operations

## Project Structure

```
├── Animespot.html      # Frontend HTML file for the store  
├── storecustomer.mjs   # Lambda function to store customer orders in DynamoDB  
├── addproducts.mjs     # Lambda function to add new products to DynamoDB  
├── my-store.mjs        # Lambda function to fetch products from DynamoDB  
```

## Setup Instructions

### 1. Deploy API Gateway & AWS Lambda
   - Create three Lambda functions:
     - `storecustomer` (to handle orders)
     - `addproducts` (to add new products)
     - `my-store` (to fetch product listings)
   - Attach API Gateway to expose these functions as endpoints.

### 2. Update API URLs in `Animespot.html`
   - Modify `fetch()` calls in `Animespot.html` to use your API Gateway URLs.

### 3. Host the Frontend
   - Upload `Animespot.html` to an AWS S3 bucket and enable public access.
   - Alternatively, serve it using GitHub Pages or any static hosting service.

## How to Use

- **Customers**: Browse products, add items to the cart, and place orders.
- **Admins**: Use the API to add new products.

## Future Enhancements

- Implement authentication for admin operations.
- Add a payment gateway for real transactions.
- Improve UI/UX with a CSS framework.

---

Let me know if you need any modifications! 🚀

