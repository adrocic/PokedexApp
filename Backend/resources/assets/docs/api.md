FORMAT: 1A
HOST: https://myapp.myriadapps.com/api

# My App API

## Media Type
To ensure all response are returned as JSON, pass the following **Accept** header on all requests.
```
Accept: application/json
```

## Device Headers
For tracking purposes, the application should send following headers be set on all API requests:
```
MyApp-App-Device-Id: <128-bit UUID generated on first launch and remembered indefinitely>
MyApp-App-Platform: <android|ios>
MyApp-App-Version: <version name/number>
```

## Response Codes
Common [HTTP Response Status Codes](https://github.com/for-GET/know-your-http-well/blob/master/status-codes.md) are used to their fullest.

Common success codes:
 * 200 (OK) - Common on GET and PUT methods. Indicates the request was fulfilled successfully.
 * 201 (Created) - Common on POST methods. Indicates the request was fulfilled successfully and a new content has been created.
 * 202 (Accepted) - Used when a request is valid, but requires further asynchronous processing.
 * 204 (No content) - Common on DELETE methods. Indicated the request was fulfilled successfully and content has been deleted.

## Error States
When something goes wrong, the response status code should be either a 4xx or 5xx. 
4xx indicates there was an issue with the request itself.
5xx indicates there was a non-request issue server side, i.e. db down.

Common error states:
 * 400 (Bad request) - The request contained invalid data.
 * 401 (Unauthorized) -  The user is not authenticated.
 * 403 (Forbidden) - The user is authenticated, but not authorized to view the given content.
 * 404 (Not found) - The request content does not exist.
 * 415 (Unsupported media type) - The Content-Type header is not defined on POST/PUT or the request body is not JSON.
 * 419 (Authentication timeout) - The user has passed a known token but it has expired.
 * 422 (Unprocessable Entity) - The syntax for the call is correct but the request contains invalid data.
 * 500 (Internal server error) - The server had an error that prevents the request from succeeding.
 * 501 (Not implemented) - The functionality requested is not implemented.
 * 503 (Service Unavailable) - The system is down for maintenance or overloaded.

## Date Format
All dates returned via this API should be in `RFC 3339 (Atom)` format.

### Single Item
Single items are represented as an object inside _data_.

```json
{
  "data":{
    "id":1,
    "bool":true,
    "string":"some string"
  }
}
```

### Collection
Collections are represented as an array of objects inside _data_.

```json
{
  "data":[
    {
      "id":1,
      "bool":true,
      "string":"some string"
    },
    {
      "id":2,
      "bool":false,
      "string":"some string"
    }
  ]
}
```

### Metadata
Metadata can be passed along with any request to include additional information about the request or data that is not
directly part of the resource object.

```json
{
  "data":{
    "id":1,
    "bool":true,
    "string":"some string"
  },
  "meta":{
    "extra_data_related_to_response_or_top_level_data":""
  }
}
```


### Pagination
Some collections may be paginated. When this is the case, the pagination metadata will be added to help the client
fetch and display data.

```json
{
  "data":{
    "id":1,
    "bool":true,
    "string":"some string"
  },
  "meta":{
    "pagination":{
      "total":1,
      "count":1,
      "per_page":10,
      "current_page":1,
      "total_pages":1,
      "links":[

      ]
    }
  }
}
```

### Includes
Some resources may contain _include_ resources. These are relational resources attached to the requested resource. Make
note of the data wrapper around the included resource. This wrapper can also contain metadata just like a top-level requests.

```json
{
  "data":{
    "id":1,
    "bool":true,
    "string":"some string",
    "included_object":{
      "data":{
        "id":100,
        "name":"Peter Parker"
      },
      "meta": {
        "some_meta_data": "Hello"
      }
    }
  }
}
```

### Errors
When the server returns a 4xx error, the response body will contain the following structure:

```json
{
  "error":{
    "code":"",
    "message":"",
    "more":{
      "additional":"information relating to the error, depends on 'code'"
    }
  }
}
```

### Validation Errors
When the server kicks back a 422 error, that means the information passed is invalid.  The following structure will be
the response:

```json
{
  "error":{
    "code":"VALIDATION_ERROR",
    "message":"You have validation errors in your submission",
    "validation_messages":{
      "first_name":[
        "The first name field is required."
      ],
      "last_name":[
        "The last name field is required."
      ],
      "email":[
        "The email field is required.",
        "The email must be a valid email address.",
        "The email has already been taken."
      ]
    }
  }
}
```

5xx errors are often thrown out side of the control of the application server server and well formatted JSON response cannot be guaranteed. 
For this reason, the body should not be parsed and a generic message should be shown to the user based on the status code.

-----------------------------------------------------------------

<!-- include(authorization.md) -->
<!-- include(products.md) -->
<!-- include(dataStructures.md) -->
