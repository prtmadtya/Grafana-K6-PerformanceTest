import http from 'k6/http';
import { check, sleep, group } from 'k6';
const BASE_URL = 'https://reqres.in';

export default function () {
    const name = 'morpheus'
    const job = 'zion resident'
    group('Create with valid request should success', function () {
      const FULL_URL = BASE_URL + '/api/users';
      const payload = JSON.stringify({
          name : name,
          job: job
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
  
    group('Update with valid request should success', function () {
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
  };
