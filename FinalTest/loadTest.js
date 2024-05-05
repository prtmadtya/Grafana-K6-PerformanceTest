import http from 'k6/http';
import { check, sleep } from "k6";
import { Trend } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const createResponseDurationMax = new Trend('MaxDurationCreate');
const updateResponseDurationMax = new Trend('MaxDurationUpdate');

export const options = {
    Thresholds: {
        MaxDurationCreate: ['max<2000','p(95)<2000'],
        MaxDurationUpdate: ['max<2000','p(95)<2000']
    },
    scenarios: {
        createData: {
            executor: 'shared-iterations',
            vus: 500,
            iterations: 1750,
            maxDuration: '30s'
        },

        UpdateData: {
            executor: 'shared-iterations',
            vus: 500,
            iterations: 1750,
            maxDuration: '30s'
        }
      }      
}

export default function () {
    // Create data
    const body = {
        "name": "morpheus",
        "job": "leader"
    };
    const createResponse = http.post('https://reqres.in/api/users', JSON.stringify(body), {
        headers: {
            'Content-Type'  : 'application/json',
            'Accept'        : 'application/json'
            },
    });
    createResponseDurationMax.add(createResponse.timings.duration);
    sleep(1);

    //Check create data response
    const checkPost = check (createResponse, {
        'Create data Response status must be 201': (r) => r.status === 201,
       });
    if (!checkPost) {
        ('Failed create data');
    }
    

    // Request update user
    const updateBody = {       
        "name": "Alexander",
        "job": "zion resident"    
    }
    const responseUpdate = http.put('https://reqres.in/api/users/2', JSON.stringify(updateBody),{
        Headers: {
            'Content-Type'  : 'application/json',
            'Accept'        : 'application/json'
            },
    });
    updateResponseDurationMax.add(responseUpdate.timings.duration);
    sleep(1);

    //Check edit user response
    const checkUpdate = check ( responseUpdate, {
    'Edit Response status must be 200': (r) => r.status === 200,
    });
    
}

export function handleSummary(data) {
    return {
      "LoadTestReport.html": htmlReport(data),
    };
  }


    
