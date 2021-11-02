# CODE CHALLENGE
### Matter Supply Co.
### Technologist (Web Technologies)

## Github Dependencies

For the project to work, you must create a Github app, it will be used for the
oAuth flow, so that the user can log in and be able to create new blog posts.
The steps to achieve this are described in the [Github
Documentation](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app).

Once you've created the app take note of the Client ID and Secret, these must
be set as Environment variables on the back end.

## Front End  Dependencies

| Name | Description |
| - | - |
| react-dotenv | Used to manage configuration options as environment variables |
| @fortawesome/\* | Font Awesome icons  |
| @octokit/rest | Used to consume the github rest API |
| dayjs | Used to process format dates |
| formik | Used to process the post creation form |
| yup | Used for form validation in conjunction with formik |
| react-markdown / rehype-raw | Used to display markdown content with embedded
html |
| react-router-dom | Used for managing routing |

## Back End Dependencies

| Name | Description |
| - | - |
| ominauth-github | Used for handling github oAuth flow |
| rack-cors | Used for enabling cross site requests between the front end and
back end |
| dotenv-rails | Used to manage configuration options as environment variables |

## Back End

The back end is written in ruby on rails, and it is only used to handle
github's oauth flow, and save the user information in the session storage.

In order to share a session and allow requests from the front end, CORS had to
be configured on the back end. This specific instance is fairly open, allowing
all requests and credential sharing with the front end url. In a production
setting, it would be recommended to limit the resources and headers allowed by
CORS.

Only two controllers compose the back end:

### Sessions controller

| Method | Endpoint | Description |
| - | - | - |
| GET | `/auth/github/callback` | Last step of the github oauth flow, receives the user information and stores it in session storage |
| POST | `/logout` | Clears the user session storage for effectively logging the user out of the application |

### Config controller

| Method | Endpoint | Description |
| - | - | - |
| GET | `/config` | Retrieves the configuration object containing the authorization link and, if the user is logged in, the user information returned by github during the oauth flow  |

### Setting up and running the back end

The following instructions require ruby to be avilable on the machine they will
be executed on. They should also be executed from the project's root directory.

```
cd backend
gem install rails
bundle install
bin/rails server
```

### Environment Variables

GITHUB_KEY: Client id for the github app
GITHUB_SECRET: Client secret for the github app
FRONTEND_URL: Base url for the front end (e.g. http://localhost:3001)

## Front End

The front end is composed by three main views that respond to four different
routes.

| Route | View | Description |
| - | - | - |
| `/` | Home | Displays the home page of the application. |
| `/user/:username` | Home | Displays the public gists created by the user identified by `:username` on the home page. |
| `/gist/:id` | Detail | Displays the content of the gist identified by `id`. |
| `/form` | Form | Displays the form to create a new gist under the logged in user. |


### Environment Variables

REACT_APP_BACKEND: Base url for the back end (e.g. http://localhost:3000)

## Questions

- What are your thoughts around continuous integration, where & how you would deploy this application?

```
I believe that there aren't many projects that run on a server that wouldn't
benefit from having a CI/CD pipeline attached. The immediate feedback that you
get from running the tests as soon as the pull request is created is extremely
valuable, and having automated deployment is a must-have for projects of any
size.

A project like this one could be initially deployed to a PaaS solution such as
Heroku, which provides a good level of abstraction over AWS services for a
relatively low price. If the project caught on, and more control was needed,
then I would transition it to AWS or another similar IaaS service for more
granular access to the configuration details and greater control over the
different resources required by the project.
```


- What do you think you would do differently if you had 2 weeks to complete this assignment and no requirement to use Github. What would your backend solution look like?

```
I would definitely include a lot more tests in the application!

Using gists as a backend is a pretty clever solution to the problem, but
it makes you dependent on a third party API and requires that your users have
github accounts, limiting it to a very specific segment of the population.

The back end would only need to have login capabilities and a BlogPost model
with a many-to-one relationship with a User, in order to match the
functionality already implemented in the challenge. This should be trivial to
implement using any popular back end framework such as Rails, Express or Django.

```

- Are you happy with your own solutions? If yes, which parts do you think are really well done, if not, what would you want to change?

```
I'm fairly happy with the result, given the amount of time I was able to
dedicate to working on the challenge. The code is well structured and readable,
and I would consider the solution feature complete.

I would have liked to devote more time to the UX aspect of the challenge. There
are a lot of instances where the data returned by github could be cached in
order to avoid unnecessary round trips to the API, thus making the app much
faster.

```

