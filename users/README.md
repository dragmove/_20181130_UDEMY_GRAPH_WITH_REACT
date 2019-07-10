# _20181130_UDEMY_GRAPH_WITH_REACT
Test GraphQL

## About
* Test GraphQL


## Run

```sh
npm i

npm run json:server // run json-server. // https://www.npmjs.com/package/json-server  
// Test http://localhost:3000/users/23  
// Test http://localhost:3000/companies/2/users  

npm run dev // run server.js by nodmon. connect GraphiQL tool with http://localhost:4000/graphql
```


## GraphQL Query examples
```sh
// normal query
{
  user(id: "23") {
    firstName
    age
  }
}

// circulation
{
  user(id: "47") {
    firstName
    age
    company {
      id
      name
      users {
        id
        firstName
        age
      }
    }
  }
}

## Contact
* @Website : http://www.dragmove.xyz
* @Blog : https://blog.naver.com/dragmove
* @LinkedIn : https://www.linkedin.com/in/hyun-seok-kim-99748295/
* @E-mail : dragmove@gmail.com


## License
[MIT license](http://danro.mit-license.org/).