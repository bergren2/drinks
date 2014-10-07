/*globals ko, Qty*/
/*jslint todo: true*/

// Models

var Ingredient = function (name, amount) {
  this.name = name;
  this.amount = new Qty(amount);
};

var IngredientCollection = function (ingredientsArray) {
  var i;
  for (i = 0; i < ingredientsArray.length; i++) {
    this[ingredientsArray[i].name] = ingredientsArray[i].amount;
  }
  this._array = ingredientsArray; // TODO update
};

var Drink = function (name, ingredientsCollection) {
  this.name = name;
  this.ingredients = ingredientsCollection;
};

var DrinkCollection = function (drinksArray) {
  var that = this;

  var i;
  for (i = 0; i < drinksArray.length; i++) {
    this[drinksArray[i].name] = {};

    this[drinksArray[i].name] = drinksArray[i];
    this[drinksArray[i].name].quantity = ko.observable(0);
  }
  this._array = drinksArray; // TODO update

  this._totalAmountOf = function (name) {
    var quantity = Qty('0 ' + bar.stock[name].units());

    var key;
    for (key in that) {
      if (that.hasOwnProperty(key) && key[0] !== '_' &&
          that[key].quantity() > 0 &&
          that[key].ingredients[name] !== undefined) {
        quantity = quantity.add(that[key].ingredients[name].mul(that[key].quantity()));
      }
    }
    return quantity;
  };

  this._addDrink = function (drink) {
    var current = drink.quantity();

    var key;
    for (key in drink.ingredients) {
      if (drink.ingredients.hasOwnProperty(key) && key[0] !== '_') {
        if (drink.ingredients[key].add(that._totalAmountOf(key)).gt(bar.stock[key])) {
          return false;
        }
      }
    }
    drink.quantity(current + 1);
  };
  this._removeDrink = function (drink) {
    var current = drink.quantity();
    if (current > 0) {
      drink.quantity(current - 1);
    }
  };
};

var Bar = function (ingredientsCollection, drinkCollection) {
  this.stock = ingredientsCollection;
  this.orders = drinkCollection;
  var that = this;

  this.orders._place = function () {
    that._shouldShowOrdering(false);
    that._shouldShowSummary(true);
  };

  this.orders._total = function () {
    var total = 0;

    var key;
    for (key in that.orders) {
      if (that.orders.hasOwnProperty(key) && key[0] !== '_') {
        total += that.orders[key].quantity();
      }
    }

    return total;
  };

  this._shouldShowOrdering = ko.observable(true);
  this._shouldShowSummary = ko.observable(false);
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
    new Ingredient('Agave Nectar', '24 floz'),
    new Ingredient('Orange Juice', '48 floz'),
    new Ingredient('Limes', '36'),
    new Ingredient('Cherries', '9'),
    new Ingredient('Celery Stalks', '16'),
    new Ingredient('Olives', '24')
  ]),
  new DrinkCollection([
    new Drink('Bloody Mary', new IngredientCollection([
      new Ingredient('Vodka', '2 floz'),
      new Ingredient('Bloody Mary Mix', '4 floz'),
      new Ingredient('Celery Stalks', '1')
    ])),
    new Drink('Martini', new IngredientCollection([
      new Ingredient('Gin', '2 floz'),
      new Ingredient('Dry Vermouth', '1 floz'),
      new Ingredient('Olives', '1')
    ])),
    new Drink('Margarita', new IngredientCollection([
      new Ingredient('Tequila', '2 floz'),
      new Ingredient('Orange Juice', '1 floz'),
      new Ingredient('Agave Nectar', '1 floz'),
      new Ingredient('Limes', '1')
    ])),
    new Drink('Screwdriver', new IngredientCollection([
      new Ingredient('Vodka', '2 floz'),
      new Ingredient('Orange Juice', '4 floz')
    ])),
    new Drink('Manhattan', new IngredientCollection([
      new Ingredient('Whiskey', '2 floz'),
      new Ingredient('Sweet Vermouth', '1 floz'),
      new Ingredient('Cherries', '1')
    ]))
  ])
);
