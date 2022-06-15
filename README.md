# CodeChallenge
 
This is react app which makes use of Bands In Town API to fetch data about artists and the locations of the venues where they are performing. 

The app is completely responsive. I have used material's library for the UI components and responsiveness. Due to time constraints, I cannot add the feature of cache. As far as deployment is concerned, we can deploy the app using surge or netlify, both of which are free.

## Architecture
We have used react for the front end. Using the fetch API, we bring in all the add from the bands in town API. Same thing is done for the events part. We then loop over the response returned by the API to display the upcoming events of that artist.

## Design Choices
As there was limited time, I cannot do much with the design. I used the materials library to mitigate this task of designing, plus a few custom css.
