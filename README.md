# spacex
# My approach of solving this task
1. First I created a React app with webpack to improve optimization and performance of an application.
2. Then created a boilerplate for structuring of the code.
3. Once adding routes, actions and reducers done then I started working on landing page.
4. In landine page, first added a filters card with proper mobile and web responsive styles.
5. Once adding filters card done then integrated API end point for the first-time page load without any Filters and fetched all list of data from spaceX API.
6. Once fetching done then added proper styles for the spaceX data cards.
7. In filters when user clicked on year then API end point will be called and fetched all data based on year that we choosen.
8. When user clicked on launch success true or false then API end point will be called and fetched all data based on launch success type that we choosen.
9. When user clicked on land success true or false then API end point will be called and fetched all data based on land success type that we choosen.
10. When user clicked on all three year, launch and land, then API end point will be called and fetched all data based on year, launch and land that we choosen.
11. When user clicked on only year and launch then API end point will be called and fetched all data based on year and launch that we choosen.
12. When user clicked on only year and land then API end point will be called and fetched all data based on year and land that we choosen.
13. When user clicked on only launch and land then API end point will be called and fetched all data based on launch and land that we choosen.

NOTE: User can select and deselect any filter, for example if user clicked on 2006 year then 2006 year data will be shown to the user and if he again click on 2006 means deselect, then all data will be displayed if user is not clicked on any filter. (It makes easier for user to get anything)

# Added Routes
1. Added 4 routes to make easy to understand by the user.
2. When we click on year then it will redirect to /yearwise route and displays data based on year.
3. When we click on launch then it will redirect to /launchwise route and displays data based on launch type.
4. When we click on land then it will redirect to /landwise route and displays data based on land type.
5. When we click on any combination like year, launch and land or any combination then it will redirect to /all route and displays data based on the combination that we selected.
6. When user added unknown route to the path then it will redirect to page404 not found page.

# How to run this task
1. First clone this repo.
2. Once clonned do npm i to install required node_modules.
3. Once node_modules installed do run npm start, once it get compiled successfully then open http://localhost:3000/ in browser.

# App live link
https://loving-goodall-e6e5e0.netlify.app/

NOTE: Maximum wrote the optimized code.
