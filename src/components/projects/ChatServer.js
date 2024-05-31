import githubImage from '../../images/github.png';
import CodeSnippet from '../CodeSnippet';

const getaddrinfo = `struct addrinfo hints, *ai, *p;
...
// get a socket and bind it
// the server will listen on this socket for connections and data
memset(&hints, 0, sizeof hints);
hints.ai_family = AF_UNSPEC;
hints.ai_socktype = SOCK_STREAM;
hints.ai_flags = AI_PASSIVE;

// hints.ai_flags = AI_PASSIVE and getaddrinfo(NULL, ...) 
// gets a socket address suitable for bind/accept
// https://man7.org/linux/man-pages/man3/getaddrinfo.3.html
if ((rv = getaddrinfo(NULL, PORT, &hints, &ai)) != 0) {
    fprintf(stderr, "server: %s\\n", gai_strerror(rv));
    exit(1);
}`;

const aiLoop = `for (p = ai; p != NULL; p = p->ai_next) {
    // listener = socket file descriptor
    listener = socket(p->ai_family, p->ai_socktype, p-> ai_protocol);
    if (listener < 0) {
        continue;
    }

    // lose the "address already in use" error message
    setsockopt(listener, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof(int));

    // assign the address to the listener file descriptor
    if (bind(listener, p->ai_addr, p->ai_addrlen) < 0) {
        close(listener);
        continue;
    }

    break;
}
// if we got here, it means we didn't get bound
if (p == NULL) {
    fprintf(stderr, "selectserver: failed to bind\n");
    exit(2);
}
freeaddrinfo(ai); // all done with this

// listen on the listener socket
// second arg is backlog size - if more connetions on queue,
// they may be refused ECONNREFUSED
if (listen(listener, 10) == -1) {
    perror("listen");
    exit(3);
}`;

const select = `read_fds = master;	// copy master fd list into temp list read_fds

// select checks file descriptors in set read_fds and determines which are 
// ready for reading, writing, or have raised an exception
// in this case, we only care about which are ready for reading
// select modifies read_fds, only keeping fds that are ready for reading 
// in the set
if (select(fdmax+1, &read_fds, NULL, NULL, NULL) == -1) {
    perror("select");
    exit(4);
}`;

const listener = `for(i = 0; i <= fdmax; i++) {
    // check if i is in read-ready set (read_fds)
    if (FD_ISSET(i, &read_fds)) { // found one
        if (i == listener) {
        // this means we've got a new connection
        addrlen = sizeof remoteaddr;
        // accept connection to listener fd as new file descriptor
        newfd = accept(listener, 
                (struct sockaddr *)&remoteaddr, 
                &addrlen);

        if (newfd == -1) {
            perror("accept");
        } else {
            FD_SET(newfd, &master);  // add to master set
            if (newfd > fdmax) {
                fdmax = newfd;  // keep track of the max
            }
            // inet_ntop converts network address to character string
            printf("server: new connection from %s on "
                    "socket %d\\n",
                    inet_ntop(remoteaddr.ss_family,
                        get_in_addr((struct sockaddr*)&remoteaddr),
                        remoteIP, INET6_ADDRSTRLEN),
                    newfd);`;

const client = `} else {
    // handle data from a client
    if ((nbytes = recv(i, buf, sizeof buf, 0)) <= 0) {
        // got error or connection closed by client
        if (nbytes == 0) {
            // connection closed
            printf("server: socket %d hung up\\n", i);
        } else {
            perror("recv");
        }
        close(i);
        FD_CLR(i, &master);  // remove from master set
    } else {
        // we got some data from client
        for (j = 0; j <= fdmax; j++) {
            // send to everyone (i.e., every fd in the master set)!
            if (FD_ISSET(j, &master)) {
                // except the listener and the sender
                if (j != listener && j != i) {
                    if (send(j, buf, nbytes, 0) == -1) {
                        perror("send");
                    }
                }
            }
        }
    }`;

const service = `[Unit]
Description=Chat server service

[Service]
ExecStart=/usr/local/bin/chat

[Install]
WantedBy=multi-user.target`;

export default function ChatServer() {
    return (
        <div className="post-content">
            <h1 className="display-4">Socket-Based Chat Server on Raspberry Pi</h1>
            <h5 className="text-muted">May 30, 2024</h5><br />
            <p><img src={githubImage} alt="github" className="github-intext" /> This project is on Github!  Click <a href="https://github.com/csyager/chat-server" target="_blank" rel="noreferrer">here</a> to view!</p>

            <p className="post-body">I recently finished reading <i><a href="https://beej.us/guide/bgnet/" target="_blank" rel="noreferrer">Beej's Guide to Network Programming</a></i>, which is a short (but extremely informative) exploration of the Unix networking model.  Networking is something that I use a lot, but never get to dig very deep into.  In a way this is by design - generally networking protocols are layers of abstraction over top one another that gradually obscure the underlying technology.  I can't say that reading Beej's Guide has made me a networking expert, but it was interesting nonetheless, and I did learn a bit about how it works under the hood.  If you find yourself wondering about how networks seem to magically let software communicate, it's a fairly easy read and covers a log of the basics.</p>
            <p className="post-body">One of the later exercises in the book is setting up a chat server that maintains a set of connections and continuously awaits data on those connections.  When data is recieved, it broadcasts it out to all the connections.  Effectively, it's a simple chat server that takes text input from one connection and sends it to all the others.  As a learning exercise, I've implemented this simple server in C, with considerable lifting from the book.  The purpose of this post is to explain what each part of the application does and how it is used, mostly for my own learning.  </p>

            <h2>Introduction</h2>
            <p className="post-body">Briefly, I want to cover some Unix and networking topics that might make this easier to understand.  Some terminology:</p>
            <ul>
                <li><b><i>Socket</i></b> - as with most things in Unix, a socket is a file descriptor representing a conncetion between programs.  Programs can read and write from a socket, which enables communication.</li>
                <ul>
                    <li><b><i>Stream socket</i></b> - this variety of socket uses TCP to ensure that data is transmitted in-order and error-free.  This is commonly used by HTTP, SSH, and this messaging client where we want to ensure data is sent/recieved in order.</li>
                    <li><b><i>Datagram sockets</i></b> - these sockets are connectionless, meaning that there is no requirement to maintain a connection between the reader and the writer.  Instead, readers commonly send back an "ACK" message, indicating that the packet sent on the datagram socket has been recieved, though this is left up to the protocol using the sockets.  These sockets use UDP, and the advantage of using this model is in speed.  Multiplayer games commonly use datagram for their speed, since any dropped packets can generally be corrected for without much performance loss.</li>
                </ul>
                <li><b><i>TCP</i></b> - "Transmission Control Protocol", this is the protocol used by stream sockets that ensures that data arrives in-order and error-free</li>
                <li><b><i>UDP</i></b> - "User Datagram Protocol", this is the protocol used by datagram sockets, which does not make such guarantees about order or dropped packets </li>
                <li><b><i>IP</i></b> - "Internet Protocol", this protocol deals primarily with routing data to the proper destination.  Both TCP and UDP make use of IP.</li>
            </ul>

            <p className="post-body">The network model is often described as a series of layers (usually 7), where each layer implements some protocol that <i>encapsulates</i> the packet with metadata pertinent to that layer.  Each layer introduces some level of abstraction, where the higher layers don't really need to worry about what's going on below.  For example, you can run <code className="inline">ssh user@123.123.123.123</code> without knowing anything about how your router is handling the packets.  In the case of the chat server, we have a few distinct layers:  the application layer (we'll use <code className="inline">netcat</code>) builds the packets, the transport layer (TCP) encapsulates that packet with relevant metadata to ensure proper transmission, the internet layer (IP) encapsulates the whole thing with routing metadata, and the network layer encapsulates that with Wi-Fi or Ethernet metadata that ultimately moves through the physical hardware.  When it gets where it's going, each encapsulation can be stripped away to get the original packet.</p>

            <h2>Server Implementation</h2>

            <p className="post-body">With that out of the way, let's start looking at the server program.</p>

            <CodeSnippet code={getaddrinfo} language="c" showLineNumbers={false} startingLineNumber={1} />

            <p className="post-body"><code className="inline">getaddrinfo</code> gets an internet address that can be bound to a socket.  The <code className="inline">hints</code> structure specifies some of the settings for the address info structure.  In this case, we use <code className="inline">AF_UNSPEC</code> to allow either IPv4 or IPv6 addresses, <code className="inline">SOCK_STREAM</code> to indicate that we want a stream socket (since packet loss or reordering wouldn't work in this case), and <code className="inline">AI_PASSIVE</code> to indicate that we want to use the local host for the socket.  <code className="inline">getaddrinfo(NULL, PORT, &hints, &ai)</code> uses NULL to indicate that we want to use the loopback address (127.0.0.1 / localhost) for the socket, the specified port to listen to, the hints structure for settings, and the ai pointer to store the result.</p>

            <CodeSnippet code={aiLoop} language="c" showLineNumbers={false} startingLineNumber={1} />

            <p className="post-body"><code className="inline">getaddrinfo</code> actually returns a linked list of possible structures that fulfill the requirements.  This bit of code iterates through each and takes the first one that we can successfully create a socket for and bind a listener file descriptor to.  If we don't get any valid bindings at the end of this, then we kill the program with an error code.  Otherwise, we can start listening on the socket.</p>
            <p className="post-body">Now let's move onto the main loop:</p>

            <CodeSnippet code={select} language="c" showLineNumbers={false} startingLineNumber={1} />
            
            <p className="post-body">As stated in the inline comments, <code className="inline">select</code> takes 5 arguments:  the highest-numbered file descriptor that we want to check plus 1, three sets of file descriptors, and a timeout.  The three sets of file descriptors are, in order, <code className="inline">readfds</code>, <code className="inline">writefds</code>, <code className="inline">exceptids</code>.  They represent the filedescriptors that we want to poll for reads, writes, and exceptions.  In this case, we only care about reads, so the other two are NULL.  Setting the timeout to NULL blocks indefinitely on select.</p>
            <p className="post-body"><code className="inline">select</code> essentially filters each of the sets of file descriptors to only keep the ones that have data waiting.  In our case, <code className="inline">readdfs</code> is modified to only contain file descriptors that have data ready to be read.  You can use the <code className="inline">FD_ISSET</code> function to check if a file descriptor is present in the set.  That's what we do next, in a loop over all the file descriptors being tracked.</p>

            <CodeSnippet code={listener} language="c" showLineNumbers={false} startingLineNumber={1} />

            <p className="post-body">If the file descriptor that is ready to be read is the listener file descriptor that we setup initially, that means that a new client is attempting to connect to the server.  When this happens, we <code className="inline">accept</code> the connection, which opens a new connected socket, and add it to our master list of tracked file descriptors.  We also update the largest file descriptor tracked, so that future iterations will be able to <code className="inline">select</code> it.  For logging purposes, we print the new connection to standard out using <code className="inline">inet_ntop</code> ("internet network to print," this converts a network name from binary to text form).</p>

            <CodeSnippet code={client} language="c" showLineNumbers={false} startingLineNumber={1} />

            <p className="post-body">The else-block handles all other cases, where a currently-connected client is attempting to write data to the server.  We <code className="inline">recv</code> from the file descriptor into a buffer, and if the number of bytes recieved is &lt;= 0, then either an error has occured on the client side or the client has disconnected.  In either case, we close the socket and remove the file descriptor from our master set.  if the number of bytes is &gt;0, then we've received some data from the client and need to handle it.  To do this, we iterate through our master list of file descriptors, and for each of them (excluding the listener and the sender), we <code className="inline">send</code> the buffer to the connected socket, writing data back to the client.  And that's it!  The server program is able to receive new connections and send data back and forth via the sockets.</p>


            <h2>Interfacing with the server</h2>
            <p className="post-body">Running the server is as simple as compiling the c file and executing the binary.</p>
            <CodeSnippet code={`gcc server.c -o chatserver && ./chatserver`} language="shell" showLineNumbers={false} startingLineNumber={1} />
            <p className="post-body">In a few other terminal sessions, connect to the server using netcat:</p>
            <CodeSnippet code={`nc localhost 9034`} language="shell" showLineNumbers={false} startingLineNumber={1} />
            <p className="post-body">Send a message to the server from one session by typing the message and hitting enter.  You should see the message appear on the other terminals!</p>

            <h2>Serving the application</h2>
            <p className="post-body">My goal in setting this up was to have a functioning chat server running from a Raspberry Pi at home.  To do this, you'll need to forward traffic to your router to the Raspberry Pi device.  This setup will vary by ISP and router model, but what you're looking for is "Port Forwarding."  In my case, I setup my Raspberry Pi device with a static IP, then setup my router to forward traffic to port 9034 to that device.  As long as the server application is running on that port, traffic should be properly routed to the application.  You can test this by running the same netcat command, only instead of targeting localhost, try targeting your router's public IP address from an external network.</p>

            <p className="post-body">Another thing you might want to try is to run the server on background when your device boots.  This can be done using systemd (or a similar tool, systemd is just the default on Raspbian).  First, let's move the executable to a bin directory (make sure it's executable):</p>
            <CodeSnippet code={`mv chatserver /usr/local/bin`} language="shell" showLineNumbers={false}/>
            <p className="post-body">Next, let's configure a systemd service.  Create a file in the <code className="inline">/etc/systemd/system</code> directory named <code className="inline">chatserver.service</code>:</p>
            <CodeSnippet code={service} showLineNumbers={false} />
            <p className="post-body">Make sure the file is executable, then enable the service:</p>
            <CodeSnippet code={`systemctl enable chat`} language="shell" showLineNumbers={false} />
            <p className="post-body">And that's it!  The service should now start when the device boots up.  You can safely set your Raspberry Pi to the side, and let it handle connections and messages on the listening port.</p>

            <h2>Conclusion</h2>
            <p className="post-body">This is obviously a pretty bare-bones project, but it's cool because it exposes some of the underlying concepts in Unix networking.  In this iteration, we're just moving plain text back and forth through the sockets.  If you wanted to expand on this project, it would be cool to setup you're own type of protocol, which encapsulates some data at the application level with relevant headers before sending it through the socket, and a corresponding client that uses the same protocol to unpack it.  Functionally, this is how protocols like HTTP work - they add some metadata to the request being sent through the socket, like a method (GET, POST, PUT, etc.), Content-Length, Referer, and several other fields which the receiver of the message knows how to interpret (the agreement on valid request structure, headers, methods, etc. is what makes this work, and is what we call the "protocol").  Anyways, if you wanted to extend this project, I think adding some structure to the data would be the way to do it.  If you have any other ideas, feel free to put them in the comments, I'd be happy to hear about them.</p>
        </div>
    )
}