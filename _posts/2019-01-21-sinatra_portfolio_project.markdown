---
layout: post
title:      "Sinatra Portfolio Project"
date:       2019-01-21 10:58:25 -0500
permalink:  sinatra_portfolio_project
---

![](http://tmetz.github.io/blogpics/networking.jpg)

**The Project:**

The requirements of the Sinatra final project were to create an MVC application to be a content management system, using Sinatra.  Although I have some hobbies, right now my "favorite" hobby is job searching.  Every time I tried to think of an idea related to folk music, or libraries, I just kept thinking about my job search.  So ultimately that's what I decided to do -- an application to track the people I meet at networking events and meetup groups, and what interactions we have (discussions, email exchanges, forwarding a resume, etc.).

You can try it out for yourself here:
[https://track-my-networking.herokuapp.com](https://track-my-networking.herokuapp.com)

And you can see an example walkthrough here: 
[https://www.youtube.com/watch?v=TAXK2I-F4Kw](https://www.youtube.com/watch?v=TAXK2I-F4Kw)

And look at the code here:
[https://github.com/tmetz/track-my-networking](https://github.com/tmetz/track-my-networking)


**Model:**

The foundation for my app are 3 models: User, Person (meaning professional connection), and Interaction.  The User model is necessary in order to manage accounts that let people log in.  A user has many professional connections (persons) through the bridge of interactions.

```
class User < ActiveRecord::Base
    has_secure_password
    has_many :interactions
    has_many :persons, through: :interactions

end
```

On the other end of the bridge is a person (professional connection), who has one user, also through the bridge of interactions.


```
class Person < ActiveRecord::Base
    self.table_name = "persons" # otherwise ActiveRecord will look for "people" table
    has_many :interactions
    has_one :user, through: :interactions
end

```

The Ineraction model belongs to both users and professional connections, and has some additional logic to handle how the date is dealt with, since it is stored as a string.

```
class Interaction < ActiveRecord::Base
    belongs_to :person
    belongs_to :user

    def self.create_formatted_date(year, month, day)
        return_string = "#{month} #{day}, #{year}"
    end

    def year
        return self.date.split(", ").second
    end

    def month
        return self.date.split(" ").first
    end

    def day
        return self.date.split(" ").second.chop
    end
end
```


**View:**

I created views for the standard CRUD functionality, so both the professional connection ("persons") model and the interactions model have the following views:

* index - shows a list of all of the instances in the database (e.g. all of the interactions so far)
* show - shows the details for one particular instance
* edit - allows updating of one particular instance

I also built a new view for interactions, which allows a user to create a new interaction.  A new professional connection can also be created on this page, or the interaction can be associated with a professional connection who was already created before.

For users, I created login and signup views, as well as a show page that gives a summary of professional connections and interactions, and links to allow the user to view their connections and interactions.

Finally, there is a welcome page that asks users to create an account, and a failure page for when something doesn't work.  There is also a layout view which encapsulates all other views.  In this view I was able to create some styling using the bootstrap framework.  Flash messages are passed to the layout so that any time something goes wrong or is successful, a message will be displayed to the user.


**Controller:**

The controller creates routes that correspond with the CRUD actions and views described above.  There is a controller for each model (users, persons, and interactions).  The controller does any calculations requiring logic.  For example, the controller for "/persons/recent" selects only professional connections who have been created or updated recently.

```
get "/persons/recent" do
     if logged_in?
         @user = current_user
         @persons = @user.persons.where("updated_at > ?", 7.days.ago).uniq
         @from_recent = 1
	  erb :'/persons/index'
     else
         redirect '/login'
     end
end
```


**Deploying so it can be a live app:**

I lucked out and found this blog post by a fellow Flatiron student about how she deployed to Heroku.  By following her instructions (with a little tweaking), I was able to get the app deployed and functional.  I learned that you can set up Heroku to automatically update ("deploy") every time a change is pushed to GitHub.

[https://medium.com/@christine_tran/deploying-sinatra-app-to-heroku-8c64f025db77](https://medium.com/@christine_tran/deploying-sinatra-app-to-heroku-8c64f025db77)
