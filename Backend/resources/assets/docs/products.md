# Group Products
### List Products [GET /v1/products]
Returns a list of products.

+ Response 200 (application/json)
    + Body
    
        {
          "data":[
            {
              "id": 1,
              "name": "Candy",
              "price": 10.24,
              "image": "https://cdn.example.com/candy.jpg"
            },
            ...
          ]
        }
        
### Get Product [GET /v1/products/{product_id}]
Returns the details of a product.

+ Parameters
    + product_id: `1` (int, required) - The product ID.
+ Response
    + Body
    
        {
          "data":{
            "id": 1,
            "name": "Candy",
            "price": 10.24,
            "image": "https://cdn.example.com/candy.jpg"
          }
        }
        
### Create Product [POST /v1/products]
Create a new product.

+ Request (application/json)
    + Attributes (Product)
+ Response
    + Body
    
        {
          "data":{
            "id": 1,
            "name": "Candy",
            "price": 10.24,
            "image": "https://cdn.example.com/candy.jpg"
          }
        }

### Get Product [DELETE /v1/products/{product_id}]
Returns the details of a product.

+ Parameters
    + product_id: `1` (int, required) - The product ID.
+ Response 204