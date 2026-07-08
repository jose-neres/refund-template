
const form = document.querySelector("form")
const amount = document.getElementById ("amount")
const expense = document.getElementById ("expense")
const category = document.getElementById ("category")

//Separa os elementos da lista

const expenseList = document.querySelector("ul")

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
  // Cria o elemento para adicionar a despesa na lista
  try {
    // Cria o elemento para adicionar a despesa na lista
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    //Criando a informação da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    //Cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    //Criando o nome da categoria
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    //Adiciona name e category dentro da div info
    expenseInfo.append(expenseName, expenseCategory)


    //Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo)

    //Adiciona o item na lista
    expenseList.append(expenseItem)

  }catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
  }
}
