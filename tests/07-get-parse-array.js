import http from "k6/http";
import { check } from "k6";

export let options = {
  vus: 1,
  duration: "2s",
};

export default function () {
  var url = "https://run.mocky.io/v3/28a1b472-74be-410c-b740-1c8a14da8998";
  var headerParam = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = http.get(url, headerParam);

  let parsedBody = JSON.parse(res.body);

  parsedBody.forEach((element) => {
    console.log(`name is ${element.name}`);
    console.log(`email is ${element.email}`);
    console.log(`job is ${element.job}`);
    console.log(`location is ${element.location}`);
  });
}
