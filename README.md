# 🏡 Homestayz

> **A full-stack Airbnb-style home rental platform** built with Node.js, Express, MongoDB, and EJS — where hosts can list stays and guests can browse, favourite, and book them.

> 🚧 **Note:** AI Chatbot implementation is currently **in progress**. 🤖

---

## 📖 Overview

**Homestayz** is a server-rendered vacation rental web app inspired by Airbnb. It supports two types of users — **Hosts** and **Guests** — each with their own experience:

- 🧑‍💼 **Hosts** can list, edit, and manage their properties, complete with photos and house-rule PDFs.
- 🧳 **Guests** can browse listings, view details, save favourites, and reserve a stay.

---

## ✨ Features

- 🔐 **Authentication & Authorization**
  - Secure signup/login with hashed passwords (`bcryptjs`)
  - Session-based auth persisted in MongoDB (`connect-mongo`)
  - Role-based access (`guest` / `host`)
  - Strong password & input validation with `express-validator`

- 🏠 **Home Listings**
  - Hosts can add, edit, and delete home listings
  - Upload a home photo and a house-rules PDF (`multer`)
  - View all your listed homes in one dashboard

- 🔍 **Browsing & Discovery**
  - Explore all available homes
  - View detailed info for each listing (price, rating, location, description)

- ❤️ **Favourites**
  - Guests can add/remove homes to a personal favourites list

- 📅 **Bookings**
  - Reserve a home and view your bookings

- 🎨 **Styling**
  - Responsive UI built with **Tailwind CSS**

---

## 🛠️ Tech Stack

| Layer            | Technology                              |
|-------------------|------------------------------------------|
| **Backend**        | Node.js, Express.js                      |
| **Templating**     | EJS                                       |
| **Database**       | MongoDB with Mongoose (session store via `connect-mongo`) |
| **Authentication**  | express-session, bcryptjs                |
| **Validation**      | express-validator                        |
| **File Uploads**    | Multer (images + PDFs)                   |
| **Styling**         | Tailwind CSS                             |
| **Dev Tools**       | Nodemon                                  |

---

## 📂 Project Structure

```
HomeStayz/
├── app.js                     # App entry point & server config
├── controllers/
│   ├── authController.js      # Signup / Login / Logout logic
│   ├── homes.js                # Home CRUD, bookings, favourites
│   └── errors.js               # 404 handler
├── models/
│   ├── user.js                  # User schema
│   └── home.js                  # Home schema
├── routes/
│   ├── AuthRouter.js            # Auth routes
│   ├── hostRouter.js            # Host-only routes
│   └── storeRouter.js           # Public/guest routes
├── views/                      # EJS templates
│   ├── auth/                    # Login & signup pages
│   ├── host/                    # Add/edit/list home pages
│   ├── store/                    # Browse, details, bookings, favourites
│   └── partials/                 # Shared nav, header, error partials
├── public/                     # Static assets (CSS, images)
├── uploads/                     # User-uploaded images & PDFs
└── utils/pathUtil.js            # Root path helper
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- A running [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd HomeStayz

# 2. Install dependencies
npm install

# 3. Configure your MongoDB connection string
#    (set db_path in your environment / config)

# 4. Run the app (starts server + Tailwind watcher)
npm start
```

The app will be available at:
```
http://localhost:3000
```

### Build Tailwind CSS separately (optional)
```bash
npm run tailwind
```

---

## 🔑 Environment Setup

This project currently expects a MongoDB connection string (`db_path`) to be available for both Mongoose and the session store. It's recommended to move this into a `.env` file using `dotenv` for production use:

```env
DB_PATH=mongodb://localhost:27017/homestayz
SESSION_SECRET=your_secret_here
```

---

## 🗺️ Roadmap

- [ ] 🤖 AI Chatbot for guest support & recommendations *(in progress)*
- [ ] 💳 Payment gateway integration
- [ ] ⭐ Review & rating system
- [ ] 🔎 Search & filter by location/price
- [ ] 📧 Email notifications for bookings

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">Made with ❤️ for travelers and hosts alike</p>
