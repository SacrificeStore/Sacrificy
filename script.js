let estoque = {
    "Corta Vento Nike": 1,
    "Jaqueta Corta Vento Oakley": 0
};

function adicionarAoCarrinho(produto, preco) {
    if (estoque[produto] > 0) {
        // Adiciona o item ao carrinho
        const listaCarrinho = document.getElementById('itens-carrinho');
        const novoItem = document.createElement('li');
        novoItem.textContent = `${produto} - R$ ${preco.toFixed(2)}`;
        listaCarrinho.appendChild(novoItem);

        // Atualiza o total
        let total = parseFloat(document.getElementById('total').textContent);
        total += preco;
        document.getElementById('total').textContent = total.toFixed(2);

        // Diminui o estoque do produto
        estoque[produto]--;

        // Atualiza o estoque visível no produto
        atualizarEstoque(produto);

        if (estoque[produto] === 0) {
            // Torna o produto indisponível se o estoque for 0
            const botoes = document.querySelectorAll('button');
            botoes.forEach(botao => {
                if (botao.getAttribute('onclick') === `adicionarAoCarrinho('${produto}', ${preco})`) {
                    botao.disabled = true;
                    botao.textContent = 'Indisponível';
                    botao.classList.add('botao-vendido');
                }
            });
        }

        // Exibir informações do Pix
        document.getElementById('pix-info').style.display = 'block';

        // Após 8 segundos, mostrar o botão "Finalizar Compra"
        setTimeout(() => {
            document.getElementById('finalizar-btn').style.display = 'block';
        }, 8000);
    } else {
        exibirMensagem('Produto esgotado.', 'erro', '❌');
    }
}

// Função para atualizar a exibição do estoque no HTML
function atualizarEstoque(produto) {
    const estoqueElemento = document.querySelector(`#estoque-${produto}`);
    if (estoqueElemento) {
        estoqueElemento.textContent = `Estoque: ${estoque[produto]} unidades`;
    }
}

function finalizarCompra() {
    exibirMensagem('Compra finalizada com sucesso!', 'sucesso', '✅');

    // Mostrar instrução de contato
    setTimeout(() => {
        exibirMensagem('Sua compra será entregue. Entre em contato via Instagram (@slv_pacoca).', 'sucesso', '✅');
    }, 3500); // Depois que a primeira mensagem sumir

    // Resetar o carrinho
    document.getElementById('itens-carrinho').innerHTML = '';
    document.getElementById('total').textContent = '0.00';
    document.getElementById('pix-info').style.display = 'none';
    document.getElementById('finalizar-btn').style.display = 'none';
}

// Função para exibir mensagens bonitas
function exibirMensagem(texto, tipo, icone) {
    const mensagem = document.createElement('div');
    mensagem.className = `mensagem ${tipo}`;
    mensagem.innerHTML = `<span class="icone">${icone}</span> ${texto}`;
    document.body.appendChild(mensagem);

    setTimeout(() => {
        mensagem.remove();
    }, 3000); // Remove após 3 segundos
}
