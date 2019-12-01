module.exports.getNameLang = getNameLang;
module.exports.translate = translate;
module.exports.getLanguages = getLanguages;

const translateWords = {
  ru: {
      'Registration': 'Регистрация',
      'Login': 'Вход',

      'My Profile': 'Мой Профиль',
      'New Recipes': 'Новые рецепты',
      'My Recipes': 'Мои Рецепты',
      'Add Recipe': 'Добавить рецепт',
      'Favorites': 'Избранное',
      'Home': 'Домой',
      'or': 'или',

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
      'Do you have an account': 'У вас есть учётная запись',

      'Enter name recipe': 'Введите название рецепта',
      'Enter description': 'Введите описание',
      'Enter path image': 'Вставте ссылку с картонкой',

      'Enter name ingredient': 'Введите название ингредиента',
      'Enter quantity': 'Введите количество',
      'Select the unit of measure': 'Выберите единицу измерения',
      'piece': 'шт',
      'gram': 'грам',
      'milliliter': 'миллилитр',
      'liter': 'литр',
      'cup': 'кружка',
      'teaspoon': 'чайная ложка',
      'tablespoon': 'столовая ложка',

      'Username': 'Имя пользователя',
      'Password': 'Пароль',
      'Email': 'Электронная почта',
      'Don\'t have an account': 'У вас нет учетной записи',
      'Create your own account, it takes less than a minute': 'Создайте свой аккаунт, это займет не более минуты',
      'Enter username': 'Введите имя пользователя',
      'Enter your email': 'Введите свой адрес электронной почты',
      'Enter your password': 'Введите пароль',
      'Already have account': 'Уже есть аккаунт',
      'Remember me': 'Запомнить меня'
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