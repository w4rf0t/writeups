---
title: IP restricted
date: '2022-12-12'
tags: ['root-me', 'writeups','web','server','iprestricted']
draft: false
summary: Writeup of IP restricted challenges.
---
![image](https://user-images.githubusercontent.com/61643034/208845420-7d274e9d-4dfe-4b63-aee0-9b34bf0cd03b.png)

Dùng ***BURPSUITE*** 
- Nhận thấy muốn truy cập được sẽ có 2 cách: dải IP nằm trong mạng nội bộ, hoặc dùng account
- Bật interception on -> vào web nhập account: admin/admin
- Sau 1 hồi tìm tòi trên google -> thấy có thể thêm trường ``X-Forwarded-For:$IP`` -> vì dải IP phải trong LAN nên test thử 
- Chuyển request sang ***repeater*** với ip là localhost, 192.168.1.1 -> render ra ![image](https://user-images.githubusercontent.com/61643034/208847949-192d397f-4a0c-4f9e-bbdb-7eb758c828c9.png)

Ta lấy được flag là ```Ip_$po0Fing```
