---
layout: post
title:      "Yielding - what on earth?"
date:       2018-08-01 17:20:13 +0000
permalink:  yielding_-_what_on_earth
---



I have been trying to wrap my head around a concept I was unfamiliar with -- yielding.  Yielding is where your function yields a variable -- not as a return value, but in the middle of whatever it is doing -- back to a block *outside* of the method.

For example:

```
def hello(array)
  i = 0
  collection = []
  while i < array.length
    collection << yield(array[i])
    i += 1
  end
  collection
end


hello(["Tammy", "Joey", "Jim"]) { |name| "Hi, #{name}" }
```
The code above calls the #hello function, sends it an array of names, but also tells it that there is a block of code
```
|name| "Hi, #{name}"
```
that is associated with that function call.  Inside the function, the passed in array is looped through, but what is added to our collection array is actually the result of yielding the array element back outside to the original block.  The block returns "Hi, #{name}" each time, and the result is a new array returned with nice greetings as its elements.

It has been difficult for me to grasp this concept, but I have a feeling I'll be using it a lot before too long.  It almost feels like cheating -- like I am bypassing how a function is "supposed" to work.  It is very cool, but very strange.


