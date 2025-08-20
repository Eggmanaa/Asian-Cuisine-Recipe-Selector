import { Recipe, Ingredient } from '../data/recipes';

export interface ShoppingListItem {
  name: string;
  quantity: string;
  category: string;
  recipes: string[]; // Track which recipes need this item
}

export interface ConsolidatedList {
  proteins: ShoppingListItem[];
  produce: ShoppingListItem[];
  pantry: ShoppingListItem[];
  sauces: ShoppingListItem[];
  dairy: ShoppingListItem[];
  herbsSpices: ShoppingListItem[];
  noodlesRice: ShoppingListItem[];
}

// Common pantry items that users might already have
export const PANTRY_STAPLES = [
  'salt',
  'black pepper',
  'vegetable oil',
  'sugar',
  'water'
];

// Unit conversion helpers
const VOLUME_CONVERSIONS: { [key: string]: number } = {
  'tsp': 1,
  'tbsp': 3,
  'cup': 48,
  'ml': 0.2029,
  'oz': 6,
  'fl oz': 6
};

const WEIGHT_CONVERSIONS: { [key: string]: number } = {
  'g': 1,
  'oz': 28.35,
  'lb': 453.592,
  'lbs': 453.592,
  'kg': 1000
};

// Parse quantity string to extract number and unit
function parseQuantity(quantity: string): { amount: number; unit: string; description: string } {
  // Handle special cases
  if (quantity.toLowerCase().includes('for garnish') || 
      quantity.toLowerCase().includes('for serving') ||
      quantity.toLowerCase().includes('to taste')) {
    return { amount: 0, unit: '', description: quantity };
  }

  // Extract number and unit using regex
  const match = quantity.match(/^([\d.\/\s]+)?\s*(.*)$/);
  if (!match) {
    return { amount: 0, unit: '', description: quantity };
  }

  let amountStr = match[1] || '';
  let rest = match[2] || '';

  // Handle fractions
  let amount = 0;
  if (amountStr.includes('/')) {
    const parts = amountStr.split('/');
    if (parts.length === 2) {
      amount = parseFloat(parts[0]) / parseFloat(parts[1]);
    }
  } else if (amountStr.trim()) {
    amount = parseFloat(amountStr);
  }

  // Extract unit from the rest
  const unitMatch = rest.match(/^(\w+)\s*(.*)/);
  const unit = unitMatch ? unitMatch[1] : '';
  const description = unitMatch ? unitMatch[2] : rest;

  return { amount, unit: unit.toLowerCase(), description };
}

// Consolidate quantities of the same ingredient
function consolidateQuantities(items: { quantity: string; recipe: string }[]): string {
  if (items.length === 1) {
    return items[0].quantity;
  }

  // Try to parse and combine quantities
  const parsed = items.map(item => parseQuantity(item.quantity));
  
  // Check if all items have the same or convertible units
  const hasSpecialCases = parsed.some(p => p.amount === 0);
  if (hasSpecialCases) {
    // Just list all quantities if there are special cases
    return items.map(i => i.quantity).join(' + ');
  }

  // Group by unit type
  const byUnit: { [key: string]: number } = {};
  const descriptions: string[] = [];

  parsed.forEach(p => {
    if (p.unit) {
      byUnit[p.unit] = (byUnit[p.unit] || 0) + p.amount;
    }
    if (p.description && !descriptions.includes(p.description)) {
      descriptions.push(p.description);
    }
  });

  // Try to consolidate volume measurements
  let totalTsp = 0;
  Object.entries(byUnit).forEach(([unit, amount]) => {
    if (VOLUME_CONVERSIONS[unit]) {
      totalTsp += amount * VOLUME_CONVERSIONS[unit];
      delete byUnit[unit];
    }
  });

  // Convert back to appropriate units
  if (totalTsp > 0) {
    if (totalTsp >= 48) {
      const cups = Math.floor(totalTsp / 48);
      const remainingTbsp = Math.floor((totalTsp % 48) / 3);
      const remainingTsp = totalTsp % 3;
      
      let result = `${cups} cup${cups > 1 ? 's' : ''}`;
      if (remainingTbsp > 0) {
        result += ` + ${remainingTbsp} tbsp`;
      }
      if (remainingTsp > 0) {
        result += ` + ${remainingTsp} tsp`;
      }
      return result;
    } else if (totalTsp >= 3) {
      const tbsp = Math.floor(totalTsp / 3);
      const remainingTsp = totalTsp % 3;
      
      let result = `${tbsp} tbsp`;
      if (remainingTsp > 0) {
        result += ` + ${remainingTsp} tsp`;
      }
      return result;
    } else {
      return `${totalTsp} tsp`;
    }
  }

  // Try to consolidate weight measurements
  let totalGrams = 0;
  Object.entries(byUnit).forEach(([unit, amount]) => {
    if (WEIGHT_CONVERSIONS[unit]) {
      totalGrams += amount * WEIGHT_CONVERSIONS[unit];
      delete byUnit[unit];
    }
  });

  if (totalGrams > 0) {
    if (totalGrams >= 1000) {
      return `${(totalGrams / 1000).toFixed(1)} kg`;
    } else if (totalGrams >= 453.592) {
      const lbs = totalGrams / 453.592;
      return `${lbs.toFixed(1)} lbs`;
    } else {
      return `${Math.round(totalGrams)}g`;
    }
  }

  // For remaining units, just sum them up
  const results: string[] = [];
  Object.entries(byUnit).forEach(([unit, amount]) => {
    results.push(`${amount} ${unit}`);
  });

  if (descriptions.length > 0) {
    results.push(descriptions.join(', '));
  }

  return results.join(' + ');
}

// Generate shopping list from selected recipes
export function generateShoppingList(
  selectedRecipes: Recipe[],
  excludePantryStaples: boolean = false,
  servingMultipliers: { [recipeId: string]: number } = {}
): ConsolidatedList {
  const ingredientMap: Map<string, { quantity: string; recipe: string; category: string }[]> = new Map();

  // Collect all ingredients
  selectedRecipes.forEach(recipe => {
    const multiplier = servingMultipliers[recipe.id] || 1;
    
    recipe.ingredients.forEach(ingredient => {
      // Skip pantry staples if requested
      if (excludePantryStaples && PANTRY_STAPLES.some(staple => 
        ingredient.name.toLowerCase().includes(staple))) {
        return;
      }

      const key = ingredient.name.toLowerCase();
      if (!ingredientMap.has(key)) {
        ingredientMap.set(key, []);
      }

      // Adjust quantity based on multiplier
      let adjustedQuantity = ingredient.quantity;
      if (multiplier !== 1) {
        const parsed = parseQuantity(ingredient.quantity);
        if (parsed.amount > 0) {
          const newAmount = parsed.amount * multiplier;
          adjustedQuantity = `${newAmount} ${parsed.unit} ${parsed.description}`.trim();
        }
      }

      ingredientMap.get(key)!.push({
        quantity: adjustedQuantity,
        recipe: recipe.name,
        category: ingredient.category
      });
    });
  });

  // Consolidate quantities and organize by category
  const consolidatedList: ConsolidatedList = {
    proteins: [],
    produce: [],
    pantry: [],
    sauces: [],
    dairy: [],
    herbsSpices: [],
    noodlesRice: []
  };

  ingredientMap.forEach((items, name) => {
    const consolidatedQuantity = consolidateQuantities(items);
    const category = items[0].category;
    const recipes = items.map(i => i.recipe);

    const listItem: ShoppingListItem = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      quantity: consolidatedQuantity,
      category,
      recipes
    };

    // Add to appropriate category
    switch (category) {
      case 'Proteins':
        consolidatedList.proteins.push(listItem);
        break;
      case 'Produce':
        consolidatedList.produce.push(listItem);
        break;
      case 'Pantry':
        consolidatedList.pantry.push(listItem);
        break;
      case 'Sauces':
        consolidatedList.sauces.push(listItem);
        break;
      case 'Dairy':
        consolidatedList.dairy.push(listItem);
        break;
      case 'Herbs & Spices':
        consolidatedList.herbsSpices.push(listItem);
        break;
      case 'Noodles & Rice':
        consolidatedList.noodlesRice.push(listItem);
        break;
    }
  });

  // Sort each category alphabetically
  Object.keys(consolidatedList).forEach(key => {
    (consolidatedList as any)[key].sort((a: ShoppingListItem, b: ShoppingListItem) => 
      a.name.localeCompare(b.name)
    );
  });

  return consolidatedList;
}

// Export shopping list as text
export function exportAsText(list: ConsolidatedList): string {
  let text = 'SHOPPING LIST\n' + '='.repeat(50) + '\n\n';

  const categories = [
    { name: 'PROTEINS', items: list.proteins },
    { name: 'FRESH PRODUCE', items: list.produce },
    { name: 'PANTRY/DRY GOODS', items: list.pantry },
    { name: 'SAUCES & CONDIMENTS', items: list.sauces },
    { name: 'DAIRY & EGGS', items: list.dairy },
    { name: 'HERBS & SPICES', items: list.herbsSpices },
    { name: 'NOODLES & RICE', items: list.noodlesRice }
  ];

  categories.forEach(category => {
    if (category.items.length > 0) {
      text += `${category.name}\n${'-'.repeat(category.name.length)}\n`;
      category.items.forEach(item => {
        text += `☐ ${item.name}: ${item.quantity}\n`;
        text += `  (for: ${item.recipes.join(', ')})\n`;
      });
      text += '\n';
    }
  });

  return text;
}

// Calculate total nutrition for selected recipes
export function calculateTotalNutrition(
  selectedRecipes: Recipe[],
  servingMultipliers: { [recipeId: string]: number } = {}
): {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  averageSatiety: number;
} {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFiber = 0;
  let totalSatiety = 0;

  selectedRecipes.forEach(recipe => {
    const multiplier = servingMultipliers[recipe.id] || 1;
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
    averageSatiety: selectedRecipes.length > 0 
      ? Math.round(totalSatiety / selectedRecipes.length * 10) / 10 
      : 0
  };
}