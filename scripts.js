
const form = document.querySelector("form")
const amount = document.getElementById ("amount")
const expense = document.getElementById ("expense")
const category = document.getElementById ("category")


document.oninput = () => {
  //Obtém o input e remove os não numericos
  let value = amount.value.replace(/\D/g, "")

  value = Number(value) / 100

  amount.value = formatCurrencyBRL(value) // Atualiza o valor do input
}

function formatCurrencyBRL (value){
  //formata para o valor brasileiro BRL
  value = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })
  
  return value //Retorna o valor formatado
}


form.onsubmit = (event) => {
  // Previne o comportamento de carregamento da página
  event.preventDefault()

// Criando um objeto com todas informações das despesas
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  console.log(newExpense)

expenseAdd(newExpense)
}

function expenseAdd(newExpense){
  try {

  }catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
  }
}
