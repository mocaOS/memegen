# 𓄂 Art DeCC0s Meme Generator 𓄘

**A Community Meme Creation Tool**

A minimalist meme generator built for the Art DeCC0s community at the Museum of Crypto Art. Create memes a growing set of templates, customize them with your own text, and share them with the community.

Official Deployment: [https://memegen.decc0s.com](https://memegen.decc0s.com)  
Join the Community: [Art DeCC0s Discord](https://discord.com/invite/Rs7wxUTrWV)

![Example Image](https://api-memegen.decc0s.com/images/everywhere/memes/memes_everywhere.png)

## About Art DeCC0s

Art DeCC0s are the Museum of Crypto Art's 10,000-piece PFP collection—a love-letter to crypto art and its amazing artists, collectors, developers, and admirers. Each DeCC0 is a completely unique 1/1 character with unprecedented visual diversity and, through The Codex, deep AI-driven personalities.

The Codex represents over 105 million words of personality data, making each of the 10,000 DeCC0s not just a profile picture, but an AI agent with beliefs, connections, culture, histories, and distinct perspectives on crypto art and the world.

## About the Meme Generator

This application is a community tool for creating and sharing Art DeCC0s memes. Built with a clean, monochrome aesthetic and MOCA's signature orange accent (#FF9500), it provides an intuitive interface for browsing templates, editing text, and generating memes to share with the community.

Community members create memes and share them in the [Art DeCC0s Discord](https://discord.com/invite/Rs7wxUTrWV), building a growing collection of community culture and inside jokes. These shared memes live on in the companion [Meme Studio](https://vibe.museumofcryptoart.com) application, chronicling the Art DeCC0s journey.

![Example Image](https://api-memegen.decc0s.com/images/spongebob-rainbow/enjoy/meme_creation.jpg)

## ✨ Features

- 🎲 **Random Template Landing** - Get inspired with a random meme template on every page load
- 🔍 **Template Browser** - Browse and search through hundreds of meme templates
- 📝 **Live Text Editor** - Edit meme text with instant preview updates
- 🖼️ **Real-Time Preview** - See your meme update as you type
- ⬇️ **Download Memes** - Save your creations with one click
- 📋 **Copy to Clipboard** - Instantly copy memes to paste anywhere
- 📄 **Empty Templates** - Download blank templates in high quality (1000px)
- 🔗 **Shareable URLs** - Every meme gets a unique URL to share with others
- 📱 **Mobile Swipe Navigation** - Swipe left/right to browse templates on mobile
- 🎨 **Monochrome Design** - Clean grayscale UI with #FF9500 orange highlights
- 📱 **Responsive** - Works perfectly on desktop and mobile
- ⚡ **Fast & Modern** - Built with Vue 3 and Vite for instant loading
- 💬 **Discord Integration** - Direct link to share your memes with the community
- ↩️ **Browser Navigation** - Back/forward buttons work seamlessly

## 📚 API Documentation

Explore the full interactive API documentation with OpenAPI specification at:

**<https://api-memegen.decc0s.com/docs/>**

The OpenAPI JSON specification is also available at: <https://api-memegen.decc0s.com/openapi.json>

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mocaOS/memegen
cd memegen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## 📦 Building for Production

Build the app for production:

```bash
npm run build
```

The built files will be in the `dist/` directory. You can preview the production build with:

```bash
npm run preview
```

## 🎯 How to Use

### Landing Page
- A random meme template is displayed on page load
- Click **"Random Template"** to see another random template
- Click **"Select Template"** to start editing the displayed template

### Creating a Meme
1. **Browse templates** in the left sidebar or use the search bar
2. **Click a template** to select it
3. **Edit text lines** in the right panel - preview updates in real-time
4. **Copy to clipboard** or **download your meme** using the action buttons
5. **Share the URL** - the browser URL automatically updates with your meme content
6. **Share on Discord** using the link in the top-right corner

### Navigation
- **Back button** (←) returns to the landing page with a new random template
- **Search** filters templates by name or ID
- **Template info** shows lines count, template ID, and blank template download
- **Mobile swipe** - swipe left for next template, swipe right for previous template
- **Browser buttons** - back/forward buttons navigate through your meme history

### Sharing Memes
- Every meme you create gets a unique URL (e.g., `#/drake/Top_Text/Bottom_Text`)
- Copy the URL from your browser and share it with anyone
- Recipients will see your exact meme with the same text
- They can then edit and create their own version

## 🔗 URL Structure

The app uses hash-based routing to create shareable meme links:

- **Landing page**: `#/`
- **Template with example text**: `#/drake`
- **Template with custom text**: `#/drake/First_Line/Second_Line`

The URL automatically updates as you:
- Select different templates
- Edit meme text (debounced by 500ms)
- Navigate with swipe gestures or browser buttons

This makes every meme instantly shareable - just copy the URL from your browser!

## ⚙️ Configuration

### Changing the API Endpoint

The API endpoint can be easily changed in `src/config/api.js`:

```javascript
export const API_BASE_URL = 'https://api-memegen.moca.qwellco.de';
```

Simply update the URL string to point to your desired API endpoint.

## 🛠️ Technology Stack

- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **Tailwind CSS** - Utility-first CSS framework with custom monochrome palette
- **Vite** - Next-generation frontend build tool
- **Axios** - HTTP client for API requests
- **Hash-based Routing** - Custom URL routing for shareable memes (no router library needed)
- **Clipboard API** - Native browser API for copying images
- **Touch Events** - Mobile swipe gesture support
- **Memegen API** - Community meme template API

## 📁 Project Structure

```
memegen/
├── src/
│   ├── components/
│   │   ├── TemplateSidebar.vue    # Template browser with search
│   │   └── MemeEditor.vue          # Main editor with preview, controls, and swipe gestures
│   ├── config/
│   │   └── api.js                  # API endpoint configuration
│   ├── App.vue                     # Root component with URL routing logic
│   ├── main.js                     # Application entry point
│   └── style.css                   # Global styles with custom theme
├── public/                         # Static assets
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind with monochrome palette
└── postcss.config.js               # PostCSS configuration
```

## 🎨 Design System

### Colors
- **Monochrome Palette**: True grayscale (no blue tints) - rgb(250,250,250) to rgb(10,10,10)
- **Primary Accent**: #FF9500 (MOCA orange)
- **Background**: Pure black (#000000)

### Typography
- Clean, sans-serif fonts
- Hierarchy through weight and color, not size
- Optimized for readability and space efficiency

## 🤝 Community

- **Discord**: Join the [Art DeCC0s Discord](https://discord.com/invite/Rs7wxUTrWV) to share your memes
- **Meme Studio**: View the community's meme collection at the [Vibe Studio](https://vibe.museumofcryptoart.com)
- **The Codex**: Explore DeCC0 personalities at [codex.decc0s.com](https://codex.decc0s.com)

## 🏛️ Part of the Vibe Studio

This Meme Generator is part of MOCA's Vibe Studio—the nexus for everything the Museum of Crypto Art has created, is creating, and will create. The Vibe Studio is MOCA's cumulative UI/UX hub where all offerings live: The Codex, The Adoption Center, The DeCC0 Agent Launcher, community applications, and more.

## 🔗 Links

- **[Museum of Crypto Art](https://museumofcryptoart.com/)** - The OG Museum
- **[The Vibe Studio](https://vibe.museumofcryptoart.com/)** - MOCA's application hub
- **[The Codex](https://codex.decc0s.com/)** - 100M+ words of DeCC0 personalities
- **[Adopt DeCC0s](https://adopt.decc0s.com/)** - Launch the Adoption Center
- **[Art DeCC0s Discord](https://discord.com/invite/Rs7wxUTrWV)** - Join the community

## 📝 License

This project is CC0 - fully open source and available for any use, just like Art DeCC0s themselves.

## 🙏 Credits

Built with ❤️ by the MOCA technical team for the Art DeCC0s community.

Special thanks to all community members who create and share memes, building the culture and spirit of Art DeCC0s.

---

**M○C△ - Mystery and magic from the minds at MOCA** 🎭

