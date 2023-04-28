const { randomBytes } = await import('node:crypto');
import { PUBLIC_VITE_POCKETBASE_URL } from '$env/static/public';

// Serialize non-plain-old-Javascript-objects (POJOs)
export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

// Generate a username from a given name by appending a randomly-generated ID
export const generateUsername = (name) => {
	// Generate a random 2-byte hexadecimal string
	const id = randomBytes(2).toString('hex');
	// Concatenate the first 5 characters of the name with the ID
	return `${name.slice(0, 5)}${id}`;
};

// Get the URL of an image with the specified collection ID, record ID, and file name
export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `${PUBLIC_VITE_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

// Abbreviate a number with a specified number of digits (e.g., 1000000 -> 1M)
export const abbrNum = (n, d) => {
	// Get the length of the number as a string
	let x = ('' + n).length;
	// Calculate the power of 10 corresponding to the number's order of magnitude
	let p = Math.pow;
	d = p(10, d);
	x -= x % 3;
	// Round the number to the specified number of digits and append an appropriate unit suffix
	return Math.round((n * d) / p(10, x)) / d + ' kMGTPE'[x / 3];
};

// Convert a date to a string representing the time elapsed since that date
export const timeSince = (date) => {
	var seconds = Math.floor((new Date() - date) / 1000);

	var interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + ' years';
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + ' months';
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + ' days';
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + ' hours';
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + ' minutes';
	}
	return Math.floor(seconds) + ' seconds';
};

// Define data and defaults for badges

// Utils for Badges

export const BadgeData = {
	Login_Goal: {
		tier: 0,
		progress: 0,
		hint: 'Earn points by logging data',
		threshold: {
			1: 3,
			2: 7,
			3: 14
		}
	},
	Weight_Goal: {
		tier: 0,
		progress: 0,
		hint: 'Earn points by hitting your weight goal and staying in good standing BMI range',
		threshold: {
			1: 3,
			2: 7,
			3: 14
		}
	}
};

export const EmptyBadge = {
	Login_Goal: {
		tier: 0,
		progress: 0
	},
	Weight_Goal: {
		tier: 0,
		progress: 0
	}
};

// Utils for food Items

export const foodItems = {
	Proteins: {
		Beef: {
			calories: 250,
			fats: 20,
			carbohydrates: 0,
			proteins: 26
		},
		Chicken: {
			calories: 239,
			fats: 14,
			carbohydrates: 0,
			proteins: 27
		},
		Salmon: {
			calories: 208,
			fats: 13,
			carbohydrates: 0,
			proteins: 20
		},
		Pork: {
			calories: 242,
			fats: 16,
			carbohydrates: 0,
			proteins: 24
		},
		Eggs: {
			calories: 155,
			fats: 11,
			carbohydrates: 1,
			proteins: 13
		},
		Tofu: {
			calories: 76,
			fats: 4,
			carbohydrates: 2,
			proteins: 8
		},
		Lentils: {
			calories: 116,
			fats: 0.4,
			carbohydrates: 20,
			proteins: 9
		},
		Chickpeas: {
			calories: 364,
			fats: 6,
			carbohydrates: 61,
			proteins: 20
		},
		Beans: {
			calories: 341,
			fats: 1.4,
			carbohydrates: 63,
			proteins: 21
		},
		Quinoa: {
			calories: 120,
			fats: 2,
			carbohydrates: 21,
			proteins: 4
		},
		Almonds: {
			calories: 579,
			fats: 49,
			carbohydrates: 22,
			proteins: 21
		},
		Peanut_butter: {
			calories: 588,
			fats: 50,
			carbohydrates: 20,
			proteins: 25
		},
		Shrimp: {
			calories: 85,
			fats: 1.1,
			carbohydrates: 0.2,
			proteins: 18
		},
		Cod: {
			calories: 82,
			fats: 0.7,
			carbohydrates: 0,
			proteins: 18
		},
		Tuna: {
			calories: 116,
			fats: 0.8,
			carbohydrates: 0,
			proteins: 28
		},
		Sardines: {
			calories: 208,
			fats: 11,
			carbohydrates: 0,
			proteins: 24
		},
		Beef_Jerky: {
			calories: 410,
			fats: 15,
			carbohydrates: 10,
			proteins: 50
		},
		Whey_Protein_Powder: {
			calories: 394,
			fats: 5,
			carbohydrates: 11,
			proteins: 78
		},
		Seitan: {
			calories: 120,
			fats: 1.5,
			carbohydrates: 4,
			proteins: 24
		},
		Tempeh: {
			calories: 193,
			fats: 11,
			carbohydrates: 7,
			proteins: 19
		},
		Edamame: {
			calories: 121,
			fats: 5,
			carbohydrates: 10,
			proteins: 11
		}
	},
	Grains: {
		Rice_White: {
			calories: 130,
			fats: 0.3,
			carbohydrates: 28.7,
			proteins: 2.7
		},
		Bread_White: {
			calories: 265,
			fats: 3.2,
			carbohydrates: 49.5,
			proteins: 8.5
		},
		Oats: {
			calories: 389,
			fats: 6.9,
			carbohydrates: 66.3,
			proteins: 16.9
		},
		Cornmeal: {
			calories: 370,
			fats: 1.2,
			carbohydrates: 79.6,
			proteins: 7.3
		},
		Barley: {
			calories: 354,
			fats: 2.3,
			carbohydrates: 73.5,
			proteins: 12.5
		},
		Pasta_Spaghetti: {
			calories: 131,
			fats: 1.3,
			carbohydrates: 25.5,
			proteins: 5.1
		},
		Bread_Whole_Wheat: {
			calories: 247,
			fats: 3.1,
			carbohydrates: 45.4,
			proteins: 12.4
		},
		Rice_Brown: {
			calories: 111,
			fats: 0.9,
			carbohydrates: 23.5,
			proteins: 2.6
		},
		Bread_Rye: {
			calories: 259,
			fats: 1.9,
			carbohydrates: 51.8,
			proteins: 6.5
		},
		Bread_Multigrain: {
			calories: 277,
			fats: 4.3,
			carbohydrates: 47.2,
			proteins: 10.1
		},
		Quinoa: {
			calories: 120,
			fats: 1.9,
			carbohydrates: 21.3,
			proteins: 4.4
		},
		Corn_Tortilla: {
			calories: 218,
			fats: 3.9,
			carbohydrates: 41.7,
			proteins: 4.6
		},
		Popcorn: {
			calories: 387,
			fats: 4.3,
			carbohydrates: 78.1,
			proteins: 12.9
		},
		Couscous: {
			calories: 112,
			fats: 0.3,
			carbohydrates: 23.2,
			proteins: 3.8
		}
	},
	Fruits: {
		Apple: {
			calories: 52,
			fats: 0.2,
			carbohydrates: 14,
			proteins: 0.3
		},

		Banana: {
			calories: 89,
			fats: 0.3,
			carbohydrates: 23,
			proteins: 1.1
		},

		Orange: {
			calories: 47,
			fats: 0.1,
			carbohydrates: 12,
			proteins: 0.9
		},

		Grapes: {
			calories: 69,
			fats: 0.2,
			carbohydrates: 18,
			proteins: 0.7
		},

		Kiwi: {
			calories: 61,
			fats: 0.5,
			carbohydrates: 15,
			proteins: 1.1
		},

		Mango: {
			calories: 60,
			fats: 0.4,
			carbohydrates: 15,
			proteins: 0.8
		},

		Pineapple: {
			calories: 50,
			fats: 0.1,
			carbohydrates: 13,
			proteins: 0.5
		},

		Strawberry: {
			calories: 32,
			fats: 0.3,
			carbohydrates: 8,
			proteins: 0.7
		},

		Watermelon: {
			calories: 30,
			fats: 0.2,
			carbohydrates: 8,
			proteins: 0.6
		},
		Peach: {
			calories: 39,
			fats: 0.3,
			carbohydrates: 10,
			proteins: 0.9
		},

		Pear: {
			calories: 57,
			fats: 0.1,
			carbohydrates: 15,
			proteins: 0.4
		},

		Plum: {
			calories: 46,
			fats: 0.3,
			carbohydrates: 11,
			proteins: 0.7
		},

		Cherry: {
			calories: 63,
			fats: 0.3,
			carbohydrates: 16,
			proteins: 1.1
		},

		Blueberry: {
			calories: 57,
			fats: 0.3,
			carbohydrates: 14,
			proteins: 0.7
		},

		Raspberry: {
			calories: 52,
			fats: 0.7,
			carbohydrates: 12,
			proteins: 1.2
		},

		Blackberry: {
			calories: 43,
			fats: 0.5,
			carbohydrates: 10,
			proteins: 1
		},

		Cantaloupe: {
			calories: 34,
			fats: 0.2,
			carbohydrates: 9,
			proteins: 0.8
		},

		Honeydew: {
			calories: 36,
			fats: 0.1,
			carbohydrates: 9,
			proteins: 0.5
		},
		Guava: {
			calories: 68,
			fats: 1,
			carbohydrates: 14,
			proteins: 2.6
		},

		Papaya: {
			calories: 43,
			fats: 0.3,
			carbohydrates: 11,
			proteins: 0.5
		},

		Pomegranate: {
			calories: 83,
			fats: 1.2,
			carbohydrates: 19,
			proteins: 1.7
		},

		Apricot: {
			calories: 48,
			fats: 0.4,
			carbohydrates: 11,
			proteins: 1.4
		},

		Fig: {
			calories: 74,
			fats: 0.3,
			carbohydrates: 19,
			proteins: 0.8
		},

		Mandarin: {
			calories: 53,
			fats: 0.3,
			carbohydrates: 13,
			proteins: 0.7
		},

		Starfruit: {
			calories: 31,
			fats: 0.2,
			carbohydrates: 6,
			proteins: 0.7
		},

		Clementine: {
			calories: 47,
			fats: 0.3,
			carbohydrates: 12,
			proteins: 0.9
		},

		Grapefruit: {
			calories: 42,
			fats: 0.1,
			carbohydrates: 11,
			proteins: 0.8
		},

		Lemon: {
			calories: 29,
			fats: 0.3,
			carbohydrates: 9,
			proteins: 1.1
		}
	},
	Veggies: {
		Asparagus: {
			calories: 20,
			fats: 0.2,
			carbohydrates: 3.4,
			proteins: 2.2
		},

		Broccoli: {
			calories: 34,
			fats: 0.4,
			carbohydrates: 6.6,
			proteins: 2.8
		},

		Carrot: {
			calories: 41,
			fats: 0.2,
			carbohydrates: 9.6,
			proteins: 0.9
		},

		Cauliflower: {
			calories: 25,
			fats: 0.3,
			carbohydrates: 5,
			proteins: 2
		},

		Cucumber: {
			calories: 16,
			fats: 0.1,
			carbohydrates: 3.6,
			proteins: 0.7
		},

		Green_beans: {
			calories: 31,
			fats: 0.2,
			carbohydrates: 7.1,
			proteins: 1.8
		},

		Kale: {
			calories: 49,
			fats: 0.9,
			carbohydrates: 8.8,
			proteins: 4.3
		},

		Peas: {
			calories: 81,
			fats: 0.4,
			carbohydrates: 14.5,
			proteins: 5.4
		},

		Spinach: {
			calories: 23,
			fats: 0.4,
			carbohydrates: 3.6,
			proteins: 2.9
		},

		Zucchini: {
			calories: 17,
			fats: 0.3,
			carbohydrates: 3.1,
			proteins: 1.2
		},
		Artichoke: {
			calories: 47,
			fats: 0.2,
			carbohydrates: 10.5,
			proteins: 3.3
		},

		Beetroot: {
			calories: 43,
			fats: 0.2,
			carbohydrates: 9.6,
			proteins: 1.6
		},

		Cabbage: {
			calories: 25,
			fats: 0.1,
			carbohydrates: 5.8,
			proteins: 1.3
		},

		Celery: {
			calories: 16,
			fats: 0.2,
			carbohydrates: 2.2,
			proteins: 0.7
		},

		Eggplant: {
			calories: 25,
			fats: 0.2,
			carbohydrates: 5.9,
			proteins: 1
		},

		Green_peppers: {
			calories: 20,
			fats: 0.2,
			carbohydrates: 4.6,
			proteins: 0.9
		},

		Mushrooms: {
			calories: 22,
			fats: 0.3,
			carbohydrates: 3.3,
			proteins: 3.1
		},

		Onion: {
			calories: 40,
			fats: 0.1,
			carbohydrates: 9.3,
			proteins: 1.1
		},

		Potatoes: {
			calories: 77,
			fats: 0.1,
			carbohydrates: 17,
			proteins: 2
		},

		Tomatoes: {
			calories: 18,
			fats: 0.2,
			carbohydrates: 3.9,
			proteins: 0.9
		}
	},
	Fats: {
		Butter: {
			calories: 717,
			fats: 81,
			carbohydrates: 0.1,
			proteins: 0.9
		},

		Coconut_Oil: {
			calories: 884,
			fats: 100,
			carbohydrates: 0,
			proteins: 0
		},

		Avocado: {
			calories: 160,
			fats: 15,
			carbohydrates: 9,
			proteins: 2
		},

		Peanut_Butter: {
			calories: 588,
			fats: 50,
			carbohydrates: 20,
			proteins: 25
		},

		Almonds: {
			calories: 579,
			fats: 50,
			carbohydrates: 22,
			proteins: 21
		},

		Cheese: {
			calories: 402,
			fats: 33,
			carbohydrates: 1.3,
			proteins: 25
		},

		Egg_Yolk: {
			calories: 322,
			fats: 27,
			carbohydrates: 6,
			proteins: 16
		},

		Dark_Chocolate: {
			calories: 546,
			fats: 31,
			carbohydrates: 61,
			proteins: 6
		},
		Bacon: {
			calories: 541,
			fats: 42,
			carbohydrates: 0,
			proteins: 37
		}
	},
	Dairy: {
		Milk: {
			calories: 42,
			fats: 1,
			carbohydrates: 5,
			proteins: 3.4
		},
		Cheese: {
			calories: 402,
			fats: 33.1,
			carbohydrates: 1.3,
			proteins: 25.4
		},
		Yogurt: {
			calories: 59,
			fats: 3.3,
			carbohydrates: 3.6,
			proteins: 3.5
		},
		Cottage_cheese: {
			calories: 98,
			fats: 4.3,
			carbohydrates: 3.4,
			proteins: 11.1
		},
		Sour_cream: {
			calories: 198,
			fats: 20,
			carbohydrates: 3.2,
			proteins: 2.4
		},
		Heavy_cream: {
			calories: 340,
			fats: 36,
			carbohydrates: 2.9,
			proteins: 2.1
		},
		Condensed_milk: {
			calories: 321,
			fats: 8.9,
			carbohydrates: 54.4,
			proteins: 7.9
		},
		Ice_cream: {
			calories: 137,
			fats: 7.2,
			carbohydrates: 16.7,
			proteins: 2.6
		},
		Powdered_milk: {
			calories: 496,
			fats: 26,
			carbohydrates: 38,
			proteins: 26
		},
		Mozzarella: {
			calories: 280,
			fats: 22,
			carbohydrates: 2.2,
			proteins: 17
		},
		Ricotta_cheese: {
			calories: 174,
			fats: 10,
			carbohydrates: 3.3,
			proteins: 16
		},
		Feta_cheese: {
			calories: 264,
			fats: 21,
			carbohydrates: 4.1,
			proteins: 14
		},
		Greek_yogurt: {
			calories: 59,
			fats: 0.4,
			carbohydrates: 3.6,
			proteins: 10
		}
	}
};
