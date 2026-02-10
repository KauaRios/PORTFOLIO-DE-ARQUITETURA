// 1. Variáveis Globais
let dadosProjetos = {}; 
let currentSlide = 0;

// Mapeamento das suas pastas reais (conforme image_95c3e5.png)
const caminhosDasPastas = {
    "projetos3d": "imagesP3D/",
    "executivos": "imagesPEXE/",
    "planilha": "imagesPlanilhas/"
};

// 2. Carregar o JSON assim que o site inicia
fetch('imagens.json')
    .then(res => res.json())
    .then(data => {
        dadosProjetos = data;
        console.log("JSON carregado com sucesso!");
    })
    .catch(err => console.error("Erro: O arquivo imagens.json não foi encontrado!", err));

// 3. Função para abrir a aba (Gatilho único)
function abrirProjetos(e) {
    if(e) e.preventDefault();
    
    const aba = document.getElementById('Aba-projetos');
    
    // Mostra o elemento no DOM
    aba.style.display = 'block';
    
    // Inicia a animação e carrega as fotos
    setTimeout(() => {
        aba.classList.add('active');
        carregarCategoria('projetos3d'); // Começa pela 3D
    }, 10);
}

// 4. Função para carregar as imagens no slider
function carregarCategoria(cat) {
    const slider = document.getElementById("slider");
    const titulo = document.getElementById("titulo-categoria");
    
    slider.innerHTML = ""; 
    currentSlide = 0;
    slider.style.transform = `translateX(0%)`;
    titulo.innerText = cat.toUpperCase();

    if (dadosProjetos[cat]) {
        dadosProjetos[cat].forEach(nome => {
            const slideItem = document.createElement("div");
            slideItem.classList.add("slide-item");
            
            const img = document.createElement("img");
            img.src = caminhosDasPastas[cat] + nome;
            img.alt = "Projeto Geovana";
            
            slideItem.appendChild(img);
            slider.appendChild(slideItem);
        });
    }
}

// 5. Controles do Slider
function mudarSlide(direcao) {
    const slides = document.querySelectorAll('.slide-item');
    if (slides.length === 0) return;

    currentSlide += direcao;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    document.getElementById('slider').style.transform = `translateX(${currentSlide * -100}%)`;
}

// 6. Função para fechar
function fecharProjetos() {
    const aba = document.getElementById('Aba-projetos');
    aba.classList.remove('active');
    setTimeout(() => { 
        aba.style.display = 'none'; 
    }, 400);
}



//images de fundo em carrosel