// Models

var Ingredient = function (name, amount, units) {
  this.name = name;
  this.amount = amount;
  if (typeof units === 'undefined') {
    this.units = null; // default
  } else {
    this.units = units;
  }
};

var Drink = function (name, ingredients) {
  this.name = name;
  this.ingredients = ingredients;
};

var actions = {
  addDrink: function (drink) {
    console.log('add drink ' + drink.name);
  },
  removeDrink: function (drink) {
    console.log('remove drink ' + drink.name);
  },
  placeOrder: function () {
    console.log('place order');
  }
};

// Initialize

var barStock = [
  new Ingredient('Vodka', 750, 'mL'),
  new Ingredient('Gin', 1.5, 'L'),
  new Ingredient('Tequila', 750, 'mL'),
  new Ingredient('Whiskey', 750, 'mL'),
  new Ingredient('Sweet Vermouth', 750, 'mL'),
  new Ingredient('Dry Vermouth', 750, 'mL'),
  new Ingredient('Bloody Mary Mix', 750, 'L'),
  new Ingredient('Agave Nectar', 24, 'oz'),
  new Ingredient('Orange Juice', 48, 'oz'),
  new Ingredient('Limes', 36),
  new Ingredient('Cherries', 9),
  new Ingredient('Celery Stalks', 16),
  new Ingredient('Olives', 24)
];

var drinks = [
  new Drink('Bloody Mary', [
    new Ingredient('Vodka', 2, 'oz'),
    new Ingredient('Bloody Mary Mix', 4, 'oz'),
    new Ingredient('Celery Stick', 1)
  ]),
  new Drink('Martini', [
    new Ingredient('Gin', 2, 'oz'),
    new Ingredient('Dry Vermouth', 1, 'oz'),
    new Ingredient('Olive', 1, 'oz')
  ]),
  new Drink('Margarita', [
    new Ingredient('Tequila', 2, 'oz'),
    new Ingredient('Orange Juice', 1, 'oz'),
    new Ingredient('Agave Nectar', 1, 'oz'),
    new Ingredient('Limes', 1, 'oz')
  ]),
  new Drink('Screwdriver', [
    new Ingredient('Vodka', 2, 'oz'),
    new Ingredient('Orange Juice', 4, 'oz')
  ]),
  new Drink('Manhattan', [
    new Ingredient('Whiskey', 2, 'oz'),
    new Ingredient('Sweet Vermouth', 1, 'oz'),
    new Ingredient('Cherry', 1)
  ])
];
