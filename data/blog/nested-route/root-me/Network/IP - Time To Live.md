---
title: IP - Time To Live
date: '2022-08-31'
tags: ['ftp', 'root-me', 'writeups','network']
draft: false
summary: Writeup of IP - Time To Live file challenges.
---

Link: https://www.root-me.org/en/Challenges/Network/IP-Time-To-Live

Open file by using **WIRESHARK** then search for string **TTL** 

![image](https://user-images.githubusercontent.com/61643034/187824277-bacc38a7-5306-47ba-9e6d-4e2100cb54a0.png)

As we can see, the final request to target has **TTL Value** is ```13```
