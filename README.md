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
__Version 1.0.0__ - First upload.  This version was the result of self-taught HTML and nothing else, so JavaScript or any other programming language was notably missing.

__Version 2.0.0__ - First major re-release.  This version was the result of further learning done in my CS 4640 class at UVA, which was focused on programming languages for web development.  Includes much improved interfaces and asthetic design through the use of bootstrap CSS, as well as PHP to SQL backend allowing for more user interaction with the site.

FRONTEND
--------
The frontend work of the site is very simplistic.  The main pages of the site are written in HTML, with CSS for styling.  The blog.php file uses both inline and external PHP to display comments.  The external PHP, which will be more closely detailed in the next section, creates a SQL query to fetch comments, which are then displayed by the inline PHP.

BACKEND
-------
The post_comment.php file is used for much of the backend of the blog page, in coordination with mySQL databases provided through iPage.  The post_comment.php file establishes a connection to this database,  

IMPROVEMENTS
------------
* In future releases, I hope to include a blacklist feature so IP address that have caused problems in the comment section of my blog posts can be blocked from commenting for a period of time.  I may additionally include a form that the user can fill out that will allow them to appeal their case, or make a case for a shortened "sentence."

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
