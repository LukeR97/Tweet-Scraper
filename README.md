# Twitter Tweet Scraper
This application takes a given topic from the user and will scrape Twitter.com for tweets of that given topic. 3 Docker containers are used.
A DB is replicated 3 times and will store the results of the scraped tweets and can be accessed through an SSH into the Docker container. A Vue.js web application
will act as our client facing app. This is where the user will input their topic to scrape and this will form a HTTP request and POST this
to our scraper tool. This is a Node.js application which will navigate to Twitter and scrape the HTML of the results page and return the 
tweets back to our Vue.js application. The number of results returned is equal to the number of tweets displayed on a single page.

![Vue app initialised](https://i.imgur.com/4U0zNTj.png)

![results](https://i.imgur.com/6Ti38KP.png)

![docker containers running](https://i.imgur.com/UQQ3RxI.png)
