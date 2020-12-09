---
layout: post
title:      "Done Is Good -- A Rails Application"
date:       2019-08-08 02:11:17 -0400
permalink:  done_is_good_--_a_rails_application
---

![](http://tmetz.github.io/blogpics/done.jpg)

## Introduction

My Rails final project has been a much longer process than I would have hoped.  I think mostly because I felt so shaky in my overall understanding of Rails -- I needed time to process.

You can view a walkthrough video at [https://youtu.be/iueYc6LS5eQ](https://youtu.be/iueYc6LS5eQ).  You can view the running app at [https://done-is-good.herokuapp.com](https://done-is-good.herokuapp.com) (use u/n: test, p/w: test or feel free to create your own account).  You can view the code and fork the project at [https://github.com/tmetz/done-is-good](https://github.com/tmetz/done-is-good).

The application is something of a beefed up to-do list.  It allows users to create tasks to be done, and also allows them to group tasks into larger goals.  Additionally, users can create incentives tied to goals to help encourage them to keep progressing to the finish line.

## Models

It looks a long time to figure out the models.  Ultimately I decided that my join table should be Tasks, which connects Users and Goals.  Here is how I set up my associations:

#### Goals have many users and users have many goals:

```
class Goal < ApplicationRecord

    has_many :tasks
    has_many :users, through: :tasks
    has_many :incentives
		
end
```

```
class User < ApplicationRecord

    has_many :tasks
    has_many :goals, through: :tasks

end
```

#### Task is the join table:

```
class Task < ApplicationRecord
    
    belongs_to :goal
    belongs_to :user

end
```
#### And finally, Incentives belong to a Goal:

```
class Incentive < ApplicationRecord

    belongs_to :goal

end
```

## Views
The Rails project has so many more views than the Sinatra project did, mostly because there are more models.  I mostly followed RESTful conventions setting up routes, so there are the standard index, show, new, etc. pages.  I also ended up creating a view for goals belonging to *other* users, since I have allowed a goal to have many users.  This way, users can collaborate on a goal.  In order for the controller to send the correct goals, I created a class method in my model to pull goals that belong to others instead of the user:

```
def self.all_for_others(user_id)
        joins(:users).where("users.id != ?", user_id).distinct
end
```

The other complication with views was adding the functionality to make nested views (e.g. /goals/36/tasks).  For simple views like the index example, everything was handled in the controller.  For form views like /goals/36/tasks/new, I added an if statement to only show the option to create a new goal if the form was NOT nested:

```
<% if !params[:goal_id] %>
        <div class = "new_form_attribute">
            <h4>Or add a new goal</h4>
            <%= f.fields_for :goal do |g| %>
                <%= g.label :name %>
                <%= g.text_field :name %>

                <%= g.label :accomplished %>
                <%= g.radio_button :accomplished, true %> Yes
                <%= g.radio_button :accomplished, false %> No

            <% end %>
        </div>
<% end %>
```

## Controllers
The controller logic had to handle several tricky situations: nested forms and views, an action for adding a new user onto a goal by creating a new task, making sure only the tasks/goals/incentives for the current user were shown on index pages, and making sure deletions worked well (for example, if the last task of a goal is deleted, the goal is also deleted).

## Next Steps
I feel like I have a much better grasp of Rail now than when I first started working on this project in Mid-May.  However, I also know that this unit is one that I have learned the most new concepts in, so I know that I am going to learn a lot from my portfolio project review.  I look forward to more learning and probably refactoring!
