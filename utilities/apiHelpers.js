export async function postHTTP(url, body) {
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`/api${url}`, options);
  if (res.ok) {
    return res.json();
  }
  throw Error(res.json().error);
}

export async function postNode(url, body) {
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`${process.env.API_URI}/api${url}`, options);
  if (res.ok) {
    return res.json();
  }
  throw Error(res.json().error);
}

export async function getHTTP(url) {
  const options = {
    method: "GET",
  };

  const res = await fetch(`/api${url}`, options);
  if (res.ok) {
    return res.json();
  }
  throw Error(res.json().error);
}
