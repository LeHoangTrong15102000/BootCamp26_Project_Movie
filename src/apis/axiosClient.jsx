import axios from 'axios'
import qs from 'query-string'

// setup những cấu hình mặc định cho axios
const axiosClient = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api/",
    headers: {
        TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyNiIsIkhldEhhblN0cmluZyI6IjEzLzEwLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2NTYxOTIwMDAwMCIsIm5iZiI6MTYzMzE5NDAwMCwiZXhwIjoxNjY1NzY2ODAwfQ.TMg-RWGpT6_kH-eG3Pbw5j_8yWUP84LrkWZAFj-Drfk"
    },
    
    // override lại cách axios set params lên URL
    paramsSerializer: (params) => {
        // const result = Object.entries(params).filter(([key,value]) => {
        //     return value !== null && value !== undefined && value !== '';
        // }).map()

       
    }
});


export default axiosClient;