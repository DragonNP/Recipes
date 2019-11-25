module.exports.getNameLang = getNameLang;
module.exports.translate = translate;
module.exports.getLanguages = getLanguages;

const translateWords = {
  ru: {
      'My Profile': 'Мой Профиль',
      'New Recipes': 'Новые рецепты',
      'My Recipes': 'Мои Рецепты',
      'Add Recipe': 'Добавить рецепт',
      'Favorites': 'Избранное',

      'Notification': 'Уведомления',
      'Clear All': 'Очистить всё',
      'No Notifications': 'Нету уведомлений',

      'Welcome': 'Добро Пожаловать',
      'Edit': 'Изменить',
      'Settings': 'Настройки',
      'Logout': 'Выйти',

      'Image': 'Изображение',
      'Name': 'Название',
      'Description': 'Описание',
      'Ingredients': 'Ингредиенты',
      'Go To': 'Перейти',
      'Instruction': 'Инструкция',
      'Date Added': 'Дата добавления',
      'Author': 'Автор',

      'Error': 'Ошибка',
      'You are not authorized': 'Вы не авторизованны',
      'Sign Up': 'Зарегистроваться',
      'Sign In': 'Войти',
      'You do not have an account': 'У вас нет учетной записи',
      'Do you have an account': 'У вас есть учётная запись'
  }
};

const languages = {
    'ru': 'Русский',
    'us': 'English'
};

function getNameLang(domain) {
    return languages[domain];
}

function translate(lang, array) {
    if (!array) return;

    const wordsTranslate = translateWords[lang];
    if(wordsTranslate === undefined) return array;

    for (let key in array) {
        array[key] = wordsTranslate[array[key]] || array[key];
    }
    return array;
}

function getLanguages() {
    return languages;
}