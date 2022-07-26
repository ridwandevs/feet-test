# TODO API TEST

## Installation

- Install node dependencies
```cmd
    $ yarn install
```
- Push sqlite
```cmd
    $ npx prisma migrate dev
```
- Run Script
```cmd
    $ yarn dev
```

---
## Route Lists

### Auth
- `(POST) api/auth/login`
    
     | Params | Type | |
    | ----------- | ----------- | ---- |
    | email | string |  required |
    | password | string | required |

    ### Request 
    ---
    ```json
    {
        "email":"test@gmail.com",
        "password": "test123"   
    }
    ```
   

- ` (POST) api/auth/register`

     | Params | Type | |
    | ----------- | ----------- | ---- |
    | email | string |  required |
    | password | string | required |
    | name | string | required |

    ### Request
    ---
    ```json
    {
        "email" : "test@gmail.com",
        "password" : "test123",
        "name"""
    }
    ```

    ### Response
    ---
    ```json
    {
            "id": "cl60kg5dy0040fkvk3uw7rug3",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsNjBkOXcwMjAwNDQyNXZrMGxubGxyZ2QiLCJpYXQiOjE2NTg3NDI0ODUsImV4cCI6MTY1ODgyODg4NX0.Dl-Yz7WGgSQPDAiWHbhqXLm7iOOZhyP3HCUP1d9MeGI",
            "userId": "cl60d9w02004425vk0lnllrgd",
            "createdAt": "2022-07-25T09:48:05.830Z",
            "updatedAt": "2022-07-25T09:48:05.830Z"
    }
    ```

---
### TODO

- `(GET) api\todo\`

    ### Headers
    ---
    | Params | Data |
    | ----------- | ----------- |
    | Authorization | Bearer {$token} |

    ### Response 
    ---
    ```json
    {
        "message": [
            {
                "id": "cl60lq73l0050fkvkdqngqkzp",
                "title": "Documentation",
                "description": "Write test documentation",
                "completed": false,
                "userId": "cl60d9w02004425vk0lnllrgd",
                "createdAt": "2022-07-25T10:23:54.225Z",
                "updatedAt": "2022-07-25T10:23:54.225Z"
            }
        ]
    }
    ```

- `(POST) api\todo\create`
    ### Headers
    ---
    | Params | Data |
    | ----------- | ----------- |
    | Authorization | Bearer {$token} |
    ### Params     
    ---
    | Params | Type | |
    | ----------- | ----------- | ---- |
    | title | string |  required |
    | description | string | optional |

    ### Request
    ---
    ```json
    {
        "title" : "Documentation",
        "description": "write test documentation"
    }
    ```
- `(GET) api\todo\view\[todoId]`
    ### Headers
    ---
    | Params | Data |
    | ----------- | ----------- |
    | Authorization | Bearer {$token} |
    ### Params     
    ---
    | Params | Type | |
    | ----------- | ----------- | ---- |
    | todoId | string |  required |
    ### Response
    ---
    ```json
    {
        
        "id": "cl60lq73l0050fkvkdqngqkzp",
        "title": "Documentation",
        "description": "Write test documentation",
        "completed": false,
        "userId": "cl60d9w02004425vk0lnllrgd",
        "createdAt": "2022-07-25T10:23:54.225Z",
        "updatedAt": "2022-07-25T10:23:54.225Z"
    
    }
    ```

- `(PUT) api\todo\update\[todoId]`
    ### Headers
    ---
    | Params | Data |
    | ----------- | ----------- |
    | Authorization | Bearer {$token} |
    ### Params     
    ---
    | Params | Type | |
    | ----------- | ----------- | ---- |
    | todoId | string |  required |
    | title | string |  required |
    | description | string | optional |
    | completed | boolean | optional |

    ### Request
    ---
    ```json
    {
        "title" : "Documentation",
        "description": "Write test documentation and need to finish",
        "completed": true
    }
    ```
- `(POST) api\todo\delete`
    ### Headers
    ---
    | Params | Data |
    | ----------- | ----------- |
    | Authorization | Bearer {$token} |
    ### Params     
    ---
    | Params | Type | |
    | ----------- | ----------- | ---- |
    | todoId | string |  required |