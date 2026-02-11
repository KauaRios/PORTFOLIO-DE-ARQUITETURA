let dadosProjetos = {}; 
let currentSlide = 0;

const caminhosDasPastas = {
    "projetos3d": "imagesP3D/",
    "executivos": "imagesPEXE/",
    "planilha": "imagesPlanilhas/"
};

// 1. Carregar JSON
fetch('imagens.json')
    .then(res => res.json())
    .then(data => {
        dadosProjetos = data;
        console.log("JSON Carregado");
    })
    .catch(err => console.error("Erro ao carregar JSON:", err));

// 2. Abrir Modal
function abrirProjetos(e) {
    if(e) e.preventDefault();
    const aba = document.getElementById('Aba-projetos');
    aba.style.display = 'flex';
    setTimeout(() => {
        aba.classList.add('active');
        carregarCategoria('projetos3d');
    }, 10);
}

// 3. Carregar Imagens
function carregarCategoria(cat) {
    const slider = document.getElementById("slider");
    const titulo = document.getElementById("titulo-categoria");
    
    slider.innerHTML = ""; 
    currentSlide = 0;
    titulo.innerText = cat.toUpperCase();

    if (dadosProjetos[cat]) {
        dadosProjetos[cat].forEach((nome, index) => {
            const slideItem = document.createElement("div");
            slideItem.classList.add("slide-item");
            if(index === 0) slideItem.classList.add("active-slide");
            
            const img = document.createElement("img");
            img.src = caminhosDasPastas[cat] + nome;
            img.alt = "Projeto Geovana";
            
            slideItem.appendChild(img);
            slider.appendChild(slideItem);
        });
    }
}

// 4. Mudar Slide (Fade)
function mudarSlide(direcao) {
    const slides = document.querySelectorAll('.slide-item');
    if (slides.length <= 1) return;

    slides[currentSlide].classList.remove('active-slide');
    currentSlide = (currentSlide + direcao + slides.length) % slides.length;
    slides[currentSlide].classList.add('active-slide');
}

// 5. Fechar
function fecharProjetos() {
    const aba = document.getElementById('Aba-projetos');
    aba.classList.remove('active');
    setTimeout(() => { aba.style.display = 'none'; }, 500);
}

// 6. Zoom
document.getElementById('slider').addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        const fullScreenDiv = document.createElement('div');
        fullScreenDiv.classList.add('img-fullscreen');
        const fullImg = document.createElement('img');
        fullImg.src = e.target.src;
        fullScreenDiv.appendChild(fullImg);
        document.body.appendChild(fullScreenDiv);
        fullScreenDiv.onclick = () => fullScreenDiv.remove();
    }
});