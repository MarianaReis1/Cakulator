import type { Ingredient } from "~/types";

export const generateTempId = () => Date.now();


export const handleCopy = (ingredients: Ingredient[]) => {
    const formattedINgredients = ingredients.map(
      (ingredient) =>
        `${ingredient.quantity} ${ingredient.unit} - ${ingredient.name}`,
    )
    .join("\n");


  navigator.clipboard
    .writeText(formattedINgredients)
    .then(() => {
      console.log("Copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

export const handlePrint = (ingredients: Ingredient[]) => {
  const printWindow = window.open("", "", "height=600,width=800");
  const ingredientsText = ingredients
    .map(
      (ingredient) =>
        `${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}`,
    )
    .join("<br>");


  printWindow?.document.write(
    "<html><head><title>Here is your list of ingredients</title></head><body>",
  );
  printWindow?.document.write(ingredientsText);
  printWindow?.document.write("</body></html>");
  printWindow?.document.close();
  printWindow?.print();
};

export const pluralize = (word: string, count: number) => {
  if (count === 1) {
    return word;
  }

  // Rule for words ending in 'y' preceded by a consonant
  if (word.match(/[^aeiou]y$/i)) {
    return word.replace(/y$/i, 'ies');
  }
  // Rule for words ending in 'o'
  if (word.match(/o$/i)) {
    return word.replace(/o$/i, 'oes');
  }
  // Rule for words ending in 's', 'x', 'z', 'ch', or 'sh'
  if (word.match(/(s|x|z|ch|sh)$/i)) {
    return word + 'es';
  }
  // Rule for words ending in 'f' or 'fe'
  if (word.match(/(f|fe)$/i)) {
    return word.replace(/(f|fe)$/i, 'ves');
  }
  // Default rule: add 's'
  return word + 's';
};
