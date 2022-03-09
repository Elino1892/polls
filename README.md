# Polls

<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Polls</h3>

  <p align="center">
    The aim of this project was to write a web application to generate polls and reports.
    <br />
    <a href="https://github.com/Elino1892/polls"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://polls-app-project.herokuapp.com/">Live demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img width="1920" alt="main-page" src="https://user-images.githubusercontent.com/78544353/157531400-f4ea378f-45e1-4fcd-a0f2-44123b2db487.png">


This web application is meant to be used for generating polls and reports. User have to register and login in to be able to look over and fill in polls. After the completing the survey, user can review their answers of this poll. Every user belongs to his group/groups. Except that, user can download the report of survey and see responses another users. Administrator can search, create or delete users, groups or polls. He has opportunity to create a new survey with add, change and delete questions, type of questions and answers. He decide about name, description, date of availability and which groups can fill in this poll. After adding the survey, all users belonging to the designated group, receive an e-mail with a notification, that they can complete the survey. Users responses are visible both on the website and in the report in format .xlsx.   

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [Sass](https://sass-lang.com/)
* [Bootstrap](https://getbootstrap.com)
* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Django](https://www.djangoproject.com/)
* [PostgreSQL](https://www.postgresql.org/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Python (3.10)
* Django (4.0)

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/Elino1892/polls.git
   ```
2. Create virtual environment:
   ```sh
   virtualenv myenv
   ```
3. Activate virtual environment:
   ```sh
   myenv\scripts\activate
   ```
4. Install requirements:
   ```sh
   pip install -r requirements.txt
   ```
5. Run Django server:
   ```sh
   python manage.py runserver
   ```
6. Install react modules:
   ```sh
   cd frontend
   ```
   then
   
   ```sh
   npm install
   ```


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Live Demo can be viewed at https://polls-app-project.herokuapp.com/

<img width="1920" alt="Screenshot_2" src="https://user-images.githubusercontent.com/78544353/157551054-361a929f-9f80-4b57-9f66-3d989074209b.png">
<img width="1920" alt="Screenshot_3" src="https://user-images.githubusercontent.com/78544353/157551058-4885325b-06cd-4569-b4d6-ae8402059920.png">
<img width="386" alt="Screenshot_4" src="https://user-images.githubusercontent.com/78544353/157551083-7156b4d2-40ac-4900-b0f6-edf32259af20.png">
<img width="1910" alt="Screenshot_5" src="https://user-images.githubusercontent.com/78544353/157551086-4adfa819-1751-4e17-b031-5fda8903bd1e.png">
<img width="1910" alt="Screenshot_6" src="https://user-images.githubusercontent.com/78544353/157551121-e21ebef0-8eb0-4d32-ba7c-d80a360d4b14.png">
<img width="661" alt="Screenshot_7" src="https://user-images.githubusercontent.com/78544353/157551415-fa9f5efd-2aba-4b7b-a46b-ab580af9b51f.png">


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Marcin Marciniak - [Linkedin](https://www.linkedin.com/in/marcin-marciniak-9b66b8220/) - m.elino1892@gmail.com

Project Link: [https://github.com/Elino1892/polls](https://github.com/Elino1892/polls)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Heroku](https://www.heroku.com)
* [Django Rest Framework](https://www.django-rest-framework.org)
* [pgAdmin](https://www.pgadmin.org/)
* [JSON Web Token](https://jwt.io/)
* [Postman](https://www.postman.com/)
* [Font Awesome](https://fontawesome.com)

<p align="right">(<a href="#top">back to top</a>)</p>
