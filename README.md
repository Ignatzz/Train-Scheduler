# Train-Scheduler

This project allows users to input four different bits of information about a specific train route - the trains name, destination, first departure time, and the frequency with which that train runs its' route. 

Upon submission of this information through a form, the information is stored in the form of an object, and pushed to a firebase database so that it can be retrieved globally. 

The page loads all of the objects stored on firebase and populates a table with a row for each train. Additionally, using moment.js for some handy time based functions, our javascript is able to calculate what time our next train will arrive as well as how long from now that arrival will be. This information is also included in each train's respective row. 

The project simply makes the process of figuring out when one needs to leave to catch their train a little easier!