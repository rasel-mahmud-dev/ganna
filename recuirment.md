# Ganna ( Online music player )

Ganna is an online music listener app. it use for listen any music. also has 
multiple album artist, album.
User can create their account and save to playlist.

# CLIENT
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
  - add artist
  - add genre
  - add playlist for everyone

# BACKEND
## Functional requirement.
- Local Authentication.
    - Hash password
    - Email verification
    - Forgot password.
    - block user
- Add song user favorite list.
- add song to new playlist.
- Admin can add, delete, update song 
- Admin also can add genres, albums, artists, playlist,  

## Database requirement.
- MySql


## Functional analysis.
### Models

**Artist**
- artistId
- name
- email
- avatar
- createdAt
- updatedAt


**HitArtist** [view count of artist ]
 - id
 - artistId
 - views


**AlbumId** [song album]
- name
- cover
- createdAt


**CategoryAlbumId** 
- name
- cover
- createdAt

**Genre** 
  - genreId
  - name
  - createdAt

**Song**
  - songId
  - title
  - duration
  - categoryAlbumId
  - albumId => albumId[]
  - artistId => ArtistId[]
  - createdAt
  - updatedAt
  - cover
  - url
  - genreId => GenreId[]

**HitSong** [count play times song]
 - id
 - songId
 - views

**User**
  - userId
  - firstName
  - lastName
  - username
  - email
  - password
  - createdAt
  - updatedAt
  - avatar
  - role: Admin, User


**Profile** 
- userId
- favoriteSinger: []

**Playlist**  [create playlist]
- playlistId
- name
- userId
- userId // null for admin created Playlist
- songId = []

**Favorites** 
- favoriteId
- userId
- songId
- createdAt


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


Genres endpoint
- GET /genres
- POST /genres/add-genre [private]
- PATCH /genres/genreId [private]
- DELETE /genres/genreId [private]


Artist endpoint
- GET /artists
- POST /artists/add-artist [private]
- PATCH /artists/artistId [private] update artist
- DELETE /artists/artistId [private]


Favorite endpoint
- GET /favorite/all [private]
- POST /favorite [private]
- PATCH /favorite/favoriteId [private]
- DELETE /favorite/favoriteId [private]