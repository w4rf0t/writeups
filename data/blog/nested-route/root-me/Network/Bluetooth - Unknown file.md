---
title: Bluetooth - Unknown file
date: '2022-08-31'
tags: ['wireshark', 'root-me', 'writeups','network']
draft: false
summary: Writeup of Bluetooth - Unknown file challenges.
---

Link: https://www.root-me.org/en/Challenges/Network/Bluetooth-Unknown-file

Open file by use=ing **WIRESHARK** and then **Wireless -> Bluetooth Devices**

![image](https://user-images.githubusercontent.com/61643034/187721896-4d3b77b2-3fa0-4237-83d5-dc78c709f41f.png)

Now use linux command ``` printf '0C:B3:19:B9:4F:C6GT-S7390G' | sha1sum ```

We get the flag ```c1d0349c153ed96fe2fadf44e880aef9e69c122b```
