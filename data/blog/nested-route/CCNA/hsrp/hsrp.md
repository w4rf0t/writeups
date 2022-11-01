---
title: HSRP Lab - CCNA Tự học
date: '2022-11-1'
tags: ['ccna', 'hsrp', 'cisco','packet tracer']
draft: false
summary: Writeups cua Lab cấu hình HSRP.
images: ['/static/images/ccna/cisco.jpg']
author: ['default']
---

![image](https://user-images.githubusercontent.com/61643034/199156830-2676bafc-6d0e-4471-bef2-b4fc6a88dd3a.png)
[Instructions here](https://github.com/w4rf0t/writeups/blob/main/data/blog/nested-route/CCNA/hsrp/instructions.md)

**Part 1: Verify Connectivity**

- Trace the path to the Web Server from PC-A.

<img alt="packet" src="https://user-images.githubusercontent.com/61643034/199155885-bef30e28-d04c-47ff-be84-b984c86b1829.png" height={200} />

- Trace the path to the Web Server from PC-B.

![image](https://user-images.githubusercontent.com/61643034/199156381-47ecd085-9bfc-4dae-b955-3e6600c79003.png)

- Observe the network behavior when R3 becomes unavailable.

![image](https://user-images.githubusercontent.com/61643034/199156743-1cec4975-6736-43eb-9188-4cd99d0a9fb6.png)

    - When trace again by PC-B, it returns request time out
        
![image](https://user-images.githubusercontent.com/61643034/199157015-8b21b9b6-f4bb-4ad4-9b9a-8eb0c08f242a.png)

    - Then reconnect S3 and R3
    
![image](https://user-images.githubusercontent.com/61643034/199157364-ddb8396e-24e4-4475-a221-389b197948e4.png)


**Part 2: Configure HSRP Active and Standby Routers**

- Configure HSRP on R1

![image](https://user-images.githubusercontent.com/61643034/199159179-1c7fb71a-c2ce-4706-bb80-c75c6a2cefdb.png)

- Configure HSRP on R3

![image](https://user-images.githubusercontent.com/61643034/199158755-214ceb81-9e3b-47d6-ae66-eae8f139ddaa.png)

    - Priority default of R3 is 100
    
***I choose the gateway 192.168.1.254 for all of PC-A, PC-B, S1, S3 👌 And of course, both of PC-A & PC-B can ping to WEB Server***


**Part 3: Observe HSRP Operationy**

- Make the active router become unavailable. The path now passes through R1 instead of R3.
    
![image](https://user-images.githubusercontent.com/61643034/199172415-7bf25f24-4224-4cc6-bb5e-11cea8c82112.png)

- Break the link to R1. After delete the cable that connects R1 to S1, the path passes through R3.
   
![image](https://user-images.githubusercontent.com/61643034/199172701-88940c37-6a75-4092-8b16-89314f5caee7.png)


- Restore the link to R1. After add interface Gi0/2 at S1 and Gi0/1 at R1 and fast forward time. We trace PC-B for the last time. And booms 💣💥

![image](https://user-images.githubusercontent.com/61643034/199174028-7c2d37bf-d621-409c-a0b2-c6207e6d6cda.png)

        It returns to pass through R1.
