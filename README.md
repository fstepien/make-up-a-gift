Make Up A Gift
==============

[https://makeupagift.filipstepien.com](https://makeupagift.filipstepien.com)

#### Product Scope Description 

**Client Brief:** Create an app that uses a makeup API to assemble a gift set that follows a certain budget. The user can enter 3 product types (Nail Polish, Eyeliner, Foundation, etc) and are suggested 3 products that’s total price is less than the budgeted amount. Users can “save” one product and remix the rest until they find a combination they like.

**Approved Change Request:** Once a gift package is selected user can forward it to their email. They will receive a URL that will retrieve their saved gift. 

#### Schedule

![](https://meta.filipstepien.com/makeup.schedule.JPG)

#### Feasibility

![](https://meta.filipstepien.com/makeup.network.png)

**API Data:** After reviewing requirements and defining the scope, the [MakeUp API}(https://makeup-api.herokuapp.com/) was tested using [Postman](https://www.getpostman.com/). Product pricing was returned in 3 different currencies, as a result a second API call was made to [fixer.io](https://fixer.io/) to get exchange rates. Also, the MakeUp API did not provide documention for GET requests for single products by ID that were required for the `<PernalGift />` component. We did find `https://makeup-api.herokuapp.com/api/v1/products/${id}.json` returned the required result. 

**API Speed:** Each product category contained 40 - 140 products. To calculated min-max ranges, as well as be able to filter and find three products under the set range the entire category data set was required. The Heroku server was able to provide this data within 5 - 15 seconds for each type, this was not acceptable from a UX perspective. As a result the data could not be fetched after selecting the type, instead it was preloaded while the user picks make up categories. This crated the perception of instant data or at most a couple seconds of delay with a loading image. Intially we hoped to make a request to get all data points (~900 products) which took  15 - 30 seconds and resulted in a 500 error more than 50% of the time. Instead, a loop was created to make 10 separate calls to fetch the information. These could also return an error, at this point the user would not be able to continue and is sent to a fallback page with 3 pre-selected products. 

#### WireFrame

[inVision](https://www.invisionapp.com/) was used for wireframing as it allowed the whole team to log and work on a shared canvas. 

![](https://meta.filipstepien.com/makeup.wireframe.png)

#### Data Flow Diagram

![](https://meta.filipstepien.com/makeup.dataflow.email.png)

#### Sending Email from a Front End App

![](https://meta.filipstepien.com/makeup.email.png)
![](https://meta.filipstepien.com/makeup.email.display.png)

#### Email Link Example 

[https://makeupagift.filipstepien.com/your-gift/920/247/885](https://makeupagift.filipstepien.com/your-gift/920/247/885)

#### Lessons Learned 

+ 


![](https://meta.filipstepien.com/makeup.notes.jpg)

