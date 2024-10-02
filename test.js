import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50,
  duration: '1m',
};

export default function () {
  let tsRes = http.get('http://localhost:3000/ping'); // TypeScript 后端
  let pyRes = http.get('http://localhost:8000/ping'); // Python FastAPI 后端
  let goRes = http.get('http://localhost:8080/ping'); // GoLang 后端

  check(tsRes, { 'TypeScript status was 200': (r) => r.status === 200 });
  check(pyRes, { 'Python status was 200': (r) => r.status === 200 });
  check(goRes, { 'GoLang status was 200': (r) => r.status === 200 });

  sleep(1);
}
