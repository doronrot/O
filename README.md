running instructions: install
```
npm install
```
run tests
```
npm test
```
run server
```
npm start
```
save event
``` bash
curl -d '{"name":"Marcel Popa"}' -H "Content-Type: application/json" -X POST http://localhost:8080/event
```
get events
``` bash
curl "localhost:8080/event?timestamp=1645457416602&limit=3" 
```
