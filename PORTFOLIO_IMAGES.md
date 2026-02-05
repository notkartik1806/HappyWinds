# Portfolio Images Setup

## Where to Place Your Logo Images

Place your portfolio logo images in the following directory:
```
public/portfolio/
```

## Required Image Files

Create the following PNG files with your actual logo designs:

1. **o3-physio.png** - Medical Logo (O3 Physio)
2. **dinner-bell.png** - Restaurant Identity (Dinner Bell)
3. **evaluation-expertz.png** - Corporate Mark (Evaluation Expertz)
4. **navkar-builders.png** - Real Estate (Navkar Builders)
5. **nirja-gruh.png** - Local Brand (Nirja Gruh Udhyog)
6. **tech-pulse.png** - Tech Startup (Tech Pulse)
7. **green-earth.png** - Eco Initiative (Green Earth)

## Image Specifications

- **Format**: PNG (with transparency if needed)
- **Recommended Size**: 800x600px or similar aspect ratio
- **File Size**: Keep under 500KB for optimal loading
- **Background**: White or transparent background works best

## Fallback Behavior

If an image file is missing, the portfolio card will display a placeholder with the project name. This ensures the carousel still works while you're adding your images.

## Example Directory Structure

```
Happy Winds/
├── public/
│   └── portfolio/
│       ├── o3-physio.png
│       ├── dinner-bell.png
│       ├── evaluation-expertz.png
│       ├── navkar-builders.png
│       ├── nirja-gruh.png
│       ├── tech-pulse.png
│       └── green-earth.png
├── src/
└── ...
```

## Adding New Portfolio Items

To add more portfolio items, edit `src/components/Portfolio.jsx`:

```javascript
const projects = [
    { title: 'Your Project', category: 'Category', image: '/portfolio/your-image.png' },
    // ... add more projects
];
```

Then add the corresponding image file to `public/portfolio/`.
