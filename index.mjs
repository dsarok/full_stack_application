import fetch from "node-fetch";
console.log("starting the project");
setInterval(async () => {
  const date = new Date();
  if (date.getHours() === 10) {
    console.log("starting the polling");
    let jwt = await fetch("http://localhost:3000/login", {
      body: JSON.stringify({ username: "sonukumar", password: "sonukumar" }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => (res ? res.jwt : false))
      .catch((res) => false);
    console.log(jwt);

    if (jwt) {
      fetch(
        `http://localhost:3000/pushemail/` +
          new URLSearchParams({
            jwt: jwt,
          })
      )
        .then((res) => {
          console.log(res.url);
          return res.json();
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  }
}, 1000 * 60*60);
