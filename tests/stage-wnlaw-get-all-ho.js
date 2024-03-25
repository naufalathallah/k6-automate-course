import http from "k6/http";
import { check } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "2m", target: 50 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    // rate of successful checks must be greater than 95%. >95% checksmust PASS/ SUCCESSFUL
    checks: ["rate>0.95"],
  },
};

export default function () {
  var url = "https://stage-api-wnlaw.nscreativestudio.com/api/handover/";
  var params = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhbGFkbWluQHlvcG1haWwuY29tIiwidXNlcklkIjoiODliMmI1YzctZWY2ZC00YWY0LWJlODgtMGNhOWFhODViM2M2Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzExMzc2NTA4LCJleHAiOjE3MTE0MTk3MDh9.6xV4tqM3gSJWnIst63gsR30-I2tn9Jvyl5OCn9nqt7c",
    },
  };

  let res = http.get(url, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response contains totalItems": (r) => r.body.includes("totalItems"),
  });

  console.log(`status for VU= ${__VU} = ${res.status}`);
}
