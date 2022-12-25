---
title: Directory traversal
date: '2022-12-25'
tags: ['porswigger', 'traversal', 'Directory']
draft: false
summary: Writeups cua Directory traversal.
images: ['/static/images/ccna/cisco.jpg']
author: ['default']
---

**[1.File path traversal, simple case](https://portswigger.net/web-security/file-path-traversal/lab-simple)**

- Bài này mở 1 cái ảnh bất kì, ta thấy có request link dạng ```?filename=..``` thay đoạn sau thành ```?filename=../../../etc/passwd```
![image](https://user-images.githubusercontent.com/61643034/209455769-0c0b8186-c8ec-4c7b-b5c8-d20a24075391.png)

**[2.File path traversal, traversal sequences blocked with absolute path bypass](https://portswigger.net/web-security/file-path-traversal/lab-absolute-path-bypass)**

- Bài này cũng mở 1 cái ảnh bất kì, ta thấy có request link dạng ```?filename=..``` thay đoạn sau thành ```?filename=/etc/passwd``` 
![image](https://user-images.githubusercontent.com/61643034/209455988-95bc8eb7-b8f8-4b8e-b508-4058854bea1f.png)
- Forward ở interception, tắt interception và reload nữa là solved rồi

**[3.File path traversal, traversal sequences stripped non-recursively](https://portswigger.net/web-security/file-path-traversal/lab-sequences-stripped-non-recursively)**

- Bài này cũng mở 1 cái ảnh bất kì, ta thấy có request link dạng ```?filename=..``` thay đoạn sau thành ```?filename=....//....//....//etc/passwd``` 
- Forward ở interception nữa là solved rồi


**[4.File path traversal, traversal sequences stripped with superfluous URL-decode](https://portswigger.net/web-security/file-path-traversal/lab-superfluous-url-decode)**

- Bài này cũng mở 1 cái ảnh bất kì, ta thấy có request link dạng ```?filename=..``` thay đoạn sau thành ```?filename=..%252f..%252f..%252fetc/passwd``` 
- Đây là encode url , có thể dùng Ctrl+U < mà thực ra bài này mình lấy payload cho sẵn :))) >


**[5.File path traversal, validation of start of path](https://portswigger.net/web-security/file-path-traversal/lab-validate-start-of-path)**

- Lại mở 1 cái ảnh bất kì, ta thấy có request link dạng ```image?filename=/var/www/images/10.jpg``` thay đoạn sau thành ```image?filename=/var/www/images/../../../etc/passwd``` 
- Forward ở interception nữa là solved rồi

**[6.File path traversal, validation of file extension with null byte bypass](https://portswigger.net/web-security/file-path-traversal/lab-validate-file-extension-null-byte-bypass)**

- Lại mở 1 cái ảnh bất kì, ta thấy có request link.
- Theo tên đề bài, ta thấy phải để extension cuối để validate chứ không thể traveral như bình thường được. 
- Thay payload thành ```filename=../../../etc/passwd%00.png``` 
- ENter và boombs -> done
