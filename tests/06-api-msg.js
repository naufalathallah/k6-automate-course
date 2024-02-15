import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

export let options = {
  vus: 5,
  duration: "2s",
  thresholds: {
    errors: ["rate<0.1"],
  },
};

export let errorRate = new Rate("errors");

export default function () {
  var url = "https://run.mocky.io/v3/be3916fc-6347-4ac4-8bcb-9f40c4b3d158";
  var headerParam = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = http.get(url, headerParam);

  console.log(
    `response body length ${res.body.length} for VU= ${__VU} ITER= ${__ITER}`
  );

  let parsedBody = JSON.parse(res.body);
  console.log(`response body was ${JSON.stringify(parsedBody)}`);

  let chckCode = check(res, {
    "response code was 200": (res) => res.status == 200,
  });

  let chckBody = check(res, {
    "body size was 43 bytes": (res) => res.body.length == 43,
  });

  let chckMsg = check(parsedBody, {
    "message in body was API Executed Successfully.": (body) =>
      body.message == "API Executed Successfully.",
  });

  errorRate.add(!chckCode);
  errorRate.add(!chckBody);
  errorRate.add(!chckMsg);
}
