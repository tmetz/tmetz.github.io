---
layout: post
title:      "Navajo Introductions - a JavaScript SPA with a Rails API backend"
date:       2019-11-30 21:55:06 +0000
permalink:  navajo_introductions_-_a_javascript_spa_with_a_rails_api_backend
---

### Introduction

(Disclaimer: I am a non-native student of Navajo culture, not an expert. I welcome corrections to this information - email me at [tammy@tammymetz.com](mailto:tammy@tammymetz.com))

For my JavaScript section final project, I decided to create a SPA (Single Page Application) to generate a personalized greeting for someone, in Navajo language, based on their 4 clans.  [You can watch a walkthrough video here.](https://www.youtube.com/watch?v=-bNTm2Zrurc&feature=youtu.be)  [Go here for the GitHub repository for the front end](https://github.com/tmetz/navajo-introductions-frontend).  [Go here for the GitHub repository for the back end.](https://github.com/tmetz/navajo-introductions-backend)  

### Background

An important part of Navajo culture is introducing yourself with your 4 clans. This establishes kinship (who you are related to), which is extremely important. You should have 4 different clans, and you cannot marry someone with the same clan as you.

Your 4 clans come from your mother, father, maternal grandfather, and paternal grandfather. Since Navajo culture is matrilineal (passed down through the mother), you do not need to list your grandmothers (for example, your maternal grandmother's clan is the same as your mother's clan). For a great explanation, read [this article from the Arizona Republic newspaper](https://www.azcentral.com/story/news/local/arizona/2019/08/29/what-means-introduce-yourself-navajo-clan-system/2131456001/). and watch [this video from Navajo pharmacist Terry Teller](https://www.youtube.com/watch?v=VYAd9KuScoc&t=232s).

The clan groupings and color-coding I used mostly follow [this publication of Chinle Unified School District #24](http://www.chinleusd.k12.az.us/nclhome/files/2016/09/%E2%80%A2-Navajo-Clan-Names-Groups.pdf).


### Architecture

For my back end, I set up a Rails application with only a few controller actions:
* clan_groups#index - returns a JSON list of all clan groups
* clan_groups#show - returns a JSON representation of that clan group, including all of its clans
* clans#update - adds 1 to the clan's count
* clans#top - returns a JSON list of the top 3 clans

For my front end, I used JavaScript to fetch a list of clan groups and generate HTML to show each one as a button on the page.  Then, when one of those buttons is clicked, another fetch request is sent to get the clans of that group.  A JavaScript object is created to hold all of the information, and HTML is generated to list each clan as a draggable div.  The user can drag and drop their clans to the correct family member.  Then, when they press the button to generate their introduction, a fetch PATCH request is sent to the API to update the clan counts in the database.  Once this happens, another fetch (GET) request is sent to retrieve the top 3 clans.  Meanwhile, HTML is generated using the 4 selected clans to construct a paragraph in Navajo that the visitor can read from to introduce themselves.


### Takeaways

It is possible to create a very powerful (and complicated) single page application.  To me the most important part (and what I struggle with) is keeping everything organized -- separation of concerns, avoiding duplication, etc.  Watching how some of the Flatiron instructors structure their JavaScript to keep everything organized was very helpful to me, and hopefully this is something I will continue to get better at.
