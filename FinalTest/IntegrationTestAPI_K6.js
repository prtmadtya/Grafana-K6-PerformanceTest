import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    //method Post create data
    const createData = {
            "name": "morpheus",
            "job": "leader"
       } 
    const response = http.post('https://reqres.in/api/users', JSON.stringify(createData), {
        headers: {
            'Content-Type': 'application/json',
            'Accept'        : 'application/json',
            }
    });
    const responseCreate = check (response, {
        'Response status must be 201': (response) => response.status == 201,
        'verify success insert name : morpheus': (response )=> response.body.includes('morpheus'),
        'verify success insert job  : leader': (response) => response.body.includes('leader'),
       },
    );
    sleep(1);

    // method put
    const updateData = {        
        "name": "Alexander",
        "job": "zion resident"    
    };
    const responseUpdate = http.put('https://reqres.in/api/users/2', JSON.stringify(updateData), {
        headers: {
            'Content-Type': 'application/json',
            'Accept'        : 'application/json',
            }
    });
    const response2 = check(responseUpdate, {
     'Response status must be 200': (responseUpdate) => responseUpdate.status == 200,
     'verify success update name : Alexander' : (responseUpdate) => responseUpdate.body.includes('Alexander'),
     'verify success update job  : zion resident': (responseUpdate) => responseUpdate.body.includes('zion resident'),
    });
    sleep(1); 
}
