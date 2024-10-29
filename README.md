## full-stack-challenge

#### a simple product store full-stack application for challenge

### Tools used 
 - html
 - css
 - JavaScript (plain)
 - Express.js
 - MongoDB

### Folder structure
![image](https://github.com/user-attachments/assets/7d67bf2b-45af-4a3c-8399-10eb8f5a0835)


   ├── ...
    ├── client                      # client side application logic
        ├── css                        # stylesheets for html files
            ├── cart.css
            ├── checkout.css
            ├── product-detail.css
            ├── products.css
        ├── js                         # script files for the client side
            ├── cart.js
            ├── categories.js
            ├── checkout.js
            ├── common.js
            ├── products.js
            ├── product-detail.js
        ├── cart.html                 # cart page
        ├── checkout.html             # checkout page
        ├── index.html                # main product listing page
        ├── product.html              # product detail page
    ├── server                      # server side application logic
    │   ├── models                     # database schemas using mongoose
            ├── Cart.js                 
            ├── Category.js
            ├── Order.js
            ├── Product.js
    │   ├── routes                    # registered api routes for each model
            ├── cart.js                 
            ├── categories.js         
            ├── order.js              
            ├── products.js           
        ├── .env                        
        ├── .env.example               
        ├── index.js                  # entry point of the server app
     
