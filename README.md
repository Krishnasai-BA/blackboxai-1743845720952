
Built by https://www.blackbox.ai

---

```markdown
# Subject Manager

## Project Overview

Subject Manager is a web application designed to help students organize their academic materials across different subjects. Users can upload, manage, and download files associated with subjects like Engineering Graphics, Language & Communication, Data Structures, Electronics Engineering, and Electrical Engineering. The application provides a clean, responsive interface with an easy-to-navigate dashboard.

## Installation

To set up the Subject Manager on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/subject-manager.git
   cd subject-manager
   ```

2. **Open `index.html` file directly in your web browser.** 
   - Note: This project does not require any server setup, as it runs purely on the client-side.

## Usage

1. **Open the application** by loading the `index.html` file in your preferred web browser.
2. **Select a subject:** Click on any of the subject cards to navigate to that subject's page.
3. **Upload files:** Use the upload functionality provided on each subject page to select and upload your files.
4. **Manage files:** After uploading, you can view your files, download them, or delete them as needed.

## Features

- Responsive design using Tailwind CSS for a clean and modern interface.
- Dashboard with cards for different subjects, providing quick access.
- File upload functionality that allows multiple files to be uploaded.
- Files are stored locally using `localStorage`, making the app functional offline.
- File management options including viewing, downloading, and deleting files.

## Dependencies

The project utilizes the following libraries:

- **Tailwind CSS** (for styling)
- **Font Awesome** (for icons)

Note: These libraries are included via CDN links in the HTML files.

## Project Structure

The project directory contains the following files:

```
/subject-manager
├── index.html                  # Main dashboard with subject cards
├── script.js                   # JavaScript for file management functionality
├── lac.html                    # Subject page for Language & Communication
├── ds.html                     # Subject page for Data Structures
├── ece.html                    # Subject page for Electronics Engineering
├── eee.html                    # Subject page for Electrical Engineering
```

Each subject page (e.g., `lac.html`, `ds.html`) contains an upload form that allows users to manage files pertaining to that particular subject.

## Acknowledgments

This project was built to provide a streamlined means for students to manage their academic resources effectively. Many thanks to the community for their contributions to the libraries used.
```