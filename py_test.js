import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50,
  duration: '1m',
};

export default function () {
  let pyRes = http.get('http://localhost:8000/ping'); // Python FastAPI 后端

  check(pyRes, { 'Python status was 200': (r) => r.status === 200 });

  sleep(1);
}
