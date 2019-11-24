let i = -1;

function addIngredient(){
    i++;
    let str = `<div id="ingredient" class="row">`;

    str += `<div class="col-lg-4"> <input type="text" name="name_${i}" parsley-trigger="change" required placeholder="Enter Ingredient" class="form-control"/> </div>`;
    str += `<div class="col-lg-4"> <input type="number" name="value_${i}" parsley-trigger="change" required placeholder="Enter quantity"  min="1" class="form-control"/>  </div>`;

    str += `<div class="col-lg-4"> <select name="unit_${i}" parsley-trigger="change" required class="form-control">`;
    str += '<option disabled>Select the unit of measure</option>';
    str += '<option selected value="gr">gr</option>';
    str += '<option value="ml">ml</option>';
    str += '<option value="cup">cup</option>';
    str += '<option value="teaspoon">teaspoon</option>';
    str += '<option value="teaspoon">tablespoon</option>';
    str += '</select> </div>';

    str += '</div>';
    document.getElementById('ingredients').insertAdjacentHTML('beforeend', str);
    document.getElementsByName('numberIngredients')[0].value = i;

}

addIngredient();