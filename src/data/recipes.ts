export interface Recipe {
  id: string;
  name: string;
  cuisine: 'Thai' | 'Chinese' | 'Vietnamese' | 'Indian' | 'Indonesian';
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  calories: number;
  protein: number; // grams
  carbohydrates: number; // grams
  fat: number; // grams
  fiber: number; // grams
  satietyRating: number; // 1-5 stars
  difficulty: 'Easy' | 'Medium' | 'Hard';
  spiceLevel: 'Mild' | 'Medium' | 'Spicy';
  ingredients: Ingredient[];
  instructions: string[];
  equipment?: string[];
  imagePrompt: string;
  description: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
  category: 'Proteins' | 'Produce' | 'Pantry' | 'Sauces' | 'Dairy' | 'Herbs & Spices' | 'Noodles & Rice';
}

export const recipes: Recipe[] = [
  {
    id: 'pad-thai',
    name: 'Pad Thai with Chicken & Shrimp',
    cuisine: 'Thai',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    calories: 635,
    protein: 38,
    carbohydrates: 65,
    fat: 25,
    fiber: 8,
    satietyRating: 4,
    difficulty: 'Medium',
    spiceLevel: 'Medium',
    description: 'A classic Thai street food dish that balances sweet, sour, and savory flavors, with added broccoli for a high-fiber boost.',
    imagePrompt: 'Professional food photography of Pad Thai with chicken and shrimp, overhead shot, natural lighting, vibrant colors, garnished with peanuts and lime, on elegant dishware, shallow depth of field, appetizing, Thai cuisine style',
    ingredients: [
      { name: 'Dried flat rice noodles', quantity: '8 oz (225g)', category: 'Noodles & Rice' },
      { name: 'Vegetable oil', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Chicken breast', quantity: '8 oz (225g)', category: 'Proteins' },
      { name: 'Raw shrimp', quantity: '8 oz (225g)', category: 'Proteins' },
      { name: 'Garlic', quantity: '3 cloves', category: 'Produce' },
      { name: 'Shallot', quantity: '1', category: 'Produce' },
      { name: 'Eggs', quantity: '2 large', category: 'Dairy' },
      { name: 'Firm tofu', quantity: '1 cup (100g)', category: 'Proteins' },
      { name: 'Broccoli florets', quantity: '2 cups (150g)', category: 'Produce' },
      { name: 'Shredded carrots', quantity: '1 cup (110g)', category: 'Produce' },
      { name: 'Bean sprouts', quantity: '4 cups (300g)', category: 'Produce' },
      { name: 'Garlic chives or scallions', quantity: '1/2 cup (20g)', category: 'Produce' },
      { name: 'Roasted peanuts', quantity: '1/2 cup (70g)', category: 'Pantry' },
      { name: 'Lime', quantity: '1', category: 'Produce' },
      { name: 'Tamarind paste', quantity: '3 tbsp', category: 'Sauces' },
      { name: 'Fish sauce', quantity: '3 tbsp', category: 'Sauces' },
      { name: 'Palm sugar or brown sugar', quantity: '1.5 tbsp', category: 'Pantry' },
      { name: 'Lime juice', quantity: '1 tbsp', category: 'Sauces' },
      { name: 'Chili garlic sauce', quantity: '1-2 tsp', category: 'Sauces' },
      { name: 'Water', quantity: '2 tbsp', category: 'Pantry' }
    ],
    instructions: [
      'Cook rice noodles according to package directions. Drain, rinse with cold water, set aside.',
      'Whisk together sauce ingredients: tamarind paste, fish sauce, palm sugar, lime juice, chili garlic sauce, and water.',
      'Heat 1 tbsp oil in wok. Stir-fry garlic and shallot for 30 seconds until fragrant.',
      'Add chicken, cook until no longer pink. Add shrimp, cook 1-2 minutes until pink. Remove and set aside.',
      'Add remaining oil. Cook tofu until golden. Add broccoli and carrots, stir-fry 3-4 minutes.',
      'Push vegetables aside. Scramble eggs in empty space.',
      'Return chicken and shrimp. Add noodles, sauce, half the bean sprouts, and garlic chives. Toss 2-3 minutes.',
      'Serve garnished with remaining bean sprouts, peanuts, and lime wedges.'
    ],
    equipment: ['Wok or large skillet']
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken (Murgh Makhani)',
    cuisine: 'Indian',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    calories: 610,
    protein: 45,
    carbohydrates: 50,
    fat: 25,
    fiber: 9,
    satietyRating: 4,
    difficulty: 'Easy',
    spiceLevel: 'Mild',
    description: 'A lighter, quicker version of the creamy Indian classic, served with high-fiber brown rice and spinach for a complete, nutritious meal.',
    imagePrompt: 'Professional food photography of Butter Chicken Murgh Makhani, overhead shot, natural lighting, vibrant orange curry with cream swirl, garnished with cilantro, on elegant dishware with rice, shallow depth of field, appetizing, Indian cuisine style',
    ingredients: [
      { name: 'Chicken thighs', quantity: '1.5 lbs (680g)', category: 'Proteins' },
      { name: 'Greek yogurt', quantity: '1/2 cup (125g)', category: 'Dairy' },
      { name: 'Lemon juice', quantity: '1 tbsp', category: 'Produce' },
      { name: 'Ground turmeric', quantity: '1 tsp', category: 'Herbs & Spices' },
      { name: 'Garam masala', quantity: '2 tsp', category: 'Herbs & Spices' },
      { name: 'Ground cumin', quantity: '1 tsp', category: 'Herbs & Spices' },
      { name: 'Salt', quantity: '1/2 tsp', category: 'Pantry' },
      { name: 'Ghee or vegetable oil', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Yellow onion', quantity: '1 large', category: 'Produce' },
      { name: 'Garlic', quantity: '2 cloves', category: 'Produce' },
      { name: 'Fresh ginger', quantity: '1 tbsp', category: 'Produce' },
      { name: 'Red bell pepper', quantity: '1', category: 'Produce' },
      { name: 'Crushed tomatoes', quantity: '15 oz can', category: 'Pantry' },
      { name: 'Ground coriander', quantity: '1 tsp', category: 'Herbs & Spices' },
      { name: 'Chili powder', quantity: '1/2 tsp', category: 'Herbs & Spices' },
      { name: 'Light cream or coconut milk', quantity: '1/2 cup (120ml)', category: 'Dairy' },
      { name: 'Fresh spinach', quantity: '2 cups (60g)', category: 'Produce' },
      { name: 'Brown basmati rice', quantity: '1 cup (185g)', category: 'Noodles & Rice' },
      { name: 'Fresh cilantro', quantity: 'For garnish', category: 'Herbs & Spices' }
    ],
    instructions: [
      'Marinate chicken with yogurt, lemon juice, turmeric, garam masala, cumin, and salt for 15 minutes.',
      'Cook brown basmati rice according to package directions.',
      'Heat ghee in skillet. Cook marinated chicken until golden brown, 3-4 minutes per side. Remove.',
      'Sauté onion 5-7 minutes until softened. Add garlic, ginger, and bell pepper, cook 2 minutes.',
      'Stir in garam masala, coriander, and chili powder for 30 seconds.',
      'Add crushed tomatoes, simmer 5 minutes.',
      'Stir in cream and return chicken. Add spinach and cook until wilted.',
      'Serve over rice, garnished with cilantro.'
    ],
    equipment: ['Large skillet or Dutch oven']
  },
  {
    id: 'shaking-beef',
    name: 'Vietnamese Shaking Beef (Bò Lúc Lắc)',
    cuisine: 'Vietnamese',
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    calories: 580,
    protein: 42,
    carbohydrates: 45,
    fat: 26,
    fiber: 7,
    satietyRating: 4,
    difficulty: 'Medium',
    spiceLevel: 'Mild',
    description: 'A quick, high-heat stir-fry featuring tender beef cubes in a savory, peppery sauce, served on a bed of crisp, high-fiber watercress.',
    imagePrompt: 'Professional food photography of Vietnamese Shaking Beef Bo Luc Lac, overhead shot, natural lighting, seared beef cubes with vegetables on watercress, vibrant colors, on elegant dishware, shallow depth of field, appetizing, Vietnamese cuisine style',
    ingredients: [
      { name: 'Beef sirloin', quantity: '1.5 lbs (680g)', category: 'Proteins' },
      { name: 'Soy sauce', quantity: '2 tbsp', category: 'Sauces' },
      { name: 'Oyster sauce', quantity: '1 tbsp', category: 'Sauces' },
      { name: 'Vegetable oil', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Sugar', quantity: '2 tsp', category: 'Pantry' },
      { name: 'Black pepper', quantity: '1 tsp', category: 'Herbs & Spices' },
      { name: 'Garlic', quantity: '4 cloves', category: 'Produce' },
      { name: 'Red onion', quantity: '1', category: 'Produce' },
      { name: 'Green bell pepper', quantity: '1', category: 'Produce' },
      { name: 'Red bell pepper', quantity: '1', category: 'Produce' },
      { name: 'Cherry tomatoes', quantity: '1 cup (180g)', category: 'Produce' },
      { name: 'Watercress or arugula', quantity: '6 oz (170g)', category: 'Produce' },
      { name: 'Brown rice', quantity: '1 cup (185g)', category: 'Noodles & Rice' }
    ],
    instructions: [
      'Marinate beef cubes with soy sauce, oyster sauce, 1 tbsp oil, sugar, pepper, and garlic.',
      'Cook brown rice according to package directions.',
      'Arrange watercress on serving platter.',
      'Heat 1 tbsp oil in wok until shimmering. Sear beef 1-2 minutes per side for medium-rare. Remove.',
      'Stir-fry onion and bell peppers 2-3 minutes until crisp-tender.',
      'Return beef with tomatoes, toss 1 minute while shaking pan.',
      'Pour beef and vegetables over watercress bed.',
      'Serve with brown rice on the side.'
    ],
    equipment: ['Wok or heavy-bottomed skillet']
  },
  {
    id: 'hong-shao-rou',
    name: 'Braised Pork Belly (Hóng Shāo Ròu)',
    cuisine: 'Chinese',
    prepTime: 10,
    cookTime: 35,
    servings: 4,
    calories: 640,
    protein: 25,
    carbohydrates: 22,
    fat: 48,
    fiber: 8,
    satietyRating: 5,
    difficulty: 'Medium',
    spiceLevel: 'Mild',
    description: 'A rapid take on the Shanghainese classic. Thinly slicing the pork belly allows it to become tender and absorb the rich, savory-sweet sauce quickly.',
    imagePrompt: 'Professional food photography of Chinese Braised Pork Belly Hong Shao Rou, overhead shot, natural lighting, glossy caramelized pork with bok choy and mushrooms, rich brown sauce, on elegant dishware, shallow depth of field, appetizing, Chinese cuisine style',
    ingredients: [
      { name: 'Pork belly', quantity: '1.5 lbs (680g)', category: 'Proteins' },
      { name: 'Vegetable oil', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Rock sugar or brown sugar', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Ginger', quantity: '2 inches', category: 'Produce' },
      { name: 'Scallions', quantity: '4', category: 'Produce' },
      { name: 'Star anise', quantity: '2', category: 'Herbs & Spices' },
      { name: 'Shaoxing wine', quantity: '1/4 cup (60ml)', category: 'Sauces' },
      { name: 'Light soy sauce', quantity: '3 tbsp', category: 'Sauces' },
      { name: 'Dark soy sauce', quantity: '1 tbsp', category: 'Sauces' },
      { name: 'Hot water or chicken broth', quantity: '1.5 cups (360ml)', category: 'Pantry' },
      { name: 'Shiitake mushrooms', quantity: '8 oz (225g)', category: 'Produce' },
      { name: 'Baby bok choy', quantity: '4 heads', category: 'Produce' },
      { name: 'Broccoli florets', quantity: '2 cups (200g)', category: 'Produce' }
    ],
    instructions: [
      'Blanch sliced pork belly in boiling water for 2 minutes. Drain and pat dry.',
      'Heat oil and caramelize sugar until deep amber color.',
      'Add pork belly, tossing to coat. Add ginger, scallions, and star anise.',
      'Deglaze with Shaoxing wine, scraping up browned bits.',
      'Add soy sauces and hot water. Bring to boil, then simmer covered for 20 minutes.',
      'Add shiitake mushrooms, simmer uncovered 10-15 minutes until sauce thickens.',
      'Place bok choy on top to steam in last 5 minutes.',
      'Serve with steamed broccoli on the side.'
    ],
    equipment: ['Large skillet or wok']
  },
  {
    id: 'pho-bo',
    name: 'Beef Noodle Soup (Phở Bò)',
    cuisine: 'Vietnamese',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    calories: 550,
    protein: 35,
    carbohydrates: 62,
    fat: 18,
    fiber: 8,
    satietyRating: 4,
    difficulty: 'Easy',
    spiceLevel: 'Mild',
    description: 'A time-saving version of the Vietnamese classic, using high-quality beef broth rapidly infused with aromatic spices.',
    imagePrompt: 'Professional food photography of Vietnamese Pho Bo beef noodle soup, overhead shot, natural lighting, clear aromatic broth with thin beef slices, rice noodles, fresh herbs and bean sprouts, on elegant bowl, steam rising, appetizing, Vietnamese cuisine style',
    ingredients: [
      { name: 'Beef broth', quantity: '8 cups (2 liters)', category: 'Pantry' },
      { name: 'Beef sirloin', quantity: '1 lb (450g)', category: 'Proteins' },
      { name: 'Yellow onion', quantity: '1 large', category: 'Produce' },
      { name: 'Ginger', quantity: '2-inch piece', category: 'Produce' },
      { name: 'Star anise', quantity: '2', category: 'Herbs & Spices' },
      { name: 'Cinnamon stick', quantity: '1', category: 'Herbs & Spices' },
      { name: 'Whole cloves', quantity: '4', category: 'Herbs & Spices' },
      { name: 'Coriander seeds', quantity: '1 tsp', category: 'Herbs & Spices' },
      { name: 'Fish sauce', quantity: '1 tbsp', category: 'Sauces' },
      { name: 'Sugar', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Dried flat rice noodles', quantity: '8 oz (225g)', category: 'Noodles & Rice' },
      { name: 'Baby bok choy', quantity: '4 heads', category: 'Produce' },
      { name: 'Bean sprouts', quantity: '4 cups (300g)', category: 'Produce' },
      { name: 'Thai basil', quantity: '1 bunch', category: 'Herbs & Spices' },
      { name: 'Cilantro', quantity: '1 bunch', category: 'Herbs & Spices' },
      { name: 'Scallions', quantity: '1 bunch', category: 'Produce' },
      { name: 'Jalapeño', quantity: '1', category: 'Produce' },
      { name: 'Lime', quantity: '1', category: 'Produce' },
      { name: 'Hoisin sauce', quantity: 'For serving', category: 'Sauces' },
      { name: 'Sriracha', quantity: 'For serving', category: 'Sauces' }
    ],
    instructions: [
      'Broil halved onion and ginger cut-side up for 5-7 minutes until charred.',
      'Cook rice noodles according to package directions. Divide into bowls.',
      'Toast spices in dry pot 1-2 minutes until fragrant.',
      'Add broth, charred aromatics, fish sauce, and sugar. Simmer 20 minutes.',
      'Blanch bok choy 1-2 minutes. Add to bowls.',
      'Strain broth, bring to rolling boil.',
      'Place raw beef slices on noodles. Ladle boiling broth over to cook beef.',
      'Top with bean sprouts, herbs, jalapeño. Serve with lime, hoisin, and sriracha.'
    ],
    equipment: ['Stockpot or Dutch oven', 'Fine-mesh sieve']
  },
  {
    id: 'tandoori-lamb',
    name: 'Tandoori Lamb Chops with Kachumber Salad',
    cuisine: 'Indian',
    prepTime: 10,
    cookTime: 10,
    servings: 4,
    calories: 620,
    protein: 48,
    carbohydrates: 38,
    fat: 30,
    fiber: 10,
    satietyRating: 5,
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    description: 'Juicy, yogurt-marinated lamb chops cooked quickly under a broiler for a smoky char, served with a refreshing cucumber-tomato salad.',
    imagePrompt: 'Professional food photography of Tandoori Lamb Chops, overhead shot, natural lighting, charred red-spiced lamb chops with fresh kachumber salad, vibrant colors, on elegant dishware with quinoa, shallow depth of field, appetizing, Indian cuisine style',
    ingredients: [
      { name: 'Lamb loin chops', quantity: '8 chops (1.5 lbs)', category: 'Proteins' },
      { name: 'Greek yogurt', quantity: '1 cup (250g)', category: 'Dairy' },
      { name: 'Garlic', quantity: '3 cloves', category: 'Produce' },
      { name: 'Fresh ginger', quantity: '1 tbsp', category: 'Produce' },
      { name: 'Lemon juice', quantity: '2 tbsp', category: 'Produce' },
      { name: 'Tandoori masala', quantity: '2 tbsp', category: 'Herbs & Spices' },
      { name: 'Paprika', quantity: '1 tsp', category: 'Herbs & Spices' },
      { name: 'Ground turmeric', quantity: '1/2 tsp', category: 'Herbs & Spices' },
      { name: 'Salt', quantity: '1/2 tsp', category: 'Pantry' },
      { name: 'Cayenne pepper', quantity: '1/4 tsp', category: 'Herbs & Spices' },
      { name: 'Tomatoes', quantity: '2 large', category: 'Produce' },
      { name: 'English cucumber', quantity: '1 large', category: 'Produce' },
      { name: 'Red onion', quantity: '1/2', category: 'Produce' },
      { name: 'Fresh cilantro', quantity: '1/2 cup', category: 'Herbs & Spices' },
      { name: 'Quinoa', quantity: '1 cup (180g)', category: 'Noodles & Rice' }
    ],
    instructions: [
      'Mix yogurt, garlic, ginger, lemon juice, tandoori masala, paprika, turmeric, salt, and cayenne.',
      'Marinate lamb chops for at least 20 minutes.',
      'Cook quinoa according to package directions.',
      'Prepare kachumber: combine diced tomatoes, cucumber, onion, cilantro, lemon juice, salt, and pepper.',
      'Preheat broiler to high. Place lamb on wire rack over foil-lined sheet.',
      'Broil 4-6 minutes per side for medium-rare (130°F).',
      'Rest lamb 5 minutes before serving.',
      'Serve 2 chops per person with kachumber salad and quinoa.'
    ],
    equipment: ['Broiler', 'Wire rack', 'Baking sheet']
  },
  {
    id: 'cashew-chicken',
    name: 'Chicken with Cashew Nuts (Kai Med Ma Muang)',
    cuisine: 'Thai',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    calories: 645,
    protein: 46,
    carbohydrates: 55,
    fat: 28,
    fiber: 9,
    satietyRating: 4,
    difficulty: 'Easy',
    spiceLevel: 'Mild',
    description: 'A beloved Thai stir-fry that is savory, slightly sweet, and packed with texture from crunchy cashews and crisp vegetables.',
    imagePrompt: 'Professional food photography of Thai Chicken with Cashew Nuts, overhead shot, natural lighting, golden chicken pieces with roasted cashews and colorful bell peppers, glossy sauce, on elegant dishware with rice, shallow depth of field, appetizing, Thai cuisine style',
    ingredients: [
      { name: 'Chicken breast or thighs', quantity: '1.5 lbs (680g)', category: 'Proteins' },
      { name: 'Soy sauce', quantity: '2 tbsp', category: 'Sauces' },
      { name: 'Cornstarch', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Vegetable oil', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Roasted cashews', quantity: '1 cup (150g)', category: 'Pantry' },
      { name: 'Garlic', quantity: '4 cloves', category: 'Produce' },
      { name: 'Yellow onion', quantity: '1 medium', category: 'Produce' },
      { name: 'Red bell pepper', quantity: '1', category: 'Produce' },
      { name: 'Green bell pepper', quantity: '1', category: 'Produce' },
      { name: 'Broccoli florets', quantity: '2 cups (150g)', category: 'Produce' },
      { name: 'Dried red chilies', quantity: '4-6', category: 'Herbs & Spices' },
      { name: 'Oyster sauce', quantity: '2 tbsp', category: 'Sauces' },
      { name: 'Fish sauce', quantity: '1 tbsp', category: 'Sauces' },
      { name: 'Sugar', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Chicken broth', quantity: '1/4 cup (60ml)', category: 'Pantry' },
      { name: 'Brown rice', quantity: '1 cup (185g)', category: 'Noodles & Rice' }
    ],
    instructions: [
      'Toss chicken with 1 tbsp soy sauce and cornstarch. Cook rice.',
      'Mix sauce: oyster sauce, remaining soy sauce, fish sauce, sugar, and broth.',
      'Heat 1 tbsp oil in wok. Stir-fry chicken 4-5 minutes until golden. Remove.',
      'Add remaining oil. Toast cashews and dried chilies 1 minute.',
      'Add garlic and onion, stir-fry 1 minute.',
      'Add bell peppers and broccoli, stir-fry 3-4 minutes until tender-crisp.',
      'Return chicken, add sauce, toss 1-2 minutes until thickened.',
      'Serve immediately over brown rice.'
    ],
    equipment: ['Wok or large skillet']
  },
  {
    id: 'garlic-eggplant',
    name: 'Savory Garlic Eggplant with Minced Pork',
    cuisine: 'Chinese',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    calories: 590,
    protein: 20,
    carbohydrates: 65,
    fat: 28,
    fiber: 15,
    satietyRating: 4,
    difficulty: 'Medium',
    spiceLevel: 'Mild',
    description: 'A Sichuan classic made mild. Chinese eggplant becomes meltingly tender in a savory, tangy garlic sauce with minced pork.',
    imagePrompt: 'Professional food photography of Chinese Garlic Eggplant with Minced Pork, overhead shot, natural lighting, glossy purple eggplant with ground pork in rich brown sauce, garnished with scallions, on elegant dishware with rice, shallow depth of field, appetizing, Sichuan cuisine style',
    ingredients: [
      { name: 'Chinese eggplant', quantity: '2 lbs (900g)', category: 'Produce' },
      { name: 'Salt', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Ground pork', quantity: '8 oz (225g)', category: 'Proteins' },
      { name: 'Vegetable oil', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Garlic', quantity: '4 cloves', category: 'Produce' },
      { name: 'Fresh ginger', quantity: '1 tbsp', category: 'Produce' },
      { name: 'Scallions', quantity: '2', category: 'Produce' },
      { name: 'Bamboo shoots', quantity: '1 cup (100g)', category: 'Produce' },
      { name: 'Light soy sauce', quantity: '2 tbsp', category: 'Sauces' },
      { name: 'Black vinegar', quantity: '1 tbsp', category: 'Sauces' },
      { name: 'Shaoxing wine', quantity: '1 tbsp', category: 'Sauces' },
      { name: 'Sugar', quantity: '2 tsp', category: 'Pantry' },
      { name: 'Cornstarch', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Sesame oil', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Doubanjiang', quantity: '1 tsp', category: 'Sauces' },
      { name: 'Water or chicken broth', quantity: '1/2 cup (120ml)', category: 'Pantry' },
      { name: 'Brown rice', quantity: '1 cup (185g)', category: 'Noodles & Rice' }
    ],
    instructions: [
      'Cut eggplant into strips, salt for 15-20 minutes. Cook rice.',
      'Mix sauce ingredients.',
      'Rinse eggplant, squeeze dry. Pan-fry 8-10 minutes until golden. Remove.',
      'Cook ground pork until browned, 3-4 minutes.',
      'Add garlic, ginger, and white scallion parts. Stir-fry 1 minute.',
      'Add sauce, bring to simmer. Add bamboo shoots and eggplant.',
      'Simmer 2-3 minutes until sauce thickens.',
      'Stir in green scallion parts. Serve over rice.'
    ],
    equipment: ['Wok or large skillet']
  },
  {
    id: 'pad-see-ew',
    name: 'Stir-Fried Wide Noodles (Pad See Ew) with Beef',
    cuisine: 'Thai',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    calories: 630,
    protein: 35,
    carbohydrates: 65,
    fat: 26,
    fiber: 7,
    satietyRating: 4,
    difficulty: 'Medium',
    spiceLevel: 'Mild',
    description: 'A popular Thai street food dish featuring wide, chewy rice noodles, tender beef, and crisp Chinese broccoli in a savory-sweet soy sauce.',
    imagePrompt: 'Professional food photography of Thai Pad See Ew with beef, overhead shot, natural lighting, dark glossy wide rice noodles with beef and Chinese broccoli, charred edges, on elegant dishware, shallow depth of field, appetizing, Thai street food style',
    ingredients: [
      { name: 'Fresh wide rice noodles', quantity: '1 lb (450g)', category: 'Noodles & Rice' },
      { name: 'Beef flank steak', quantity: '1 lb (450g)', category: 'Proteins' },
      { name: 'Light soy sauce', quantity: '3 tbsp', category: 'Sauces' },
      { name: 'Cornstarch', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Vegetable oil', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Garlic', quantity: '4 cloves', category: 'Produce' },
      { name: 'Eggs', quantity: '2 large', category: 'Dairy' },
      { name: 'Chinese broccoli', quantity: '1 lb (450g)', category: 'Produce' },
      { name: 'Carrot', quantity: '1 large', category: 'Produce' },
      { name: 'Oyster sauce', quantity: '2 tbsp', category: 'Sauces' },
      { name: 'Dark sweet soy sauce', quantity: '1 tbsp', category: 'Sauces' },
      { name: 'Rice vinegar', quantity: '1 tbsp', category: 'Sauces' },
      { name: 'Sugar', quantity: '1 tsp', category: 'Pantry' },
      { name: 'White pepper', quantity: '1/4 tsp', category: 'Herbs & Spices' }
    ],
    instructions: [
      'Separate noodles. Marinate beef with 1 tbsp soy sauce and cornstarch.',
      'Mix sauce ingredients.',
      'Heat 1 tbsp oil in wok. Sear beef 1-2 minutes per side. Remove.',
      'Add remaining oil. Stir-fry garlic and Chinese broccoli stems 2-3 minutes.',
      'Push aside, scramble eggs. Add noodles, leaves, and carrot.',
      'Pour sauce over everything, toss 2-3 minutes.',
      'Return beef, toss 1 minute to heat through.',
      'Serve immediately.'
    ],
    equipment: ['Wok or large skillet']
  },
  {
    id: 'chicken-saag',
    name: 'Chicken in Creamy Spinach (Chicken Saag)',
    cuisine: 'Indian',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    calories: 580,
    protein: 48,
    carbohydrates: 45,
    fat: 22,
    fiber: 9,
    satietyRating: 4,
    difficulty: 'Easy',
    spiceLevel: 'Mild',
    description: 'A wholesome North Indian curry where tender chicken pieces are simmered in a vibrant, spiced spinach purée.',
    imagePrompt: 'Professional food photography of Indian Chicken Saag, overhead shot, natural lighting, vibrant green spinach curry with tender chicken pieces, creamy texture, on elegant dishware with rice, garnished with cream swirl, shallow depth of field, appetizing, Indian cuisine style',
    ingredients: [
      { name: 'Chicken breast or thighs', quantity: '1.5 lbs (680g)', category: 'Proteins' },
      { name: 'Fresh spinach', quantity: '10 oz (300g)', category: 'Produce' },
      { name: 'Vegetable oil', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Yellow onion', quantity: '1 large', category: 'Produce' },
      { name: 'Garlic', quantity: '3 cloves', category: 'Produce' },
      { name: 'Fresh ginger', quantity: '1 tbsp', category: 'Produce' },
      { name: 'Tomato', quantity: '1 large', category: 'Produce' },
      { name: 'Jalapeño', quantity: '1', category: 'Produce' },
      { name: 'Ground cumin', quantity: '1 tsp', category: 'Herbs & Spices' },
      { name: 'Ground coriander', quantity: '1 tsp', category: 'Herbs & Spices' },
      { name: 'Ground turmeric', quantity: '1/2 tsp', category: 'Herbs & Spices' },
      { name: 'Garam masala', quantity: '1/2 tsp', category: 'Herbs & Spices' },
      { name: 'Greek yogurt', quantity: '1/4 cup (60g)', category: 'Dairy' },
      { name: 'Water or chicken broth', quantity: '1/2 cup (120ml)', category: 'Pantry' },
      { name: 'Salt', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Brown basmati rice', quantity: '1 cup (185g)', category: 'Noodles & Rice' }
    ],
    instructions: [
      'Cook rice. Blanch spinach 1 minute, drain, rinse, squeeze dry, and chop.',
      'Heat oil. Sauté onion 6-8 minutes until golden.',
      'Add garlic, ginger, and jalapeño. Sauté 1 minute.',
      'Add cumin, coriander, and turmeric. Stir 30 seconds.',
      'Add chicken and salt, brown on all sides.',
      'Stir in tomato, cook 3-4 minutes until broken down.',
      'Add spinach and water. Simmer covered 10-15 minutes.',
      'Partially blend for creamy texture. Stir in garam masala and yogurt off heat. Serve with rice.'
    ],
    equipment: ['Large pot or Dutch oven', 'Immersion blender (optional)']
  },
  {
    id: 'bun-thit-nuong',
    name: 'Lemongrass Grilled Pork Noodle Bowls',
    cuisine: 'Vietnamese',
    prepTime: 25,
    cookTime: 15,
    servings: 4,
    calories: 640,
    protein: 38,
    carbohydrates: 70,
    fat: 23,
    fiber: 10,
    satietyRating: 4,
    difficulty: 'Medium',
    spiceLevel: 'Mild',
    description: 'Smoky, caramelized grilled pork served over cool vermicelli noodles with fresh vegetables and herbs.',
    imagePrompt: 'Professional food photography of Vietnamese Bun Thit Nuong, overhead shot, natural lighting, grilled lemongrass pork over white vermicelli noodles with fresh herbs and vegetables, fish sauce on side, vibrant colors, on elegant bowl, shallow depth of field, appetizing, Vietnamese cuisine style',
    ingredients: [
      { name: 'Pork shoulder or loin', quantity: '1.5 lbs (680g)', category: 'Proteins' },
      { name: 'Lemongrass', quantity: '3 stalks', category: 'Herbs & Spices' },
      { name: 'Garlic', quantity: '4 cloves', category: 'Produce' },
      { name: 'Shallots', quantity: '2', category: 'Produce' },
      { name: 'Fish sauce', quantity: '1/2 cup (120ml)', category: 'Sauces' },
      { name: 'Sugar', quantity: '1/4 cup + 2 tbsp', category: 'Pantry' },
      { name: 'Vegetable oil', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Black pepper', quantity: '1 tsp', category: 'Herbs & Spices' },
      { name: 'Rice vermicelli noodles', quantity: '7 oz (200g)', category: 'Noodles & Rice' },
      { name: 'Romaine lettuce', quantity: '1 head', category: 'Produce' },
      { name: 'Bean sprouts', quantity: '2 cups', category: 'Produce' },
      { name: 'English cucumber', quantity: '1', category: 'Produce' },
      { name: 'Carrots', quantity: '2 large', category: 'Produce' },
      { name: 'Roasted peanuts', quantity: '1/2 cup', category: 'Pantry' },
      { name: 'Fresh mint', quantity: '1 bunch', category: 'Herbs & Spices' },
      { name: 'Fresh cilantro', quantity: '1 bunch', category: 'Herbs & Spices' },
      { name: 'Lime juice', quantity: '1/4 cup (60ml)', category: 'Produce' },
      { name: 'Warm water', quantity: '1 cup (240ml)', category: 'Pantry' },
      { name: 'Thai chili', quantity: '1', category: 'Produce' }
    ],
    instructions: [
      'Marinate pork with lemongrass, garlic, shallots, 3 tbsp fish sauce, 2 tbsp sugar, oil, and pepper for 20 minutes.',
      'Cook vermicelli noodles, rinse with cold water, drain.',
      'Make dressing: mix remaining fish sauce, sugar, lime juice, water, garlic, and chili.',
      'Grill pork 2-4 minutes per side until caramelized.',
      'Divide noodles into bowls. Top with lettuce, bean sprouts, cucumber, and carrots.',
      'Slice pork and arrange on top.',
      'Garnish with peanuts, mint, and cilantro.',
      'Serve with dressing on the side.'
    ],
    equipment: ['Grill pan or broiler']
  },
  {
    id: 'beef-rendang',
    name: 'Dry Beef Rendang',
    cuisine: 'Indonesian',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    calories: 650,
    protein: 40,
    carbohydrates: 20,
    fat: 46,
    fiber: 8,
    satietyRating: 5,
    difficulty: 'Medium',
    spiceLevel: 'Spicy',
    description: 'A faster take on the iconic Indonesian slow-cooked curry with beef in a fragrant, spicy coconut milk paste.',
    imagePrompt: 'Professional food photography of Indonesian Beef Rendang, overhead shot, natural lighting, dark rich beef pieces coated in thick dark spice paste, garnished with toasted coconut, on elegant dishware with green beans, shallow depth of field, appetizing, Indonesian cuisine style',
    ingredients: [
      { name: 'Yellow onion', quantity: '1 large', category: 'Produce' },
      { name: 'Garlic', quantity: '4 cloves', category: 'Produce' },
      { name: 'Ginger', quantity: '2-inch piece', category: 'Produce' },
      { name: 'Galangal', quantity: '2-inch piece', category: 'Produce' },
      { name: 'Lemongrass', quantity: '2 stalks', category: 'Herbs & Spices' },
      { name: 'Red chilies', quantity: '2-3', category: 'Produce' },
      { name: 'Ground coriander', quantity: '1 tsp', category: 'Herbs & Spices' },
      { name: 'Ground turmeric', quantity: '1 tsp', category: 'Herbs & Spices' },
      { name: 'Vegetable oil', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Beef sirloin', quantity: '1.5 lbs (680g)', category: 'Proteins' },
      { name: 'Coconut milk', quantity: '13.5 oz can', category: 'Pantry' },
      { name: 'Cinnamon stick', quantity: '1', category: 'Herbs & Spices' },
      { name: 'Star anise', quantity: '2', category: 'Herbs & Spices' },
      { name: 'Tamarind paste', quantity: '1 tsp', category: 'Sauces' },
      { name: 'Brown sugar', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Salt', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Desiccated coconut', quantity: '1/2 cup (40g)', category: 'Pantry' },
      { name: 'Green beans', quantity: '1 lb (450g)', category: 'Produce' }
    ],
    instructions: [
      'Blend spice paste: onion, garlic, ginger, galangal, lemongrass, chilies, coriander, turmeric, and oil.',
      'Cook paste 5-7 minutes until fragrant and oil separates.',
      'Add thinly sliced beef, sear 2-3 minutes.',
      'Add coconut milk, cinnamon, star anise, tamarind mixed with 2 tbsp water, sugar, and salt.',
      'Simmer 20-25 minutes, stirring occasionally, until thick and dry.',
      'Stir in toasted coconut in last 5 minutes.',
      'Steam green beans separately.',
      'Serve rendang with green beans on the side.'
    ],
    equipment: ['Blender or food processor', 'Large skillet or wok']
  },
  {
    id: 'massaman-curry',
    name: 'Mild Peanut & Potato Curry (Massaman) with Beef',
    cuisine: 'Thai',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    calories: 650,
    protein: 42,
    carbohydrates: 55,
    fat: 32,
    fiber: 9,
    satietyRating: 5,
    difficulty: 'Easy',
    spiceLevel: 'Mild',
    description: 'A quick version of the rich Thai curry with beef and potatoes in a mild, creamy coconut-peanut sauce.',
    imagePrompt: 'Professional food photography of Thai Massaman Curry with beef, overhead shot, natural lighting, rich brown curry with beef chunks and golden potatoes, peanuts visible, in coconut sauce, on elegant bowl with rice, shallow depth of field, appetizing, Thai cuisine style',
    ingredients: [
      { name: 'Beef sirloin', quantity: '1.5 lbs (680g)', category: 'Proteins' },
      { name: 'Vegetable oil', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Massaman curry paste', quantity: '3 tbsp', category: 'Sauces' },
      { name: 'Coconut milk', quantity: '13.5 oz can', category: 'Pantry' },
      { name: 'Beef or chicken broth', quantity: '1 cup (240ml)', category: 'Pantry' },
      { name: 'Yukon Gold potatoes', quantity: '1 lb (450g)', category: 'Produce' },
      { name: 'Yellow onion', quantity: '1 large', category: 'Produce' },
      { name: 'Green beans', quantity: '2 cups (200g)', category: 'Produce' },
      { name: 'Fish sauce', quantity: '1 tbsp', category: 'Sauces' },
      { name: 'Tamarind paste', quantity: '1 tbsp', category: 'Sauces' },
      { name: 'Brown sugar', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Roasted peanuts', quantity: '1/4 cup (35g)', category: 'Pantry' },
      { name: 'Fresh cilantro', quantity: 'For garnish', category: 'Herbs & Spices' },
      { name: 'Brown jasmine rice', quantity: '1 cup (185g)', category: 'Noodles & Rice' }
    ],
    instructions: [
      'Cook rice according to package directions.',
      'Heat oil, fry curry paste 1 minute until fragrant.',
      'Add coconut milk and broth, whisk to combine.',
      'Add cubed potatoes and onion wedges. Simmer covered 15 minutes.',
      'Add sliced beef and green beans, simmer 5-7 minutes.',
      'Stir in fish sauce, tamarind, and sugar.',
      'Garnish with peanuts and cilantro.',
      'Serve with brown rice.'
    ],
    equipment: ['Large pot or Dutch oven']
  }
];

// Helper function to calculate satiety rating based on nutritional content
export function calculateSatiety(protein: number, fiber: number, fat: number): number {
  let rating = 2; // Base rating
  
  if (protein > 40) rating += 1.5;
  else if (protein > 30) rating += 1;
  else if (protein > 20) rating += 0.5;
  
  if (fiber > 10) rating += 1;
  else if (fiber > 8) rating += 0.75;
  else if (fiber > 5) rating += 0.5;
  
  if (fat > 35) rating += 0.5;
  else if (fat > 25) rating += 0.25;
  
  return Math.min(5, Math.round(rating));
}

// Helper function to get satiety description
export function getSatietyDescription(rating: number, protein: number, fiber: number): string {
  const levels = ['very light', 'light', 'moderate', 'filling', 'very filling'];
  const level = levels[Math.min(rating - 1, 4)];
  
  return `This meal is ${level} because of its ${protein > 30 ? 'high' : 'moderate'} protein (${protein}g) and ${fiber > 8 ? 'high' : 'moderate'} fiber (${fiber}g) content.`;
}