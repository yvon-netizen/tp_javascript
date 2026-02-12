// Version prototype
function User(username) {
  this.username = username;
}

User.prototype.login = function () {
  console.log(this.username + " connecté");
};

const u1 = new User("Aina");
u1.login();

// Version class
class UserClass {
  constructor(username) {
    this.username = username;
  }

  login() {
    console.log(this.username + " connecté (class)");
  }
}

class Admin extends UserClass {
  deleteUser(user) {
    console.log("Admin supprime " + user.username);
  }
}

const admin = new Admin("Admin1");
admin.login();
admin.deleteUser(u1);
