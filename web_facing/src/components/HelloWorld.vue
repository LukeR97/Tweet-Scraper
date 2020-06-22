<template>
  <div>
    <h1> Search for a topic</h1>
    <form @submit.prevent="doSearch">
      <input type="search" id="search">
      <br>
      <button type="submit" id="submit">Search</button>
    </form>
    <!-- only show loading when waiting for reponse -->
    <div id="loading">
      <h2>loading...</h2>
    </div>
    
    <!-- checks if a result has been receive if yes will display message -->
    <div id="tweet_check" v-if="tweet.length != 0">
      <h2>Tweets near you!</h2>
    </div>

    <!-- iterate through tweet data and displays each tweet in its own box -->
    <div id="tweet_box" v-for="tweet in tweet.data"
    v-bind:item="tweet"
    v-bind:key="tweet">
    <p>{{ tweet }}</p></div>

  </div>
</template>

<script>
const axios = require('axios');
//The url for our server which will gather the tweet data
const url = "http://localhost:3007/search"
export default {
  data() {
    return {
      //reponse data stored in tweet
      tweet: []
    }
  },
  methods: {
    //search method sends a post request to our server api which will take our search value and using the tweeter api return tweets on that topic
    doSearch() {
      //display the loading text when searching
      document.getElementById("loading").style.display = "contents";
      var query = document.getElementById('search').value;
      console.log(query);
      axios({
        method: 'post',
        url: url,
        headers: {},
        data: {
          query: query
        }
      }).then((response) => {
        if(response.status == 200){
          console.log(response);
          //hide the loading text as the search has completed
          document.getElementById("loading").style.display = "none";
          this.tweet = response;
        }
      }).catch((error) => {
        //catch and display any errors
        console.log(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  font-size: 50px;
}

#search {
  width: 60%;
  margin-bottom: 50px;
  height: 50px;
  border: 3px solid black;
  border-radius: 25px;
  cursor: text;
  font-size: 30px;
}

#submit {
  width: 45%;
  height: 60px;
  font-size: 30px;
  font-weight: bold;
}

#loading {
  display: none;
}

#tweet_box {
  text-align: center;
  width: 75%;
  margin: 0 auto;
}

#tweet_box p{
  margin-top: 15px;
  padding: 15px;
  border: solid 2px #000000;
  border-radius: 20px;
  background-color: azure;
}



#divider {
  margin: 50px;
}

</style>
