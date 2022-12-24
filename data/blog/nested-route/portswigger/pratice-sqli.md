---
title: SQL Injection Labs
date: '2022-12-24'
tags: ['porswigger', 'sql', 'injection','sqlinjection']
draft: false
summary: Writeups cua SQL Injection Labs.
images: ['/static/images/ccna/cisco.jpg']
author: ['default']
---
# [1.SQL injection vulnerability in WHERE clause allowing retrieval of hidden data](https://0a6d001204158687c35a814e00590001.web-security-academy.net/)

- Ta thấy lệnh ```filter?``` sẽ truy xuất dữ liệu. Dùng ```filter?category=Pets'+or+1=1--'``` sẽ hiện ra toàn bộ thông tin sản phẩm.

# [2.SQL injection vulnerability allowing login bypass](https://0a2f005e035cd61dc2e61bea0045002e.web-security-academy.net/login)

![image](https://user-images.githubusercontent.com/61643034/209037070-e5b60413-e259-47d7-9a2d-28b3c433fc0f.png)

# [3.SQL injection UNION attacks]()

**[3.1.SQL injection UNION attack, determining the number of columns returned by the query](https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns)**
- Mục đích của bài này là xác định số trường của query.
- Theo gợi ý thấy chèn sau category=? 1 đoạn ```'+UNION+SELECT+NULL,NULL--```
- Kết quả trả về là internal server -> thừa hoặc thiếu số lượng trường trong bảng -> thêm 1 trường vào -> query trở thành ```filter?category=Pets'+UNION+SELECT+NULL,NULL,NULL-- ```

**[3.2.SQL injection UNION attack, finding a column containing text ](https://portswigger.net/web-security/sql-injection/union-attacks/lab-find-column-containing-text)**

- Bài này không chỉ cần xác định số trường của query mà còn cả vị trí của text string nữa.
- Cùng 1 trang web query nên ta biết chắc query này cũng sẽ có 3 cột
- Thử payload ```'+UNION+SELECT+'a',NULL,NULL--``` -> màn hình hiện lên bắt nhập string bắt buộc là ```'QCQTlQ'``` -> Enter
- Vẫn bị lỗi internal server -> thử vị trí của string thành cột 2, hoặc 3 -> ```'+UNION+SELECT+NULL,'QCQTlQ',NULL--``` -> done

# [4.SQL injection with filter bypass via XML encoding](https://portswigger.net/web-security/sql-injection/lab-sql-injection-with-filter-bypass-via-xml-encoding)
![image](https://user-images.githubusercontent.com/61643034/209040423-3270052e-3a07-4225-9431-70a5c5d6b9cc.png)

- Truy cập trang web, ở burpsuite, bật interception on
- Bấm vào ```check``` -> vào check request trả về
- Trong request có trường ```storeID``` -> sửa thành ```1+1``` -> trả về 144 unit -> bằng với storeID=2
- Nhập 1 lệnh attack vào giữa cặp ```<storeID>``` -> trả về attack detected -> bị block
  ![image](https://user-images.githubusercontent.com/61643034/209041177-ab4fe22c-2342-451b-aa22-872c072242b4.png)
- Bây giờ vào extension -> cài Hackvertor -> vào encode -> dec_entries -> dán ```<@dec_entities>1 UNION SELECT username || '~' || password FROM users<@/dec_entities>``` vào được output -> copy thả lại vào cặp thẻ ```<storeID>```. Và bbooms
![image](https://user-images.githubusercontent.com/61643034/209042766-d1661308-9cbb-42c4-9651-58ebde6e0c14.png)

**[]()**

**[]()**
