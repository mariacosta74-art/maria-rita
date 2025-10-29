// Array para simular os produtos da loja
const produtos = [
    { id: 1, nome: "Camiseta Básica", preco: 49.90, img: "camiseta.jpg" },
    { id: 2, nome: "Calça Jeans Slim", preco: 129.90, img: "calca.jpg" },
    { id: 3, nome: "Vestido Floral", preco: 89.90, img: "vestido.jpg" },
    { id: 4, nome: "Jaqueta de Couro", preco: 299.90, img: "jaqueta.jpg" }
];

// Array para armazenar os itens no carrinho
let carrinho = [];

// Seletores do DOM
const containerProdutos = document.getElementById('grade-produtos');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');

/**
 * Adiciona um produto ao carrinho pelo ID.
 * @param {number} produtoId - ID do produto a ser adicionado.
 */
function adicionarAoCarrinho(produtoId) {
    // 1. Encontra o produto no array de produtos
    const produtoSelecionado = produtos.find(p => p.id === produtoId);

    if (produtoSelecionado) {
        // 2. Verifica se o produto já está no carrinho
        const itemNoCarrinho = carrinho.find(item => item.id === produtoId);

        if (itemNoCarrinho) {
            // Se já existe, apenas incrementa a quantidade
            itemNoCarrinho.quantidade += 1;
            console.log(`Quantidade de ${produtoSelecionado.nome} atualizada para ${itemNoCarrinho.quantidade}.`);
        } else {
            // Se não existe, adiciona o novo item com quantidade 1
            carrinho.push({
                id: produtoSelecionado.id,
                nome: produtoSelecionado.nome,
                preco: produtoSelecionado.preco,
                quantidade: 1
            });
            console.log(`${produtoSelecionado.nome} adicionado ao carrinho!`);
        }
        
        // 3. Atualiza a interface do carrinho
        renderizarCarrinho();
    } else {
        console.error("Produto não encontrado.");
    }
}

/**
 * Calcula o valor total dos itens no carrinho.
 * @returns {number} O valor total.
 */
function calcularTotal() {
    return carrinho.reduce((total, item) => {
        return total + (item.preco * item.quantidade);
    }, 0);
}

/**
 * Atualiza o HTML para exibir os itens e o total do carrinho.
 */
function renderizarCarrinho() {
    if (listaCarrinho) {
        listaCarrinho.innerHTML = ''; // Limpa a lista anterior

        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
            `;
            listaCarrinho.appendChild(li);
        });

        // Atualiza o total
        const total = calcularTotal();
        if (totalCarrinho) {
            totalCarrinho.textContent = total.toFixed(2).replace('.', ',');
        }
    }
}

/**
 * Adiciona os produtos ao HTML da loja para que possam ser comprados.
 */
function renderizarProdutos() {
    if (containerProdutos) {
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.classList.add('card-produto');
            card.innerHTML = `
                <img src="${produto.img}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                <button class="botao-comprar" onclick="adicionarAoCarrinho(${produto.id})">Comprar</button>
            `;
            containerProdutos.appendChild(card);
        });
    }
}

// Inicializa a exibição dos produtos quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    renderizarCarrinho(); // Garante que o carrinho vazio seja exibido corretamente ao iniciar
});