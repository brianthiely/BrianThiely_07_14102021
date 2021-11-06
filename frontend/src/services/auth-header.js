export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.tokenConnection) {
    return { Authorization: 'Bearer ' + user.tokenConnection };
  } else {
    return {};
  }
}