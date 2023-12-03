import * as Realm from 'realm-web';

const app = new Realm.App({ id: 'data-zbfxx' });

export async function loginEmailPassword(email, password) {
  // Create an email/password credential
  const credentials = Realm.Credentials.emailPassword(email, password);
  // Authenticate the user
  const user = await app.logIn(credentials);
  // 'App.currentUser' updates to match the logged in user
  console.assert(user.id === app.currentUser.id);
  return user;
}

const user = await loginEmailPassword('nguyenkenneth@pm.me', 'password');
return user.accessToken;
