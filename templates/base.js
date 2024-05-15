customElements.define(
    "my-base",
    class extends HTMLElement {
        constructor() {
            super();

            // Creating Custom HTML Tag Attributes
            const attr0 = this.getAttribute('attr0')

            // IMPORTANT: Use relative path from project root!!!
            // This is assuming it's uploaded in the server.
            fetch('practice-static-site/templates/base.html')
                .then(async response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch');
                    }
                    return await response.text();
                })
                .then(htmlString => {
                    const parser = new DOMParser();
                    const dom = parser.parseFromString(htmlString, 'text/html');

                    let template = dom.getElementById("template-base");
                    if (!template) {
                        throw new Error('Template not found');
                    }
                    let templateContent = template.content;

                    const shadowRoot = this.attachShadow({mode: "open"});
                    shadowRoot.appendChild(templateContent.cloneNode(true));

                    // Manipulation here
                    // ...

                })
                .catch(error => {
                    console.error('Error fetching or parsing base.html template:', error);
                });
        }
    },
);
