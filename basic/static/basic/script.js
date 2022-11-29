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

document.addEventListener('DOMContentLoaded', function(){
    let api_btn = document.querySelector('#get-api-data-btn');
    api_btn.addEventListener('click', function(){
        console.log("works");
        exchange_rates();
    })
})

// exchange_rates();

function exchange_rates() {
        fetch('https://api.currencyapi.com/v3/latest?apikey=WFrsTGPjkGFnHgjFUek2eO0DXFNtL2zooJ4rE5NK')
        .then(response => response.json())
        .then(data => {
            let from = document.getElementById('exchange_from').value;
            let to = document.getElementById('exchange_to').value;

            from_USD = data.data[from].value;
            to_USD = data.data[to].value;
              
            let conversion_value = to_USD / from_USD;
            api_div = document.getElementById('exchange-info');
            api_div.innerHTML = `1 ${from} is ${conversion_value} ${to}`;
        })

}

