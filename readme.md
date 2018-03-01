# Short

Shortens links.

# Run

1. Create a .env, alternatively remove ".example" from `.env.example`

2. `npm install`

3. `npm start`

# API

## Get

```
GET /
```

Returns all shortened links

```
GET /:id
```

Redirects you to the real url of the shortened link

## Post

```
POST /
password: pw123
Content-Type: application/json

{
	"url": "https://github.com/follgad"
}
```

```
201 Created
Content-Type: application/json

{
    "url": "https://github.com/follgad",
    "createdAt": "2018-02-13T22:08:52.158Z",
    "visits": 0,
    "_id": "3d0gFbw8"
}
```

## Delete

```
DELETE /:id
password: pw123
```

```
203 No Content
```

Deletes the link at the specific ID
