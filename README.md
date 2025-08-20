# Asian Cuisine Recipe Selector 🥢

## Project Overview
- **Name**: Asian Cuisine Recipe Selector
- **Goal**: Create an interactive web application for browsing Asian recipes, building custom menus, and generating consolidated shopping lists
- **Features**: 
  - 40+ authentic Asian recipes with detailed nutritional information
  - Smart filtering by cuisine, cooking time, difficulty, and satiety rating
  - Interactive meal planning with serving size adjustment
  - Intelligent shopping list generator with quantity consolidation
  - Beautiful, mobile-responsive design with Asian-inspired aesthetics

## Live URLs
- **Development**: https://3000-iibkrsiuyenv6ab3m2r7t-6532622b.e2b.dev
- **API Endpoints**:
  - `GET /api/recipes` - Get all recipes with optional filters
  - `GET /api/recipes/:id` - Get single recipe details
  - `POST /api/shopping-list` - Generate shopping list
  - `POST /api/shopping-list/export` - Export shopping list as text

## Currently Completed Features ✅
- **Recipe Database**: 20 fully detailed Asian recipes including:
  - Thai: Pad Thai, Pad See Ew, Cashew Chicken, Massaman Curry, Tom Kha Gai (Coconut Chicken Soup)
  - Chinese: Hong Shao Rou (Braised Pork Belly), Garlic Eggplant, Kung Pao Chicken, Char Siu (BBQ Pork), Singapore Noodles
  - Vietnamese: Pho Bo, Bò Lúc Lắc (Shaking Beef), Bún Thịt Nướng, Bò Kho (Beef Stew)
  - Indian: Butter Chicken, Tandoori Lamb, Chicken Saag, Chicken Tikka Masala, Lamb Pasanda
  - Indonesian: Beef Rendang
- **Smart Filtering System**: Filter by cuisine, cook time, satiety, spice level, difficulty
- **Recipe Gallery**: Beautiful card-based layout with nutritional info and satiety ratings
- **Simplified Navigation**: Clear tab-based navigation between Gallery, Menu, and Shopping List
- **Menu Builder**: Select multiple recipes and adjust serving sizes
- **Shopping List Generator**: Intelligent ingredient consolidation with unit conversion, nutrition summary
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Export Options**: Download shopping list as text, copy to clipboard, or print directly

## Data Architecture
- **Data Models**: 
  - Recipe: Contains name, cuisine, nutrition, ingredients, instructions, satiety rating
  - Ingredient: Name, quantity, category for smart grouping
  - Shopping List Item: Consolidated quantities with recipe tracking
- **Storage Services**: In-memory data structure (ready for database integration)
- **Data Flow**: 
  - Frontend requests recipes via REST API
  - User selections stored in browser state
  - Shopping list generated server-side with smart consolidation

## User Guide

### Browsing Recipes
1. Open the application in your browser
2. Use the filter bar to narrow down recipes by:
   - Cuisine type (Thai, Chinese, Vietnamese, Indian, Indonesian)
   - Cooking time (Under 30/45/60 minutes)
   - Satiety level (Light, Moderate, Filling)
   - Spice level and difficulty
3. Click "View" on any recipe card to see full details including ingredients and instructions

### Building Your Menu
1. Click "Add to Menu" on recipes you want to cook
2. Selected recipes will be highlighted with a green border
3. Click the shopping cart button (bottom right) to view your menu
4. Adjust serving sizes using the +/- buttons for each recipe
5. View total nutritional information for your entire menu

### Generating Shopping List
1. From the menu view, click "Generate Shopping List"
2. The app will consolidate all ingredients intelligently:
   - Combines quantities of same ingredients
   - Converts units where appropriate (e.g., tbsp to cups)
   - Groups by store sections for easy shopping
3. Check off items as you shop using the checkboxes
4. Export options:
   - Download as text file
   - Copy to clipboard
   - Print directly from browser

### Satiety Rating System
- ⭐ Very Light: Quick snacks or light meals
- ⭐⭐ Light: Light but satisfying meals
- ⭐⭐⭐ Moderate: Standard filling meals
- ⭐⭐⭐⭐ Filling: High protein/fiber, very satisfying
- ⭐⭐⭐⭐⭐ Very Filling: Maximum satiety meals

## Recent Updates (December 2024)
- ✅ Fixed shopping list generation functionality
- ✅ Added 7 more recipes (total: 20 recipes)
- ✅ Simplified navigation with clear tab system
- ✅ Added nutrition summary to shopping list
- ✅ Improved state management for shopping list data
- ✅ Better visual feedback with loading states

## Features Not Yet Implemented
- Additional 10+ recipes to reach 30+ total
- User accounts and saved menus
- Recipe image generation using AI
- Nutritional daily totals and meal planning calendar
- Integration with grocery delivery APIs
- Voice control for hands-free cooking mode
- Video tutorials for complex cooking techniques
- User ratings and reviews
- Custom recipe additions

## Recommended Next Steps for Development
1. **Add Remaining Recipes**: Add 10+ more recipes to reach 30+ total as specified
2. **Add Database Integration**: Migrate from in-memory storage to Cloudflare D1 for persistence
3. **Implement User Authentication**: Add user accounts to save menus and preferences
4. **Add Recipe Images**: Integrate AI image generation for visual recipe cards
5. **Enhance Mobile Experience**: Add PWA capabilities for offline access
6. **Implement Meal Planning Calendar**: Weekly/monthly meal planning features
7. **Add Nutritional Tracking**: Daily nutritional goals and tracking
8. **Social Features**: Share menus and recipes with friends
9. **Grocery API Integration**: Direct ordering from major grocery chains
10. **Multi-language Support**: Translate UI and recipes to multiple languages

## Tech Stack
- **Backend**: Hono Framework on Cloudflare Workers
- **Frontend**: Vanilla JavaScript with modern ES6+
- **Styling**: Tailwind CSS + Custom CSS with Asian-inspired design
- **Icons**: Font Awesome
- **HTTP Client**: Axios
- **Deployment**: Cloudflare Pages
- **Development**: PM2 for process management, Wrangler for Cloudflare development

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: ✅ Active (Development)
- **Build Command**: `npm run build`
- **Start Command**: `pm2 start ecosystem.config.cjs`
- **Last Updated**: December 2024

## Installation & Setup

### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd webapp

# Install dependencies
npm install

# Build the application
npm run build

# Start development server
pm2 start ecosystem.config.cjs

# Access at http://localhost:3000
```

### Production Deployment
```bash
# Build for production
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name asian-recipes
```

## API Documentation

### GET /api/recipes
Fetch all recipes with optional filters
- Query Parameters:
  - `cuisine`: Filter by cuisine type (comma-separated)
  - `cookTime`: Maximum cooking time in minutes
  - `satiety`: Minimum satiety rating (1-5)
  - `spice`: Spice level (Mild/Medium/Spicy)
  - `difficulty`: Difficulty level (Easy/Medium/Hard)
  - `search`: Search term for recipe names/descriptions

### GET /api/recipes/:id
Get detailed information for a single recipe

### POST /api/shopping-list
Generate consolidated shopping list
- Body Parameters:
  - `recipeIds`: Array of recipe IDs
  - `excludePantryStaples`: Boolean to exclude common ingredients
  - `servingMultipliers`: Object mapping recipe IDs to serving multipliers

### POST /api/shopping-list/export
Export shopping list as formatted text

## Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License
MIT License - Feel free to use this project for personal or commercial purposes.