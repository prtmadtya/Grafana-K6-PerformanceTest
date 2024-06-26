import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
const BASE_URL = 'https://reqres.in';

export const options = {
    vus: 1000,
    iterations: 3500,
    thresholds: {
        http_req_duration: ['avg<2000'], //Durasi Response API maximum 2S
        http_req_failed: ['rate<0.01'], //http error harus dibawah 1%
    },
};

export default function () {
  const name = 'morpheus';
  const job = 'zion resident';
  group('API Create', function () {
    const FULL_URL = BASE_URL + '/api/users';
    const payload = JSON.stringify({
        name : name,
        job: job,
      })
      const params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
 let res = http.post(FULL_URL, payload, params);
    
    check(res, {
        'verify response status code must be 201': (res) => res.status == 201,
    });
    check(res, {
      'response name = request': (res) => {
          let response;
          try {
              response = JSON.parse(res.body);
          } catch (e) {
              console.error('Failed to parse response body:', e);
              return false;
          }

          if (response && response.name) {
              return response.name === name;
          } else {
              console.error('Response or response name is undefined');
              return false;
          }
      },
    });
    check(res, {
      'Verify response job = request': (res) => {
          let response;
          try {
              response = JSON.parse(res.body);
          } catch (e) {
              console.error('Failed to parse response body:', e);
              return false;
          }

          if (response && response.job) {
              return response.job === job;
          } else {
              console.error('Response or response job is undefined');
              return false;
          }
      },
    });
  });
sleep(1);

  group('API Update', function () {
    const FULL_URL = BASE_URL + '/api/users/2';
    const payload = JSON.stringify({
        name : name,
        job: job
      })
      const params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
 let res = http.put(FULL_URL, payload, params);
    
    check(res, {
        'verify response status code must be 200': (res) => res.status == 200,
    });
    check(res, {
      'verify response name = request': (res) => {
          let response;
          try {
              response = JSON.parse(res.body);
          } catch (e) {
              console.error('Failed to parse response body:', e);
              return false;
          }

          if (response && response.name) {
              return response.name === name;
          } else {
              console.error('Response or response name is undefined');
              return false;
          }
      },
    });
    check(res, {
      'verify response job = request': (res) => {
          let response;
          try {
              response = JSON.parse(res.body);
          } catch (e) {
              console.error('Failed to parse response body:', e);
              return false;
          }

          if (response && response.job) {
              return response.job === job;
          } else {
              console.error('Response or response job is undefined');
              return false;
          }
      },
    });
  });
  sleep(1);
};

export function handleSummary(data) {
  return {
    "testreport3.html": htmlReport(data),
  };
};