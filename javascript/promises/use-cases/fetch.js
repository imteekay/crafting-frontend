const json = {
  id: 123,
  name: 'TK',
  email: 'leandrotk100@gmail.com',
  posts: [
    {
      title: 'Python From Zero to Hero',
      contents: '...',
    },
    {
      title: 'FP Concepts',
      contents: '...',
    },
  ],
};

const fetchUser = () =>
  new Promise((resolve, _) => {
    resolve(json);
  });

const get = (property) => (json) => {
  const value = json[property];
  console.log(value);
};

fetchUser().then(get('id')); // console.log(`123`)

fetchUser().then(get('name')); // console.log(`TK`)

fetchUser().then(get('posts')); // console.log(`[...]`)
