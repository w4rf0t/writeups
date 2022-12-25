---
title: Authentication Labs
date: '2022-12-25'
tags: ['porswigger', 'authentication']
draft: false
summary: Writeups cua Authentication Labs.
images: ['/static/images/ccna/cisco.jpg']
author: ['default']
---
**[1.Username enumeration via different responses](https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-different-responses)**

- Bài này mình sẽ dùng intruder là chính 
- Với 2 list ```username ``` và ```password``` cho sẵn ở phần gợi ý, ta sẽ bruteforce.
- Với trường hợp đúng username -> invalid password còn đúng password -> invalid username
- Và tất nhiên thì length của respone trả về khác nhau nên ta chỉ cần sắp xếp theo length
- Từ đây tìm ra username là ```au``` và password là ```666666```

**[2.2FA simple bypass](https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-simple-bypass)**

- Với bài này thì credentials đã được cho sẵn.
- Login vào tài khoản ```wiener:peter``` trước -> Gửi email -> nhập OTP code được gửi tới -> link ở trang chính sẽ trỏ tới ```/my-account```
- Sau đó logout và login vào ```carlos:montoya``` , sau đó thay link thành ```/my-account``` -> solved

**[3.Password reset broken logic](https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-reset-broken-logic)**

- Với bài này thì credentials đã được cho sẵn.
- Login vào tài khoản ```wiener:peter``` trước -> Gửi email -> nhập OTP code được gửi tới -> sẽ có link reset mật khẩu -> click vào đó
- Đổi mật khẩu thành ```admin``` chẳng hạn 😃 
- Trong burpsuite -> vào HTTP History trong tab Proxy -> thấy có request vừa nãy reset -> Send tới Repeater
![image](https://user-images.githubusercontent.com/61643034/209457422-ee927668-5e24-45d8-9792-b81671cd6f75.png)
- Đổi username thành ```carlos``` và xoá token đi.
- Sau đó vào web -> login với username ```carlos``` với password là ```admin``` -> done 🙂

**[4.Username enumeration via subtly different responses](https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-subtly-different-responses)**

- Với bài này thì ta sẽ sử dụng bruteforce -> mà theo tên đề bài quan trọng nhất vẫn là những respone trả về khác nhau
- Bước đầu tiên, ta sẽ bruteforce username
- Ở đây ta sẽ sử dụng ***Grep-extract*** để lấy repsone trả về giữa 2 thẻ ```<p class="is-warning">..</p>``` 
- Sau khi enumarate thẻ username -> thấy respone của user ```asterix``` khônng có dấu `.` ở cuối câu như những respone khác. Mạnh dạn đoán đây chính là username.
- Bây giờ thử qua bruteforce mật khẩu -> với list mật khẩu có sẵn -> bruteforce thấy password ```biteme``` có respone 302.
- Vậy là chỉ cần login nữa thôi.
