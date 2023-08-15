customElements.define(
    'cb-logo',
    class extends HTMLElement {
        constructor() {
            super();

            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.innerHTML = `<svg
                width="100%"
                height="100%"
                viewBox="-5 0 792 515"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                alt="Chris Black's initials, with the letter C shaped like the moon, and the letter B with a lightning bolt inside."
            >
                <path
                    d="M369.68,450.6c-110.09,0-199.34-89.25-199.34-199.34S259.59,51.92,369.68,51.92a200.48,200.48,0,0,1,38.85,3.8,246.58,246.58,0,0,0-151.88-52C119.88,3.68,9,114.56,9,251.33S119.88,499,256.65,499a246.6,246.6,0,0,0,152.12-52.23A200.54,200.54,0,0,1,369.68,450.6Z"
                    transform="translate(-9 8.3)"
                    fill="white"
                />
                <path
                    d="M603.24,499.31H420.64V5.42H590.29q6.54,0,13,.43c85.5,5.71,152.82,67.51,152.82,142.92,0,32.65-12.62,62.75-33.87,86.86,36.2,27.58,59,68,59,113,0,83.15-78,150.67-174.17,150.67"
                    transform="translate(-9 8.3)"
                    fill="white"
                />
                <polyline
                    points="457.52 215.52 581.78 194.93 451.4 372.6 608.61 346.07 537.66 485.37 705.31 297.14 580.31 315.15 693.91 148.61 546.49 168.46 609.72 28.02"
                    fill="black"
                />
            </svg>
            `;
        }
    }
);
