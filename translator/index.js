module.exports.text = text;
module.exports.translate = translate;

const translateWords = {
  ru: {
      'My Profile': 'Мой Профиль',
      'New Recipes': 'Новые рецепты',
      'My Recipes': 'Мои Рецепты',
      'Add Recipe': 'Добавить рецепт',

      'Image': 'Изображение',
      'Name': 'Название',
      'Description': 'Описание',
      'Ingredients': 'Ингредиенты',
      'Go To': 'Перейти',
      'Instruction': 'Инструкция',
      'Date Added': 'Дата добавления',
      'Author': 'Автор',
  },
  en: {
      'My Profile': 'My Profile',
      'New Recipes': 'New Recipes',
      'My Recipes': 'My Recipes',
      'Add Recipe': 'Add Recipe',
      'Image': 'Image',
      'Name': 'Name',
      'Description': 'Description',
      'Ingredients': 'Ingredients',
      'Go To': 'Go To',
      'Instruction': 'Instruction',
      'Date Added': 'Date Added',
      'Author': 'Author',
    }
};

function text(msg) {
    return msg;
}

function translate(lang, array) {
    if (!array) return;

    const wordsTranslate = translateWords[lang];
    for (let key in array) {
        array[key] = wordsTranslate[array[key]] || array[key];
    }
    return array;
}