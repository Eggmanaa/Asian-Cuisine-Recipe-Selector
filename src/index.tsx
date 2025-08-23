import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { recipes, Recipe, calculateSatiety, getSatietyDescription } from './data/recipes'
import { generateShoppingList, calculateTotalNutrition, exportAsText } from './utils/shoppingList'
import { getRecipeImage } from './data/recipeImages'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API Routes

// Get all recipes with optional filters
app.get('/api/recipes', (c) => {
  const { cuisine, protein, cookTime, satiety, spice, difficulty, search } = c.req.query()
  
  let filteredRecipes = [...recipes]
  
  // Apply filters
  if (cuisine) {
    const cuisines = cuisine.split(',').map(c => c.trim())
    filteredRecipes = filteredRecipes.filter(r => cuisines.includes(r.cuisine))
  }
  
  if (protein) {
    const minProtein = parseInt(protein)
    filteredRecipes = filteredRecipes.filter(r => r.protein >= minProtein)
  }
  
  if (cookTime) {
    const maxTime = parseInt(cookTime)
    filteredRecipes = filteredRecipes.filter(r => (r.prepTime + r.cookTime) <= maxTime)
  }
  
  if (satiety) {
    const minSatiety = parseInt(satiety)
    filteredRecipes = filteredRecipes.filter(r => r.satietyRating >= minSatiety)
  }
  
  if (spice) {
    filteredRecipes = filteredRecipes.filter(r => r.spiceLevel === spice)
  }
  
  if (difficulty) {
    filteredRecipes = filteredRecipes.filter(r => r.difficulty === difficulty)
  }
  
  if (search) {
    const searchLower = search.toLowerCase()
    filteredRecipes = filteredRecipes.filter(r => 
      r.name.toLowerCase().includes(searchLower) ||
      r.description.toLowerCase().includes(searchLower) ||
      r.cuisine.toLowerCase().includes(searchLower)
    )
  }
  
  // Add image URLs to each recipe
  const recipesWithImages = filteredRecipes.map(recipe => ({
    ...recipe,
    imageUrl: getRecipeImage(recipe.id)
  }))
  
  return c.json(recipesWithImages)
})

// Get single recipe by ID
app.get('/api/recipes/:id', (c) => {
  const id = c.req.param('id')
  const recipe = recipes.find(r => r.id === id)
  
  if (!recipe) {
    return c.json({ error: 'Recipe not found' }, 404)
  }
  
  // Add satiety description and image URL
  const satietyDesc = getSatietyDescription(recipe.satietyRating, recipe.protein, recipe.fiber)
  const imageUrl = getRecipeImage(recipe.id)
  
  return c.json({ ...recipe, satietyDescription: satietyDesc, imageUrl })
})

// Generate shopping list
app.post('/api/shopping-list', async (c) => {
  const body = await c.req.json()
  const { recipeIds, excludePantryStaples, servingMultipliers } = body
  
  const selectedRecipes = recipes.filter(r => recipeIds.includes(r.id))
  
  if (selectedRecipes.length === 0) {
    return c.json({ error: 'No recipes selected' }, 400)
  }
  
  const shoppingList = generateShoppingList(
    selectedRecipes,
    excludePantryStaples || false,
    servingMultipliers || {}
  )
  
  const nutrition = calculateTotalNutrition(selectedRecipes, servingMultipliers || {})
  
  return c.json({
    list: shoppingList,
    nutrition,
    selectedRecipes: selectedRecipes.map(r => ({ id: r.id, name: r.name }))
  })
})

// Export shopping list as text
app.post('/api/shopping-list/export', async (c) => {
  const body = await c.req.json()
  const { recipeIds, excludePantryStaples, servingMultipliers } = body
  
  const selectedRecipes = recipes.filter(r => recipeIds.includes(r.id))
  
  if (selectedRecipes.length === 0) {
    return c.json({ error: 'No recipes selected' }, 400)
  }
  
  const shoppingList = generateShoppingList(
    selectedRecipes,
    excludePantryStaples || false,
    servingMultipliers || {}
  )
  
  const textExport = exportAsText(shoppingList)
  
  return c.text(textExport)
})

// Main app page
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asian Cuisine Recipe Selector - Build Your Perfect Menu</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <link href="/static/styles.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div id="app"></div>
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="/static/app.js"></script>
</body>
</html>
  `)
})

export default app