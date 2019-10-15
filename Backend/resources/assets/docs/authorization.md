# Group Authorization
## V1 - Login by Email [/v1/auth/login]
### Login by Email [POST]
Login with the current user on the current device.  Will create a new token for the user.
    
+ Request (application/json)
    + Attributes (LoginByEmail)
    
+ Response 200 (application/json)
    + Body
      
        {
          "data": {
            "id": 1,
            "first_name": "Jon",
            "last_name": "Johnson",
            "access_token": "b8adff93fb86dd7a0b1feb3007fc93d6530474b4d6bc7c60eb6edded1653487c"
          }
        }
        
+ Response 401 (application/json)
    + Body
      
        {
          "error": {
            "code": "AUTHENTICATION_FAILED",
            "message": "Invalid credentials"
          }
        }
        
+ Response 403 (application/json)
    + Body
      
        {
          "error": {
            "code": "FORBIDDEN",
            "message": "Access to this resource is forbidden"
          }
        }
        
+ Response 422 (application/json)
    + Body
    
        {
          "error":{
            "code":"VALIDATION_ERROR",
            "message":"The given data failed to pass validation.",
            "validation_messages":{
              "email":[
                "The email field is required."
              ],
              "password":[
                "The password field is required."
              ]
            }
          }
        }
        
## V1 - Register by Email [/v1/auth/register]
### Register by Email [POST]
Registers a new account for the user.
    
+ Request (application/json)
    + Attributes (RegisterByEmail)
    
+ Response 200 (application/json)
    + Body
      
        {
          "data": {
            "id": 1,
            "first_name": "Jon",
            "last_name": "Johnson",
            "access_token": "b8adff93fb86dd7a0b1feb3007fc93d6530474b4d6bc7c60eb6edded1653487c"
          }
        }
        
+ Response 422 (application/json)
    + Body
    
        {
          "error":{
            "code":"VALIDATION_ERROR",
            "message":"The given data failed to pass validation.",
            "validation_messages":{
              "email":[
                "The email field is required."
              ],
              "password":[
                "The password field is required."
              ],
              "first_name":[
                "The first name field is required."
              ],
              "last_name":[
                "The last name field is required."
              ],
              "professional_title":[
                "The professional title field is required."
              ],
              "company":[
                "The company field is required."
              ]
            }
          }
        }
        
## V1 - Password Resets [/v1/auth/passwordreset]
### Reset Password [POST]
Sends a properly routed password reset email to the given address
    
+ Request (application/json)
    + Attributes (ResetPasswordRequest)
    
+ Response 202 (application/json)
        
+ Response 422 (application/json)
    + Body
    
        {
          "error": {
            "code": "VALIDATION_ERROR",
            "message": "You have validation errors in your submission",
            "validationMessages": {
              "email": [
                "The email field is required."
              ]
            }
          }
        }