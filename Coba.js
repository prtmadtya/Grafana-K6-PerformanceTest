import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    vus: 10,
    duration: '30s',
  };
export default function () {
  http.get('https://opensource-demo.orangehrmlive.com');
  sleep(1);
}
