
import redisPlusSpring from '../../images/posts/redis+spring.png';
import CodeSnippet from '../CodeSnippet';

const dependencies = `dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-cache:2.6.6'
    implementation 'org.springframework.boot:spring-boot-starter-data-redis:2.6.6'
}`;

const config = `public class RedisConfig {

    @Value("\${redis.host}")
    private String address;

    @Value("\${redis.cacheVersion}")
    private String cacheVersion = null;

    @Value("#{new Boolean('\${redis.disabled}')}")
    private boolean disabled = false;

    @Bean
    public RedisCacheConfiguration redisConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(60))
            .disableCachingNullValues()
            .serializeValuesWith(
                RedisSerializationContext.SerializationPair.fromSerializer(
                    new GenericJackson2JsonRedisSerializer()
                )
            );
    }
}`;

const getCustomer = `@Cacheable(value="customer", key="#customerId")
public Customer getCustomer(long customerId) throws CustomerNotFoundException {
    simulateSlowService();
    Customer customer = customerRepository.findById(customerId);
    if (customer == null) {
        throw new CustomerNotFoundException();
    } else {
        return customer;
    }
}`;

const updateCustomer = `@CacheEvict(value="customer", key="#customerId")
public Customer updateCustomer(long customerId, UpdateCustomerRequest updateCustomerRequest) throws CustomerNotFoundException {
    Customer customer = customerRepository.findById(customerId);
    Customer updated = updateCustomerRequest.mergeToCustomer(customer);
    return customerRepository.save(updated);
}`;

const cachePut = `@CachePut(value="customer", key="#customerId")`;

const buildDbScript = `#!/bin/bash

# postgres
docker stop cms_postgres && docker rm cms_postgres
docker run \\
  --name cms_postgres \\
  -p 5432:5432 \\
  -v "pgdata:\`pwd\`/pgdata" \\
  -d postgres:10.1-alpine

# redis
docker stop cms_redis && docker rm cms_redis
docker run \\
  --name cms_redis \\
  -p 6379:6379 \\
  -d redis`;
  
const applicationYaml = `redis:
  host: localhost
  cacheVersion: 1
  disabled: false`;

function SpringCaching() {
    return (
        <div className="post-content">
            <h1 className="display-4">Adding a Redis Cache to Your Spring Boot Service</h1>
            <h5 className="text-muted">May 1, 2022</h5><br />

            <div className="post-header-img">
                <img src={redisPlusSpring} alt="redis+spring" className="img-fluid" />
            </div>
            <p><i>Caching</i> is the practice of saving frequently-accessed data so that it can be retrieved more quickly later, without having to source the data a second time.  Redis is a popular cache, and if you have a Java Spring service, you may be interested in adding a cache to improve performance.  Here is a quick rundown of how to implement your cache, and how to verify that it's working.</p>
            <h2>Step 1:  Add dependencies</h2>
            <p>Add the following to your <code className="inline">build.gradle</code> file.</p>
            <CodeSnippet code={dependencies} language="groovy" showLineNumbers={false} startingLineNumber={1} />

            <p>This will install dependencies for Spring's built-in cache management and those needed to interface with Redis.</p>
            
            <h2>Step 2: Configure Caching</h2>
            <p>Create a configuration file called <code className="inline">RedisConfig.java</code>.  This is where we'll configure the Redis default settings like host and <i>time-to-live</i>, which refers to how long a record will stay in our cache before being automatically evicted.  Add the following to that file:</p>
            <CodeSnippet code={config} language="java" showLineNumbers={false} startingLineNumber={1} />
            <p>This will instruct Redis on which host to use, whether the cache should be enabled, what default TTL to use (60 minutes), and how to deserialize objects to retrieve their cache keys.  This will be important later.</p>
            <h2>Step 3:  Annotate your service to start caching responses</h2>
            <p>Caches are essentially key-value stores.  To make the best use of a cache, you want to make sure that you have a low risk of key collisions.  Say that we have a service that manages customer information for a business.  We could use the customer's first name as a cache key.  The first time that a customer is retrieved, we need to fetch it from the underlying data store, an expensive operation.  Before we return the customer, we'll create a key for their first name, then store the customer information as the value in the cache.  The next time we search for that customer by first name, we'll reference the cache instead of making the expensive call to the underlying data store.</p>
            <p>The problem with this method is that it's possible for multiple customers to have the same first name.  In case of a cache collision, the next lookup will overwrite the customer in the cache.  Depending on our lookup strategy, this could mean our cache has limited usefulness in some cases, or in the worst case we might end up returning the wrong user's data!  Instead, let's try using the customer's unique primary key in the database as a key.  When we do lookups and updates, we'll be searching by this ID, and will likely have situations where we reference the same customer several times over the span of a few minutes, a prime candidate for caching.</p>
            <p>To do this, let's add some annotations to the endpoints that service customer data.  When we retrieve a customer, we want to update the record for that customer ID in the cache, so let's add the `@Cacheable` annotation, like so:</p>
            <CodeSnippet code={getCustomer} language="java" showLineNumbers={false} startingLineNumber={1} />
            <p>This annotation tells Spring that before returning the payload, we want to make a record of the response in the cache, keyed by the customerId parameter that the function takes.  Notice the `simulateSlowService();` call.  For the purposes of testing, I wrote a function that waits for 3 seconds before exiting, to simulate the expensive database lookup.  The first time that this function is called, there will be a long wait while the data is sourced.  But in every subsequent attempt while the cache entry is not invalid, Spring will reference the cache instead, and return almost instantly!</p>
            <p>This behavior is great, but what happens if the customer is updated?  We don't want to keep the same value in the cache, because we'd be returning stale data from the cache when the underlying data in the store has actually changed.  One option is to wait until the cache record reaches the time to live that we configured.  But that's 60 minutes, which may be too long for your service to become up-to-date.  Instead, what if we told our customer update endpoint to invalidate the cache entry whenever an update is made?  We can do this, like so:</p>
            <CodeSnippet code={updateCustomer} language="java" showLineNumbers={false} startingLineNumber={1} />
            <p>Now, whenever an update is made, that key is removed from the cache.  The next time we call the GET endpoint, we'll need to wait for the new entry to be retrieved from the database and written to the cache.  Subsequent calls will reference the cache instead, and be much faster.</p>
            <p>You may have noticed that this is actually not an optimal solution.  Since the record has to be retrieved and returned anyways in the UPDATE call, why don't we take that opportunity to save it to the cache, so we don't have to do a second lookup later?  We can do this by using a different annotation:</p>
            <CodeSnippet code={cachePut} language="java" showLineNumbers={false} startingLineNumber={1} />
            <p>This instructs the cache to update both the underlying resource, as well as the cached resource.  This keeps the cache up to date without sacrificing consistency in the responses.</p>
            <h2>Step 4: Testing</h2>
            <p>Let's configure our service and our cache to run on your local machine.  I wrote a script for my service that spins up docker images for a postgres database and a Redis instance:</p>
            <CodeSnippet code={buildDbScript} language="bash" showLineNumbers={false} startingLineNumber={1} />
            <p>In your Spring <code className="inline">application.yaml</code> file, make sure that the variables we configured at the beginning are set: </p>
            <CodeSnippet code={applicationYaml} language="yaml" showLineNumbers={false} startingLineNumber={1} />
            <p>Run the script to start the docker images running.  Start your gradle application, and try out your service.  If you took an approach similar to mine, you should notice that the first time that a resource is requested it loads slowly, due to the database lookup, but that subsequent attempts to retrieve a resource are much quicker as they reference the cache.  If you want more solid proof, connect to your Redis docker image via the command line and run <code className="inline">redis-cli MONITOR</code>.  This will start an interactive session, where you will see the cache keys being GET and SET.</p>
        </div>
       
    );
}

export default SpringCaching;