connoryager.com
=================

CONTENTS
--------
* INTRODUCTION
* VERSION HISTORY
* FRONTEND
* BACKEND
* IMPROVEMENTS 
* LICENSING

INTRODUCTION
------------
This repository contains the source code for my personal website, www.connoryager.com.  The site is written using a plain-text editor, and is the result of several years of cummulative improvements (therefore my coding may be a little sloppy in places).  The site is hosted on iPage, which I also use for the backend database work.  

The site is far from perfect, and more improvements will hopefully be coming with each new version release.  These future changes are detailed in the "Improvements" section of this document.

VERSION HISTORY
---------------

__Version 2.1.0__ - This release adds a few new functions to the blog page:

* Blacklist: Users can now be blacklisted by the site admin by their IP address. Blacklisting can be a result of posting comments on the site that are hateful, not accepting, or otherwise inappropriate for my blog.
Once blacklisted, the user has the option to appeal their blacklisting through a form, which will be submitted to me for review.
* A "Report Comment" button has been added to right side of the footer. This feature allows the user to fill out a form that reports a comment as inappropriate for any reason, which will be submitted to me for review.
* Added a link to the GitHub on the index page
* Small fixes around the site

__Version 2.0.1__ - Slight formatting fixes, detailed below:

* Spacing fixed on images not fitting into their bezels properly.
* Resolved issue where blog posts were initially being shown in full instead of collapsed.
* Fixed coloring of headings that are included in another div tag.

__Version 2.0.0__ - First major re-release.  This version was the result of further learning done in my CS 4640 class at UVA, which was focused on programming languages for web development.  Includes much improved interfaces and asthetic design through the use of bootstrap CSS, as well as PHP to SQL backend allowing for more user interaction with the site.

__Version 1.0.0__ - First upload.  This version was the result of self-taught HTML and nothing else, so JavaScript or any other programming language was notably missing.

FRONTEND
--------
The frontend work of the site is very simplistic.  The main pages of the site are written in HTML, with CSS for styling.  The blog.php file uses both inline and external PHP to display comments.  The external PHP, which will be more closely detailed in the next section, creates a SQL query to fetch comments, which are then displayed by the inline PHP.

BACKEND
-------
The post_comment.php file is used for much of the backend of the blog page, in coordination with mySQL databases provided through iPage.  The post_comment.php file establishes a connection to this database,  

IMPROVEMENTS
------------
* My code is difficult to read in places, and hopefully will be more thoroughly commented shortly.

* In a future release there will be more ways to contact me through the site, so that private responses to my work can be more efficiently handled without the need to contact me directly.

LICENSING
---------
Copyright (c) 2018 Connor Yager

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
