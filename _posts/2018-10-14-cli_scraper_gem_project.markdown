---
layout: post
title:      "CLI Scraper Gem Project"
date:       2018-10-14 10:58:31 -0400
permalink:  cli_scraper_gem_project
---

![](http://tammymetz.com/images/tribal.jpg)

I am (finally!!!) about to submit my CLI scraper ([https://github.com/tmetz/tribalcollege-cli](https://github.com/tmetz/tribalcollege-cli)).  The project I chose was to scrape a list of tribal colleges from the American Indian Higher Education Commission's website [(http://www.aihec.org/who-we-serve/TCUroster-profiles.htm]((http://www.aihec.org/who-we-serve/TCUroster-profiles.htm)).  You can view my walkthrough video at [https://www.youtube.com/watch?v=ilpK8IWM6GE](https://www.youtube.com/watch?v=ilpK8IWM6GE).  This is very near and dear to my heart, as I worked at a tribal college, and saw the impact that it had on the students in the area.  One thing that is hard for people to understand is how isolated some reservations can be.  It was literally a 3 hour drive to get to the closest state university, and having a tribal college opened up so many possibilities for people on the rez.

I did run into some difficulty in trying to get this done.  First of all, I took so long that big red messages started showing up on my learn.co console telling me I'd better not be looking at anything else until I submit this project!  Woah!  

It was difficult to get used to using the online sandbox (per the project instructions).  There were a few times when I would work and think I was committing to github, only to find out later that I hadn't, and that work was lost.  I realized that the reason this was happening was that I was not committing from inside my gem's directory.

After I worked out the github issues, I looked at AIHEC's website and realized it was going to be really, really hard to scrape.  They used almost no "id"s and their structure was just crazy.  I was watching Avi's video where he groaned, "Oh no, it's TABLES!" as I was looking at AIHEC's table structure myself.  I thought, if Avi is having this reaction, and I have something similar...I'm really screwed.  I ended up using the xpath for the table element that I needed, but that took a long time to learn about and figure out.

I was so happy at the end, though, when I was able to just pound out the code to use a hash to store colleges by state -- after all of that struggle, this part just clicked into place.

So I am ready to see what somebody else thinks and hear lots of constructive criticism.
