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

**[5.Broken brute-force protection, IP block](https://portswigger.net/web-security/authentication/password-based/lab-broken-bruteforce-protection-ip-block)**

- Bài này chỉ có 2 username nên chúng ta chỉ cần brutefore carlos. Tuy nhiên khá là thốn vì nó có giới hạn request số lần ```Invalid password```  và sau đó bắt mình thử lại sau 1 phút. Tất nhiên thì làm gì có chuyện như vậy 🙂.
- Sau khi tham khảo trên mạng mình đã quyết định sẽ đăng nhập luân phiên giữa 2 account ```wiener:peter``` và ```carlos``` chưa biết mật khẩu.
- Đây là đoạn code python để generate password để intruder đăng nhập luân phiên. 
  ```python
      mang=[]
      fhand=open("password.txt","r")
      for line in fhand:
            line=line.rstrip()
            mang.append("peter")
            mang.append(line)
      fhand=open("password.txt","w")
      for i in mang:
            fhand.write(str(i)+"\n")
  ```
- Với account ```wiener``` và ```carlos``` thay phiên. Bây giờ mình sẽ dùng intruder với tuỳ chọn ***PitchFork***. 
- Lưu ý: ở file password.txt sau khi generate mình sẽ có 200 dòng, nên tương tự bên payload của username mình cũng sẽ để 200 account là ```wiener``` và ```carlos```.
hoặc dùng code dưới đây cho chắc chắn 
     ```python
      for i in range(100):
            print("wiener\ncarlos")
     ```
- Sau khi bruteforce, tìm ra pass là ```trustno1```. Ở resource pool mình cũng đã phải đổi thành 1 request 1s để tránh bị quá tải và chạy sai kết quả
![image](https://user-images.githubusercontent.com/61643034/209460872-569259b9-2a16-455b-bb5a-22f118b09646.png)

**[6.Username enumeration via account lock](https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-account-lock)**

- Với bài này thì ta sẽ sử dụng bruteforce và clusterbombs và null payloads
- Đầu tiên bruteforce để tìm username 
![image](https://user-images.githubusercontent.com/61643034/209461268-255b6e86-1738-4a8f-902c-7294f4273f81.png)
- và sau khi có tài khoản rồi, mình sẽ brutefore mật khẩu 
![image](https://user-images.githubusercontent.com/61643034/209461406-43b30eac-cdb7-4da5-b1e4-e11b6ac2ecd8.png)
- Tài khoản và mật khẩu lần lượt là ```ec2-user``` và ```computer```
