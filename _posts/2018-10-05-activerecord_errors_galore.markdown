---
layout: post
title:      "ActiveRecord Errors Galore!"
date:       2018-10-05 08:18:04 +0000
permalink:  activerecord_errors_galore
---


So, I had been doing fine through most of the ActiveRecord labs...until  I hit the following error:

```
// ♥ rake db:migrate
rake aborted!
Gem::LoadError: You have already activated rake 12.3.1, but your Gemfile requires rake 10.4.2. Prepending `bundle exec` to your co
mmand may solve this.
```


Okay, so typing 

```
bundle exec rake db:migrate
```

did get rid of the error...and created this monstrosity:

```
// ♥ rake db:migrate
-- [](5.1)
-- [](5.1)
rake aborted!
NoMethodError: undefined method `[]' for #<ActiveRecord::Migration:0x00000000b8b8e8>
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:664:in `block in method_missing'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:634:in `block in say_with_time'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:634:in `say_with_time'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:654:in `method_missing'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:416:in `method_missing'
/home/tmetz/activerecord-tvshow-v-000/db/migrate/001_create_shows.rb:1:in `<top (required)>'
/usr/local/rvm/gems/ruby-2.3.1/gems/activesupport-4.2.5/lib/active_support/dependencies.rb:274:in `require'
/usr/local/rvm/gems/ruby-2.3.1/gems/activesupport-4.2.5/lib/active_support/dependencies.rb:274:in `block in require'
/usr/local/rvm/gems/ruby-2.3.1/gems/activesupport-4.2.5/lib/active_support/dependencies.rb:240:in `load_dependency'
/usr/local/rvm/gems/ruby-2.3.1/gems/activesupport-4.2.5/lib/active_support/dependencies.rb:274:in `require'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:777:in `load_migration'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:773:in `migration'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:768:in `disable_ddl_transaction'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:1051:in `use_transaction?'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:961:in `rescue in block in migrate'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:958:in `block in migrate'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:955:in `each'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:955:in `migrate'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:823:in `up'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:801:in `migrate'
/home/tmetz/activerecord-tvshow-v-000/Rakefile:9:in `block (2 levels) in <top (required)>'
/usr/local/rvm/gems/ruby-2.3.1/gems/rake-12.3.1/exe/rake:27:in `<top (required)>'
Caused by:
NoMethodError: undefined method `[]' for #<ActiveRecord::Migration:0x00000000b8b8e8>
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:664:in `block in method_missing'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:634:in `block in say_with_time'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:634:in `say_with_time'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:654:in `method_missing'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:416:in `method_missing'
/home/tmetz/activerecord-tvshow-v-000/db/migrate/001_create_shows.rb:1:in `<top (required)>'
/usr/local/rvm/gems/ruby-2.3.1/gems/activesupport-4.2.5/lib/active_support/dependencies.rb:274:in `require'
/usr/local/rvm/gems/ruby-2.3.1/gems/activesupport-4.2.5/lib/active_support/dependencies.rb:274:in `block in require'
/usr/local/rvm/gems/ruby-2.3.1/gems/activesupport-4.2.5/lib/active_support/dependencies.rb:240:in `load_dependency'
/usr/local/rvm/gems/ruby-2.3.1/gems/activesupport-4.2.5/lib/active_support/dependencies.rb:274:in `require'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:777:in `load_migration'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:773:in `migration'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:768:in `disable_ddl_transaction'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:1051:in `use_transaction?'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:1043:in `ddl_transaction'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:997:in `execute_migration_in_transaction'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:959:in `block in migrate'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:955:in `each'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:955:in `migrate'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:823:in `up'
/usr/local/rvm/gems/ruby-2.3.1/gems/activerecord-4.2.5/lib/active_record/migration.rb:801:in `migrate'
/home/tmetz/activerecord-tvshow-v-000/Rakefile:9:in `block (2 levels) in <top (required)>'
/usr/local/rvm/gems/ruby-2.3.1/gems/rake-12.3.1/exe/rake:27:in `<top (required)>'
Tasks: TOP => db:migrate
(See full trace by running task with --trace)

```


I spent three days looking through StackOverflow and trying everything I could think of to figure out what was broken.  I mean, I hadn't even done the lab yet -- this was the very first thing, the database migrations!   It turns out, although we are normally supposed to specify the ActiveRecord version, for example


```
class CreateShows < ActiveRecord::Migration[5.2]
```


In this case, for whatever reason, something in the lab was old enough that actually I just needed to call Migration without the version:

```
class CreateShows < ActiveRecord::Migration
```


Just making that one small change fixed everything.  Gotta love troubleshooting!


