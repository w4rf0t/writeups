---
title: Access control
date: '2022-12-25'
tags: ['porswigger', 'control', 'Access']
draft: false
summary: Writeups cua Access control.
images: ['/static/images/ccna/cisco.jpg']
author: ['default']
---

**[3.User role controlled by request parameter](https://portswigger.net/web-security/access-control/lab-user-role-controlled-by-request-parameter)**

- Trong bài này, sau khi đăng nhập, ta thấy ở cookie luôn có một parameter ```Admin=false```. Bây giờ bật interception on và bắt đầu quá trình edit request <lưu ý: phải để interception on vì parameter này được xác minh liên tục>
- Bây giờ, trong giao diện web đã xuất hiện ```Admin Panel``` 
- ![image](https://user-images.githubusercontent.com/61643034/209492084-f484b651-73bb-421f-92db-5e2a7fa46b40.png)
- Sau đó click vào ```/admin``` xem có gì nào, nhớ là ```Admin=true``` nhá
- Rồi click vào xoá user carlos -> vẫn trong request ```Admin=true```
 ![image](https://user-images.githubusercontent.com/61643034/209492377-5a2919ea-fd69-4848-925c-a5590cd68b6c.png)
-> done
