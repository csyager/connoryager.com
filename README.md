# connoryager.com
CONTENTS
--------
*INTRODUCTION
*VERSION HISTORY
*FRONTEND
*BACKEND
*IMPROVEMENTS 
*LICENSE

INTRODUCTION
------------
This repository contains the source code for my personal website, www.connoryager.com.  The site is written using a plain-text editor, and is the result of several years of cummulative improvements (therefore my coding may be a little sloppy in places).  The site is hosted on iPage, which I also use for the backend database work.  

The site is far from perfect, and more improvements will hopefully be coming with each new version release.  These future changes are detailed in the "Improvements" section of this document.

VERSION HISTORY
---------------
Version 1.0.0 - First upload.  This version was the result of self-taught HTML and nothing else, so JavaScript or any other programming language was notably missing.

Version 2.0.0 - First major re-release.  This version was the result of further learning done in my CS 4640 class at UVA, which was focused on programming languages for web development.  Includes much improved interfaces and asthetic design through the use of bootstrap CSS, as well as PHP to SQL backend allowing for more user interaction with the site.

FRONTEND
--------
The frontend work of the site is very simplistic.  The main pages of the site are written in HTML, with CSS for styling.  The blog.php file uses both inline and external PHP to display comments.  The external PHP, which will be more closely detailed in the next section, creates a SQL query to fetch comments, which are then displayed by the inline PHP.

BACKEND
-------
The post_comment.php file is used for much of the backend of the blog page, in coordination with mySQL databases provided through iPage.  The post_comment.php file establishes a connection to this database,  