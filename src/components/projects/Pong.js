import githubImage from '../../images/github.png';
import CodeSnippet from '../CodeSnippet';
import PongImg from "../../images/projects/pong.mp4";

const fooUnpacked = `typedef struct {
      uint8_t  a;	// 1 byte
      uint32_t b;	// 4 bytes
      uint8_t  c;	// 1 byte
} Foo;

Foo my_foo = { 1, 2, 3 };`;

const fooAligned = `typedef struct {
      uint8_t  a;   // 1 byte, at offset 0
      // 3 bytes padding inserted here
      uint32_t b;   // 4 bytes, at offset 4 (aligned to 4)
      uint8_t  c;   // 1 byte, at offset 8
      // 3 bytes padding inserted here
} Foo;            // total: 12 bytes`;

const fooPacked = `typedef struct __attribute((packed)) {
      uint8_t  a;   // offset 0
      uint32_t b;   // offset 1 (unaligned!)
      uint8_t  c;   // offset 5
  } Foo;            // total: 6 bytes`;

const int16Example = `0001 0010 0100 1000`;

const bigEndian = `0001 0010 0100 1000
(0x0000)  (0x0001)`;

const littleEndian = `0100 1000 0001 0010
(0x0001)  (0x0000)`;

export default function Pong() {
    return (
        <div className="post-content">
            <h1 className="display-4">Building a Multiplayer Pong Game with C and Rust</h1>
            <h5 className="text-muted">March 9, 2026</h5><br />
            <p><img src={githubImage} alt="github" className="github-intext" /> This project is on Github! Click <a href="https://github.com/csyager/pong" target="_blank" rel="noreferrer">here</a> to view!</p>

            <p className="post-body">I, like many others of my generation, have long enjoyed multiplayer gaming. For the last few decades, the ability to play games remotely with friends around the world has been a staple of online interactions, and has enabled new ways for people to connect and socialize. I've spent countless hours playing games like Call of Duty, Rocket League, and League of Legends with friends. At the core of multiplayer gaming is networking - specifically, the reduction of latency and accurate coordination of game state between multiple nodes all sending their own inputs and manipulating the shared game state. Anyone who has played a multiplayer game online knows the frustrations of a laggy connection. That said, the fact that it works at all with latency on the order of tens-of-milliseconds is something of a miracle.</p>

            <p className="post-body">A few months back I read <i><a href="https://beej.us/guide/bgnet/" target="_blank" rel="noreferrer">Beej's Guide to Network Programming</a></i>, which is an approachable crash-course on how a Unix (or Unix-like) server uses the socket APIs to manage connections and send messages over the network. I wanted to apply what I had learned from that book to a real-world application - a multiplayer game. At the outset, I wanted to build a game based on a personal favorite called <i>IDARB</i>. This game involves two or more players jumping around an arena playing a game akin to handball. Players can pick up the ball and throw it towards the opponent's goal to score. After spending quite a lot of time on the basic game physics, I decided to pivot and simplify to something with a bit fewer parameters - classic <i>Pong</i>.</p>

            <p className="post-body">To add a bit more complication and personal growth, I'm currently trying to develop some familiarity with Rust, so I decided to write the game client as a terminal-based interface using the <i>Ratatui</i> library for Rust. In hindsight, this was probably a mistake (we'll get to that later), but it was a learning experience nonetheless. Along that note, I intentionally didn't "vibe code" any of this, since the whole point was to demonstrate what I've learned.</p>
			
			<figure>
			<video autoPlay muted loop playsInline style={{width: "100%"}}>
				<source src={PongImg} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<figcaption className="figure-caption">The running game client - game state is managed centrally by the server, while the client relays inputs.</figcaption>
			</figure>

            <h2>The Components</h2>
            <p className="post-body">This package contains two sub-packages, the first is a game server meant to coordinate a single game between two players, and the second is a game client containing the game interface.</p>
            <p className="post-body">The server is written in C, and contains the main file <code className="inline">server.c</code>, which contains the main loop and initialization logic, <code className="inline">protocol.c</code> which contains the serialization and deserialization logic for network messages, <code className="inline">game.c</code> which handles the game state including the tick and physics updates, and <code className="inline">config.h</code> which includes some adjustable knobs that affect gameplay.</p>
            <p className="post-body">The game client is written in Rust, and contains the main file <code className="inline">main.rs</code>, which includes the initialization logic and the UI, and a networking module which contains the TCP and UDP clients, message models, and serialization/deserialization logic. The client is a single running instance of the game, which allows a player to move their paddle (sending updates to the server as it does) and receives game state updates broadcasted from the server. The client and the server are kept in sync via frequent updates sent in either direction. Ultimately, the server contains the "authoritative" game state.</p>

            <h2>Unix Network Sockets</h2>
            <p className="post-body">Without going too deep, I want to give a high-level overview of a Unix network socket and how they're used in this project. A network socket can be thought of as an endpoint for network communications between processes on different machines. They are externally-identifiable by the combination of a transport protocol, an IP address, and a port number. This identifier is called the socket address.</p>
            <p className="post-body">In a Unix or Unix-like operating system, just about everything is identifiable by a file descriptor, or a unique ID representing an object that can be written to or read from. Sockets are no exception, and Unix includes some helpful system APIs for interacting with them. When a node writes to the file descriptor of a socket, that message is sent to nodes listening on the other side. When a node reads from a socket file descriptor, it gets messages sent from the node on the other side.</p>

            <h2>TCP vs. UDP</h2>
            <p className="post-body">There are two noteworthy types of sockets that I'll discuss - Stream sockets and Datagram sockets. Stream sockets are reliable, two-way connections that guarantee the order of packets sent across the network. Both sides need to connect to the socket via a "handshake", and must maintain an open connection to the socket to continue communicating. When a packet is sent over the socket, the receiver must acknowledge its receipt by responding with an "ack" message. This ensures that every packet is received, and any missing packets can be retransmitted. The Transmission Control Protocol (TCP) is used to communicate over these types of sockets, and it's useful for application-layer protocols that require that all packets be received and in a particular order, like HTTP, SMTP, or SSH.</p>
            <p className="post-body">Datagram sockets on the other hand are "connectionless", which means that you don't need to maintain a connection on either end of the socket. Either end wishing to communicate on the socket just needs to address their packet and send it out. There's no mechanism for acknowledging a packet, so packets can oftentimes be "dropped," or received out of order. However, the benefit is that the roundtrip latency of acknowledging a message is no longer required, making these communications quite fast. These sockets use the User Datagram Protocol (UDP). In the context of multiplayer gaming, UDP is used for messages relating to game state - the game client doesn't need to know every single game state in strict order, it really just needs the latest game state to show to its user.</p>

            <h2>Server Networking Configuration</h2>
            <p className="post-body">The game server maintains two sockets: one for TCP and one for UDP. <a href="https://github.com/csyager/pong/blob/5ac0219dc4039ddab30f883a5e2505de49fe67e3/server/src/server.c#L75-L108" target="_blank" rel="noreferrer">The TCP socket is configured</a> by creating a socket file descriptor with socket type <code className="inline">SOCK_STREAM</code> and calling <code className="inline">bind()</code> on it. This configures the socket with an integer file descriptor. <a href="https://github.com/csyager/pong/blob/5ac0219dc4039ddab30f883a5e2505de49fe67e3/server/src/server.c#L114-L138" target="_blank" rel="noreferrer">The same actions are repeated for the UDP socket</a>, but with socket type <code className="inline">SOCK_DGRAM</code>.</p>
            <p className="post-body">Here is where things start to differ: as I mentioned above, TCP sockets require a connection to be established between the client side and the server side before data can be exchanged. This connection is established via a <strong>three-way handshake</strong>. The steps are as follows:</p>
            <ol>
                <li>Client sends a packet with the <code className="inline">SYN</code> flag set (short for synchronize). This includes a random sequence number X.</li>
                <li>The server receives the SYN, and responds with a <code className="inline">SYN-ACK</code> packet (synchronize-acknowledgement). This packet includes a different random sequence number Y, as well as the client's sequence number X + 1 (to acknowledge the receipt).</li>
                <li>The client responds to this packet with an <code className="inline">ACK</code> packet and the final acknowledgement number Y + 1. The connection is now established.</li>
            </ol>
            <p className="post-body">When a stream socket is initialized, it starts in the <code className="inline">active</code> state, meaning it behaves as a client and sends SYN requests to the connection. On the server side, we need to switch this socket to a <code className="inline">passive</code> state, so that it is prepared to receive the SYN requests instead. <a href="https://github.com/csyager/pong/blob/5ac0219dc4039ddab30f883a5e2505de49fe67e3/server/src/server.c#L151" target="_blank" rel="noreferrer">We do this by calling <code className="inline">listen()</code></a>. This call configures the listener as the server, and creates a connection backlog with size specified in the second parameter (in this case, 10).</p>
            <p className="post-body">Now that our two socket file descriptors are configured, the server will loop over all the connected file descriptors waiting for any of them to have available packets. <a href="https://github.com/csyager/pong/blob/5ac0219dc4039ddab30f883a5e2505de49fe67e3/server/src/server.c#L199" target="_blank" rel="noreferrer">We do this with <code className="inline">select()</code></a>, which basically filters a list of file descriptors down to those that are ready for a read/write operation. If the TCP socket is in a ready state, that means a client has initiated a handshake and is requesting connection to the server. <a href="https://github.com/csyager/pong/blob/5ac0219dc4039ddab30f883a5e2505de49fe67e3/server/src/server.c#L212C14-L212C20" target="_blank" rel="noreferrer">We accept that connection on the server side, and bind the client to a new file descriptor by calling <code className="inline">accept()</code></a>.</p>
            <p className="post-body">The UDP listener socket is a bit different - we don't need to accept any connections or bind to different file descriptors, because there are no connections on a datagram socket. <a href="https://github.com/csyager/pong/blob/5ac0219dc4039ddab30f883a5e2505de49fe67e3/server/src/server.c#L238" target="_blank" rel="noreferrer">Instead, we just read the message from the socket directly and process packets as they become available</a>.</p>

            <h2>Contracts and Models</h2>
            <p className="post-body">For the purposes of this project, I implemented the networking with a custom application layer (that is to say, I didn't use HTTP or any other protocol over TCP/UDP to wrap my messages). Instead, this uses an extremely simple custom protocol for handling interactions.</p>
            <p className="post-body">First, a new client registers with the server via TCP. The server reads the message into a buffer and deserializes it into a <a href="https://github.com/csyager/pong/blob/5ac0219dc4039ddab30f883a5e2505de49fe67e3/server/src/protocol.h#L55" target="_blank" rel="noreferrer">TcpMessage struct</a>. This struct contains a 256-byte message buffer and a 32-bit opcode integer. As of yet, there is only one valid opcode, <code className="inline">0</code>, which indicates that the request is a registration request. The server adds the client to a list of clients (unless no slots are available), and assigns the player an ID (either 1 or 2). It then responds with all of the game-specific configuration values (like the size of the game area, the size of the player paddles, etc.) that the client needs to run the game.</p>
            <p className="post-body">All other server and client communications run over UDP. For the clients' part, they regularly ping the server with the <a href="https://github.com/csyager/pong/blob/5ac0219dc4039ddab30f883a5e2505de49fe67e3/server/src/protocol.h#L29" target="_blank" rel="noreferrer">latest position for their corresponding player</a>. In return, the server regularly pings the <a href="https://github.com/csyager/pong/blob/5ac0219dc4039ddab30f883a5e2505de49fe67e3/server/src/protocol.h#L37" target="_blank" rel="noreferrer">entire game state</a>, including the score, whether the game is active, a countdown timer for when the game will resume, and the position of each player, plus the ball. Since this is UDP, the server needs to address each packet to the desired client. When the server receives a packet from a client, it keeps track of the most-recently used address and sends all future packets to that address. No handshake is needed, though note that if a client stopped running the server would continue firing off packets into the void; this is the nature of UDP.</p>

            <h2>Packing the Network Models</h2>
            <p className="post-body">There are a few lessons that I learned when it came to the serialization and deserialization of bytes on the wire. The first relates to <strong>byte padding</strong>, which is an optimization behavior applied during compilation. Basically, when allocating a struct in memory, the gcc compiler will insert padding bytes between elements in the struct, so that objects are aligned with a memory address. This is because CPUs read memory by the word, and are optimized for this operation - if a single object spans over the word-boundary, it needs to read both words, then piece together the object from both sides. This is a more time-intensive operation.</p>
            <p className="post-body">On a 32-bit architecture, memory addresses point to words that are 4 bytes long (32 bits). 64-bit architectures use words that are twice as long (8 bytes, 64 bits). For example, suppose we wanted to represent this structure in memory:</p>

            <CodeSnippet code={fooUnpacked} language="c" showLineNumbers={false} />

            <p className="post-body">The compiler will align these bytes so that they line up with addressable memory:</p>

            <CodeSnippet code={fooAligned} language="c" showLineNumbers={false} />

            <p className="post-body">This translates to this memory layout in 32-bit (note that no element spans a word boundary):</p>

            <CodeSnippet language="text" showLineNumbers={false} >
				0x0000 =&gt; <span style={{color: '#ff5555' }}> 0000 0001</span> 0000 0000 0000 0000 0000 0000{'\n'}
				0x0001 =&gt; <span style={{color: '#ffb86c' }}> 0000 0000 0000 0000 0000 0000 0000 0010</span>{'\n'}
				0x0002 =&gt; <span style={{color: '#8be9fd' }}> 0000 0011</span> 0000 0000 0000 0000 0000 0000{'\n'}

			</CodeSnippet>

            <p className="post-body">This behavior works nicely for reading from memory, but it has a drawback - when the client and server are sending bytes over the network, they need to be able to predictably read each element in the message. This gets hard if the two sides don't agree on a padding strategy. So, the solution is to remove the byte padding ("pack" the struct):</p>

            <CodeSnippet code={fooPacked} language="c" showLineNumbers={false} />

            <p className="post-body">Now, the memory layout looks like this:</p>

            <CodeSnippet language="text" showLineNumbers={false} >
				0x0000 =&gt; <span style={{color: '#ff5555' }}>0000 0001</span> <span style={{color: '#ffb86c' }}>0000 0000 0000 0000 0000 0000</span>{'\n'}
				0x0001 =&gt; <span style={{color: '#ffb86c' }}>0000 0010</span> <span style={{color: '#8be9fd'}}>0000 0011</span> 0000 0000 0000 0000{'\n'}
				0x0002 =&gt; 0000 0000 0000 0000 0000 0000 0000 0000{'\n'}
			</CodeSnippet>
            <p className="post-body">The bytes are all front-loaded, and can be read in order.</p>

            <h2>Endianness</h2>
            <p className="post-body">Speaking of reading in-order, there is another issue. In memory, each byte is assigned a unique address. For example, consider the following 16-bit integer:</p>

            <CodeSnippet code={int16Example} language="text" showLineNumbers={false} />

            <p className="post-body">This two-byte object is represented in memory like so:</p>

            <CodeSnippet code={`0x0000 => 0001 0010 \n0x0001 => 0100 1000`} language="text" showLineNumbers={false} />

            <p className="post-body">"Endianness" refers to the order in which bytes are stored or transmitted for multi-byte types, in terms of memory addressing. In a "big-endian" system, the lowest memory address is interpreted as the most-significant byte:</p>

            <CodeSnippet code={bigEndian} language="text" showLineNumbers={false} />

            <p className="post-body">In systems that agree on big-endian byte ordering, this value would equal <code className="inline">4680</code>. But what if you streamed these bytes to a system that uses little-endian? On that system, the bytes would be interpreted in the opposite order, with the smaller memory address assumed to be the least-significant byte:</p>

            <CodeSnippet code={littleEndian} language="text" showLineNumbers={false} />

            <p className="post-body">The little-endian system reading the same two-byte object would interpret it as <code className="inline">18450</code>. It was a point of contention for many years which addressing scheme was better. While there really is no "correct" way to do it, most modern CPUs use little-endian. However, networking protocols typically use big-endian (also called <strong>network byte order</strong>). When sending data over the network, the agreed-upon protocol is to convert all data to big-endian first.</p>
            <p className="post-body">To achieve this effect, when multi-byte objects are serialized into the network models, we use a method <code className="inline">htonl</code> (host to network long, where "long" means 32-bit integer), which converts whatever endianness the host uses to network order. When we read from the network, we similarly call <code className="inline">ntohl</code> (network to host long).</p>

            <h2>Things I Probably Would Have Done Differently</h2>
            <p className="post-body">This project is something I quickly hacked together. Which is just fine with me, the whole point was to tinker with some of the concepts I've been reading about, not reinvent a game that has been reinvented countless times since the 70s. In that spirit, there are a few things that I would have changed about my approach:</p>

            <h3>1. Use a shared modeling layer</h3>
            <p className="post-body">There are obviously two major components in this system: the server and the client. These two components run on isolated networks and are compiled independently, from entirely different runtimes. The one thing that both sides need to agree on is the models. In this implementation, both sides redefine essentially the same structures and serialization logic. The tricky part is that they <i>need</i> to agree, even on small implementation details. The byte packing discussed above for example. Even the types need to match exactly (what sized integers to use, signed or unsigned, etc.). Because there's no shared modeling layer, any changes need to be made to both sides of the contract, otherwise there will be an incompatibility.</p>
            <p className="post-body">If I were to do it again, I would introduce some type of generated model package that could sit in between the two surfaces and create generated structures on either side. Something like protobuf, or Avro, or any other schema that could be compiled to native Rust and C structures. Which leads to the second lesson…</p>

            <h3>2. Pick one runtime and go with it</h3>
            <p className="post-body">I think I caused myself a lot of headaches by rapidly switching between Rust and C. While obviously there's nothing incompatible about these systems, as a single dev it costs cycles to constantly context switch. I don't consider myself terribly comfortable with either Rust or C, and I don't think I did myself many favors in trying to <i>become</i> comfortable with them by doing it this way.</p>

            <h3>3. Wouldn't have gone with a TUI</h3>
            <p className="post-body">Trying to do this in a terminal interface was a mistake. In my vision for the project, the TUI was going to be much cleaner, and use Unicode characters, high resolution, and a fast refresh rate to make a seamless Pong game. And I think that could have worked depending on what terminal you use. But there isn't broad support for refresh rates and anti-aliasing that would have made this look nice.</p>
            <p className="post-body">The good news is, there's no reason a different game client with a GUI couldn't use the same contracts as the TUI and connect to the game server, so this isn't really a closed door. Maybe I'll come back to that, we'll see.</p>

            <h2>Conclusion</h2>
            <p className="post-body">This was a fun project, and let me get a little lower into the networking space than I ever would at work. It's always neat to brush up against stuff like endianness, which I haven't really had to think about since college. It's also a nice reminder that building something is always a great way to learn, even if the premise itself is simple.</p>
        </div>
    )
}
