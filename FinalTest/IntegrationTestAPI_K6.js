import http from 'k6/http';
import { check } from 'k6';

export default function () {
    //method Post create data
    const payload_1 = JSON.stringify({
            "name": "morpheus",
            "job": "leader"
       });
       const params = {
       headers: {
       'Content-Type': 'application/json'
       },
       };
    const res_1 = http.post('https://reqres.in/api/users', payload_1, params);
    const checkOutput_1 = check(
    res_1,
    {
        'verify success response of post': (res_1) => res_1.status == 201,
        'verify success insert name : morpheus': (res_1 )=> res_1.body.includes('morpheus'),
        'verify success insert job : leader': (res_1) => res_1.body.includes('leader'),
       },
      );

    // method put
    const payload_2 = JSON.stringify({        
        "name": "Alexander",
        "job": "zion resident"    
    });
    const res_2 = http.put('https://reqres.in/api/users/2', payload_2, params);
    const checkOutput_2 = check(
    res_2,
    {
     'verify success response of put': (res_2) => res_2.status == 200,
     'verify success update name : Alexander' : (res_2) => res_2.body.includes('Alexander'),
     'verify success update job : zion resident': (res_2) => res_2.body.includes('zion resident'),
    },
    ); 
}
