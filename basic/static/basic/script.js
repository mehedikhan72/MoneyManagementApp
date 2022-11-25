function expenditure_list_show(x){
    const div1 = document.querySelector('.expenditure_div')
    div1.style.display = "block";
}

function expenditure_list_close(x){
    const div1 = document.querySelector('.expenditure_div')
    div1.style.display = "none";
}

function remove_item(x){
    id = x.dataset.id
    fetch(`/remove_expenditure/${id}`, {
        method: 'PUT',
    })
    .then(response => response.json())
    .then(finance => {
        const div2 = document.querySelector(`#expenditure_item_${id}`);
        div2.style.display = "none";
        const para = document.querySelector(`.total_expenditure`);
        const para1 = document.querySelector(`.daily_expn`);
        const hr = document.querySelector(`#expenditure_hr_${id}`);
        hr.remove();
        para.innerHTML = "Your total expenditure is " + finance.total_expenditure;
        para1.innerHTML = "Your total daily expenditure is " + finance.daily_expenditure;
    })
}