---
title: OS command injection
date: '2022-12-25'
tags: ['porswigger', 'OS', 'command','injection']
draft: false
summary: Writeups cua OS command injection.
images: ['/static/images/ccna/cisco.jpg']
author: ['default']
---

**[1.OS command injection, simple case](https://portswigger.net/web-security/os-command-injection/lab-simple)**

- Theo yêu cầu của đề bài, cần truy xuất ra danh tính người dùng excute command truy vấn. Bằng command ```whoami```
- Mở detail, bật interception on -> bấm vào submit button -> rồi ném sang Repeater
- Sửa ```productId=1&storeId=2``` thành ```productId=1&storeId=2|whoami``` -> send là xong
 ![image](https://user-images.githubusercontent.com/61643034/209468611-de7ef3ac-ebe7-4b32-9f39-2a02d7fac8da.png)

**[2.Blind OS command injection with time delays](https://portswigger.net/web-security/os-command-injection/lab-blind-time-delays)**

- Tương tự bài 1, sau khi điền form feedback -> chúng ta sẽ chèn payload ```email=x||ping+-c+10+127.0.0.1||``` thay cho ```email=abc@abc.com``` đã nhập trước đó.
  ![image](https://user-images.githubusercontent.com/61643034/209468793-c24e32de-70d3-4369-ad76-de9d66500bbc.png)

 **[3.Blind OS command injection with output redirection](https://portswigger.net/web-security/os-command-injection/lab-blind-output-redirection)**

- Ở bài này, đầu tiên mình sẽ vào lại form feedback kia, gửi 1 truy vấn -> gắn nó vào file có tên là ***output.txt*** với payload ```email=||whoami>/var/www/images/output.txt||```
- Sau đấy mở 1 ảnh bất kì, sẽ thấy lệnh truy vấn ```filename=?``` giờ đổi file ảnh bất kì đấy thành ```output.txt``` 
- Kết quả sẽ trả về ```peter-OciFPc``` -> done
