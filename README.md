# Blog Community Application

A React-based blog community application that allows users to create, read, update, and delete blog posts with commenting functionality. The application uses local storage for data persistence.

## 🚀 Features

- **Post Management**

  - Create new blog posts with title, content, and featured image
  - Edit existing posts
  - Delete posts
  - Filter posts by topics

- **Comments System**

  - Add comments to posts
  - Nested reply functionality
  - Delete comments

- **UI Features**
  - Responsive design
  - Image upload functionality
  - Rich text content
  - Topic-based filtering

## 🛠️ Tech Stack

- React 19
- TypeScript
- Next.js 15.1.5
- Material-UI (MUI)
- Local Storage for data persistence

## 📦 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/community_task.git
```

2.Install pnpm (optional) (npm can be also used to initialize and start project)

```bash
npm install -g pnpm
```

3. Install dependencies and run project locally or with production build:

```bash
For development
cd community_test
pnpm install
pnpm dev

For production build
pnpm build
pnpm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                   # Next.js app directory
├── components/
│   ├── Common/           # Reusable components
│   ├── CommunityPage/    # Community page components
│   └── PostPage/         # Post detail components
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
├── constants/            # Constant values
└── data/                 # Static data and constants
```

## 💻 Usage

### Creating a New Post

1. Click the "Add Post" button
2. Fill in the post details:
   - Title
   - Content
   - Topic
   - Featured Image (optional)
3. Click "Submit" to create the post

### Managing Comments

1. Navigate to a post detail page
2. Add comments using the comment form
3. Reply to existing comments using the reply button
4. Delete comments using the delete icon

### Filtering Posts

- Use the topic sidebar to filter posts by category
- Click "All" to view all posts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Notes

- This application uses local storage for data persistence. Data will persist across browser sessions but is limited to the browser being used.
- Image uploads are stored as base64 strings in local storage. Large images may impact performance.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Authors

- Your Name - Initial work - [YourGithubUsername](https://github.com/YourGithubUsername)

## 🙏 Acknowledgments

- Material-UI for the component library
- Next.js team for the framework
- All contributors who have helped with the project
