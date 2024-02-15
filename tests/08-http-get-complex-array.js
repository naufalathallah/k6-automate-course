import http from "k6/http";

export default function () {
  var url = "https://run.mocky.io/v3/fddfc53d-ba4f-4436-86c6-eb3e44266c2f";
  let res = http.get(url);

  let body = JSON.parse(res.body);

  body.data.forEach((element) => {
    console.log(`value of name from data is ${element.name}`);

    element.array.forEach((elementArray) => {
      console.log(`value of property array is ${elementArray}`);
    });
  });
}

/*

{
  "data": [
    {
      "name": "leanne graham",
      "email": "leanne@gmail.com",
      "job": "web developer",
      "location": "london",
      "array": [
        1,
        2,
        3
      ]
    },
    {
      "name": "ervin howell",
      "email": "ervin@gmail.com",
      "job": "tech lead",
      "location": "london",
      "array": [
        4,
        5,
        6
      ]
    },
    {
      "name": "clementine bauch",
      "email": "clementine@gmail.com",
      "job": "web developer",
      "location": "liverpool",
      "array": [
        7,
        8,
        9
      ]
    },
    {
      "name": "chelsey dietrich",
      "email": "chelsey@gmail.com",
      "job": "baker",
      "location": "london",
      "array": [
        10,
        11,
        12
      ]
    },
    {
      "name": "dennis schulist",
      "email": "dennis@gmail.com",
      "job": "pen tester",
      "location": "manchester",
      "array": [
        13,
        14,
        15
      ]
    }
  ]
}
*/
