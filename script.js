/* =========================================
   NANMADAL HEADER JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header =
        document.getElementById("nmHeader");

    const menuToggle =
        document.getElementById("nmMenuToggle");

    const primaryNav =
        document.getElementById("nmPrimaryNav");

    const navLinks =
        document.querySelectorAll(".nm-nav-link");


    /* =========================================
       HEADER SCROLL EFFECT
       ========================================= */

    function updateHeader() {

        if (window.scrollY > 20) {

            header.classList.add("is-scrolled");

        } else {

            header.classList.remove("is-scrolled");

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =========================================
       OPEN / CLOSE MOBILE MENU
       ========================================= */

    function openMenu() {

        primaryNav.classList.add("is-open");

        menuToggle.classList.add("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );

        document.body.style.overflow = "hidden";
    }


    function closeMenu() {

        primaryNav.classList.remove("is-open");

        menuToggle.classList.remove("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

        document.body.style.overflow = "";
    }


    function toggleMenu() {

        const isOpen =
            primaryNav.classList.contains("is-open");

        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    }


    menuToggle.addEventListener(
        "click",
        toggleMenu
    );


    /* =========================================
   NAVIGATION LINK CLICK
   ========================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        /* Prevent default mobile anchor behaviour */
        event.preventDefault();

        /* Active state */
        navLinks.forEach((item) => {
            item.classList.remove("nm-nav-link--active");
        });

        link.classList.add("nm-nav-link--active");

        /* Close mobile menu */
        closeMenu();

        /* Scroll after menu has started closing */
        requestAnimationFrame(() => {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});

    /* =========================================
       CLOSE WITH ESCAPE
       ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* =========================================
       CLOSE MENU WHEN RESIZING TO DESKTOP
       ========================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800 &&
                primaryNav.classList.contains("is-open")
            ) {

                closeMenu();

            }

        }
    );

});