/*globals ko, Qty*/
/*jslint todo: true*/

// Models

var Ingredient = function (name, amount) {
  this.name = name;
  if (typeof amount === 'number') {
    this.amount = new Qty(amount.toString());
  } else {
    this.amount = new Qty(amount);
  }
};

var IngredientCollection = function (ingredientsArray) {
  this.ingredients = {};

  var i;
  for (i = 0; i < ingredientsArray.length; i++) {
    this.ingredients[ingredientsArray[i].name] = ingredientsArray[i].amount;
  }
  this.array = ingredientsArray; // TODO update
};

var Drink = function (name, ingredientsCollection) {
  this.name = name;
  this.ingredients = ingredientsCollection;
  this.quantity = ko.observable(0);
};

var DrinkCollection = function (drinksArray) {
  this.drinks = {};

  var i;
  for (i = 0; i < drinksArray.length; i++) {
    this.drinks[drinksArray[i].name] = {};

    this.drinks[drinksArray[i].name] = drinksArray[i];
  }
  this.array = drinksArray; // TODO update

  this.addDrink = function (drink) {
    var current = drink.quantity();
    drink.quantity(current + 1);
  };
  this.removeDrink = function (drink) {
    var current = drink.quantity();
    if (current > 0) {
      drink.quantity(current - 1);
    }
  };
};

var Bar = function (ingredientsCollection, drinkCollection) {
  this.stock = ingredientsCollection;
  this.orders = drinkCollection;
};

// Initialize
var bar = new Bar(
  new IngredientCollection([
    new Ingredient('Vodka', '750 mL'),
    new Ingredient('Gin', '1.5 L'),
    new Ingredient('Tequila', '750 mL'),
    new Ingredient('Whiskey', '750 mL'),
    new Ingredient('Sweet Vermouth', '750 mL'),
    new Ingredient('Dry Vermouth', '750 mL'),
    new Ingredient('Bloody Mary Mix', '750 L'),
    new Ingredient('Agave Nectar', '24 oz'),
    new Ingredient('Orange Juice', '48 oz'),
    new Ingredient('Limes', 36),
    new Ingredient('Cherries', 9),
    new Ingredient('Celery Stalks', 16),
    new Ingredient('Olives', 24)
  ]),
  new DrinkCollection([
    new Drink('Bloody Mary', new IngredientCollection([
      new Ingredient('Vodka', '2 oz'),
      new Ingredient('Bloody Mary Mix', '4 oz'),
      new Ingredient('Celery Stick', 1)
    ])),
    new Drink('Martini', new IngredientCollection([
      new Ingredient('Gin', '2 oz'),
      new Ingredient('Dry Vermouth', '1 oz'),
      new Ingredient('Olive', '1 oz')
    ])),
    new Drink('Margarita', new IngredientCollection([
      new Ingredient('Tequila', '2 oz'),
      new Ingredient('Orange Juice', '1 oz'),
      new Ingredient('Agave Nectar', '1 oz'),
      new Ingredient('Limes', '1 oz')
    ])),
    new Drink('Screwdriver', new IngredientCollection([
      new Ingredient('Vodka', '2 oz'),
      new Ingredient('Orange Juice', '4 oz')
    ])),
    new Drink('Manhattan', new IngredientCollection([
      new Ingredient('Whiskey', '2 oz'),
      new Ingredient('Sweet Vermouth', '1 oz'),
      new Ingredient('Cherry', 1)
    ]))
  ])
);
