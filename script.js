document.addEventListener("DOMContentLoaded", () => {
    const inputProduto = document.getElementById("produto"); // Campo para o nome do produto
    const inputImagem = document.getElementById("imagem"); // Campo para URL da imagem
    const botaoAdicionar = document.getElementById("adicionar"); // Botão para adicionar produtos
    const listaSupermercado = document.getElementById("lista-supermercado"); // Lista de produtos

    // Carregar produtos armazenados no localStorage ao iniciar a página
    carregarProdutos();

    // Evento de clique para adicionar um novo produto
    botaoAdicionar.addEventListener("click", () => {
        const produto = inputProduto.value.trim(); // Remove espaços desnecessários
        const imagem = inputImagem.value.trim(); // Remove espaços desnecessários
        
        if (produto) {
            adicionarProduto(produto, imagem); // Adiciona produto se o campo não estiver vazio
            inputProduto.value = ""; // Limpa o campo de entrada
            inputImagem.value = ""; // Limpa o campo da imagem
        }
    });

    // Função para verificar se uma URL é válida
    function isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Função para adicionar produto à lista e ao localStorage
    function adicionarProduto(produto, imagem) {
        const li = document.createElement("li"); // Cria um novo item na lista

        const img = document.createElement("img");
        img.src = isValidURL(imagem) ? imagem : "https://via.placeholder.com/50"; // Imagem padrão se inválida
        img.alt = produto;

        const textoProduto = document.createTextNode(produto); // Cria o texto do produto

        const botaoExcluir = document.createElement("button"); // Cria o botão de exclusão
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.onclick = () => {
            li.remove(); // Remove o item do DOM
            removerProdutoDoLocalStorage(produto); // Remove do localStorage
        };

        // Adiciona imagem, texto e botão ao item da lista
        li.appendChild(img);
        li.appendChild(textoProduto);
        li.appendChild(botaoExcluir);
        listaSupermercado.appendChild(li); // Adiciona item à lista

        salvarProdutoNoLocalStorage(produto, imagem); // Armazena no localStorage
    }

    // Função para armazenar produto no localStorage
    function salvarProdutoNoLocalStorage(produto, imagem) {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos.push({ produto, imagem });
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    // Função para remover produto do localStorage
    function removerProdutoDoLocalStorage(produto) {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos = produtos.filter(item => item.produto !== produto); // Filtra o produto removido
        localStorage.setItem("produtos", JSON.stringify(produtos)); // Atualiza o localStorage
    }

    // Função para carregar produtos do localStorage ao iniciar a página
    function carregarProdutos() {
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos.forEach(({ produto, imagem }) => {
            const li = document.createElement("li");
            const img = document.createElement("img");
            img.src = isValidURL(imagem) ? imagem : "https://via.placeholder.com/50";
            img.alt = produto;

            const textoProduto = document.createTextNode(produto);

            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.className = "excluir";
            botaoExcluir.onclick = () => {
                li.remove();
                removerProdutoDoLocalStorage(produto);
            };

            li.appendChild(img);
            li.appendChild(textoProduto);
            li.appendChild(botaoExcluir);
            listaSupermercado.appendChild(li);
        });
    }
});
