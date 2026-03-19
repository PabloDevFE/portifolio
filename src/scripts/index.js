let header = document.querySelector("#header");
let navigation = document.querySelector("#navigation");
let main = document.querySelector("#main");
let btnOpen = document.querySelector("#btnHeaderHamburguer");
let btnClose = document.querySelector("#btnHeaderClose");
let showSidebar = false;

//abre o menu
function toggleSidebar() {
  showSidebar = !showSidebar;
  if (showSidebar) {
    navigation.style.marginLeft = "0vw";
    navigation.style.animationName = "showMenu";
    main.style.filter = "blur(10px)";
  } else {
    navigation.style.marginLeft = "-100vw";
    navigation.style.animationName = "";
    main.style.filter = "";
  }
}

function closeSidebar() {
  if (showSidebar) {
    showSidebar = true;
    toggleSidebar();
  }
}

//Função para fazer o menu fechar caso a tela seja redimensionada
window.addEventListener("resize", function (event) {
  if (window.innerWidth > 768 && showSidebar) {
    showSidebar = true;
    btnOpen.style.visibility = "";
    toggleSidebar();
  }
});

//adiciona os leitores de eventos, tanto para fechar, quanto para abrir o menu
btnOpen.addEventListener("click", () => {
  toggleSidebar();
  btnOpen.style.visibility = "hidden";
});

btnClose.addEventListener("click", () => {
  toggleSidebar();
  btnOpen.style.visibility = "";
});

/* ================================================================
   SCROLL SPY & EFEITO APRESENTAÇÃO (Fullpage Slide com Loop Infinito)
   ================================================================ */
const sections = document.querySelectorAll("section, .footer");
const navLinks = document.querySelectorAll(".navigation a");

let currentSectionIndex = 0;
let isAnimating = false;
let scrollTimeout; // Variável para controlar o delay do menu

// 1. Função para atualizar o menu ATIVO com precisão
function updateMenu(targetIndex) {
  navLinks.forEach((link) => link.classList.remove("navActive"));

  // Pega o ID da seção alvo exata em que o site vai parar
  const targetId = sections[targetIndex].getAttribute("id");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === `#${targetId}`) {
      link.classList.add("navActive");
    }
  });
}

// 2. Olheiro Nativo (Apenas para quando o usuário usar o celular ou a barra de rolagem solta)
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  // Se o JS do computador estiver controlando a animação de pulo, IGNORE o observer
  if (isAnimating) return;

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Quando não estiver animando (ex: no celular), atualiza o menu normalmente
      currentSectionIndex = Array.from(sections).indexOf(entry.target);
      updateMenu(currentSectionIndex);
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

// 3. MÁGICA DO SCROLL (1 giro = 1 seção + Loop Infinito)
window.addEventListener(
  "wheel",
  (e) => {
    if (window.innerWidth > 768) {
      e.preventDefault();

      if (isAnimating) return; // Se já está pulando, ignora novos giros da bolinha

      if (e.deltaY > 0) {
        // Rolou para BAIXO
        if (currentSectionIndex < sections.length - 1) {
          currentSectionIndex++;
        } else {
          currentSectionIndex = 0; // Loop: do Footer pra Home
        }
      } else {
        // Rolou para CIMA
        if (currentSectionIndex > 0) {
          currentSectionIndex--;
        } else {
          currentSectionIndex = sections.length - 1; // Loop: da Home pro Footer
        }
      }

      scrollToSection(currentSectionIndex);
    }
  },
  { passive: false },
);

// 4. Função que faz o "Pulo" e gerencia o Delay do Menu
function scrollToSection(targetIndex) {
  isAnimating = true;

  // Limpa qualquer delay anterior para não encavalar
  clearTimeout(scrollTimeout);

  // Rola a tela
  sections[targetIndex].scrollIntoView({ behavior: "smooth" });

  // Só atualiza a corzinha do menu DEPOIS de 300ms
  scrollTimeout = setTimeout(() => {
    updateMenu(targetIndex);
  }, 300);

  // Trava de 800ms antes de liberar novo scroll da bolinha do mouse
  setTimeout(() => {
    isAnimating = false;
  }, 800);
}

// 5. Clicar no menu também atualiza tudo bonitinho
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Só previne o comportamento padrão e usa o JS no computador
    if (window.innerWidth > 768) {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);

      sections.forEach((section, index) => {
        if (section.getAttribute("id") === targetId) {
          currentSectionIndex = index;
          scrollToSection(index);
        }
      });
    }

    // Fecha o menu hamburguer no celular se estiver aberto
    if (
      window.innerWidth <= 768 &&
      typeof showSidebar !== "undefined" &&
      showSidebar
    ) {
      toggleSidebar();
      document.querySelector("#btnHeaderHamburguer").style.visibility = "";
    }
  });
});

/* ================================================================
   CARROSSEL DE PROJETOS (Rolagem Infinita PC e Mobile)
   ================================================================ */
const track = document.getElementById("projetosTrack");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");

if (track) {
  // 1. LÓGICA PARA O PC (Botões de Navegação)
  if (btnNext && btnPrev) {
    btnNext.addEventListener("click", () => {
      const maxScroll = track.scrollWidth - track.clientWidth;

      // Se estiver no último card, volta pro começo
      if (track.scrollLeft >= maxScroll - 10) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
      }
    });

    btnPrev.addEventListener("click", () => {
      // Se estiver no primeiro card, vai pro final
      if (track.scrollLeft <= 10) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        track.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
      }
    });
  }

  // 2. LÓGICA PARA O MOBILE (Toque/Arraste Infinito)
  let startX = 0;

  // Grava a posição do dedo quando toca na tela
  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );

  // Calcula para onde o dedo foi ao soltar a tela
  track.addEventListener(
    "touchend",
    (e) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX; // Positivo = arrastou pra esquerda (avançar)

      const maxScroll = track.scrollWidth - track.clientWidth;

      // Se está no ÚLTIMO card e tentou arrastar mais para a esquerda (Avançar)
      // O valor 50px de diferença garante que foi um arraste intencional e não um toque acidental
      if (track.scrollLeft >= maxScroll - 10 && diffX > 50) {
        track.scrollTo({ left: 0, behavior: "smooth" }); // Volta pro início
      }

      // Se está no PRIMEIRO card e tentou arrastar mais para a direita (Voltar)
      if (track.scrollLeft <= 10 && diffX < -50) {
        track.scrollTo({ left: maxScroll, behavior: "smooth" }); // Vai pro final
      }
    },
    { passive: true },
  );
}
