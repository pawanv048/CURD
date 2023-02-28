import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';

const Testing = () => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data);
      setIsLoading(false);
      //console.log(response.data)
      
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  async function postData() {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: 'foo',
        body: 'bar',
        userId: 1,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


  async function fetchMultipleData() {
    try {
      const responseArray = await axios.all([
        axios.get('https://jsonplaceholder.typicode.com/posts/1'),
        axios.get('https://jsonplaceholder.typicode.com/posts/2'),
        axios.get('https://jsonplaceholder.typicode.com/posts/3')
      ]);
      console.log(responseArray[0].data);
      console.log(responseArray[1].data);
      console.log(responseArray[2].data);
      return responseArray;
    } catch (error) {
      console.error(error);
    }
  }


  function makeRequest() {
    const config = {
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Axios instances/baseurl

  function createAxiosInstance() {
    const instance = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return instance;
  };

  /* if you want to see changes just comment the code.*/

  // const axiosInstance = createAxiosInstance();

  // axiosInstance.get('/todos/2')
  // .then(function (response) {
  //   console.log(response.data);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });


  function makeRequest() {
    const config = {
      method: 'post',
      url: 'https://example.com/api/data',
      data: {
        foo: 'bar'
      },
      headers: {
        'Content-Type': 'application/json'
      },
      transformRequest: [(data, headers) => {
        // Modify the data or headers here
        headers['Authorization'] = 'Bearer myToken';
        return JSON.stringify(data);
      }]
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /*
     transformRequest is an array of functions that take two arguments: 
     the data and headers of the request. 
     The first function in the array modifies the headers to add an authorization token, and the second function stringifies the data. 
     The data is modified and headers are added before sending the request to the server.


    // `transformRequest` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
    
  */

  function makeRequest() {
    const config = {
      method: 'get',
      url: 'https://example.com/api/data',
      params: {
        foo: 'bar',
        baz: 123
      },
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const makeRequestSchema = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      console.log(response.data);
      console.log(response.status);
      //console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };



  


// Define the expected response schema
const responseSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string(),
  website: yup.string().url(),
  address: yup.object().shape({
    street: yup.string().required(),
    suite: yup.string(),
    city: yup.string().required(),
    zipcode: yup.string().required()
  })
});

const schema = yup.object().shape({
  website: yup.string().url().required()
});



// Make an HTTP request and validate the response schema
function makeRequestSchemaYop() {
  const config = {
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/users/1',
    headers: { 
      'Content-Type': 'application/json'
    }
  };

  axios(config)
    .then(function (response) {
      // Validate the response schema using yup
      responseSchema.validateSync(response.data);
      //schema.validateSync(data);
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};







// In Axios, interceptors are functions that allow you to intercept requests or responses before they are handled by your application. 
// You can use interceptors to modify the request or response, add custom headers, or handle errors in a centralized location.
// There are two types of interceptors in Axios: request interceptors and response interceptors.
// Request interceptors are functions that are called before a request is sent to the server.
// You can use request interceptors to modify the request config, add custom headers, or handle errors before the request is sent. Here's an example:

// javascript
// Copy code
// axios.interceptors.request.use(
//   config => {
//     // Modify request config
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//     return config;
//   },
//   error => {
//     // Handle error
//     return Promise.reject(error);
//   }
// );
// In this example, we are using the axios.interceptors.request.use() method to set an authorization header for every request made with Axios. 
// We are modifying the config object to add the authorization header, and then returning the modified config object. If there is an error, 
// we are returning a rejected Promise, which will propagate the error to the next error handler.
// Response interceptors are functions that are called when a response is received from the server. You can use response interceptors to modify the response data, 
// handle errors, or perform other actions before the response is returned to your application.
// Here's an example:

// javascript
// Copy code
// axios.interceptors.response.use(
//   response => {
//     // Modify response data
//     response.data = response.data.results;
//     return response;
//   },
//   error => {
//     // Handle error
//     return Promise.reject(error);
//   }
// );
// In this example, we are using the axios.interceptors.response.use() method to modify the response data before it is returned to the application.
// We are changing the response.data property to response.data.results, which will extract the results property from the response data. If there is an error, 
// we are returning a rejected Promise, which will propagate the error to the next error handler.
// Interceptors are a powerful tool in Axios that can help you centralize common functionality and handle errors more easily. 
// They allow you to modify requests and responses in a consistent way, without having to repeat code throughout your application.


  /*
  In this example, params is an object that contains the query parameters to be sent with the request.
   The query parameters are encoded and appended to the URL as a query string, 
   like https://example.com/api/data?foo=bar&baz=123.
  */


  useEffect(() => {
    fetchData();
    //postData();
    //fetchMultipleData();
    //makeRequest();
    //makeRequestSchema();
    makeRequestSchemaYop();
  }, []);

  return (
    <ScrollView>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          {data.map(item => (
            <View style={{ flexDirection: 'row' }}>
              {/* <Text>{item.id}.</Text> */}
              <Text key={item.id}>{item.title}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

export default Testing

// const styles = StyleSheet.create({})