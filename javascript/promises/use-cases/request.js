function request(url) {
  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.onreadystatechange = () => {
      if (request.readyState !== 4) return;

      if (request.status >= 200 && request.status < 300) {
        resolve(request.response);
      } else {
        reject({
          status: request.status,
          statusText: request.statusText,
        });
      }
    };

    request.onerror = () => {
      reject();
    };

    request.open('GET', url, true);
    request.send();
  });
}

request('https://pokeapi.co/api/v2/pokemon').then(JSON.parse).then(console.log);
