
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Separa os elementos da lista
const expenseList = document.querySelector("ul")
const expesesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")

document.oninput = () => {
  //Obtém o input e remove os não numericos
  let value = amount.value.replace(/\D/g, "")

  value = Number(value) / 100

  amount.value = formatCurrencyBRL(value) // Atualiza o valor do input
}

function formatCurrencyBRL(value) {
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

  expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
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

    //Cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    //Criando icone de remoção
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")


    //Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    //Adiciona o item na lista
    expenseList.append(expenseItem)

    //Chamando a função updateTotals
    updateTotals()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
  }
}

function updateTotals() {
  try {
    //Recupera todos os itens da lista
    const items = expenseList.children

    //Atualiza a quantidade de itens da lista

    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    let total = 0

    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      // converte os caracteres não númericos para número

      let value = itemAmount.textContent.replace(/\D/g, "").replace(",", ".")

      //converte o valor para float
      value = parseFloat(value)

      //Verifica se o número é válido
      if (isNaN(value)) {
        return alert("Não foi possível calcular o total. O valor não parece ser um número.")
      }

      total+= Number(value)
    }

  


  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar o total das despesas.")

  }
}
