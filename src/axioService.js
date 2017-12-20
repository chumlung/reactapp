import axios from 'axios';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTUxMzc2MjQ0NywiZXhwIjoxNTEzNzYyNzQ3fQ.GWQRB5sJdRmwj47it7aXtCd9WdTCaB7gY6w5-lONUIc';
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
        console.log('new access token: ',result.data.newAccessToken)
        token = result.data.newAccessToken;
        configs.headers.Authorization = token;
        console.log(configs.headers.Authorization)
        axiosInstance(configs);   
      })
    }
  })

export default axiosInstance;