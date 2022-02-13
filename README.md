# express-demo
Basic CRUD express js demo

## Setup

Instructions onhow to setup a Linux Ubuntu 20.04 sever to run this.

### Install Node.js v16

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
git clone https://github.com/gls81/express-demo.git
cd express-demo
npm intall
```

### Install MySQL Server

```bash
sudo apt update
sudo apt install -y mysql-server
sudo mysql
```

```sql
CREATE USER 'user'@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'user'@localhost;
FLUSH PRIVILEGES;
SELECT USER FROM mysql.user;
exit
```

```bash
mysql -u user -p
```


```sql
CREATE DATABASE demo;
SOURCE /config/express-demo.sql;
exit
```



git clone the reposotry
