# Ganna ( Online music player )

Ganna is an online music listener app. it use for listen any music. also has 
multiple album artist, album.
User can create their account and save to playlist.

## CLIENT
## Functional requirement.
- Navigation bar
- Homepage
- Player [desktop in bottom] 
- login page
- registration page
- user dashboard [ANY USER]
  - favorite list
  - playlists
  - change password form
  - change avatar
  - avatar
- admin dashboard [ONLY FOR ADMIN]
  - add new song
  - update song
  - delete song
  - delete user


## BACKEND
## Functional requirement.
- Local Authentication.
    - Hash password
    - Email verification
    - Forgot password.
    - block user
- Add song user favorite list.
- add song to new playlist.
- Admin can add, delete, update song 


## Database requirement.
- MySql


## Functional analysis.
### Models

**Artist**
- name
- email
- avatar
- createdAt

**AlbumId**
- name
- cover
- createdAt

**CategoryAlbumId** 
- name
- cover
- createdAt


**Song**
 - title
 - time
 - categoryAlbum
 - albumId
 - artistId
 - createdAt
 - cover

**User** 
- username
- email
- password
- avatar
- role: Admin, User
- createdAt
- accountStatus

**Profile** 
- userId
- favoriteSinger: []

**Playlist** 
- name
- userId
- songIds = []

**Favorites** 
- userId
- songIds = []


### Endpoint

User endpoint
 - POST /auth/login [public]
 - POST /auth/registration [public]
 - PATCH /auth/profile/:profileId [private]
 - PUT /auth/change-password [private]
 - PATCH /auth/change-avatar [private]
 
Admin endpoint
 - GET /admin/users [private]
 - POST /admin/user [private]
 - PATCH /admin/userId [private]
 - DELETE /admin/userId [private]