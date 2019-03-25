---
title: "All Facebook chat history visualized"
date: 2018-03-16
categories: projects

author: Muchen He
layout: post
nav_active: /blogs
# tags:
#   - other
#   - processing
#   - facebook
#   - project
#   - data
#   - visualization

published: false
---

I've had my Facebook data archive downloaded for quite some time now, so I decideded to do something with them. By the way, [this Facebook article](https://www.facebook.com/help/302796099745838) has details on how to do so. I wanted to visualize the messages exchanged between me and my friends.

## Getting the Data

The first thing I needed to do is to scrap the data from the HTML archive Facebook provides.
Writing my own scraper would honestly take too long so I used a simple python library [fbchat-archive-parser](https://github.com/ownaginatious/fbchat-archive-parser) to get the message data from HTML and exported it as a .csv file.

After installing the library using `pip`, I used the following command inside the HTML folder of the Facebook archive to export all messages to a single .csv file:

{% highlight shell %}
fbcap ./messages.htm -f csv > messages.csv
{% endhighlight %}

The output .csv file contains the thread (which include participants of the thread), date the message is sent, sender, and message content.

There are several problems we still need to fix. First, I don't need to do anything with the actual message content, so getting rid of them it would be easier for later computations. Second, the messages are not sorted chronologically. Third, the archive .csv also contains group chats, and while I want to do something with those in the future, I want to ignore them for now.

Thus, I wrote a python program that takes the `messages.csv` and filter through it once more. The output of the program is another .csv file which contains **sorted** date and time of the message sent in UNIX format; the thread names have been replaced by sender and receipient name; and message length which replaced the message content.

## Choosing Development Platform

this project was inspired by the version control visualizer, [gource](http://gource.io/), which is written in C++. Naturally, I initially had the intention to program this in C++ as it would be faster and I could learn to write some pretty looking shaders. 

However, I got busy with school so then I went with [*Processing*](https://processing.org/), something I'm much more comfortable with. The performance is good enough for what we're doing here.

## Development

The first thing I need to do is to read the .csv file and load it as a table in Processing. 
