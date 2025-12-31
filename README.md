# Ensemble À Plectre de Toulouse - Website

Website for Ensemble À Plectre de Toulouse (EAP), a musical ensemble based in Toulouse, France.

> **Note:** This website was vibe coded using [Cursor](https://cursor.sh/) based on original Figma designs.

## Project Structure

```
eap-website/
├── css/
│   ├── base/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   └── typography.css
│   ├── components/
│   │   ├── about.css
│   │   ├── button.css
│   │   ├── concert-item.css
│   │   ├── concerts.css
│   │   ├── footer.css
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── join.css
│   │   └── orchestre.css
│   └── main.css
├── js/
│   ├── concerts.js
│   └── main.js
├── data/
│   └── concerts.csv
├── index.html
├── orchestre.html
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- **Node.js** (version 14 or higher required, Node.js 18+ recommended) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)

#### Checking Your Node.js Version

Check your current Node.js version:
```bash
node --version
```

If you're using **nvm** (Node Version Manager):
```bash
# Install and use Node.js 18 LTS (recommended)
nvm install 18
nvm use 18

# Or install the latest LTS version
nvm install --lts
nvm use --lts

# Verify the version
node --version
```

If you're **not using nvm**, download and install Node.js from [nodejs.org](https://nodejs.org/).

**Important:** Node.js 14 or higher is required. Node.js 10 or earlier versions will not work.

### Initial Setup (First Time)

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install `live-server`, which is used for local development.

### Local Development

Start the development server:

```bash
npm start
```

This will:
- Start a local web server on `http://localhost:8000`
- Automatically open your browser to the website
- **Auto-refresh the page** when you save changes to HTML, CSS, JavaScript, or CSV files

To stop the server, press `Ctrl+C` in the terminal.

#### Alternative: Manual Start

If you prefer to start the server without auto-opening the browser:

```bash
npm run dev
```

Then manually navigate to `http://localhost:8000` in your browser.

### Why a Local Server?

The website uses a CSV file to store concert data. Browsers block loading local files (like CSV) when opening HTML files directly from the filesystem (`file://` protocol) due to security restrictions. Running a local server solves this issue.

## Editing Concerts

Concerts are stored in `data/concerts.csv` in CSV format. There is also a test file `data/concerts-past-test.csv` that contains only past events for testing the empty state.

To test the empty state (when there are no future concerts), you can temporarily change the `csvPath` in `js/concerts.js` from `'data/concerts.csv'` to `'data/concerts-past-test.csv'`.

```csv
date,venue,address,facebook_link,visible
2025-12-24,Église St-Jérome,"2 rue du colonel Pelissier, 31000, Toulouse",https://www.facebook.com/events/example,true
2026-01-15,Salle de spectacle,"10 avenue de la musique, 31000, Toulouse",https://www.facebook.com/events/example2,true
2025-10-05,Théâtre du Capitole,"Place du Capitole, 31000, Toulouse",https://www.facebook.com/events/example3,false
```

**Important CSV formatting rules:**
- First row contains column headers: `date`, `venue`, `address`, `facebook_link`, `visible`
- Date format: `YYYY-MM-DD` (e.g., `2025-12-24`)
- Addresses with commas must be enclosed in quotes
- `facebook_link` column: URL to the Facebook event page (can be empty, but column must be present)
- `visible` column: Set to `true` to display the concert, `false` to hide it
- Only concerts with `visible=true` will be rendered on the page (reduces page weight)
- The "Détails" button will open the Facebook event link in a new tab (if provided)
- One concert per line

After editing the CSV file, the page will automatically refresh to show your changes.

## Deployment to GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select the branch and folder (usually `main` and `/` or `/root`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

The website will work perfectly on GitHub Pages since it serves files over HTTP/HTTPS, which allows CSV file loading.

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript (ES6+)
- CSV for data storage
- Node.js & live-server for local development

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## For Collaborators

When setting up the project for the first time:

1. Make sure Node.js is installed on your system
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. The website will auto-refresh when you make changes to files

**Note:** The `node_modules/` folder and `package-lock.json` are git-ignored. Each collaborator should run `npm install` after cloning the repository.
