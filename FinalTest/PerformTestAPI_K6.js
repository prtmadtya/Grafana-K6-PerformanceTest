import http from 'k6/http';
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 1000,
    iterations: 3500,
    thresholds: {
        http_req_duration : ['max<2000'], // Batas maksimal requests harus dibawah 2 detik
    },
};

export default function () {
    //Check method Post create data
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
    
    //Assert sukses respons post request
    const checkOutput_1 = check(
    res_1,
    {
        'verify success response of post with status code 201': (res_1) => res_1.status === 201,
       },
      );

    // method put request
    const payload_2 = JSON.stringify({        
        "name": "Alexander",
        "job": "zion resident"    
    });
    const res_2 = http.put('https://reqres.in/api/users/2', payload_2, params);
    
    //Assert sukses respons put request
    const checkOutput_2 = check(
    res_2,
    {
    'verify success response of put with status code 200': (res_2) => res_2.status === 200,
    },
    );
}

//export ke html report
export function handleSummary(data) {
    return {
      "LoadTestReport.html": htmlReport(data),
    };
}


    
