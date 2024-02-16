import { Counter, Trend } from "k6/metrics";
var retryCounter = new Counter("GetAPI_MAX_RETRY");
import http from "k6/http";
import { sleep } from "k6";

var retryTrend = new Trend("GETAPI_MAX_RETRY_TREND");
// we will use sleep to wait for seconds

// so lets use Trend here
// Trend is for Timings, but here we are jsut diverting to find out MAX retry
// so just an example

export default function () {
  // So retry the API call

  // ad retry

  var maxAttempts = 5;
  retryCounter.add(1);
  for (var retries = 5; retries > 0; retries--) {
    var numberOfAttempts = maxAttempts - retries + 1;
    retryTrend.add(numberOfAttempts);
    const response = http.get(
      "https://run.mocky.io/v3/8285c1bb-5d50-481e-bdc0-4115bebcfb9e"
    );

    // lets assume that this API ahs to return 404,
    if (response.status !== 401) {
      retryCounter.add(1);
      console.log(
        `response is not correct. attempt number is ${numberOfAttempts} VU=${__VU} ITER=${__ITER} sleeping for 1 seconds`
      );
      sleep(1);
    } else {
      retries == 0;
    }
  }
}

/*
    GETAPI_MAX_RETRY_TREND.....: avg=3        min=1        med=3        max=5        p(90)=5        p(95)=5

    So here ignore avg,  med, 90, 95 percentile

     max=5   means for atleast ome of the users max attends are 5
     measn GET API does not return valid response within 5 secodns
     Code has retried max 5 times after every 1 second
     you can show such data/ logs to developers and log defect

     

*/
