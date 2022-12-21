---
title: HTTP - Headers
date: '2022-12-12'
tags: ['root-me', 'writeups','web','server','httpheaders']
draft: false
summary: Writeup of HTTP - Headers challenges.
---
![image](https://user-images.githubusercontent.com/61643034/208852824-d0e8908f-af47-4ef5-9cb6-c7d6f1bc47f2.png)

- Bật interception -> bắt gói tin -> đưa vào repeater.
- Sau đó send thử phát -> thấy response trả về có trường ```Header-RootMe-Admin:none``` . Có vẻ vấn đề nằm ở đây.
- Bây giờ mình sẽ thử edit trường này, có thể sử dụng tool edit, nhưng để đơn giản, mình sẽ ném nó lên request và sửa giá trị thành **true**

**Booms**

![image](https://user-images.githubusercontent.com/61643034/208853514-b28722bf-dbb1-46de-9762-d780d03199fc.png)

Lấy được flag ```HeadersMayBeUseful```