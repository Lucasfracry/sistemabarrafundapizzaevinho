document.addEventListener('DOMContentLoaded', () => {
    const itensContainer = document.getElementById('itens-container');
    const adicionarItemBotao = document.getElementById('adicionar-item');
    const totalSpan = document.getElementById('total');
    const finalizarPedidoBotao = document.getElementById('finalizar-pedido');
    const pedidoForm = document.getElementById('pedido-form');
    let itemCount = 1;

    function calcularTotal() {
        let total = 0;
        const valores = document.querySelectorAll('input[name="produto-valor[]"]');
        valores.forEach(valorInput => {
            total += parseFloat(valorInput.value) || 0;
        });
        totalSpan.textContent = total.toFixed(2);
    }

    adicionarItemBotao.addEventListener('click', () => {
        const novoItem = document.createElement('div');
        novoItem.classList.add('item');
        novoItem.innerHTML = `
            <div class="form-group">
                <label for="produto-nome-${itemCount}">Nome do Produto:</label>
                <input type="text" name="produto-nome[]" required>
            </div>
            <div class="form-group">
                <label for="produto-valor-${itemCount}">Valor:</label>
                <input type="number" name="produto-valor[]" min="0.01" step="0.01" required>
            </div>
            <button type="button" class="remover-item">Remover</button>
        `;
        itensContainer.appendChild(novoItem);
        itemCount++;
        atualizarListenersRemover();
    });

    function atualizarListenersRemover() {
        const botoesRemover = document.querySelectorAll('.remover-item');
        botoesRemover.forEach(botao => {
            botao.addEventListener('click', (event) => {
                event.target.parentNode.remove();
                calcularTotal();
            });
        });
    }

    itensContainer.addEventListener('input', calcularTotal);
    atualizarListenersRemover(); // Para o item inicial

    finalizarPedidoBotao.addEventListener('click', () => {
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const endereco = document.getElementById('endereco').value;
        const nomesProdutos = Array.from(document.querySelectorAll('input[name="produto-nome[]"]')).map(input => input.value);
        const valoresProdutos = Array.from(document.querySelectorAll('input[name="produto-valor[]"]')).map(input => parseFloat(input.value) || 0);
        const total = parseFloat(totalSpan.textContent);

        const pedido = {
            nome: nome,
            telefone: telefone,
            endereco: endereco,
            itens: nomesProdutos.map((nome, index) => ({ nome: nome, valor: valoresProdutos[index] })),
            total: total.toFixed(2)
        };

        // Enviar os dados para a página de impressão (você pode usar localStorage ou outra forma de passar os dados)
        localStorage.setItem('pedido', JSON.stringify(pedido));
        window.open('imprimir.html', '_blank');
    });
});