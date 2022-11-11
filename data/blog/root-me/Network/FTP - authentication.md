---
title: FTP - authentication
date: '2022-08-31'
tags: ['ftp', 'root-me', 'writeups','network']
draft: false
summary: Writeup of FTP - authentication file challenges.
---

Link: https://www.root-me.org/en/Challenges/Network/FTP-authentication

In this problem, we will download the **pcap** file, then open it by **WIRESHARK** tool. 

Having searched the keyword "PASS", finally I found somethings exciting. 😆

![image](https://user-images.githubusercontent.com/61643034/187702735-57d58e75-820d-4dbf-ba71-3c65cc132eb6.png)
Here, you guys can see the passwd is ```cdts3500 ```


Or u guy can choose Follow -> TCP Stream:

![image](https://user-images.githubusercontent.com/61643034/187710606-15e237b4-f586-4bf6-ad22-55530a3b5cf3.png)
