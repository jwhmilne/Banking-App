class User {
  constructor(fname, lname) {
    this.fname = fname;
    this.lname = lname;
    this.accountList = [];
  }
  addAccount(account) {
    this.accountList.push(account);
    let accountType = account.constructor.name;
    console.log(accountType + " account added");
  }
  listAccounts() {
    console.log("------------ Account Info --------------");
    console.log(`User ${this.fname} ${this.lname}`);
    for (let i = 0; i < this.accountList.length; i++) {
      console.log(this.accountList[i].getInfo());
      console.log("----------------------------------------");
    }
  }
}

class BaseAccount {
  constructor(available) {
    this.available = available;
  }
  withdraw(amount) {
    if (amount < this.available) {
      this.available -= amount;
    } else {
      console.log("Insufficient funds!");
    }
  }
  deposit(amount) {
    this.available += amount;
  }
  getInfo() {
    return this.constructor.name + " balance : $" + this.available;
  }
}

class Credit extends BaseAccount {
  constructor(available, limit) {
    super(available);
    this.limit = limit;
  }
  updateLimit(newLimit) {
    this.limit = newLimit;
  }
  withdraw(amount) {
    let total = this.available + this.limit;
    let difference = total - amount;
    if (difference >= 0) {
      this.available -= amount;
    } else {
      console.log("Unable to withdraw $" + amount +
        " due to insufficient funds : $" + total);
    }
  }
  getInfo() {
    let accountInfo = super.getInfo();
    let limitInfo = this.constructor.name + "limit : $" + this.limit;
    return "Credit balance : " + accountInfo + ", " + limitInfo;
  }
}

class Savings extends BaseAccount {
  withdraw(amount) {
    let penalty = 0.01;
    if (this.available >= amount) {
      this.available -= amount;
      this.available -= this.available * penalty;
    } else {
      console.log("Insufficient funds");
    }
  }
}

const acc = new User("Lance", "Wills");

const baseAccount = new BaseAccount(2000);
acc.addAccount(baseAccount);

const credit = new Credit(0, 100);
acc.addAccount(credit);

const savings = new Savings(200);
acc.addAccount(savings);

acc.listAccounts();

baseAccount.deposit(150);
credit.withdraw(100);
credit.withdraw(100);
savings.withdraw(50);

acc.listAccounts();
