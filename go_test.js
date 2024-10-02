import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50,
  duration: '1m',
};

export default function () {
  let goRes = http.get('http://localhost:8080/ping'); // GoLang 后端

  check(goRes, { 'GoLang status was 200': (r) => r.status === 200 });

  sleep(1);
}
