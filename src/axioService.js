import axios from 'axios';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1MTQzNTY4MzIsImV4cCI6MTUxNDM1NzEzMn0.yzByAOEOZVBpPyzDSQh-c_ed7vTSSQnS0DN8wHyCp6Y';
let configs
let axiosInstance = axios.create({
  headers: {'Authorization':token}
})
// axiosInstance.interceptors.request.use((config)=> {
//   console.log('config',config)
//   configs = config;
//   return config;
// }, (error)=> {
//   console.log('here')
//   //return Promise.reject(error);
// });
axiosInstance.interceptors.response.use((response)=>{  
    return response;
  }, (error)=>{
    console.log('err',error.response)
    if(error.response.status === 404){
      alert('invalid user');
      return Promise.reject(error);
     }
    else if(error.response.status === 401){
      configs = error.response.config
      axiosInstance.get('http://127.0.0.1:8848/api/users/1/refresh').then((result)=>{
        token = result.data.newAccessToken;
        configs.headers.Authorization = token;
        axiosInstance(configs);   
      }).catch(()=>{
        alert('session expired')
        return Promise.reject(error)
      })
    }
    else if (error.response.status === 422){
      alert('access token not received') 
    }
    else{
      return Promise.reject(error)
    }
  })

export default axiosInstance;