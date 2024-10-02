執行docker compose up -d
會自動啟動
1. python-backend
2. golang-backend
3. typescript-backend

使用mac m3 air進行測試

執行docker stats
可以看到記憶體使用狀態
golang=2.852MB
typescript=23.6MB
python=35.7MB
```
CONTAINER ID   NAME                 CPU %     MEM USAGE / LIMIT     MEM %     NET I/O       BLOCK I/O    PIDS
dbba8e7cf4ca   golang-backend       0.00%     2.852MiB / 7.657GiB   0.04%     1.76kB / 0B   0B / 0B      5
0dce320f06f9   python-backend       0.26%     35.7MiB / 7.657GiB    0.46%     1.76kB / 0B   0B / 180kB   6
c5798cf55fbf   typescript-backend   0.00%     23.6MiB / 7.657GiB    0.30%     1.76kB / 0B   0B / 4.1kB   18
```

執行docker image ls
可以看到docker image size
golang=6.73MB
typescript=183MB
python=191MB
```
REPOSITORY                    TAG                    IMAGE ID       CREATED          SIZE
estimate-python-backend       latest                 0710decd2ad1   4 minutes ago    191MB
estimate-typescript-backend   latest                 d78122ddd845   4 minutes ago    183MB
estimate-golang-backend       latest                 6286420c4d5b   25 minutes ago   6.73MB
```

使用k6進行壓力測試
在1分鐘內50個user每秒發送一個request

golang壓測結果(http_req_receiving avg=41.23us)
```
k6 run go_test.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: go_test.js
        output: -

     scenarios: (100.00%) 1 scenario, 50 max VUs, 1m30s max duration (incl. graceful stop):
              * default: 50 looping VUs for 1m0s (gracefulStop: 30s)


     ✓ GoLang status was 200

     checks.........................: 100.00% 3000 out of 3000
     data_received..................: 381 kB  6.3 kB/s
     data_sent......................: 252 kB  4.2 kB/s
     http_req_blocked...............: avg=32.67µs min=1µs   med=5µs    max=9.46ms  p(90)=11µs   p(95)=18µs
     http_req_connecting............: avg=16.11µs min=0s    med=0s     max=1.34ms  p(90)=0s     p(95)=0s
     http_req_duration..............: avg=5.32ms  min=212µs med=4.58ms max=44.68ms p(90)=8.98ms p(95)=10.79ms
       { expected_response:true }...: avg=5.32ms  min=212µs med=4.58ms max=44.68ms p(90)=8.98ms p(95)=10.79ms
     http_req_failed................: 0.00%   0 out of 3000
     http_req_receiving.............: avg=41.23µs min=5µs   med=21µs   max=2.83ms  p(90)=57µs   p(95)=94.04µs
     http_req_sending...............: avg=71.1µs  min=2µs   med=11µs   max=9.59ms  p(90)=104µs  p(95)=379.29µs
     http_req_tls_handshaking.......: avg=0s      min=0s    med=0s     max=0s      p(90)=0s     p(95)=0s
     http_req_waiting...............: avg=5.2ms   min=201µs med=4.51ms max=44.65ms p(90)=8.66ms p(95)=10.71ms
     http_reqs......................: 3000    49.661499/s
     iteration_duration.............: avg=1s      min=1s    med=1s     max=1.04s   p(90)=1.01s  p(95)=1.01s
     iterations.....................: 3000    49.661499/s
     vus............................: 50      min=50           max=50
     vus_max........................: 50      min=50           max=50
```

typescript壓測結果(http_req_receiving avg=53.88µs)
```
k6 run ts_test.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: ts_test.js
        output: -

     scenarios: (100.00%) 1 scenario, 50 max VUs, 1m30s max duration (incl. graceful stop):
              * default: 50 looping VUs for 1m0s (gracefulStop: 30s)


     ✓ TypeScript status was 200

     checks.........................: 100.00% 3000 out of 3000
     data_received..................: 759 kB  13 kB/s
     data_sent......................: 252 kB  4.2 kB/s
     http_req_blocked...............: avg=31.28µs min=1µs   med=5µs    max=2.04ms  p(90)=11µs    p(95)=16µs
     http_req_connecting............: avg=16.82µs min=0s    med=0s     max=1.38ms  p(90)=0s      p(95)=0s
     http_req_duration..............: avg=5.59ms  min=232µs med=3.75ms max=77.9ms  p(90)=11.49ms p(95)=15.75ms
       { expected_response:true }...: avg=5.59ms  min=232µs med=3.75ms max=77.9ms  p(90)=11.49ms p(95)=15.75ms
     http_req_failed................: 0.00%   0 out of 3000
     http_req_receiving.............: avg=53.88µs min=5µs   med=34µs   max=9.31ms  p(90)=76µs    p(95)=104µs
     http_req_sending...............: avg=47.14µs min=2µs   med=12µs   max=12.57ms p(90)=35µs    p(95)=57µs
     http_req_tls_handshaking.......: avg=0s      min=0s    med=0s     max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=5.49ms  min=210µs med=3.67ms max=77.88ms p(90)=11.31ms p(95)=15.44ms
     http_reqs......................: 3000    49.634303/s
     iteration_duration.............: avg=1s      min=1s    med=1s     max=1.07s   p(90)=1.01s   p(95)=1.01s
     iterations.....................: 3000    49.634303/s
     vus............................: 50      min=50           max=50
     vus_max........................: 50      min=50           max=50
```

python的壓測結果 (http_req_receiving avg=51.76µs)
```
k6 run py_test.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: py_test.js
        output: -

     scenarios: (100.00%) 1 scenario, 50 max VUs, 1m30s max duration (incl. graceful stop):
              * default: 50 looping VUs for 1m0s (gracefulStop: 30s)


     ✓ Python status was 200

     checks.........................: 100.00% 3000 out of 3000
     data_received..................: 429 kB  7.1 kB/s
     data_sent......................: 252 kB  4.2 kB/s
     http_req_blocked...............: avg=33.06µs min=1µs   med=5µs    max=1.89ms  p(90)=12µs    p(95)=16µs
     http_req_connecting............: avg=17.74µs min=0s    med=0s     max=1.34ms  p(90)=0s      p(95)=0s
     http_req_duration..............: avg=8.16ms  min=435µs med=6.31ms max=67.6ms  p(90)=15.2ms  p(95)=18.64ms
       { expected_response:true }...: avg=8.16ms  min=435µs med=6.31ms max=67.6ms  p(90)=15.2ms  p(95)=18.64ms
     http_req_failed................: 0.00%   0 out of 3000
     http_req_receiving.............: avg=51.76µs min=5µs   med=28µs   max=8.36ms  p(90)=82µs    p(95)=123.04µs
     http_req_sending...............: avg=37.9µs  min=2µs   med=12µs   max=8.13ms  p(90)=41µs    p(95)=93.09µs
     http_req_tls_handshaking.......: avg=0s      min=0s    med=0s     max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=8.07ms  min=410µs med=6.24ms max=67.21ms p(90)=15.05ms p(95)=18.35ms
     http_reqs......................: 3000    49.481719/s
     iteration_duration.............: avg=1s      min=1s    med=1s     max=1.06s   p(90)=1.01s   p(95)=1.02s
     iterations.....................: 3000    49.481719/s
     vus............................: 50      min=50           max=50
     vus_max........................: 50      min=50           max=50
```
