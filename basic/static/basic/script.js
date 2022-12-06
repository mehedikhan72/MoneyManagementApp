
document.addEventListener('DOMContentLoaded', function(){
  class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
      console.log("clear pressed")
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  if(equalsButton){
    equalsButton.addEventListener('click', button => {
      calculator.compute()
      calculator.updateDisplay()
    })
  }
  
  if(allClearButton){
    allClearButton.addEventListener('click', button => {
      calculator.clear()
      calculator.updateDisplay()
    })
  }
  
  if(deleteButton){
    deleteButton.addEventListener('click', button => {
      calculator.delete()
      calculator.updateDisplay()
    })
  }
})

// Calculator ends

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


function show_income_period(x){
  const income_period = document.querySelector("#income-period");
  const saving_goal = document.querySelector("#saving_goal");
  if (income_period.style.display === "none"){
    income_period.style.display = "block";
    saving_goal.style.display = "block"
    document.querySelectorAll(".income-buttons").forEach((button) => {
      button.style.background = "none";
    })
    x.style.background = "red";
    x.innerHTML = "Close";
  }
  else {
    income_period.style.display = "none";
    saving_goal.style.display = "none"
    document.querySelectorAll(".income-buttons").forEach((button) => {
      button.style.background = "none";
    })
    x.style.background = "none";
    x.innerHTML = "Custom";
  }
  
}

function set_income_period(x){

  let num = x.dataset.num;
  const income_period = document.querySelector("#income-period");
  const saving_goal = document.querySelector("#saving_goal");
  income_period.value = num;
  saving_goal.value = num;
  document.querySelectorAll(".income-buttons").forEach((button) => {
    button.style.background = "none";
  })
  x.style.background = "blue";
}

function set_income_period_edit(x){
  let num = x.dataset.num;
  const income_period = document.querySelector("#income_period_edit");
  const saving_goal = document.querySelector("#saving_goal_edit");
  income_period.value = num;
  saving_goal.value = num;
  document.querySelectorAll(".income-buttons").forEach((button) => {
    button.style.background = "none";
  })
  x.style.background = "blue";
}

function show_income_period_edit(x){
  const income_period_div = document.querySelector(".income_period_div")
  if (income_period_div.style.display !== "block"){
    document.querySelectorAll(".income_period_div").forEach((div) => {
      div.style.display = "block";
    });

    document.querySelectorAll(".income-buttons").forEach((button) => {
      button.style.background = "none";
    });

    x.style.background = "red";
    x.innerHTML = "Close";
  }
  else {
    document.querySelectorAll(".income_period_div").forEach((div) => {
      div.style.display = "none";
    });
    document.querySelectorAll(".income-buttons").forEach((button) => {
      button.style.background = "none";
    });
    x.style.background = "none";
    x.innerHTML = "Custom";
  }
}


function change_finance(x){
  document.querySelector(".user_finance_info").style.display = "none";
  document.querySelector(".user_finance_change_form").style.display = "block";
}


function update_finance_info(x){
  document.querySelector(".user_finance_change_form").style.display = "none";
  let income = document.querySelector("#edit_form_income").value;
  let income_period = document.querySelector("#income_period_edit").value;
  let balance = document.querySelector("#edit_form_balance").value;
  let saving_goal = document.querySelector("#edit_form_saving").value;
  let saving_period = document.querySelector("#saving_goal_edit").value;
  let income_div = document.querySelector("#finance_income");
  let income_period_div = document.querySelector("#finance_income_cycle");
  let balance_div = document.querySelector("#finance_balance");
  let saving_goal_div = document.querySelector("#finance_saving_goal");
  let saving_period_div = document.querySelector("#finance_goal");
  id = x.dataset.id;
  fetch(`/update/${id}`,{
    method: 'POST',
    body: JSON.stringify({
      income: income,
      income_period: income_period,
      balance: balance,
      saving_goal: saving_goal,
      saving_period: saving_period,
    })
    
  })
  .then((response) => response.json())
  .then(finance => {
    income_div.innerHTML = finance.income;
    income_period_div.innerHTML = finance.income_period;
    balance_div.innerHTML = finance.balance;
    saving_goal_div.innerHTML = finance.saving_goal;
    saving_period_div = finance.goal;
    document.querySelector(".user_finance_info").style.display = "block";
  })

  
  
}

