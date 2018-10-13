var data = new FormData();
data.append("api_secret", "888de1e77b4da08277f71fcc86f5c032");
data.append("number", "573003096626");
data.append("body", "Hola");

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api4.apidaze.io/b29989d2/sms/send");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("Postman-Token", "ae83c03b-6844-4c5b-8db4-d147fdd1fa0e");

xhr.send(data);