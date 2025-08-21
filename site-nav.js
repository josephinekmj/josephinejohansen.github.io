  
        class SiteNav extends HTMLElement {
            constructor() {
            super();
        this.attachShadow({mode: "open" });
  }
        static get observedAttributes() { return ["current"]; }
        attributeChangedCallback() {this.render(); }
        connectedCallback() {this.render(); }

        render() {
    const items = Array.isArray(window.SITE_MENU) ? window.SITE_MENU : [];
        const currentAttr = this.getAttribute("current");
        const currentRaw = currentAttr || (location.pathname.split("/").pop() || "index.html");
        const current = currentRaw.split("?")[0].split("#")[0];

        this.shadowRoot.innerHTML = `
        <style>
            :host {display: block; }
            nav {
                display:flex; justify-content:center; gap:.25rem; flex-wrap:wrap;
            padding:1rem; border-radius:10px;
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(8px);
            box-shadow: 0 1px 6px rgba(0,0,0,.08);
            max-width: 600px; margin: 1rem auto;
            font-family: inherit;
        }
            a {
                text - decoration:none; font-weight:600; padding:.5rem 1rem; border-radius:999px;
            transition: color .25s ease, background .25s ease, transform .05s ease-in-out;
            color: var(--oceanic-teal, #26A69A);
        }
            a:hover {color: var(--cosmic-lavender, #D1C4E9); }
            a[aria-current="page"] {
                background: rgba(255,255,255,.7);
            color: #111;
        }
            a:focus-visible {
                outline: 2px solid var(--divine-gold, #F9E79F);
            outline-offset: 2px;
        }
        </style>
        <nav role="navigation" aria-label="Main">
            ${items.map(it => {
                const cleanHref = (it.href || "").split("?")[0].split("#")[0];
                const isActive = cleanHref === current || (current === "" && cleanHref === "index.html");
                return `<a href="${it.href}" ${isActive ? 'aria-current="page"' : ""}>${it.label}</a>`;
            }).join("")}
        </nav>
        `;
  }
}
        customElements.define("site-nav", SiteNav);
    