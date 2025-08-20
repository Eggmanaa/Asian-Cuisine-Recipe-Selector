// Asian Recipe Selector Application
class RecipeApp {
  constructor() {
    this.recipes = [];
    this.selectedRecipes = new Set();
    this.servingMultipliers = {};
    this.currentView = 'gallery'; // gallery, menu, shopping
    this.filters = {
      cuisine: '',
      protein: '',
      cookTime: '',
      satiety: '',
      spice: '',
      difficulty: '',
      search: ''
    };
    
    this.init();
  }

  async init() {
    this.setupEventListeners();
    await this.loadRecipes();
    this.render();
  }

  setupEventListeners() {
    // Will be called after DOM is rendered
  }

  async loadRecipes() {
    try {
      const queryParams = new URLSearchParams(this.filters);
      const response = await axios.get(`/api/recipes?${queryParams}`);
      this.recipes = response.data;
    } catch (error) {
      console.error('Error loading recipes:', error);
      this.showToast('Error loading recipes. Please refresh the page.');
    }
  }

  render() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      ${this.renderHero()}
      ${this.renderFilterBar()}
      ${this.renderContent()}
      ${this.renderFloatingMenuButton()}
    `;
    
    this.attachEventListeners();
  }

  renderHero() {
    return `
      <div class="hero-section">
        <h1 class="hero-title">
          <i class="fas fa-bowl-food"></i> Asian Cuisine Recipe Selector
        </h1>
        <p class="hero-subtitle">Build Your Perfect Asian Menu</p>
      </div>
    `;
  }

  renderFilterBar() {
    return `
      <div class="filter-bar">
        <div class="filter-group">
          <div class="filter-item">
            <label class="filter-label">Search</label>
            <input type="text" class="filter-input" id="search-input" 
              placeholder="Search recipes..." value="${this.filters.search}">
          </div>
          
          <div class="filter-item">
            <label class="filter-label">Cuisine</label>
            <select class="filter-select" id="cuisine-filter">
              <option value="">All Cuisines</option>
              <option value="Thai">Thai</option>
              <option value="Chinese">Chinese</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Indian">Indian</option>
              <option value="Indonesian">Indonesian</option>
            </select>
          </div>
          
          <div class="filter-item">
            <label class="filter-label">Cook Time</label>
            <select class="filter-select" id="cooktime-filter">
              <option value="">Any Time</option>
              <option value="30">Under 30 min</option>
              <option value="45">Under 45 min</option>
              <option value="60">Under 1 hour</option>
            </select>
          </div>
          
          <div class="filter-item">
            <label class="filter-label">Satiety</label>
            <select class="filter-select" id="satiety-filter">
              <option value="">Any Level</option>
              <option value="2">Light (1-2⭐)</option>
              <option value="3">Moderate (3⭐)</option>
              <option value="4">Filling (4-5⭐)</option>
            </select>
          </div>
          
          <div class="filter-item">
            <label class="filter-label">Spice Level</label>
            <select class="filter-select" id="spice-filter">
              <option value="">Any Spice</option>
              <option value="Mild">Mild</option>
              <option value="Medium">Medium</option>
              <option value="Spicy">Spicy</option>
            </select>
          </div>
          
          <div class="filter-item">
            <label class="filter-label">Difficulty</label>
            <select class="filter-select" id="difficulty-filter">
              <option value="">Any Level</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <div class="filter-item" style="align-self: flex-end;">
            <button class="btn btn-primary" onclick="app.applyFilters()">
              <i class="fas fa-filter"></i> Apply Filters
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderContent() {
    switch(this.currentView) {
      case 'menu':
        return this.renderMyMenu();
      case 'shopping':
        return this.renderShoppingList();
      default:
        return this.renderRecipeGallery();
    }
  }

  renderRecipeGallery() {
    if (this.recipes.length === 0) {
      return '<div class="loading"><p>No recipes found. Try adjusting your filters.</p></div>';
    }

    return `
      <div class="recipe-grid">
        ${this.recipes.map(recipe => this.renderRecipeCard(recipe)).join('')}
      </div>
    `;
  }

  renderRecipeCard(recipe) {
    const isSelected = this.selectedRecipes.has(recipe.id);
    const totalTime = recipe.prepTime + recipe.cookTime;
    
    return `
      <div class="recipe-card ${isSelected ? 'selected' : ''}" data-recipe-id="${recipe.id}">
        <div class="recipe-image">
          <i class="fas fa-utensils"></i>
        </div>
        <div class="recipe-content">
          <div class="recipe-header">
            <div>
              <h3 class="recipe-title">${recipe.name}</h3>
              <span class="cuisine-badge">${recipe.cuisine}</span>
            </div>
          </div>
          
          <p class="recipe-description">${recipe.description}</p>
          
          <div class="recipe-stats">
            <div class="stat-item">
              <i class="fas fa-clock stat-icon"></i>
              <span>${totalTime} min</span>
            </div>
            <div class="stat-item">
              <i class="fas fa-fire stat-icon"></i>
              <span>${recipe.calories} cal</span>
            </div>
            <div class="stat-item">
              <i class="fas fa-gauge stat-icon"></i>
              <span>${recipe.difficulty}</span>
            </div>
          </div>
          
          <div class="nutrition-bar">
            <div class="nutrition-item">
              <div class="nutrition-label">Protein</div>
              <div class="nutrition-value">${recipe.protein}g</div>
            </div>
            <div class="nutrition-item">
              <div class="nutrition-label">Carbs</div>
              <div class="nutrition-value">${recipe.carbohydrates}g</div>
            </div>
            <div class="nutrition-item">
              <div class="nutrition-label">Fat</div>
              <div class="nutrition-value">${recipe.fat}g</div>
            </div>
            <div class="nutrition-item">
              <div class="nutrition-label">Fiber</div>
              <div class="nutrition-value">${recipe.fiber}g</div>
            </div>
          </div>
          
          <div class="satiety-rating">
            <span>Satiety:</span>
            <div class="satiety-stars">
              ${this.renderStars(recipe.satietyRating)}
            </div>
            <span style="font-size: 0.875rem; color: #666;">(${this.getSatietyText(recipe.satietyRating)})</span>
          </div>
          
          <div class="recipe-actions">
            <button class="btn ${isSelected ? 'btn-selected' : 'btn-primary'}" 
              onclick="app.toggleRecipeSelection('${recipe.id}')">
              <i class="fas ${isSelected ? 'fa-check' : 'fa-plus'}"></i>
              ${isSelected ? 'Selected' : 'Add to Menu'}
            </button>
            <button class="btn btn-secondary" onclick="app.showRecipeDetail('${recipe.id}')">
              <i class="fas fa-eye"></i> View
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += `<i class="fas fa-star star ${i <= rating ? 'filled' : ''}"></i>`;
    }
    return stars;
  }

  getSatietyText(rating) {
    const texts = ['Very Light', 'Light', 'Moderate', 'Filling', 'Very Filling'];
    return texts[Math.min(rating - 1, 4)];
  }

  renderMyMenu() {
    const selectedRecipesList = Array.from(this.selectedRecipes).map(id => 
      this.recipes.find(r => r.id === id)
    ).filter(Boolean);

    if (selectedRecipesList.length === 0) {
      return `
        <div class="menu-section">
          <h2 class="menu-title">My Menu</h2>
          <p style="text-align: center; padding: 3rem; color: #666;">
            No recipes selected yet. Go back to the gallery and add some recipes to your menu!
          </p>
        </div>
      `;
    }

    const totalNutrition = this.calculateTotalNutrition(selectedRecipesList);

    return `
      <div class="menu-section">
        <div class="menu-header">
          <h2 class="menu-title">My Menu</h2>
          <div class="menu-stats">
            <div class="menu-stat">
              <div class="menu-stat-value">${selectedRecipesList.length}</div>
              <div class="menu-stat-label">Recipes</div>
            </div>
            <div class="menu-stat">
              <div class="menu-stat-value">${totalNutrition.totalCalories}</div>
              <div class="menu-stat-label">Total Calories</div>
            </div>
            <div class="menu-stat">
              <div class="menu-stat-value">${totalNutrition.averageSatiety}</div>
              <div class="menu-stat-label">Avg Satiety</div>
            </div>
          </div>
        </div>
        
        <div class="selected-recipes">
          ${selectedRecipesList.map(recipe => this.renderSelectedRecipe(recipe)).join('')}
        </div>
        
        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-primary" onclick="app.generateShoppingList()">
            <i class="fas fa-list"></i> Generate Shopping List
          </button>
          <button class="btn btn-secondary" onclick="app.clearMenu()">
            <i class="fas fa-trash"></i> Clear Menu
          </button>
        </div>
      </div>
    `;
  }

  renderSelectedRecipe(recipe) {
    const multiplier = this.servingMultipliers[recipe.id] || 1;
    
    return `
      <div class="selected-recipe-item">
        <div class="recipe-info">
          <div class="recipe-name">${recipe.name}</div>
          <div class="recipe-details">
            ${recipe.cuisine} • ${recipe.calories} cal • ${recipe.protein}g protein
          </div>
        </div>
        <div class="serving-adjuster">
          <button class="serving-btn" onclick="app.adjustServing('${recipe.id}', -1)">
            <i class="fas fa-minus"></i>
          </button>
          <span class="serving-count">${multiplier}x</span>
          <button class="serving-btn" onclick="app.adjustServing('${recipe.id}', 1)">
            <i class="fas fa-plus"></i>
          </button>
          <button class="btn btn-secondary" style="margin-left: 1rem;" 
            onclick="app.removeFromMenu('${recipe.id}')">
            <i class="fas fa-times"></i> Remove
          </button>
        </div>
      </div>
    `;
  }

  async renderShoppingList() {
    if (this.selectedRecipes.size === 0) {
      return `
        <div class="shopping-list">
          <h2>Shopping List</h2>
          <p style="text-align: center; padding: 3rem; color: #666;">
            Please select recipes first to generate a shopping list.
          </p>
        </div>
      `;
    }

    try {
      const response = await axios.post('/api/shopping-list', {
        recipeIds: Array.from(this.selectedRecipes),
        excludePantryStaples: document.getElementById('exclude-pantry')?.checked || false,
        servingMultipliers: this.servingMultipliers
      });

      const { list, nutrition } = response.data;

      return `
        <div class="shopping-list">
          <h2>Shopping List</h2>
          
          <div style="margin-bottom: 2rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" id="exclude-pantry" onchange="app.render()">
              Exclude pantry staples (salt, pepper, oil, etc.)
            </label>
          </div>
          
          ${this.renderShoppingCategories(list)}
          
          <div class="export-options">
            <button class="btn btn-primary" onclick="app.exportShoppingList('text')">
              <i class="fas fa-download"></i> Export as Text
            </button>
            <button class="btn btn-secondary" onclick="app.copyToClipboard()">
              <i class="fas fa-copy"></i> Copy to Clipboard
            </button>
            <button class="btn btn-secondary" onclick="window.print()">
              <i class="fas fa-print"></i> Print
            </button>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error generating shopping list:', error);
      return '<div class="shopping-list"><p>Error generating shopping list</p></div>';
    }
  }

  renderShoppingCategories(list) {
    const categories = [
      { name: 'Proteins', items: list.proteins },
      { name: 'Fresh Produce', items: list.produce },
      { name: 'Pantry/Dry Goods', items: list.pantry },
      { name: 'Sauces & Condiments', items: list.sauces },
      { name: 'Dairy & Eggs', items: list.dairy },
      { name: 'Herbs & Spices', items: list.herbsSpices },
      { name: 'Noodles & Rice', items: list.noodlesRice }
    ];

    return categories.map(category => {
      if (!category.items || category.items.length === 0) return '';
      
      return `
        <div class="shopping-category">
          <h3 class="category-title">${category.name}</h3>
          <div class="shopping-items">
            ${category.items.map(item => `
              <div class="shopping-item">
                <input type="checkbox" class="item-checkbox">
                <div class="item-info">
                  <div class="item-name">${item.name}</div>
                  <div class="item-quantity">${item.quantity}</div>
                  <div class="item-recipes">For: ${item.recipes.join(', ')}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  renderFloatingMenuButton() {
    const count = this.selectedRecipes.size;
    
    return `
      <div class="floating-menu-btn" onclick="app.toggleView()">
        <i class="fas fa-shopping-cart"></i>
        ${count > 0 ? `<span class="menu-badge">${count}</span>` : ''}
      </div>
    `;
  }

  async showRecipeDetail(recipeId) {
    try {
      const response = await axios.get(`/api/recipes/${recipeId}`);
      const recipe = response.data;
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="recipe-detail">
            <div class="recipe-detail-header">
              <h2 class="recipe-detail-title">${recipe.name}</h2>
              <span class="cuisine-badge">${recipe.cuisine}</span>
              
              <div class="recipe-detail-stats">
                <div class="detail-stat">
                  <i class="fas fa-clock"></i>
                  <span>Prep: ${recipe.prepTime} min</span>
                </div>
                <div class="detail-stat">
                  <i class="fas fa-fire-burner"></i>
                  <span>Cook: ${recipe.cookTime} min</span>
                </div>
                <div class="detail-stat">
                  <i class="fas fa-users"></i>
                  <span>Serves: ${recipe.servings}</span>
                </div>
                <div class="detail-stat">
                  <i class="fas fa-gauge"></i>
                  <span>${recipe.difficulty}</span>
                </div>
                <div class="detail-stat">
                  <i class="fas fa-pepper-hot"></i>
                  <span>${recipe.spiceLevel}</span>
                </div>
              </div>
              
              <p style="margin-top: 1rem; color: #666; line-height: 1.6;">
                ${recipe.description}
              </p>
              
              <div style="margin-top: 1rem; padding: 1rem; background: #f8f8f8; border-radius: 8px;">
                <strong>Satiety Rating:</strong> ${this.renderStars(recipe.satietyRating)}
                <p style="margin-top: 0.5rem; color: #666;">
                  ${recipe.satietyDescription}
                </p>
              </div>
            </div>
            
            <div class="ingredients-section">
              <h3 class="section-title">Ingredients</h3>
              <div class="ingredients-grid">
                ${recipe.ingredients.map(ing => `
                  <div class="ingredient-item">
                    <input type="checkbox" class="ingredient-checkbox">
                    <span><strong>${ing.quantity}</strong> ${ing.name}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div class="instructions-section">
              <h3 class="section-title">Instructions</h3>
              <div class="instructions-list">
                ${recipe.instructions.map(step => `
                  <div class="instruction-step">${step}</div>
                `).join('')}
              </div>
            </div>
            
            <div style="margin-top: 2rem;">
              <button class="btn btn-primary" onclick="app.toggleRecipeSelection('${recipe.id}'); this.closest('.modal-overlay').remove()">
                <i class="fas fa-plus"></i> Add to Menu
              </button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
    } catch (error) {
      console.error('Error loading recipe detail:', error);
      this.showToast('Error loading recipe details');
    }
  }

  toggleRecipeSelection(recipeId) {
    if (this.selectedRecipes.has(recipeId)) {
      this.selectedRecipes.delete(recipeId);
      delete this.servingMultipliers[recipeId];
    } else {
      this.selectedRecipes.add(recipeId);
      this.servingMultipliers[recipeId] = 1;
    }
    
    this.render();
    this.showToast(this.selectedRecipes.has(recipeId) ? 'Recipe added to menu!' : 'Recipe removed from menu');
  }

  removeFromMenu(recipeId) {
    this.selectedRecipes.delete(recipeId);
    delete this.servingMultipliers[recipeId];
    this.render();
  }

  adjustServing(recipeId, delta) {
    const current = this.servingMultipliers[recipeId] || 1;
    const newValue = Math.max(1, Math.min(10, current + delta));
    this.servingMultipliers[recipeId] = newValue;
    this.render();
  }

  clearMenu() {
    if (confirm('Are you sure you want to clear all selected recipes?')) {
      this.selectedRecipes.clear();
      this.servingMultipliers = {};
      this.render();
      this.showToast('Menu cleared');
    }
  }

  toggleView() {
    if (this.currentView === 'gallery') {
      this.currentView = this.selectedRecipes.size > 0 ? 'menu' : 'gallery';
    } else if (this.currentView === 'menu') {
      this.currentView = 'shopping';
    } else {
      this.currentView = 'gallery';
    }
    
    this.render();
  }

  async generateShoppingList() {
    this.currentView = 'shopping';
    this.render();
  }

  async applyFilters() {
    this.filters.search = document.getElementById('search-input').value;
    this.filters.cuisine = document.getElementById('cuisine-filter').value;
    this.filters.cookTime = document.getElementById('cooktime-filter').value;
    this.filters.satiety = document.getElementById('satiety-filter').value;
    this.filters.spice = document.getElementById('spice-filter').value;
    this.filters.difficulty = document.getElementById('difficulty-filter').value;
    
    await this.loadRecipes();
    this.render();
  }

  async exportShoppingList(format) {
    try {
      const response = await axios.post('/api/shopping-list/export', {
        recipeIds: Array.from(this.selectedRecipes),
        excludePantryStaples: document.getElementById('exclude-pantry')?.checked || false,
        servingMultipliers: this.servingMultipliers
      });
      
      const text = response.data;
      
      // Create download
      const blob = new Blob([text], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'shopping-list.txt';
      a.click();
      
      this.showToast('Shopping list exported!');
    } catch (error) {
      console.error('Error exporting shopping list:', error);
      this.showToast('Error exporting shopping list');
    }
  }

  async copyToClipboard() {
    try {
      const response = await axios.post('/api/shopping-list/export', {
        recipeIds: Array.from(this.selectedRecipes),
        excludePantryStaples: document.getElementById('exclude-pantry')?.checked || false,
        servingMultipliers: this.servingMultipliers
      });
      
      await navigator.clipboard.writeText(response.data);
      this.showToast('Shopping list copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      this.showToast('Error copying to clipboard');
    }
  }

  calculateTotalNutrition(recipes) {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFiber = 0;
    let totalSatiety = 0;

    recipes.forEach(recipe => {
      const multiplier = this.servingMultipliers[recipe.id] || 1;
      const servings = recipe.servings * multiplier;

      totalCalories += recipe.calories * servings;
      totalProtein += recipe.protein * servings;
      totalCarbs += recipe.carbohydrates * servings;
      totalFat += recipe.fat * servings;
      totalFiber += recipe.fiber * servings;
      totalSatiety += recipe.satietyRating;
    });

    return {
      totalCalories: Math.round(totalCalories),
      totalProtein: Math.round(totalProtein),
      totalCarbs: Math.round(totalCarbs),
      totalFat: Math.round(totalFat),
      totalFiber: Math.round(totalFiber),
      averageSatiety: recipes.length > 0 
        ? Math.round(totalSatiety / recipes.length * 10) / 10 
        : 0
    };
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  attachEventListeners() {
    // Add any additional event listeners after render
  }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new RecipeApp();
});