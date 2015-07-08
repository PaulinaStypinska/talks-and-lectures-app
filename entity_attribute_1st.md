
I devised them as tables to be able to show data types:

1. Lecture:

Title | Picture/Graphic | Date | Time | Venue | Organisation | Lecturer | Summary | Fee
----- | --------------- |----- | ---- |------ | ------------ | -------- | ------- |-----
String(up to 100 ch) | Bits | date | date/time | Strings(up to 50 ch) | Strings(up to 50 ch) | Strings(up to 50 ch) | Strings(up to 300 ch) | Integer

2. Venue

Name | Building Name | Street | Street Address | Postcode | City | Telephone | Email
---- | ------------- | ------ | -------------- |--------- | ---- | --------- |------
String(up to 50ch) |  String(up to 50ch) |  String(up to 50ch) |  String(up to 50ch) |  String(up to 50ch) |  String(up to 50ch) |  Integer |  String(up to 50ch)  

3. Organisation 
*since it's not always the same as venue*

Name | Building Name | Street | Street Address | Postcode | City | Telephone | Email
---- | ------------- | ------ | -------------- |--------- | ---- | --------- |------
String(up to 50ch) |  String(up to 50ch) |  String(up to 50ch) |  String(up to 50ch) |  String(up to 50ch) |  String(up to 50ch) |  Integer |  String(up to 50ch) 

4. Lecturer

First Name | Last Name | Picture | Bio | Link to website | Work1 | Work2 
---------- | --------- | ------- | --- | --------------- | ----- |-------
String(up to 50ch) |  String(up to 50ch) | Bits/pic |  String(up to 300ch) | String(up to 50ch) |  String(up to 50ch) |  String(up to 50ch)

And this is optional but I have been getting all these ideas since I started sketching this out; it would be quite useful if people could log in, store their preferences and get alerts for talks/lectures that might be of interest to them. So I created an experimental user entity. Another thing would be an option to access user's calendar and creating the event.

5. User

Username | Password | Email address 
-------- | -------- | -------------
String(max 10ch) | String(max 10ch) | String(max 50ch)