# ๐ค BoBi - Backend

> ๊ด์ฐฐํ ๋ฐ๋ ค ์ผ์ด ๋ก๋ด BoBi  ::  *๋ณด๋น[๋ช] ๋ณด์กฐํ์ฌ ๋๋ด*



```
๐ BE
โโbobi_backend
โโDOCKERIZE			//Docker ์๋ 1
โโDOCKERIZE_REAL	// Docker ์๋ 2
โโDOCS
โโREADME.md
```



## ๐  ๊ธฐ์  ์คํ (ํต์ฌ ๊ธฐ๋ฅ)

\-  Django **Django 3.2.12**

\-  ๊ต์ฐจ ์ถ์ฒ ๋ฆฌ์์ค ๊ณต์  **django-cors-headers 3.13.0**

\-  ๋๋ฏธ๋ฐ์ดํฐ ์์ฑ **django-seed 0.3.1**

\-  API **djangorestframework 3.13.1**

\-  MySQL DB ์ฐ๋ **mysqlclient 2.1.1**



## ๐ Model (DB) ๊ตฌ์กฐ

```
๐พ accounts_user (์ฌ์ฉ์)
	- [P] id (int)
	- [F] robot_id (int)
	- [F] level (int)
	- password (varchar(128))
	- last_login (datetime(6))
	- is_superuser (boolean)
	- username (varchar(150))
	- first_name (varchar(150))
	- last_name (varchar(150))
	- email (varchar(254))
	- is_staff (boolean)
	- is_active (boolean)
	- date_joined (dataetime(6))
	- youtube_id (varchar(30))
	- phone_number (int)

๐พ bobi_robot
	- [P] id (int)
	- [F] level (int)	// ์น๋ฐ๋
	- exp (int)
	
๐พ bobi_level
	- [P] level (int)
	- required_exp (int)	// ๋ค์ ๋ ๋ฒจ๊น์ง ํ์ํ ์น๋ฐ๋
	
๐พ bobi_sensor
	- [P] sensor_id (int)
	- [F] robot_id (int)
	- [F] level (int)
	- gas (double)			// 1: ์ ์ ์ํ, 0: ์ํ ๊ฐ์ง ์ํ
	- temperature (double)
	- humidity (double)
	- datetime (varchar(30))
	- battery (double)
	
๐พ stories_story
	- [P] id (int)
	- narr_link (varchar(100))		// ์์ฑ ๋ด๋ ์ด์ ์ฝ์ ์ 
	- title (varchar(30))
	- content (longtext)
	
๐พ archives_archivevideo
	- [P] id (int)
	- video_url (varchar(500))		// ์ฝ์ํ  ์ ํ๋ธ ์์ URL
	- datetime (datetime(6))
	- title (varchar(20))
	- contents (longtext)

๐พ voices_voicecheck
	- [P] id (int)
	- datetime (varchar(30))
	- is_checked (boolean)
```



##### ์ด๊ธฐ ERD

![image-20220818172745645](C:\Users\SSAFY\Desktop\S07P12A208\WEB\BE\README.assets\image-20220818172745645.png)

##### ์์  ERD

![image-20220818151705240](C:\Users\SSAFY\Desktop\S07P12A208\WEB\BE\README.assets\image-20220818151705240.png)





## ๐ URL settings

```
# ์นํ์ด์ง
https://i7a208.p.ssafy.io/     // ๋ฉ์ธ ํ์ด์ง
https://i7a208.p.ssafy.io/intro      // ์ค์  ์๊ฐ ํ์ด์ง
https://i7a208.p.ssafy.io/live    // ์ค์๊ฐ ์ ํ๋ธ ๋ผ์ด๋ธ ์์ ์ฌ์
https://i7a208.p.ssafy.io/friendliness     // ํ์ฌ ์น๋ฐ๋ ํ์ธ
https://i7a208.p.ssafy.io/archive-video    // ์์ ์์นด์ด๋ธ
https://i7a208.p.ssafy.io/story     // ์คํ ๋ฆฌ ํ์คํธ ํ์ธ
https://i7a208.p.ssafy.io/control     // ๋ก๋ด ์กฐ์ (๋ฐฐํฌ ์๋ฒ์์๋ ์๋ X)
https://i7a208.p.ssafy.io/sensor     // ์ผ์ ๋ฐ์ดํฐ ํ์ธ
https://i7a208.p.ssafy.io/voice     // ์์ฑ ๋ฉ์์ง ์ก์์ 
https://i7a208.p.ssafy.io/login // ๋ก๊ทธ์ธ_๋ฏธ๋ก๊ทธ์ธ์์๋ง ์ ๊ทผ ๊ฐ๋ฅ
https://i7a208.p.ssafy.io/user-detail  // ์ฌ์ฉ์ ์์ธ ์ ๋ณด ์๋ ฅ, ์ ๋ณด๋ฅผ ์๋ ฅํ์ง ์์์ ์์๋ง ์ ๊ทผ ๊ฐ๋ฅ
https://i7a208.p.ssafy.io/user    // ํ์์ ๋ณด ํ์ธ
https://i7a208.p.ssafy.io/config    // ํ๊ฒฝ์ค์ 

# api (DB ํ์ธ)
https://i7a208.p.ssafy.io/api/v1/sensors/    // ์ผ์ ๋ฐ์ดํฐ
https://i7a208.p.ssafy.io/api/v1/robots/    // ๊ฒฝํ์น
https://i7a208.p.ssafy.io/api/v1/stories/     // ์คํ ๋ฆฌ
https://i7a208.p.ssafy.io/api/v1/voicecheck/    // ์์ฑ ์์  ์๋ฆผ
https://i7a208.p.ssafy.io/api/v1/archivevideos/    // ์์ ์์นด์ด๋ธ
https://i7a208.p.ssafy.io/api/v1/fakeusers/     // ์ฌ์ฉ์
```



## ๐ณ File structure

```
๐ BoBi
โโ.config	// ์๋ฒ ๋ฐฐํฌ์ฉ ์ค์  ํ์ผ
โ  โโnginx
โ  โโuwsgi
โโaccounts		// user ์ ๋ณด
โโarchives			// ์์ ์์นด์ด๋ธ
โโbobi			// ์ผ์, ์น๋ฐ๋ ๋ฑ ๋ก๋ด ์ ์ฅ ๋ฐ์ดํฐ
โโbobi_backend		// url, DB ์ธํ ๋ฑ
โโbobi_frontend		// FE ๋น๋ ํ์ผ	
โโmovements
โโstories
โโvoices
โโmy_settings.py		// DB ์ค์  ๋ฑ (๊ฐ์ธ์ ๋ณด ํฌํจ)
```



### How to update

- EC2 (mobaxterm ์ด์ฉ)

  ```bash
  $ cd /srv/bobi_backup
  ```

  

- git pull

  ```bash
  $ source myvenv/bin/activate
  ```

  ```bash
  (myvenv) ubuntu@ip-172-31-46-44:~$ cd /srv/bobi_backup
  ```

  ```bash
  (myvenv) ubuntu@ip-172-31-46-44:/srv/templix-backup$ git pull origin master
  ```



- static files ๋ชจ์ผ๊ธฐ

  ```bash
  python3 manage.py collectstatic
  ```

  

- [์์  ์์ ์ ์๋ต ๊ฐ๋ฅ] nginx ์ฌ๋ฑ๋ก

  ```bash
  sudo cp -f /srv/bobi_backup/.config/nginx/bobi_backend.conf /etc/nginx/sites-available/bobi_backend.conf
  ```

  ```bash
  sudo ln -sf /etc/nginx/sites-available/bobi_backend.conf /etc/nginx/sites-enabled/bobi_backend.conf
  ```

  

- restart

  ```bash
  sudo systemctl daemon-reload
  ```

  ```bash
  sudo systemctl restart uwsgi
  ```

  ```bash
  sudo systemctl restart nginx
  ```

  
