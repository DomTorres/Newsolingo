# Project Title
Newsolingo

## 1. Project Description
Our team BBY-22 developed a web application to help individuals keep up with global news by delivering it in a simple and accessible way and making news-reading effortless unlike other news sources.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Oswaldo Vega
* John Oh
* Dom Torres
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* GNews API (querying and fetching news) https://gnews.io/
* Mapbox API https://www.mapbox.com/
* Onclick sound effects
    1. https://www.youtube.com/watch?v=wAxM_vvR2Jo&list=WL&index=8
    2. https://www.youtube.com/watch?v=Ehj0sY9Gc94
* Newsolingo bird logo
    - https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.123rf.com%2Fclipart-vector%2Fbird_airmail.html&psig=AOvVaw02Kc7u2-TJ7n55tEAxJfKw&ust=1712899568932000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjCnKy2uYUDFQAAAAAdAAAAABAE 

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?

Here are the steps for using application
* Clone from Github for code or (https://newsolingo.web.app/)
* Log in/Sign up
* Select preferences and input information
* For You Page:
    * Select article to view (can save)
    * Once all articles have been read they will be done for the day
* Explore Page:
    * Select country marker to view articles from that country
    * Select article to view
* Saved Page:
    * See saved articles and can be selected to read

## 5. Known Bugs and Limitations
Here are some known bugs:
* Delete collection function for For You page hasn't been implemented. So, if a user didn't finish their articles from yesterday, those yesterday articles
don't get deleted and still show up today.
* Delete collection function for Explore page hasn't been implemented. It will add news to the collection everyday, but won't delete the news from the previous day
* Reading an article on the saved page decrements articles read today. So, sometimes it can go negative (read -1 more articles..., 
4/3 articles read today...).
* No way to unsave news articles

Limitations: 
* The news API only allows us to grab articles from a list of countries.
* The news API doesn't allow us to fetch news from the api multiple times in a short period of time. This limited the number of countries we could fetch news from for the explore page.

## 6. Features for Future
What we'd like to build in the future:
* Better feedback and status communication (active page should be highlighted in the navbar, there should be a modal notification when
an article is saved)
* Broader support for more countries and more categories
* Implement a way that we can get the full article content (current options:)
    1. webscraping (though may be illegal for some websites)
    2. pay for premium version of API
    3. explore other APIs, perhaps native APIs from news outlets
    4. implement a window view where the user can view the article from the main news source without leaving the app
* Could add a random country function for the explore page and a functioning search bar for the map.

## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore                      # Git ignore file
├── index.html                      # landing HTML file, this is what users see when 
├── 404.html                        # 
├── article_explore.html            # HTML for the article from explore.html
├── article.html                    # HTML for the article from main.html
├── edit_profile.html               # HTML to edit your profile
├── explore.html                    # HTML to explore page
├── first_time_client_info.html     # HTML for first time users
├── login.html                      # HTML for login page
├── main.html                       # HTML for landing page
├── preferences.html                # HTML to edit preferences
├── saved.html                      # HTML for saved page
└── README.md                       

It has the following subfolders and files:
├── .git                          # Folder for git repo
├── images                        # Folder for images
    /bird.png                       # Newsolingo logo
├── scripts                       # Folder for scripts
    /alert.js                       # JS file for Sweetalerts    
    /article_explore.js             # Script for article from explore.html
    /authentication.js              # Authenticates user using firebase
    /edit_profile.js                # Script for edit_profile.html
    /explore.js                     # Script for explore.html
    /First_time_client_info.js      # Script for first_time_client_info.html
    /main.js                        # Script for main.html
    /preferences.js                 # Script for preferences.html
    /saved.js                       # Script for saved.html
    /script.js                      # Script for logging out
    /skeleton.js                    # Loads the nav bar and footer
├── sounds
    /completeddailygoal.wav         # Sound file that plays when daily goal is hit
    /donereading.wav                # Sound file that plays when done reading is clicked
├── styles                        # Folder for styles
    /edit_profile.css               # CSS for edit_profile.html
    /first_time_client_info.css     # CSS for first_time_client_info.html
    /style_explore.css              # CSS for explore.html
    /style.css                      # General css for html
    /style_preferences.css           # CSS for preferences.html
├── text
    /footer.html                    # HTML for the footer
    /nav_after_login.html           # HTML for the nav bar after logging in
    /nav_before_login.html          # HTML for the nav bar before logging in


```


