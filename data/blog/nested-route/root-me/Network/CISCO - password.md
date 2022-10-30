---
title: CISCO - password
date: '2022-08-31'
tags: ['cisco', 'root-me', 'writeups','network']
draft: false
summary: Writeup of CISCO - password challenges.
---

Challenge link: 
http://challenge01.root-me.org/reseau/ch15/ch15.txt

Look at the text lines, we can see this

[text](https://user-images.githubusercontent.com/61643034/187698984-9bcf8040-7e76-4197-9d5a-2a601bfaea14.png)

The passwd is encrypt by secret5 or 7, and I suddenly think about [Davidbombal](https://davidbombal.com/cisco-type-7-password-decryption/).
As we can see, the admin account name is use secret 7, so I copied the encypted passwd text: 
```10181A325528130F010D24```

After paste the encrypted code into box, it returns 
```6sK0_admin```
[pass](https://user-images.githubusercontent.com/61643034/187700351-7a78ffe4-0ece-4170-8bcf-2b3386020e75.png)

