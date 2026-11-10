const menuToggle = document.getElementById("menuToggle");
const menuLinks = document.getElementById("menuLinks");
const menuOverlay = document.getElementById("menuOverlay");

if (menuToggle && menuLinks && menuOverlay) {
    function fecharMenu() {
        menuLinks.classList.remove("active");
        menuOverlay.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        document.body.classList.remove("menu-aberto");
    }

    function alternarMenu() {
        const aberto = menuLinks.classList.toggle("active");
        menuOverlay.classList.toggle("active", aberto);
        menuToggle.setAttribute("aria-expanded", String(aberto));
        menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        document.body.classList.toggle("menu-aberto", aberto);
    }

    menuToggle.addEventListener("click", alternarMenu);
    menuOverlay.addEventListener("click", fecharMenu);

    menuLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") fecharMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 600) fecharMenu();
    });
}
