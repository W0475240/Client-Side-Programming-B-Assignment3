// IIFE
(() => {

	//Choose an array method to implement for each of the incomplete functions.
	//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

	//Remember, you can chain together array function calls to attain your goals.
	// Ex: array.filter().map()

	//Get data for the TV Show "Friends"
	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then((response) => response.json())
    .then((json) => {

        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output
        console.log(json);
        //1 - Create a function called getGuntherCount() which returns the total number of episodes 
        // where the character Gunther is mentioned in the episode summary.

        function getGuntherCount(obj)
        {
            return  obj._embedded.episodes.filter((episode) => episode.summary.includes('Gunther')).length;
        }

        console.log('--------------------------------');
        console.log(`Gunther Count: ${getGuntherCount(json)}`);

        //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
        
        function getTotalRuntimeMinutes(obj)
        {
            return obj._embedded.episodes.reduce((total, episode) => total + episode.runtime,0);
        }
        
        console.log('--------------------------------');
        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);


        //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
        
        function getTotalEpisodesInYear(obj, year)
        {
            return obj._embedded.episodes.filter((episode) => episode.airdate.includes(year)).length;
        }
        
        console.log('--------------------------------');
        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);

        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
        
        function getFemaleCastMembers(obj)
        {
            return obj._embedded.cast.filter(c=>c.person.gender == "Female").map(c=>c.person.name);
        }
        
        console.log('--------------------------------');
        console.log(`Female Cast Members:`);
        console.log(getFemaleCastMembers(json));

        //5 - Create a function called getEpisodeTitles() which returns a list of episode
        //    where the argument string is found in the episode summary.

        function getEpisodeTitles(obj, str)
        {
            return obj._embedded.episodes.filter((episode) => episode.summary.includes(str)).map(episode => episode.name);
        }

        console.log('--------------------------------');
        console.log(`Episodes that mention Ursula:`);
        console.log(getEpisodeTitles(json, 'Ursula'));

        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.

        function getCastMembersOver55(obj)
        {
            return obj._embedded.cast.filter(c=>c.person.deathday == null).filter(c=>parseInt(c.person.birthday.split("-")[0]) < 1968).map(c=>c.person.name);
        }

        console.log('--------------------------------');
        console.log(`Cast Members over 55:`);
        console.log(getCastMembersOver55(json));


        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6

        function getTotalRuntimeMinutesExcludingSeasonSix(obj)
        {
            return obj._embedded.episodes.filter((episode) => episode.season != 6).reduce((total, episode) => total + episode.runtime,0);
        }


        console.log('--------------------------------');
        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
    
        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name


        function getFirstFourSeasons(obj)
        {
            return obj._embedded.episodes.filter((episode) => episode.season <= 4).map(episode => {return {season: episode.season, name: episode.name}});
        }


        console.log('--------------------------------');
        console.log(`Episode JSON for first four seasons:`)
        console.log(getFirstFourSeasons(json));

        //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
        
        function getEpisodeTallyBySeason(obj)
        {
            return obj._embedded.episodes.reduce((tally, episode) => {
                if (!tally[episode.season])
                {
                    tally[episode.season] = 1;
                }
                else
                {
                    tally[episode.season] += 1;
                }
                return tally;
            },{});
        }
        
        console.log('--------------------------------');
        console.log(`Tally of episodes by season:`);
        console.log(getEpisodeTallyBySeason(json));

        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
        //the name and summary of the episodes.
        
        function capitalizeTheFriends(obj)
        {
            return obj._embedded.episodes.map(episode => {
                var names_regex = /Joey|Chandler|Monica|Rachel|Phoebe|Ross/gi; 
                episode.name = episode.name.replace(names_regex, (match) => match.toUpperCase());
                episode.summary = episode.summary.replace(names_regex, (match) => match.toUpperCase());
                return episode;
            });
        }
        
        console.log('--------------------------------');
        console.log('Capitalized Friends');
        console.log(capitalizeTheFriends(json));

    })

	// COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
	// (or a combination) ON THE PROVIDED JSON DATA

	// Define the required ten functions below this line...

})();
