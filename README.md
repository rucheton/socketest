#SOCKETEST
This project is just meant as a test for socket.io. I had to create a Chrome Super Sync Sports like system (http://chrome.com/supersyncsports/). You can remote control a website with a mobile device (or desktop, I don't check yet).

##REQUIREMENTS
- nodejs
- express
- socket.io
- jade (since the project is based on angular express seed, I used it as provided)

##HOW IT WORKS
When a user goes on the website, a socket connection is initialized on the general namespace. This connection allows us to register a new connection on a dedicated namespace. The user can then open a link (scan a qrcode) on a mobile device to connect on that namespace and be able to remote control the website.

###Run the project :
    node app.js
