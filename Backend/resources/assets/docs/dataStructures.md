# Data Structures
    
<!---  Authorization  --->
## RegisterByEmail (object)
+ first_name: `Phil` (string, required) - User First Name.
+ last_name: `Coulson` (string, required) - User Last Name.
+ email: `phil.coulson@shield.gov` (string, required) - User Email address.
+ password: `5VphcVNdGhJi` (string, required) - User Password. Between 8 and 64 characters.

## LoginByEmail (object)
+ email: `phil.coulson@shield.gov` (string, required) - User Email address.
+ password: `5VphcVNdGhJi` (string, required) - User Password. Between 8 and 64 characters.

## ResetPasswordRequest (object)
+ email: `phil.coulson@shield.gov` (string, required)

<!---  Products  --->
## Product (object)
+ name: `Candy` (string, required) - Name of the product.
+ price: `10.24` (number, required) - Price of the product.
+ image: `https://cdn.example.com/candy.jpg` (string, required) - Image url of the product.