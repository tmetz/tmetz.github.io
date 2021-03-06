---
layout: post
title:      "Where do I find that book?"
date:       2019-02-20 18:15:12 -0500
permalink:  where_do_i_find_that_book
---

## Introduction

![Screenshot of sample map](http://tmetz.github.io/blogpics/stacksmap.jpg)


Several years ago, I worked in an academic library as a systems librarian (basically, I made sure anything computer-related worked and was regularly updated).  While at that job, I wrote a program to dynamically create a map of where to find any book in the library stacks.  I figured out how to integrate it into our Integrated Library System, so that a user could look up any book in the catalog and create a map of where to find it on the fly.  I had previously written this up as a PowerPoint presentation in order to present at a conference, but I realized that most people probably are not going to want to open up a PowerPoint.  So now that I have this blog, I'm going to go ahead and try to describe what I did and how I did it.


## Background

I was working at a [tribal college library located on the Navajo reservation in northern Arizona and New Mexico](http://www.dinecollege.edu).  There are not very many libraries on the Navajo reservation, so the library at Diné  College is a bit of a jewel.  It has a lot of rare Native American materials, as well as many other subjects that any other University library might be expected to have.  

In late 2012, I attended a talk at the LITA (Library Information Technology Association) conference.  The talk was by Geoffrey Timms and Jeremy Brown from Mercer University.  They had developed a stacks map, and I decided I wanted to try this too!  I soon analyzed the resources I had at hand (which were woefully less than what they had used, including the systems librarian!).  I did not have a separate test server, only production servers.  I did not know enough about using a database back end to want to try that.  Possible languages that were installed on the server were Java and Perl.  I did not want to install anything else or make any changes to the server, because it was set up by our ILS company in a very specific configuration -- so if I broke something, I would bring down our whole catalog.  In terms of personnel, I was the only person in our system of 3 libraries across 6 campuses who really worked with technology at all.

I ultimately decided not to use a server-side language (later changing my mind when I added a Perl script to the mix), and try it in vanilla JavaScript.  I used the new HTML5 canvas tag because I have no artistic ability whatsoever.


## First steps

I walked through all of our library stacks to count shelves and look at configuration, then "drew" a campus map of the campus I most often worked out of in Microsoft Word, and exported it as an image file.  I used a lot of rectangles to represent shelves.  I labeled each shelf with the range of call numbers that lived on that shelf.  Then I was ready to start creating a test!  I made myself a simple launch page with a form to type in the call number.  It sent the call number via GET to the main map page.

The URL generated by the form looked something like this:

```
http://library.dinecollege.edu/maprouter.htm?location=TSMain&callnumber=E99.N3_B498_1996
```

The maprouter.htm file decided which of 3 campus libraries the item was in, then sent the user to the correct URL with some formatted parameters:

- Replaces spaces and + signs with underscores
- Adds a QR code flag (yes or no)
- Includes the collection/location within the library (e.g. "Main").

Example URL:

```
http://library.dinecollege.edu/mapts.htm?collection=Main&callnumber=E99.N3_B498_1996&qr=yes
```

## Filling up the canvas

- Create the canvas
- First layer: the image file of the map + captions
- [Second layer: a blue rectangle that "peeks out" from underneath the top rectanlge to highlight the appropriate side of the shelf] -- this layer came later on in the development process
- Top layer: a red rectangle overlaid on the shelf that holds the item
- Coordinates, length and width for the rectangle are determined by parsing the call number from the params.

```
// Load the map and captions
<canvas id="myCanvas" width = "1100" height = "520">Sorry, your browser does not support the HTML5 canvas tag.  Please try IE 9 or above, Firefox, or Chrome.</canvas>

<script>
var c=document.getElementById('myCanvas');
var ctx=c.getContext('2d');
var imageObj = new Image();
var imageObj2 = new Image();
ctx.globalCompositeOperation="destination-over";

imageObj.onload = function() {
  ctx.drawImage(imageObj, 0, 0);
};
imageObj2.onload = function() {
  ctx.drawImage(imageObj2, 527, 0);
};
imageObj2.src = 'images/upstairsmap.jpg';
imageObj.src = 'images/downstairsmap.jpg';

ctx.font="20px Arial";
ctx.fillText("Downstairs",220,510);
ctx.fillText("Upstairs",770,510);
ctx.font="40px Arial";
ctx.fillText("Tsaile",470,30);

// Determine the coordinates of the correct shelf based on first letter (A, B, etc.)
switch (qsParm['collection']) {
  case "Main":
  width = 89;
  length = 12;
  xcoord = 581;
  switch (qsParm['callnumber'].charAt(0)) {
      case "a": case "A":
          ycoord = 346;
          shelf_side = 1;
      break;
      // cases ‘B’ through ‘Z’ follow
      //(use your imagination)
  }
  break;
  // .....
  // similar case statements for all other collections (reference, oversize, etc.)
	// .....
	
// Draw the rectangles
ctx.fillStyle='#FF0000';
ctx.fillRect(xcoord,ycoord,width,length);

```

## Iterating for a better solution

At this point, the mapping was extremely general -- only looking at the very first part of the call number.  The next step was to develop a more granular solution that could also identify the correct side of the shelf to look on, then draw a second, overlapping rectangle, to highlight that side.

Since there were three different libraries, each had its own layout.  This resulted in having both "horizontal" and "vertical" shelves on the schematics, which necessitated more calculations for drawing and shading.  Here is an example of using 4 sides of the shelf instead of 2 (sides 3 and 4 are "horizontal"):

```
if (shelf_side > 0) {
      ctx.fillStyle='#003399';
      switch(shelf_side) {
        case 1:
          ctx.fillRect(xcoord-3,ycoord+10,width+6,length/2);
        break;
        case 2:
          ctx.fillRect(xcoord-3,ycoord-4,width+6,length/2);
        break;
        case 3:
          ctx.fillRect(xcoord-4, ycoord-3, width/2, length+6);
        break;
        case 4:
          ctx.fillRect(xcoord + 9, ycoord - 3, width/2, length + 6);
        break;
      }
    }
```
		
Somewhere in the refactoring process, I also decided to add in a QR code so students could scan the map to their phone.  Google made this easy with their Charts API (the QR code functionality is unfortunately now deprecated, I believe):
		
```
		qrcode.src = 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=http://library.dinecollege.edu/mapts.htm?collection=' 
+ qsParm['collection'] + '%26callnumber=' + qsParm['callnumber'] + %26qr=no';
```


## Integrating with the library catalog (Ex Libris Voyager)

### Old Catalog
When I began working at Diné College, we were running Voyager 7.2.1 with the classic OPAC.  I was able to insert a link to the map router by using the 852 MARC field.  I followed the directions Ex Libris gave for integrating Syndetics book covers into the catalog, and added the following to the displayh.cfg file:

```
Map: +No map available

HTML:852||bhi:<strong><a target="_blank" style = "color:#540069" 
href = "http://library.dinecollege.edu/maprouter.htm?location={b}&callnumber={h}_{i}">
Click here for a map!</a></strong>
```

This let Voyager send the call number and location directly from the MARC record to the map router.  The map router then processed that information from the params, as described above.

### New Catalog
We moved from the "Classic" OPAC to the Tomcat OPAC in the summer of 2013.  It was a bit more difficult to integrate the map, but I was able to take advantage of the change to pass the title in the query string as well, so that was cool.

I followed the instructions in chapter 10 of the WebVoyage Architecture Manuual and created a file called /m1/voyager/xxxxdb/tomcat/vwebv/context/vwebv/ui/[skin]/xsl/contentLayout/local_locMapLink.xsl

```
<!--
Note: sample link to map based on loc code
** Version : 1.0
** Created : 16-Nov-2007
** Created By :
-->
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:page="http://www.exlibrisgroup.com/voyager/webvoyage/page"
xmlns:fo="http://www.w3.org/1999/XSL/Format">
<!-- ###################################################################### -->
<xsl:template name="locMapLink">
<xsl:param name="mfhd"/>
<xsl:variable name="locCode">
<xsl:call-template name="BMDProcessMarcTags">
<xsl:with-param name="field" select="'852'"/>
<xsl:with-param name="indicator1" select="'X'"/>
<xsl:with-param name="indicator2" select="'X'"/>
<xsl:with-param name="subfield" select="'b'"/>
<xsl:with-param name="mfhdID" select="$mfhd"/>
<xsl:with-param name="recordType" select="'mfhd'"/>
</xsl:call-template>
</xsl:variable>

<xsl:variable name="callCode">
<xsl:call-template name="BMDProcessMarcTags">
<xsl:with-param name="field" select="'852'"/>
<xsl:with-param name="indicator1" select="'X'"/>
<xsl:with-param name="indicator2" select="'X'"/>
<xsl:with-param name="subfield" select="'hi'"/>
<xsl:with-param name="mfhdID" select="$mfhd"/>
<xsl:with-param name="recordType" select="'mfhd'"/>
</xsl:call-template>
</xsl:variable>

<xsl:variable name="titleCode">
<xsl:call-template name="BMDProcessMarcTags">
<xsl:with-param name="field" select="'245'"/>
<xsl:with-param name="indicator1" select="'X'"/>
<xsl:with-param name="indicator2" select="'X'"/>
<xsl:with-param name="subfield" select="'ab'"/>
<xsl:with-param name="mfhdID" select="$mfhd"/>
<xsl:with-param name="recordType" select="'bib'"/>
</xsl:call-template>
</xsl:variable>

<!-- you must create your web site to display maps -->
<xsl:variable name="baseURL">http://library.dinecollege.edu/betasite/maprouter.htm?location=</xsl:variable>
<xsl:variable name="callnum">&amp;callnumber=</xsl:variable>
<xsl:variable name="title">&amp;title=</xsl:variable>
<div class="locationMap">
Show me a&#160;<a id="locMap" href="{$baseURL}{$locCode}{$callnum}{$callCode}{$title}{$titleCode}“ target="_new">map</a>.
</div>
</xsl:template>
<!-- ###################################################################### -->
</xsl:stylesheet>
</xsl:stylesheet>
```

I added the locMapLink to the includes section of     /m1/voyager/xxxdb/tomcat/vwebv/context/vwebv/ui/[skin]/xsl/contentLayout/display/display.xsl with the line

```
<xsl:import href="../local_locMapLink.xsl"/>
```

Then I modified the BMD1000 template of display.xsl as follows:

```
<xsl:template name="BMD1000">
<xsl:param name="mfhdID"/>

    <xsl:for-each select="$HoldXML/mfhd:mfhdRecord[@mfhdId = $mfhdID]/mfhd:mfhdData[@name='locationDisplayName']">
        <xsl:if test="string-length(.)">
            <xsl:value-of select="."/>
<!-- ## add a map link ## -->
<xsl:call-template name="locMapLink" >
<xsl:with-param name="mfhd" select="$mfhdID"/>
</xsl:call-template>
<br/>
        </xsl:if>
    </xsl:for-each>
</xsl:template>
```


## Transitioning to a Perl Script
I wanted to move away from hard-coding the coordinates of each shelf.  I needed to normalize (sort) the call numbers so I wouldn't have to modify code every time there was a shelf shift.  I looked around for a call number normalizer -- there were a few, but many had issues.  I finally found Michael Doran's great call number sorter library in Perl that seemed stable and usable (see [http://rocky.uta.edu/doran/sortlc/](http://rocky.uta.edu/doran/sortlc/)).

I decided to pass the URL to a Perl script which would use Doran's library and return the necessary information (x coordinate, y coordinate, etc.) to the browser.  I modified maprouter.htm to pass to the Perl script instead of directly to each site's map page (except in a few special cases of non-rectangular shaped rooms and multiple locations).

I also had to strip out an additional space (%20) from the beginning of the call number that the old "Classic" OPAC had not generated before.

Now maprouter.htm looked like this:

```
// 4 special cases bypassed the Perl script
if (qsParm['location'] == "TSMedia") {
   window.location = "mapts.htm?collection=" + qsParm['location'].substring(2) + "&callnumber=" + qsParm['callnumber'] + "&title=" + qsParm['title'] + "&qr=yes";
}
else if (qsParm['location'] == "TSGorman") {
   window.location = "mapts.htm?collection=" + qsParm['location'].substring(2) + "&callnumber=" + qsParm['callnumber'] + "&title=" + qsParm['title'] + "&qr=yes";
}
else if (qsParm['location'] == "SRMedia") {
   window.location = "mapsr.htm?collection=" + qsParm['location'].substring(2) + "&callnumber=" + qsParm['callnumber'] + "&title=" + qsParm['title'] + "&qr=yes";
}
else if (qsParm['location'] == "CPMedia") {
   window.location = "mapcp.htm?collection=" + qsParm['location'].substring(2) + "&callnumber=" + qsParm['callnumber'] + "&title=" + qsParm['title'] + "&qr=yes";
}

// But everything else got sent to the Perl script for parsing
else {
   window.location = "vwebv/stacksmap.cgi?collection=" + qsParm['location'] + "&callnumber=" + qsParm['callnumber'] + "&title=" + qsParm['title'];
}
```

stacksmap.cgi looked like this:

```
#!/usr/bin/perl

require "sortLC.lib";  #Michael Doran's call number sorter library

# Get the data from the query string:
if (length ($ENV{'QUERY_STRING'}) > 0){
  $buffer = $ENV{'QUERY_STRING'};
  @pairs = split(/&/, $buffer);
  foreach $pair (@pairs){
    ($name, $value) = split(/=/, $pair);
    $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
    $FORM{$name} = $value;
  }
}

# Replace all underscores (_) with spaces:
$FORM{'callnumber'} =~ s/_/ /g;

# Create an array and make the first element the call number from the query string:
@unsorted_list[0] = $FORM{'callnumber'};

# Open the tab-delimited file with all of our call number locations and discard first two lines
open (FILE, 'callnumbers.tsv');
$firstline = <FILE>;
$secondline = <FILE>;

# Go through each line of the call numbers file
# For lines where the location matches our location, grab the call numbers,
# throw them in an array, sort, and see if our call number is in that range
while (<FILE>) {
  chomp;
  ($location, $call1, $call2, $call3, $call4, $xcoord, $ycoord, $width, $length) = split("\t");
  if ($location =~ /$FORM{'collection'}/) {
    @unsorted_list[1] = $call1;
    @unsorted_list[2] = $call2;
    @unsorted_list[3] = $call3;
    @unsorted_list[4] = $call4;
    @sorted_list = &sortLC(@unsorted_list); # Use Michael Doran's library to sort the 5 call numbers
    if (scalar(@sorted_list) == 5) { # If the sorted array is size 5, there were no duplicates
		  # between first (0) and last (2) call number on first side of shelf
      if (@sorted_list[1] eq $FORM{'callnumber'}) { 
        $shelf_side = 1; 
        last;
      }
			# between first (2) and last (4) call number on second side of shelf
      elsif (@sorted_list[3] eq $FORM{'callnumber'}) {
        $shelf_side = 2;
        last;
      }
    }
    else { # There were duplicates (our call number exactly matched the first or last call number 
		            # on the shelf), so figure out which end of the range our call number is
      if ((@sorted_list[0] eq $FORM{'callnumber'})||(@sorted_list[1] eq $FORM{'callnumber'})) {
        $shelf_side = 1;
        last;
      }
      elsif ((@sorted_list[2] eq $FORM{'callnumber'})||(@sorted_list[3] eq $FORM{'callnumber'})) {
        $shelf_side = 2;
        last;
      }
    }
  }
}
close(FILE);

# Determine which HTML page to send the query string to, based on location
if ($location =~ /TS/) {
  $where = "mapts.htm";
  if ($width < $length) { # Tsaile is the only location where the shelves also go "vertical"
    $shelf_side = $shelf_side + 2;  # Tsaile also uses shelf sides 3 and 4
  }
}
elsif ($location =~ /SR/) {
  $where = "mapsr.htm";
}
elsif ($location =~ /CP/) {
  $where = "mapcp.htm";
}
$FORM{'callnumber'} =~ s/ /_/g; # Replace spaces with underscores so we can send it back to the browser

$FORM{collection} = substr($FORM{collection}, 2);
$location = "Location: http://library.dinecollege.edu/";
$location .= $where;
$location .= "?collection=" . $FORM{collection} . "&callnumber=" . $FORM{callnumber};
$location .= "&xcoord=" . $xcoord . "&ycoord=" . $ycoord . "&shelf_side=" . $shelf_side . "&width=" . $width . "&length=" .
 $length . "&title=" . $FORM{title} . "&qr=yes\n\n";
print "Content-type: text/html\n";
print $location;
```

Now the specific map pages are much shorter.  All they do is grab the x and y coordinates, length, and width from the query string and draw the rectangles -- no calculations.  Hooray for separation of concerns!

In order to provide good data for the Perl script, I had library staff start keeping track of important information in a Google Drive spreadsheet (first and last call numbers on each shelf, x and y coordinates, and length and width of each shelf on our map -- information provided by me -- and location).  For example, a line of the spreadsheet might look like:

```
LOCATION     SIDE 1 First Book         SIDE 1 Last Book             SIDE 2 First Book	SIDE 2 Last Book          xcoord	ycoord         w          l
								
SRGeneral1     AC1 .E8	      CS1129 .B552 2008       CS2377 .M37 1997	E141 .A28313 2002      192	169                66	      10
```

I used a shell script to pull the spreadsheet from Google Drive as a tab-delimited text file.  This ran nightly in cron:

```
/usr/sfw/bin/wget --output-document=/m1/voyager/xxxxdb/tomcat/vwebv/context/vwebv/htdocs/vwebvcallnumbers.tsv 'https://docs.google.com/spreadsheet/pub?key={our key for the document}&single=true&gid=0&output=txt'
```

Now the Perl script could just read in the file from the same directory on the server, and nobody had to worry about FTPing a file any time a change was made.  Because it's in Google Drive, staff at all 3 sites could easily update the spreadsheet themselves, without having to call the Systems Librarian!  Major bonus.

However, the joy was short-lived, because in the summer of 2013, our web server died.  After transitioning to a different server, I discovered that the version of "wget" was not compiled with SSL support, so couldn't download from Google Drive -- no using https.  As an alternative, I found/modified a Java class to do the same thing:

```
/* Modified version of Alvin Alexander's script from 
   http://alvinalexander.com/blog/post/java/simple-https-example
*/

import java.net.URL;
import java.io.*;
import javax.net.ssl.HttpsURLConnection;

public class JavaHttpsExample
{
  public static void main(String[] args)
  throws Exception
  {
    String httpsURL = "https://docs.google.com/spreadsheet/pub?key={our key}&single=true&gid=0&output=txt";
    URL myurl = new URL(httpsURL);
    HttpsURLConnection con = (HttpsURLConnection)myurl.openConnection();
    InputStream ins = con.getInputStream();
    InputStreamReader isr = new InputStreamReader(ins);
    BufferedReader in = new BufferedReader(isr);

    String inputLine;
    File file = new File("/m1/voyager/xxxxdb/tomcat/vwebv/context/vwebv/htdocs/vwebv/callnumbers.tsv");
 if (!file.exists()) {
		file.createNewFile();
	}
	FileWriter fw = new FileWriter(file.getAbsoluteFile());
	BufferedWriter bw = new BufferedWriter(fw);

    while ((inputLine = in.readLine()) != null)
    {
      /*
      System.out.println(inputLine);
      */
      bw.write(inputLine);
      bw.write("\n");
    }

    in.close();
    bw.close();
  }
}
```

I set the class path within a shell script, and ran the shell script in cron.  It contained the following:

```
java -cp /m1/voyager/xxxxdb/tomcat/vwebv/context/vwebv/htdocs/vwebv/java/ JavaHttpsExample
```

## Reflections

I learned a lot from this project, but most importantly, I gained the confidence to jump into the unknown and know that eventually, I could make something work.  This information is all a bit dated now, so I don't know if it's going to be very helpful to other systems librarians out there, but I am happy to have done this write-up just for my own edification.
