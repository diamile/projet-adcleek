import axios from "axios"

axios.interceptors.request.use((request) => {
    let token = "729b21f4636de3f9f47c1447e2f1546c253cc00c1c7c27c493b53bc2c1ec364d"
    request.headers['Authorization'] = `Bearer ${token}`
   
    return request;
  });


  export default axios;