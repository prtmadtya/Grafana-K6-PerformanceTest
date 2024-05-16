import http from 'k6/http';
import { check, sleep } from "k6";
import { Trend } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 10,
    iterations: 35,
    thresholds: {
        http_req_duration: ['avg<2000'], //Durasi Response API maximum 2S
        http_req_failed: ['rate<0.01'], //http error harus dibawah 1%
    },
};

export default function () {
    // Create data
    const body = JSON.stringify({
        "name" : 'morpheus',
        "job": 'leader'
    });
    const createResponse = http.post('https://reqres.in/api/users', JSON.stringify(body), {
        headers: {
            'Content-Type'  : 'application/json',
            'Accept'        : 'application/json'
            },
    });

    //Check create data response
    const checkPost = check (createResponse, {
        'Response status must be 201': (r) => r.status === 201,
        'Response must be same with request name : morpheus': (r) => r.body.includes('morpheus'),
        'Response must be same with request job : leader' : (r) => r.body.includes('leader'),
       });
    if (!checkPost) {
        ('Failed create data');
    }   
       
    sleep(1);

    // Request update user
    const updateBody = JSON.stringify({
        name: 'morpheus',
        job: 'zion resident'
       });
    const responseUpdate = http.put('https://reqres.in/api/users/2', JSON.stringify(updateBody),{
        Headers: {
            'Content-Type'  : 'application/json',
            'Accept'        : 'application/json'
            },
    });

    //Check edit user response
    const checkUpdate = check ( responseUpdate, {
    'Response status code must be 200': (r) => r.status === 200,
    'Response must be same with request name : morpheus': (r) => r.body.includes('morpheus'),
    'Response must be same with request job : zion resident' : (r) => r.body.includes('zion resident'),
    });
    sleep(1);
}
