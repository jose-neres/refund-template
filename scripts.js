const amount = document.getElementById ("amount")


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