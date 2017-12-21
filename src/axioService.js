import axios from 'axios';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTUxMzgzMzMxNiwiZXhwIjoxNTEzODMzNjE2fQ.ks3LfLaLqh7TBxIShIaSm31SLLmMI1xnJroltNXfKu8';
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
      console.log('error status'+error.response.status);
      alert('invalid user');
      return Promise.reject(error);
     }
    else if(error.response.status === 401){
      configs = error.response.config
      axiosInstance.get('http://127.0.0.1:8848/api/users/1/refresh').then((result)=>{
        token = result.data.newAccessToken;
        configs.headers.Authorization = token;
        axiosInstance(configs);   
      })
    }
    else if (error.response.status === 422){
      alert('access token not received') 
    }
  })

export default axiosInstance;