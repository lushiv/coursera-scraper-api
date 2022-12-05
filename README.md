# Coursera Scraper- API(NESTJS)
For this task, you will be creating a Node JS(preferred Nest Js) script that scrapes course info from [coursera.org.](https://www.coursera.org/) The script should have an interface where you can enter a category name corresponding to a Coursera category such as [Data Science](https://www.coursera.org/browse/data-science):

Then the script will collect all courses from this category and place them into a CSV file.
Here is the info that is required from each course:

1. Course name
2. Course provider
3. Course description
4. Course duration
5. Ratings

The script should collect data from ALL courses within the category that is inputted. Once
finished, the script should place the CSV file on the server and provide a link to access it.

## Setup Steps :
- First install `nest`
- `npm i -g @nestjs/cli`
- `npm i puppeteer`
- Create a new project called scraping api using `nest new coursera-scraper-app`
- compile file into js using `npm run start:dev`
- Finally, API is Running on default port 300

## API ENPOINT
[http://localhost:3000/api/v1/courses](http://localhost:3000/api/v1/courses)



**NOTE: Input Categories Enums are here:
- DATA_SCIENCE = "Data Science",
- BUSINESS = "Business",
- COMPUTER_SCIENCE = "Computer Science",
- PERSONAL_DEVELOPMENT = "Personal Development",
- INFORMATION_TECHNOLOGY = "Information Technology",
- LANGUAGE_LEARNINGING = "Language Learning",
- HEALTH = "Health",
- MATH_AND_LOGIC = "Math and Logic",
- SOCIAL_SCIENCE = "Social Sciences",
- PHYSICAL_SCIENCE_AND_ENGINEERING = "Physical Science and Engineering",
- ARTS_AND_HUMANITIES = "Arts and Humanities" 
