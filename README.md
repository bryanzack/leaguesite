# leaguesite
Find recent match history of any League of Legends user given a region code and a username
https://league-site.herokuapp.com/


Read more about the progress of this project here: https://github.com/bryanzack/leaguesite/wiki/Problems-with-current-version-and-plans-for-the-next


Please note that the app adheres to the following API rate limits(https://developer.riotgames.com/apis):
* 20 requests every 1 second
* 100 requests every 2 minutes


As this is still a work in progress, the app might fail to load some user profiles. If this happens, please check if It's a known issue. If not, submit your test case as an issue and I'll try and get to it.

Test cases to try:
* na1, "pointers" (exists & has matches)
* euw1, "testuser1" (does not exist)
* eun1, "pineapple"
* kr, "grand canyon"
* br1, "testuser"
* jp1, "league"
* ru, "gonnahireme?"
* oc1, "another" (exists & has no matches)
* tr, "thanksgiving"
