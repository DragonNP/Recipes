let i = 0;

function addIngredient(){
    let str = '<div class="ingredient">';

    str += `<input placeholder="Ингредиент" type="text" name="name_${i}"/>`;
    str += `<input placeholder="Кол-во" type="number" name="value_${i}"/>`;

    str += `<select name="unit_${i}">`;
    str += '<option disabled>Выберете ед. измер.</option>';
    str += '<option selected value="gr">gr</option>';
    str += '<option value="ml">ml</option>';

    str += '</select></div>';
    document.getElementById('ingredients').insertAdjacentHTML('beforeend', str);
    document.getElementsByName('numberIngredients')[0].value = i;
    i++;
}