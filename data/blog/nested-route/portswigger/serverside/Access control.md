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
 ![image](https://user-images.githubusercontent.com/61643034/209492084-f484b651-73bb-421f-92db-5e2a7fa46b40.png)
- Sau đó click vào ```/admin``` xem có gì nào, nhớ là ```Admin=true``` nhá
- Rồi click vào xoá user carlos -> vẫn trong request ```Admin=true```

![image](https://user-images.githubusercontent.com/61643034/209492377-5a2919ea-fd69-4848-925c-a5590cd68b6c.png)
-> done

**[4.User role can be modified in user profile](https://portswigger.net/web-security/access-control/lab-user-role-can-be-modified-in-user-profile)**

- Trong bài này, sau khi đăng nhập, ta sẽ vào update email. Vào ```HTTP History``` gửi gói ```POST /my-account/change-email```tới ***Repeater***.
- Theo gợi ý của bài, ta sẽ thêm ```"roleid":2``` vào trong payload của change email. Sau đó send gói request đi.
  ![image](https://user-images.githubusercontent.com/61643034/209493837-be5867cd-ec58-4af8-a80c-93242760d4af.png)
- Lúc này ở giao diện web đã hiện lên ***Admin Panel*** bây giờ chỉ cần vào đây và xoá carlos đi cho bỏ ghét :>

**[5.URL-based access control can be circumvented](https://portswigger.net/web-security/access-control/lab-url-based-access-control-can-be-circumvented)**

- Thử truy cập vào ***Admin Panel*** -> ```access denied```
- Theo gợi ý, bài này sẽ dùng ```X-Original-URL:```. Bây giờ, ta sẽ trỏ thẻ ```GET /admin``` -> ```GET /``` và để ```X-Original-URL: /admin``` -> Send
 ![image](https://user-images.githubusercontent.com/61643034/209494573-7e03f9c5-978c-4443-84eb-30dc709ea923.png)
- Để xoá carlos mình sẽ phải chỉnh như sau
 ![image](https://user-images.githubusercontent.com/61643034/209498569-00f4e162-edf0-4b4b-ba5f-59f80a685d76.png)
- Sau đó reload lại trang ```/admin``` 
![image](https://user-images.githubusercontent.com/61643034/209498670-ab65c516-105f-4635-aa0b-0a741afe1f7c.png)

**[6.Method-based access control can be circumvented](https://portswigger.net/web-security/access-control/lab-method-based-access-control-can-be-circumvented)**

- Bài này sẽ update quyền của wiener thông qua request của admin sau khi update quyền của carlos.
- Đầu tiên,ném request admin up quyền cho carlos qua Repeater, sau đấy logout ra -> đăng nhập bằng tài khoản wiener.
- Copy ```session``` của wiener -> thay thế session của administrator hồi nãy.
- Lần đầu sẽ bị hiện "Unauthorized" -> thay method ```POST``` thành ```POSTX``` -> missing parameter username``` .
- Change request method và đổi tên username thành wiener là done. 🙂
