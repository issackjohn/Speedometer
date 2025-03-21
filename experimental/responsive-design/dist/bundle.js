/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$3=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$3,getOwnPropertyDescriptor:r$3,getOwnPropertyNames:h$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$3}=Object,a$1=globalThis,c$2=a$1.trustedTypes,l$1=c$2?c$2.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$3=(t,s)=>!i$3(t,s),y$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$3};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=false),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$3(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$3(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$3(s));}else void 0!==s&&i.push(c$3(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$3)(this[t],s))return;this.P(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),true===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t) true!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i);}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=false,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d$1("elementProperties")]=new Map,b[d$1("finalized")]=new Map,p$1?.({ReactiveElement:b}),(a$1.reactiveElementVersions??=[]).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$2=t$1.trustedTypes,s$1=i$2?i$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$2="$lit$",h$2=`lit$${Math.random().toFixed(9).slice(2)}$`,o$2="?"+h$2,n$2=`<${o$2}>`,r$2=document,l=()=>r$2.createComment(""),c$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f$2=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$2.createTreeWalker(r$2,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f$2;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f$2?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f$2,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f$2:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f$2?s+n$2:d>=0?(o.push(a),s.slice(0,d)+e$2+s.slice(d)+h$2+x):s+h$2+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$2)){const i=v[a++],s=r.getAttribute(t).split(h$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h$2)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h$2),s=t.length-1;if(s>0){r.textContent=i$2?i$2.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$2)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h$2,t+1));)d.push({type:7,index:c}),t+=h$2.length-1;}c++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c$1(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$2).importNode(i,true);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$2,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c$1(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c$1(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$2.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=S(this,t,i,0),o=!c$1(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c$1(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$1.litHtmlPolyfillSupport;j?.(N,R),(t$1.litHtmlVersions??=[]).push("3.2.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let r$1 = class r extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(s,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return T}};r$1._$litElement$=true,r$1["finalized"]=true,globalThis.litElementHydrateSupport?.({LitElement:r$1});const i$1=globalThis.litElementPolyfillSupport;i$1?.({LitElement:r$1});(globalThis.litElementVersions??=[]).push("4.1.1");

class LightDOMLitElement extends r$1 {
    createRenderRoot() {
        return this; // Render into the light DOM instead of shadow DOM
    }
}

const ribbonButtons = [
    { id: "new-button", text: "New", variant: "primary", iconPosition: "-24px 0px" },
    { id: "home-button", text: "Home", variant: "secondary", iconPosition: "-48px -24px" },
    { id: "recipes-button", text: "Recipes", variant: "secondary", iconPosition: "0px -24px" },
    { id: "ingredients-button", text: "Ingredients", variant: "secondary", iconPosition: "-72px -24px" },
    { id: "favorites-button", text: "Favorites", variant: "secondary", iconPosition: "0px 0px" },
    { id: "chef-tips-button", text: "Chefs Tips", variant: "secondary", iconPosition: "0px -48px" },
    { id: "blog-button", text: "Blog", variant: "secondary", iconPosition: "-24px -48px" },
    { id: "shop-button", text: "Shop", variant: "secondary", iconPosition: "-24px -24px" },
    { id: "events-button", text: "Events", variant: "secondary", iconPosition: "-48px -48px" },
    { id: "faq-button", text: "FAQ", variant: "secondary", iconPosition: "-72px -48px" },
    { id: "profile-button", text: "Profile", variant: "secondary", iconPosition: "-48px 0px" },
    { id: "report-button", text: "Report", variant: "secondary", iconPosition: "-72px 0px" },
];

class RibbonButton extends LightDOMLitElement {
    static properties = {
        text: { type: String },
        variant: { type: String },
        iconPosition: { type: String },
    };

    constructor() {
        super();
        this.text = "Button";
        this.variant = "secondary";
        this.iconPosition = "0px 0px";
    }

    render() {
        const colorClass = this.variant === "primary" ? "bg-orange-400 hover:bg-orange-500" : "bg-teal-600 hover:bg-teal-800";
        return x`
            <button class="${colorClass} mx-1 inline-flex items-center rounded-md px-2 py-1 text-sm font-semibold text-white shadow-md ring-1 ring-inset ring-gray-300">
                <!-- Heroicons are MIT licensed. See https://github.com/tailwindlabs/heroicons/blob/master/LICENSE -->
                <span class="h-6 w-6" style="background: url(./public/images/icons-outline.webp); background-position: ${this.iconPosition};"></span>
                <span class="text-white">${this.text}</span>
            </button>
        `;
    }
}

customElements.define("ribbon-button", RibbonButton);

class AppRibbon extends LightDOMLitElement {
    static properties = {
        buttons: { type: Array },
        visibleButtons: { type: Array },
    };

    constructor() {
        super();
        this.buttons = ribbonButtons;
        this.visibleButtons = this.buttons;
        this._resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize && entry.contentBoxSize[0])
                    this._updateVisibleButtons(entry.contentBoxSize[0].inlineSize);
                else
                    this._updateVisibleButtons(entry.contentRect.width);
            }
        });
    }

    firstUpdated() {
        this._resizeObserver.observe(this);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._resizeObserver)
            this._resizeObserver.disconnect();
    }

    _updateVisibleButtons(width) {
        const breakpoints = [
            { minWidth: 1134, buttons: 12 },
            { minWidth: 1069, buttons: 11 },
            { minWidth: 985, buttons: 10 },
            { minWidth: 905, buttons: 9 },
            { minWidth: 818, buttons: 8 },
            { minWidth: 735, buttons: 7 },
            { minWidth: 660, buttons: 6 },
            { minWidth: 540, buttons: 5 },
            { minWidth: 440, buttons: 4 },
            { minWidth: 318, buttons: 3 },
        ];

        const breakpoint = breakpoints.find((bp) => width >= bp.minWidth);
        this.visibleButtons = breakpoint ? this.buttons.slice(0, breakpoint.buttons) : this.buttons.slice(0, 2);
        this.requestUpdate();
    }

    _getVisibleButtonsTemplate() {
        return this.visibleButtons.map(
            (button, index) => x`
                <ribbon-button id="${button.id}" text="${button.text}" variant="${button.variant}" iconPosition="${button.iconPosition}"></ribbon-button>
                ${index === 0 ? x`<div class="mx-0.5 h-6 border-l border-gray-300"></div>` : ""}
            `
        );
    }

    render() {
        return x`
            <nav class="mt-1 flex items-center justify-between p-1">
                <div class="flex flex-nowrap items-baseline overflow-x-hidden">${this._getVisibleButtonsTemplate()}</div>
                <div class="3xl:hidden">
                    <button class="mx-1 inline-flex rounded-md bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300">
                        <!-- Heroicons are MIT licensed. See https://github.com/tailwindlabs/heroicons/blob/master/LICENSE -->
                        <span class="h-6 w-6" style="background: url(./public/images/icons-outline.webp); background-position: -96px 0px;"></span>
                    </button>
                </div>
            </nav>
        `;
    }
}

customElements.define("app-ribbon", AppRibbon);

const messages = [
    { user: "How do I make a simple tomato sauce? Could you provide a detailed step-by-step guide?" },
    {
        bot: "Certainly! To make a simple tomato sauce, start by heating two tablespoons of olive oil in a large saucepan over medium heat. Once the oil is hot, add four minced garlic cloves and sauté them until they become fragrant and slightly golden. Next, pour in one can of crushed tomatoes and stir the mixture. Season the sauce with a teaspoon of salt and a handful of fresh basil leaves. Allow the sauce to simmer gently on low heat for about 20 minutes, stirring occasionally to prevent sticking. Once the sauce has thickened and the flavors have melded together, it's ready to be served. Enjoy your homemade tomato sauce!",
    },
    { user: "Can I add meat to the tomato sauce? If so, what type and how should I incorporate it?" },
    {
        bot: "Absolutely! Adding meat can enhance the flavor and texture of your tomato sauce. You can use ground beef, pork, or sausage based on your preference. Start by browning one pound of your chosen meat in a separate skillet over medium-high heat until it's fully cooked and no longer pink. Drain any excess fat, then add the cooked meat to your simmering tomato sauce. Let the mixture cook together for an additional 10-15 minutes to allow the flavors to combine thoroughly. This will give your sauce a rich and hearty quality.",
    },
    { user: "How long does the tomato sauce last in the refrigerator, and what are the best storage practices?" },
    {
        bot: "Your homemade tomato sauce should stay fresh in the refrigerator for about 5 to 7 days when stored properly. To maximize its shelf life, place the sauce in an airtight container to prevent exposure to air and contaminants. It's also a good idea to let the sauce cool to room temperature before refrigerating. For longer storage, consider freezing the sauce in freezer-safe containers or bags, where it can last for several months.",
    },
    { user: "Do you have any tips for making the tomato sauce spicier without overpowering the other flavors?" },
    {
        bot: "Certainly! To add some heat to your tomato sauce without overwhelming it, you can incorporate a few red pepper flakes or finely chopped fresh chili peppers while sautéing the garlic. Start with about half a teaspoon of red pepper flakes and adjust according to your preferred spice level. Alternatively, you can add a dash of hot sauce or a pinch of cayenne pepper towards the end of the cooking process to better control the heat intensity. This will give your sauce a pleasant kick while maintaining its overall flavor balance.",
    },
    { user: "Is it possible to freeze the tomato sauce, and if so, what is the best method for freezing and later reheating it?" },
    {
        bot: "Yes, you can definitely freeze your tomato sauce for future use. To freeze the sauce, allow it to cool completely and then transfer it into airtight, freezer-safe containers or heavy-duty freezer bags. Make sure to leave some space at the top of the container to allow for expansion as the sauce freezes. Label the containers with the date for easy reference. When you're ready to use the sauce, thaw it in the refrigerator overnight and reheat it on the stove over low heat, stirring occasionally until it's warmed through. This method helps preserve the sauce's flavor and consistency.",
    },
    { user: "What is the best way to reheat the tomato sauce to maintain its texture and flavor?" },
    {
        bot: "The best way to reheat tomato sauce is on the stovetop. Pour the sauce into a saucepan and heat it over low to medium heat, stirring occasionally to ensure even heating and to prevent the sauce from sticking to the bottom of the pan. If the sauce has thickened too much after refrigeration or freezing, you can add a small amount of water, broth, or wine to adjust the consistency. Heating the sauce gradually helps maintain its rich flavor and smooth texture without scorching.",
    },
    { user: "Can I use fresh tomatoes instead of canned ones for the sauce? If so, what is the recommended preparation method?" },
    {
        bot: "Yes, you can use fresh tomatoes to make tomato sauce. Start by selecting ripe, flavorful tomatoes for the best results. To prepare them, you'll need to blanch the tomatoes by scoring the bottoms with an 'X' and plunging them into boiling water for about 30 seconds. Immediately transfer the tomatoes to a bowl of ice water to halt the cooking process. Once cooled, peel off the skins, remove the seeds if desired, and crush or chop the tomatoes before adding them to your sauce. Fresh tomatoes can give your sauce a vibrant and fresh taste, especially during peak tomato season.",
    },
    { user: "What types of pasta pair best with tomato sauce to complement its flavors and texture?" },
    {
        bot: "Spaghetti is a classic choice that works wonderfully with tomato sauce, offering a satisfying bite and good sauce adherence. Penne is another excellent option due to its tubular shape, which holds onto the sauce inside and out. Rigatoni, with its larger size and ridged surface, also pairs well, providing a hearty and substantial combination with the rich tomato sauce. Additionally, fusilli or farfalle can be great choices if you prefer something different, as their shapes can capture the sauce effectively.",
    },
    { user: "Can I incorporate additional vegetables into the tomato sauce for extra flavor and nutrition? If so, which vegetables work best?" },
    {
        bot: "Absolutely! Adding vegetables can enhance both the flavor and nutritional value of your tomato sauce. Bell peppers add sweetness and a slight crunch when cooked, while onions provide a savory depth. Mushrooms contribute an earthy richness and umami flavor that complements the tomatoes. Zucchini or eggplant can add substance and texture. To incorporate these vegetables, sauté them along with the garlic at the beginning of the cooking process until they're softened before adding the tomatoes. This will allow their flavors to meld seamlessly into the sauce.",
    },
    { user: "What techniques can I use to make the tomato sauce thicker without altering its basic flavor profile?" },
    {
        bot: "To thicken your tomato sauce without changing its flavor, you can let it simmer uncovered for a longer period, which allows excess moisture to evaporate and the sauce to reduce naturally. Alternatively, you can add tomato paste, which not only thickens the sauce but also intensifies the tomato flavor without introducing new tastes. Another method is to incorporate a slurry made from cornstarch or flour mixed with a small amount of water; add this gradually while stirring until you reach the desired consistency. Be sure to cook the sauce for a few more minutes after adding a slurry to eliminate any raw starch taste.",
    },
    { user: "Is it advisable to add wine to the tomato sauce for enhanced flavor? If so, how should it be incorporated into the cooking process?" },
    {
        bot: "Yes, adding wine can significantly enhance the depth and complexity of your tomato sauce's flavor. To incorporate wine, pour in a splash of red wine—about half a cup—after sautéing the garlic and before adding the crushed tomatoes. Allow the wine to simmer and reduce for a few minutes, which helps to cook off the alcohol while concentrating the flavors. This addition will impart a rich, robust character to the sauce, complementing the acidity of the tomatoes and the overall savory profile of the dish.",
    },
];

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const f$1=o=>void 0===o.strings;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={CHILD:2},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=(i,t)=>{const e=i._$AN;if(void 0===e)return  false;for(const i of e)i._$AO?.(t,false),s(i,t);return  true},o$1=i=>{let t,e;do{if(void 0===(t=i._$AM))break;e=t._$AN,e.delete(i),i=t;}while(0===e?.size)},r=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(void 0===e)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),c(t);}};function h$1(i){ void 0!==this._$AN?(o$1(this),this._$AM=i,r(this)):this._$AM=i;}function n$1(i,t=false,e=0){const r=this._$AH,h=this._$AN;if(void 0!==h&&0!==h.size)if(t)if(Array.isArray(r))for(let i=e;i<r.length;i++)s(r[i],false),o$1(r[i]);else null!=r&&(s(r,false),o$1(r));else s(this,i);}const c=i=>{i.type==t.CHILD&&(i._$AP??=n$1,i._$AQ??=h$1);};class f extends i{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,e){super._$AT(i,t,e),r(this),this.isConnected=i._$AU;}_$AO(i,t=true){i!==this.isConnected&&(this.isConnected=i,i?this.reconnected?.():this.disconnected?.()),t&&(s(this,i),o$1(this));}setValue(t){if(f$1(this._$Ct))this._$Ct._$AI(t,this);else {const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=()=>new h;class h{}const o=new WeakMap,n=e$1(class extends f{render(i){return E}update(i,[s]){const e=s!==this.Y;return e&&void 0!==this.Y&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.Y=s,this.ht=i.options?.host,this.rt(this.ct=i.element)),E}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.Y){const i=this.ht??globalThis;let s=o.get(i);void 0===s&&(s=new WeakMap,o.set(i,s)),void 0!==s.get(this.Y)&&this.Y.call(this.ht,void 0),s.set(this.Y,t),void 0!==t&&this.Y.call(this.ht,t);}else this.Y.value=t;}get lt(){return "function"==typeof this.Y?o.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});

class ChatMessages extends LightDOMLitElement {
    static properties = {
        messages: { type: Array },
    };

    constructor() {
        super();
        this.messages = [];
        this.scrollContainerRef = e();
    }

    updated(changedProperties) {
        if (changedProperties.has("messages"))
            this._scrollToLastMessage();
    }

    _scrollToLastMessage() {
        const container = this.scrollContainerRef.value;
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
            });
        }
    }

    _getMessagesTemplate() {
        return this.messages.map(
            (message) => x`
                <li class="${message.user ? "justify-end" : "justify-start"} flex items-start">
                    ${message.user
        ? x` <div class="flex items-center space-x-2">
                              <div class="text-pretty rounded-md bg-teal-600 px-3 py-2 text-xs text-white lg:text-base">
                                  ${message.user} ${message.imageUrl ? x`<img src="${message.imageUrl}" alt="${message.imageAlt}" class="mt-2 h-32 w-full rounded-md" />` : ""}
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                                  <circle cx="12" cy="8" r="4" />
                                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                              </svg>
                          </div>`
        : x`
                              <div class="flex items-center space-x-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                      <rect x="6" y="4" width="12" height="12" rx="2" />
                                      <circle cx="9" cy="10" r="1" />
                                      <circle cx="15" cy="10" r="1" />
                                      <path d="M8 16h8" />
                                  </svg>
                                  <div class="text-pretty rounded-md bg-gray-200 px-3 py-2 text-xs text-gray-900 lg:text-base">
                                      ${message.bot} ${message.imageUrl ? x`<img src="${message.imageUrl}" alt="${message.imageAlt}" class="mt-2 h-32 w-full rounded-md" />` : ""}
                                  </div>
                              </div>
                          `}
                </li>
            `
        );
    }

    render() {
        return x`
            <ul ${n(this.scrollContainerRef)} class="flex max-h-[345px] flex-1 flex-col space-y-4 overflow-y-auto p-2">
                ${this._getMessagesTemplate()}
            </ul>
        `;
    }
}

customElements.define("chat-messages", ChatMessages);

class ChatInput extends LightDOMLitElement {
    static properties = {
        value: { type: String },
        placeholder: { type: String },
    };

    constructor() {
        super();
        this.value = "";
        this.placeholder = "Type your message...";
    }

    _handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("send-chat"));
        }
    }

    _sendMessage() {
        if (this.value.trim())
            this.dispatchEvent(new CustomEvent("send-chat", { bubbles: true, composed: true }));
    }

    render() {
        return x`
            <div class="flex min-h-12 items-center border-t border-gray-200 p-1">
                <label for="chat-input" class="sr-only">Chat Input</label>
                <textarea
                    id="chat-input"
                    name="chat-input"
                    class="block w-full resize-none rounded-md border border-gray-300 px-3 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="${this.placeholder}"
                    .value="${this.value}"
                    rows="1"
                    @keydown="${this._handleKeyDown}"
                >
                </textarea>
                <button @click="${this._sendMessage}" class="ml-2 rounded-md bg-teal-500 px-3 py-1 text-white hover:bg-teal-600 focus:outline-none">Send</button>
            </div>
        `;
    }
}

customElements.define("chat-input", ChatInput);

var Styles$1 = "*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n  --tw-contain-size:  ;\n  --tw-contain-layout:  ;\n  --tw-contain-paint:  ;\n  --tw-contain-style:  ;\n}\n\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n  --tw-contain-size:  ;\n  --tw-contain-layout:  ;\n  --tw-contain-paint:  ;\n  --tw-contain-style:  ;\n}\n\n/*\n! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com\n*/\n\n/*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box;\n  /* 1 */\n  border-width: 0;\n  /* 2 */\n  border-style: solid;\n  /* 2 */\n  border-color: #e5e7eb;\n  /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n5. Use the user's configured `sans` font-feature-settings by default.\n6. Use the user's configured `sans` font-variation-settings by default.\n7. Disable tap highlights on iOS\n*/\n\nhtml,\n:host {\n  line-height: 1.5;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n  -moz-tab-size: 4;\n  /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4;\n  /* 3 */\n  font-family: ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  /* 4 */\n  font-feature-settings: normal;\n  /* 5 */\n  font-variation-settings: normal;\n  /* 6 */\n  -webkit-tap-highlight-color: transparent;\n  /* 7 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0;\n  /* 1 */\n  line-height: inherit;\n  /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  border-top-width: 1px;\n  /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font-family by default.\n2. Use the user's configured `mono` font-feature-settings by default.\n3. Use the user's configured `mono` font-variation-settings by default.\n4. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n  /* 1 */\n  font-feature-settings: normal;\n  /* 2 */\n  font-variation-settings: normal;\n  /* 3 */\n  font-size: 1em;\n  /* 4 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0;\n  /* 1 */\n  border-color: inherit;\n  /* 2 */\n  border-collapse: collapse;\n  /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  /* 1 */\n  font-feature-settings: inherit;\n  /* 1 */\n  font-variation-settings: inherit;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  font-weight: inherit;\n  /* 1 */\n  line-height: inherit;\n  /* 1 */\n  letter-spacing: inherit;\n  /* 1 */\n  color: inherit;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n  padding: 0;\n  /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\ninput:where([type='button']),\ninput:where([type='reset']),\ninput:where([type='submit']) {\n  -webkit-appearance: button;\n  /* 1 */\n  background-color: transparent;\n  /* 2 */\n  background-image: none;\n  /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nReset default styling for dialogs.\n*/\n\ndialog {\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1;\n  /* 1 */\n  color: #9ca3af;\n  /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1;\n  /* 1 */\n  color: #9ca3af;\n  /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block;\n  /* 1 */\n  vertical-align: middle;\n  /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n\n[hidden]:where(:not([hidden=\"until-found\"])) {\n  display: none;\n}\n\nh1 {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n\n:is(h2, h3) {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n\n:is(h1, h2, h3, h4) {\n  --tw-text-opacity: 1;\n  color: rgb(55 65 81 / var(--tw-text-opacity, 1));\n  font-weight: 700;\n}\n\n.container {\n  width: 100%;\n}\n\n@media (min-width: 640px) {\n  .container {\n    max-width: 640px;\n  }\n}\n\n@media (min-width: 768px) {\n  .container {\n    max-width: 768px;\n  }\n}\n\n@media (min-width: 1024px) {\n  .container {\n    max-width: 1024px;\n  }\n}\n\n@media (min-width: 1280px) {\n  .container {\n    max-width: 1280px;\n  }\n}\n\n@media (min-width: 1536px) {\n  .container {\n    max-width: 1536px;\n  }\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.static {\n  position: static;\n}\n\n.absolute {\n  position: absolute;\n}\n\n.relative {\n  position: relative;\n}\n\n.bottom-2 {\n  bottom: 0.5rem;\n}\n\n.left-2 {\n  left: 0.5rem;\n}\n\n.right-2 {\n  right: 0.5rem;\n}\n\n.top-1\\/2 {\n  top: 50%;\n}\n\n.z-10 {\n  z-index: 10;\n}\n\n.m-auto {\n  margin: auto;\n}\n\n.my-1 {\n  margin-top: 0.25rem;\n  margin-bottom: 0.25rem;\n}\n\n.mb-1 {\n  margin-bottom: 0.25rem;\n}\n\n.mb-\\[0\\.25rem\\] {\n  margin-bottom: 0.25rem;\n}\n\n.ml-2 {\n  margin-left: 0.5rem;\n}\n\n.mt-2 {\n  margin-top: 0.5rem;\n}\n\n.box-border {\n  box-sizing: border-box;\n}\n\n.block {\n  display: block;\n}\n\n.flex {\n  display: flex;\n}\n\n.grid {\n  display: grid;\n}\n\n.h-12 {\n  height: 3rem;\n}\n\n.h-32 {\n  height: 8rem;\n}\n\n.h-6 {\n  height: 1.5rem;\n}\n\n.h-8 {\n  height: 2rem;\n}\n\n.h-\\[440px\\] {\n  height: 440px;\n}\n\n.h-full {\n  height: 100%;\n}\n\n.max-h-\\[345px\\] {\n  max-height: 345px;\n}\n\n.min-h-12 {\n  min-height: 3rem;\n}\n\n.w-6 {\n  width: 1.5rem;\n}\n\n.w-8 {\n  width: 2rem;\n}\n\n.w-full {\n  width: 100%;\n}\n\n.flex-1 {\n  flex: 1 1 0%;\n}\n\n.flex-none {\n  flex: none;\n}\n\n.flex-shrink-0 {\n  flex-shrink: 0;\n}\n\n.-translate-y-1\\/2 {\n  --tw-translate-y: -50%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.transform {\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.cursor-pointer {\n  cursor: pointer;\n}\n\n.resize-none {\n  resize: none;\n}\n\n.grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.items-start {\n  align-items: flex-start;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-start {\n  justify-content: flex-start;\n}\n\n.justify-end {\n  justify-content: flex-end;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.gap-4 {\n  gap: 1rem;\n}\n\n.space-x-2 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-x-reverse: 0;\n  margin-right: calc(0.5rem * var(--tw-space-x-reverse));\n  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));\n}\n\n.space-y-4 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(1rem * var(--tw-space-y-reverse));\n}\n\n.self-center {\n  align-self: center;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.overflow-y-auto {\n  overflow-y: auto;\n}\n\n.text-pretty {\n  text-wrap: pretty;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.rounded-md {\n  border-radius: 0.375rem;\n}\n\n.rounded-t-lg {\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n}\n\n.border {\n  border-width: 1px;\n}\n\n.border-0 {\n  border-width: 0px;\n}\n\n.border-2 {\n  border-width: 2px;\n}\n\n.border-t {\n  border-top-width: 1px;\n}\n\n.border-solid {\n  border-style: solid;\n}\n\n.border-gray-200 {\n  --tw-border-opacity: 1;\n  border-color: rgb(229 231 235 / var(--tw-border-opacity, 1));\n}\n\n.border-gray-300 {\n  --tw-border-opacity: 1;\n  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));\n}\n\n.bg-black {\n  --tw-bg-opacity: 1;\n  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));\n}\n\n.bg-gray-200 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));\n}\n\n.bg-gray-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));\n}\n\n.bg-orange-500\\/50 {\n  background-color: rgb(249 115 22 / 0.5);\n}\n\n.bg-teal-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(20 184 166 / var(--tw-bg-opacity, 1));\n}\n\n.bg-teal-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(13 148 136 / var(--tw-bg-opacity, 1));\n}\n\n.bg-teal-600\\/50 {\n  background-color: rgb(13 148 136 / 0.5);\n}\n\n.bg-teal-600\\/75 {\n  background-color: rgb(13 148 136 / 0.75);\n}\n\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));\n}\n\n.bg-opacity-50 {\n  --tw-bg-opacity: 0.5;\n}\n\n.bg-gradient-to-br {\n  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));\n}\n\n.from-white {\n  --tw-gradient-from: #fff var(--tw-gradient-from-position);\n  --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n}\n\n.to-orange-100 {\n  --tw-gradient-to: #ffedd5 var(--tw-gradient-to-position);\n}\n\n.p-1 {\n  padding: 0.25rem;\n}\n\n.p-2 {\n  padding: 0.5rem;\n}\n\n.p-4 {\n  padding: 1rem;\n}\n\n.p-\\[0\\.2rem\\] {\n  padding: 0.2rem;\n}\n\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n\n.text-\\[0\\.675rem\\] {\n  font-size: 0.675rem;\n}\n\n.text-base {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n\n.text-lg {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n\n.text-xs {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.font-semibold {\n  font-weight: 600;\n}\n\n.text-gray-400 {\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity, 1));\n}\n\n.text-gray-600 {\n  --tw-text-opacity: 1;\n  color: rgb(75 85 99 / var(--tw-text-opacity, 1));\n}\n\n.text-gray-700 {\n  --tw-text-opacity: 1;\n  color: rgb(55 65 81 / var(--tw-text-opacity, 1));\n}\n\n.text-gray-900 {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity, 1));\n}\n\n.text-teal-600 {\n  --tw-text-opacity: 1;\n  color: rgb(13 148 136 / var(--tw-text-opacity, 1));\n}\n\n.text-teal-600\\/75 {\n  color: rgb(13 148 136 / 0.75);\n}\n\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n\n.shadow-lg {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-md {\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.hover\\:bg-orange-500:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 115 22 / var(--tw-bg-opacity, 1));\n}\n\n.hover\\:bg-teal-100:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(204 251 241 / var(--tw-bg-opacity, 1));\n}\n\n.hover\\:bg-teal-600:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(13 148 136 / var(--tw-bg-opacity, 1));\n}\n\n.focus\\:outline-none:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n\n.focus\\:ring-2:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus\\:ring-teal-500:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(20 184 166 / var(--tw-ring-opacity, 1));\n}\n\n.disabled\\:cursor-not-allowed:disabled {\n  cursor: not-allowed;\n}\n\n.disabled\\:opacity-50:disabled {\n  opacity: 0.5;\n}\n\n@media (min-width: 640px) {\n  .sm\\:sticky {\n    position: sticky;\n  }\n\n  .sm\\:w-full {\n    width: 100%;\n  }\n}\n\n@media (min-width: 768px) {\n  .md\\:fixed {\n    position: fixed;\n  }\n\n  .md\\:w-1\\/3 {\n    width: 33.333333%;\n  }\n}\n\n@media (min-width: 1024px) {\n  .lg\\:text-base {\n    font-size: 1rem;\n    line-height: 1.5rem;\n  }\n}\n\n@media (min-width: 1280px) {\n  .xl\\:p-8 {\n    padding: 2rem;\n  }\n}\n";

const sheet$1 = new CSSStyleSheet();
sheet$1.replaceSync(Styles$1);

class ChatWindow extends r$1 {
    static properties = {
        _isExpanded: { type: Boolean },
        _isLoaded: { type: Boolean },
        _currentChat: { type: String },
        messages: { type: Array },
        _showOptions: { type: Boolean },
    };

    constructor() {
        super();
        this._isExpanded = true;
        this._isLoaded = false;
        this._currentChat = "";
        this.messages = [];
        this._showOptions = true;
    }

    connectedCallback() {
        super.connectedCallback();
        S$1(this.shadowRoot, [sheet$1]);
    }

    _toggleExpand() {
        this._isExpanded = !this._isExpanded;
        this._showOptions = this._isExpanded;
    }

    _resumePreviousChat() {
        this._isLoaded = true;
        this._showOptions = false;
        this.messages = messages;
    }

    _startNewChat() {
        this._isLoaded = true;
        this.messages = [];
        this._showOptions = false;
    }

    _handleSendChat() {
        if (this._currentChat.trim()) {
            this.messages = [...this.messages, { user: this._currentChat }, { bot: "Here's the image for you!", imageUrl: "./public/images/tomato-soup.webp", imageAlt: "Tomato Soup" }];
            this._currentChat = "";
        }
    }

    _handleInputChange(e) {
        this._currentChat = e.target.value;
    }

    _getOptionsTemplate() {
        return x`
            <div class="flex flex-1 flex-col items-center justify-center gap-4 self-center p-4">
                <button id="resume-previous-chat-btn" @click="${this._resumePreviousChat}" class="w-full rounded-md bg-teal-600/50 px-4 py-2 text-white hover:bg-teal-600 focus:outline-none">Resume Previous Chat</button>
                <button @click="${this._startNewChat}" class="w-full rounded-md bg-orange-500/50 px-4 py-2 text-white hover:bg-orange-500 focus:outline-none">Start a New Conversation</button>
            </div>
        `;
    }

    _getChatTemplate() {
        return x`
            <div class="flex flex-1 flex-col">
                <chat-messages class="flex-1 overflow-y-auto" .messages="${this.messages}"></chat-messages>
                <chat-input .value="${this._currentChat}" @input="${this._handleInputChange}" @send-chat="${this._handleSendChat}"></chat-input>
            </div>
        `;
    }

    _getContentTemplate() {
        if (!this._isExpanded)
            return null;
        return this._showOptions ? this._getOptionsTemplate() : this._getChatTemplate();
    }

    render() {
        return x`
            <div id="chat-window" class="${this._isExpanded ? "h-[440px]" : "h-12"} bottom-2 right-2 m-auto flex flex-col rounded-lg border-2 border-solid bg-gray-50 shadow-lg sm:sticky sm:w-full md:fixed md:w-1/3">
                <div class="${this._isExpanded ? "rounded-t-lg" : "rounded-lg"} flex items-center justify-between bg-teal-600/75 px-4 py-2 text-white shadow-md">
                    <p class="text-lg font-semibold">Chef AI</p>
                    <button id="expand-chat-btn" @click="${this._toggleExpand}" class="rounded-full bg-white px-2 py-1 text-sm text-teal-600/75 hover:bg-teal-100 focus:outline-none">${this._isExpanded ? "Collapse" : "Expand"}</button>
                </div>
                ${this._getContentTemplate()}
            </div>
        `;
    }
}

customElements.define("chat-window", ChatWindow);

const restaurants = [
    { title: "Urban Eats", distance: "0.8", rating: "4.2" },
    { title: "Flavor Town", distance: "1.2", rating: "4.5" },
    { title: "Culinary Haven", distance: "2.0", rating: "4.7" },
    { title: "Savory Delights", distance: "2.3", rating: "4.8" },
    { title: "Gourmet Paradise", distance: "1.5", rating: "4.6" },
    { title: "Taste Haven", distance: "1.8", rating: "4.9" },
    { title: "Bistro Bliss", distance: "2.1", rating: "4.4" },
    { title: "Epicurean Escape", distance: "2.5", rating: "4.3" },
    { title: "Dine Divine", distance: "1.0", rating: "4.5" },
    { title: "Feast Fiesta", distance: "2.2", rating: "4.6" },
    { title: "Gastronomy Galore", distance: "1.7", rating: "4.7" },
    { title: "Cuisine Corner", distance: "2.4", rating: "4.8" },
    { title: "Bistro Bonanza", distance: "1.9", rating: "4.5" },
    { title: "Palate Pleasures", distance: "2.6", rating: "4.6" },
    { title: "Gourmet Garden", distance: "1.3", rating: "4.7" },
    { title: "Savor Station", distance: "2.7", rating: "4.8" },
];

class RestaurantCard extends LightDOMLitElement {
    static properties = {
        title: { type: String },
        distance: { type: String },
        rating: { type: String },
    };

    constructor() {
        super();
        this.title = "Urban Eats";
        this.distance = "0.8";
        this.rating = "4.2";
    }

    render() {
        return x`
            <div class="flex h-full flex-col justify-center rounded-lg bg-gradient-to-br from-white to-orange-100 p-[0.2rem] shadow-md">
                <div class="mb-1 text-xs font-bold">${this.title}</div>
                <div class="mb-[0.25rem] text-[0.675rem] text-gray-600">${this.distance} miles</div>
                <div class="text-[0.675rem] text-gray-400">${this.rating} stars</div>
            </div>
        `;
    }
}

customElements.define("restaurant-card", RestaurantCard);

class InformationWindow extends r$1 {
    static properties = {
        restaurants: { type: Array },
        _isChatExpanded: { type: Boolean },
        _currentIndex: { type: Number },
        chatWindow: { type: Object },
    };

    constructor() {
        super();
        this.restaurants = restaurants;
        this._isChatExpanded = true;
        this._currentIndex = 0;
        this._resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize && entry.contentBoxSize[0])
                    this._isChatExpanded = entry.contentBoxSize[0].blockSize > 350;
                else
                    this._isChatExpanded = entry.contentRect.height > 350;
                this._currentIndex = 0;
                this.updateCarousel();
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();
        S$1(this.shadowRoot, [sheet$1]);
    }

    firstUpdated() {
        const chatWindowInner = this.chatWindow.shadowRoot.querySelector("#chat-window");
        if (chatWindowInner)
            this._resizeObserver.observe(chatWindowInner);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._resizeObserver)
            this._resizeObserver.disconnect();
    }

    handleChatResize(event) {
        this._isChatExpanded = event.detail.isExpanded;
        this._currentIndex = 0;
        this.updateCarousel();
        this.requestUpdate();
    }

    previousCard() {
        if (this._currentIndex > 0) {
            this._currentIndex--;
            this.updateCarousel();
        }
    }

    nextCard() {
        if (this._currentIndex < this.restaurants.length - 1) {
            this._currentIndex++;
            this.updateCarousel();
        }
    }

    updateCarousel() {
        const cardRow = this.shadowRoot.querySelector(".card-row");
        if (cardRow)
            cardRow.style.transform = `translateX(-${this._currentIndex * 100}%)`;

        this.requestUpdate();
    }

    _getExpandedTemplate() {
        return x`
            <div class="relative w-full overflow-hidden">
                <button
                    class="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border-0 bg-black bg-opacity-50 p-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                    @click="${this.previousCard}"
                    ?disabled="${this._currentIndex === 0}"
                >
                    &lt;
                </button>
                <div class="card-row flex w-full">
                    ${this.restaurants.map((restaurant) => x` <restaurant-card title="${restaurant.title}" distance="${restaurant.distance}" rating="${restaurant.rating}" class="box-border w-full flex-none p-2"></restaurant-card> `)}
                </div>
                <button
                    id="next-restaurant-btn"
                    class="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border-0 bg-black bg-opacity-50 p-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                    @click="${this.nextCard}"
                    ?disabled="${this._currentIndex === this.restaurants.length - 1}"
                >
                    &gt;
                </button>
            </div>
        `;
    }

    _getGridTemplate() {
        return x` <div class="grid grid-cols-2 gap-4">${this.restaurants.map((restaurant) => x` <restaurant-card title="${restaurant.title}" distance="${restaurant.distance}" rating="${restaurant.rating}"></restaurant-card> `)}</div> `;
    }

    render() {
        return x`
            <div class="p-1 xl:p-8">
                <h4 class="my-1 mb-1 text-base font-semibold text-gray-700">Restaurants Near You</h4>
                ${this._isChatExpanded ? this._getExpandedTemplate() : this._getGridTemplate()}
            </div>
        `;
    }
}

customElements.define("information-window", InformationWindow);

const recipes = [
    {
        text: "Spaghetti Carbonara",
        description: "Italian pasta with eggs, cheese, pancetta, and pepper.",
        time: "20 mins",
        calories: "500 cals",
        servingSize: "4 servs",
        image: "./public/images/spaghetti-carbonara.webp",
        tags: ["pasta", "Italian", "carbonara"],
        ingredients: ["200g spaghetti", "100g pancetta", "2 large eggs", "50g pecorino cheese", "50g parmesan", "Black pepper", "Salt"],
        steps: ["Cook the spaghetti.", "Fry the pancetta.", "Mix eggs and cheese.", "Combine everything with pasta."],
    },
    {
        text: "Chicken Alfredo",
        description: "Creamy Alfredo sauce with tender chicken over fettuccine.",
        time: "30 mins",
        calories: "600 cals",
        servingSize: "4 servs",
        image: "./public/images/chicken-alfredo.webp",
        tags: ["pasta", "Italian", "alfredo"],
        ingredients: ["200g fettuccine", "2 chicken breasts", "100g butter", "200ml heavy cream", "50g parmesan", "Garlic", "Salt", "Pepper"],
        steps: ["Cook the fettuccine.", "Cook the chicken.", "Make the Alfredo sauce.", "Combine everything."],
    },
    {
        text: "Vegetable Stir Fry",
        description: "A quick and healthy stir fry with a mix of fresh vegetables.",
        time: "15 mins",
        calories: "300 cals",
        servingSize: "2 servs",
        image: "./public/images/vegetable-stir-fry.webp",
        tags: ["vegetarian", "stir fry"],
        ingredients: ["1 bell pepper", "1 carrot", "100g broccoli", "2 tbsp soy sauce", "1 tbsp olive oil", "Garlic", "Ginger"],
        steps: ["Chop the vegetables.", "Heat the oil.", "Stir fry the vegetables.", "Add soy sauce and serve."],
    },
    {
        text: "Beef Tacos",
        description: "Delicious beef tacos with fresh toppings and a squeeze of lime.",
        time: "25 mins",
        calories: "400 cals",
        servingSize: "3 servs",
        image: "./public/images/beef-tacos.webp",
        tags: ["tacos", "Mexican"],
        ingredients: ["300g ground beef", "Taco shells", "1 onion", "1 tomato", "Lettuce", "Cheese", "Taco seasoning"],
        steps: ["Cook the beef with seasoning.", "Prepare the toppings.", "Assemble the tacos.", "Serve with lime."],
    },
    {
        text: "Margherita Pizza",
        description: "A simple and classic pizza topped with fresh tomatoes, mozzarella, and basil.",
        time: "40 mins",
        calories: "700 cals",
        servingSize: "4 servs",
        image: "./public/images/margherita-pizza.webp",
        tags: ["pizza", "Italian", "vegetarian"],
        ingredients: ["Pizza dough", "Tomato sauce", "200g mozzarella", "Fresh basil", "Olive oil", "Salt"],
        steps: ["Prepare the dough.", "Spread the sauce.", "Add cheese and basil.", "Bake the pizza."],
    },
    {
        text: "Caesar Salad",
        description: "A fresh and crunchy salad with romaine lettuce, croutons, and Caesar dressing.",
        time: "10 mins",
        calories: "250 cals",
        servingSize: "2 servs",
        image: "./public/images/caesar-salad.webp",
        tags: ["salad", "healthy", "quick"],
        ingredients: ["Romaine lettuce", "Croutons", "Caesar dressing", "Parmesan cheese", "Lemon juice", "Salt", "Pepper"],
        steps: ["Chop the lettuce.", "Add croutons and cheese.", "Toss with dressing.", "Serve immediately."],
    },
    {
        text: "Chocolate Chip Cookies",
        description: "Classic chocolate chip cookies with a crispy edge and chewy center.",
        time: "25 mins",
        calories: "150 cals",
        servingSize: "12 servs",
        image: "./public/images/chocolate-chip-cookies.webp",
        tags: ["dessert", "cookies", "chocolate"],
        ingredients: ["200g flour", "100g butter", "100g sugar", "1 egg", "1 tsp vanilla extract", "100g chocolate chips", "1 tsp baking soda", "Salt"],
        steps: ["Preheat the oven to 180°C.", "Mix butter and sugar.", "Add egg and vanilla.", "Mix in dry ingredients.", "Fold in chocolate chips.", "Bake for 10-12 minutes."],
    },
    {
        text: "Greek Salad",
        description: "A refreshing salad with cucumbers, tomatoes, olives, and feta cheese.",
        time: "15 mins",
        calories: "200 cals",
        servingSize: "4 servs",
        image: "./public/images/greek-salad.webp",
        tags: ["salad", "Greek", "healthy"],
        ingredients: ["2 cucumbers", "4 tomatoes", "1 red onion", "100g feta cheese", "Olives", "Olive oil", "Lemon juice", "Oregano", "Salt", "Pepper"],
        steps: ["Chop the vegetables.", "Mix with olives and feta.", "Dress with olive oil and lemon juice.", "Season with oregano, salt, and pepper."],
    },
    {
        text: "Pancakes",
        description: "Fluffy pancakes perfect for a weekend breakfast.",
        time: "20 mins",
        calories: "350 cals",
        servingSize: "4 servs",
        image: "./public/images/pancakes.webp",
        tags: ["breakfast", "pancakes", "sweet"],
        ingredients: ["200g flour", "2 tbsp sugar", "2 tsp baking powder", "1/2 tsp salt", "1 egg", "300ml milk", "2 tbsp melted butter"],
        steps: ["Mix dry ingredients.", "Whisk in wet ingredients.", "Cook on a hot griddle until bubbles form.", "Flip and cook until golden brown."],
    },
    {
        text: "Tomato Soup",
        description: "A comforting tomato soup made with fresh tomatoes and basil.",
        time: "30 mins",
        calories: "150 cals",
        servingSize: "4 servs",
        image: "./public/images/tomato-soup.webp",
        tags: ["soup", "vegetarian", "comfort"],
        ingredients: ["1kg tomatoes", "1 onion", "2 cloves garlic", "500ml vegetable broth", "Fresh basil", "Olive oil", "Salt", "Pepper"],
        steps: ["Sauté onions and garlic.", "Add tomatoes and broth.", "Simmer for 20 minutes.", "Blend until smooth.", "Season with salt and pepper.", "Garnish with basil."],
    },
    {
        text: "Lemon Drizzle Cake",
        description: "A moist and tangy lemon cake with a sweet drizzle.",
        time: "45 mins",
        calories: "400 cals",
        servingSize: "8 servs",
        image: "./public/images/lemon-drizzle-cake.webp",
        tags: ["dessert", "cake", "lemon"],
        ingredients: ["200g flour", "200g sugar", "200g butter", "4 eggs", "2 lemons", "100g powdered sugar", "1 tsp baking powder", "Salt"],
        steps: [
            "Preheat the oven to 180°C.",
            "Mix butter and sugar.",
            "Add eggs one at a time.",
            "Fold in dry ingredients and lemon zest.",
            "Bake for 35-40 minutes.",
            "Mix lemon juice and powdered sugar for drizzle.",
            "Pour over the cake while warm.",
        ],
    },
    {
        text: "Garlic Bread",
        description: "Crispy and buttery garlic bread, perfect as a side dish.",
        time: "15 mins",
        calories: "200 cals",
        servingSize: "4 servs",
        image: "./public/images/garlic-bread.webp",
        tags: ["side", "bread", "garlic"],
        ingredients: ["1 baguette", "100g butter", "4 cloves garlic", "Parsley", "Salt"],
        steps: ["Preheat the oven to 200°C.", "Mix softened butter with minced garlic and parsley.", "Slice the baguette and spread the garlic butter.", "Wrap in foil and bake for 10-12 minutes."],
    },
    {
        text: "Thai Green Curry",
        description: "A spicy and flavorful curry with coconut milk, vegetables, and your choice of protein.",
        time: "35 mins",
        calories: "450 cals",
        servingSize: "4 servs",
        image: "./public/images/thai-green-curry.webp",
        tags: ["curry", "Thai", "spicy"],
        ingredients: ["400ml coconut milk", "2 tbsp green curry paste", "200g chicken breast", "1 bell pepper", "100g snap peas", "1 tbsp fish sauce", "Basil leaves", "Jasmine rice"],
        steps: [
            "Cook the jasmine rice.",
            "Sauté green curry paste until fragrant.",
            "Add chicken and cook until browned.",
            "Pour in coconut milk and simmer.",
            "Add vegetables and cook until tender.",
            "Stir in fish sauce and basil leaves.",
            "Serve over jasmine rice.",
        ],
    },
    {
        text: "Beef Stroganoff",
        description: "Tender beef strips in a creamy mushroom and onion sauce, served over egg noodles.",
        time: "40 mins",
        calories: "550 cals",
        servingSize: "4 servs",
        image: "./public/images/beef-stroganoff.webp",
        tags: ["beef", "Russian", "comfort"],
        ingredients: ["500g beef sirloin", "200g mushrooms", "1 onion", "2 cloves garlic", "200ml sour cream", "2 tbsp flour", "Beef broth", "Egg noodles", "Parsley"],
        steps: [
            "Cook the egg noodles according to package instructions.",
            "Sauté onions and garlic until translucent.",
            "Add beef strips and cook until browned.",
            "Add mushrooms and cook until softened.",
            "Stir in flour and cook for 1 minute.",
            "Pour in beef broth and simmer until sauce thickens.",
            "Stir in sour cream and heat through.",
            "Serve over egg noodles and garnish with parsley.",
        ],
    },
    {
        text: "Shrimp Paella",
        description: "A classic Spanish rice dish with shrimp, saffron, and a mix of fresh vegetables.",
        time: "50 mins",
        calories: "600 cals",
        servingSize: "4 servs",
        image: "./public/images/shrimp-paella.webp",
        tags: ["seafood", "Spanish", "rice"],
        ingredients: ["300g shrimp", "2 cups paella rice", "1 onion", "1 bell pepper", "2 tomatoes", "4 cloves garlic", "1 tsp saffron threads", "4 cups chicken broth", "Peas", "Lemon wedges"],
        steps: [
            "Sauté onions and garlic until fragrant.",
            "Add bell pepper and cook until softened.",
            "Stir in tomatoes and cook for 5 minutes.",
            "Add paella rice and saffron, stirring to coat the grains.",
            "Pour in chicken broth and bring to a boil.",
            "Reduce heat and simmer until rice is nearly cooked.",
            "Add shrimp and peas, cooking until shrimp are pink and rice is tender.",
            "Garnish with lemon wedges and serve.",
        ],
    },
    {
        text: "Quinoa Stuffed Peppers",
        description: "Colorful bell peppers filled with a savory mixture of quinoa, vegetables, and cheese.",
        time: "45 mins",
        calories: "350 cals",
        servingSize: "4 servs",
        image: "./public/images/quinoa-stuffed-peppers.webp",
        tags: ["vegetarian", "healthy", "baked"],
        ingredients: ["4 bell peppers", "1 cup quinoa", "2 cups vegetable broth", "1 zucchini", "1 onion", "2 cloves garlic", "1 can black beans", "1 cup corn", "1 tsp cumin", "1 tsp paprika", "1 cup shredded cheese", "Cilantro"],
        steps: [
            "Preheat the oven to 375°F (190°C).",
            "Cook quinoa in vegetable broth according to package instructions.",
            "Sauté onions and garlic until translucent.",
            "Add zucchini, black beans, corn, cumin, and paprika, cooking until vegetables are tender.",
            "Mix cooked quinoa with the vegetable mixture.",
            "Cut the tops off bell peppers and remove seeds.",
            "Stuff each pepper with the quinoa mixture and place in a baking dish.",
            "Top with shredded cheese and bake for 25-30 minutes.",
            "Garnish with cilantro and serve warm.",
        ],
    },
];

class RecipeCard extends LightDOMLitElement {
    static properties = {
        recipe: { type: Object },
        isExpanded: { type: Boolean },
    };

    constructor() {
        super();
        this.recipe = {
            text: "Recipe Card",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            time: "5 mins",
            calories: "200 cals",
            servingSize: "2 servs",
            tags: ["DeliciousRecipes", "HomeCooking", "FoodLovers"],
            ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
            steps: ["Step 1", "Step 2", "Step 3"],
        };
        this.isExpanded = false;
    }

    _toggleExpand() {
        this.isExpanded = !this.isExpanded;
        this.dispatchEvent(
            new Event("toggle-expand", {
                bubbles: true,
                composed: true,
            })
        );
    }

    _getStepsTemplate() {
        return this.recipe.steps.map(
            (step, index) => x`
                <li class="mb-2 flex items-center space-x-3 text-xs">
                    <span class="flex h-6 w-6 items-center justify-center rounded-full bg-orange-200 font-bold text-orange-800 shadow-sm">${index + 1}</span>
                    <span class="text-gray-700">${step}</span>
                </li>
            `
        );
    }

    _getExpandedTemplate() {
        return x`
            <div class="mx-2 mb-2 rounded-md bg-white/60 p-4 shadow-inner backdrop-blur-sm">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div class="rounded-lg bg-orange-50/70 p-3">
                        <h4 class="mb-2 border-b border-orange-200 pb-1 text-sm font-semibold text-orange-800">Ingredients:</h4>
                        <ul class="space-y-2 pl-1 text-xs text-gray-700">
                            ${this.recipe.ingredients.map(
        (ingredient) => x`
                                    <li class="flex items-center">
                                        <span class="mr-2 h-1.5 w-1.5 rounded-full bg-orange-400"></span>
                                        ${ingredient}
                                    </li>
                                `
    )}
                        </ul>
                    </div>
                    <div class="rounded-lg bg-blue-50/70 p-3">
                        <h4 class="mb-2 border-b border-blue-200 pb-1 text-sm font-semibold text-blue-800">Steps:</h4>
                        <ol class="space-y-2 pl-1 text-gray-700">
                            ${this._getStepsTemplate()}
                        </ol>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        return x`
            <div class="relative row-span-6 grid grid-rows-subgrid overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-br from-blue-50 to-green-50 text-left shadow-lg transition-all duration-300 hover:shadow-xl">
                <div class="row-start-1 h-32 overflow-hidden">
                    <img src="${this.recipe.image}" alt="${this.recipe.text}" class="h-full w-full rounded-t-xl object-cover" />
                </div>
                <h3 class="row-start-2 px-3 py-2 text-base font-medium text-gray-800">${this.recipe.text}</h3>
                <div class="row-start-3 flex justify-between px-3 pb-2 text-xs font-medium">
                    <p class="flex items-center text-orange-600">
                        <svg class="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"></path></svg>${this.recipe.time}
                    </p>
                    <p class="flex items-center text-red-600">
                        <svg class="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"></path></svg>${this.recipe.calories}
                    </p>
                    <p class="flex items-center text-green-600">
                        <svg class="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg
                        >${this.recipe.servingSize}
                    </p>
                </div>
                <p class="row-start-4 line-clamp-2 h-10 px-3 py-1 text-xs text-gray-600">${this.recipe.description}</p>
                <div class="absolute right-2 top-2 flex max-w-[80%] flex-wrap justify-end gap-1">
                    ${this.recipe.tags.map((tag) => x` <span class="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-800 ring-1 ring-inset ring-orange-400/20">${tag}</span> `)}
                </div>
                ${this.isExpanded ? this._getExpandedTemplate() : ""}
                <button
                    @click="${this._toggleExpand}"
                    class="mb-2 flex items-center justify-self-center rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-1 text-xs font-medium text-white shadow-sm transition-all duration-300 hover:from-orange-600 hover:to-orange-500"
                >
                    ${this.isExpanded
        ? x`<svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg> Show Less`
        : x`<svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg> Show More`}
                </button>
            </div>
        `;
    }
}

customElements.define("recipe-card", RecipeCard);

class RecipeGrid extends LightDOMLitElement {
    static properties = {
        _expandedCardIndices: { type: Array },
        recipes: { type: Array },
    };

    constructor() {
        super();
        this._expandedCardIndices = [];
        this.recipes = recipes;
    }

    _handleToggleExpand(event) {
        const target = event.target;
        const cardIndex = parseInt(target.dataset.index);
        if (target.isExpanded)
            this._expandedCardIndices = [...this._expandedCardIndices, cardIndex];
        else
            this._expandedCardIndices = this._expandedCardIndices.filter((index) => index !== cardIndex);
    }

    _getRecipeCardsTemplate() {
        return this.recipes.map(
            (recipe, index) => x`
                <recipe-card
                    class="${this._expandedCardIndices.includes(index) ? "col-span-2 lg:col-span-2" : ""} relative row-span-6 mt-1 grid grid-rows-subgrid gap-0 rounded-lg bg-white text-left shadow-md hover:shadow-lg"
                    .recipe="${recipe}"
                    data-index="${index}"
                ></recipe-card>
            `
        );
    }

    render() {
        return x` <div class="grid grid-cols-2 gap-5 py-2 pl-2 pr-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6" @toggle-expand="${this._handleToggleExpand}">${this._getRecipeCardsTemplate()}</div> `;
    }
}

customElements.define("recipe-grid", RecipeGrid);

const carouselItems = [
    {
        image: "./public/images/pancakes.webp",
        alt: "Pancakes",
    },
    {
        image: "./public/images/greek-salad.webp",
        alt: "Greek Salad",
    },
    {
        image: "./public/images/beef-tacos.webp",
        alt: "Beef Tacos",
    },
    {
        image: "./public/images/tomato-soup.webp",
        alt: "Tomato Soup",
    },
    {
        image: "./public/images/chocolate-cake.webp",
        alt: "Chocolate Cake",
    },
    {
        image: "./public/images/spaghetti-carbonara.webp",
        alt: "Spaghetti Carbonara",
    },
    {
        image: "./public/images/homemade-pizza.webp",
        alt: "Homemade Pizza",
    },
    {
        image: "./public/images/vegetarian-stir-fry.webp",
        alt: "Vegetarian Stir Fry",
    },
    {
        image: "./public/images/chicken-alfredo.webp",
        alt: "Chicken Alfredo",
    },
    {
        image: "./public/images/margherita-pizza.webp",
        alt: "Margherita Pizza",
    },
    {
        image: "./public/images/caesar-salad.webp",
        alt: "Caesar Salad",
    },
    {
        image: "./public/images/chocolate-chip-cookies.webp",
        alt: "Chocolate Chip Cookies",
    },
    {
        image: "./public/images/vegan-burger.webp",
        alt: "Vegan Burger",
    },
    {
        image: "./public/images/sushi-platter.webp",
        alt: "Sushi Platter",
    },
    {
        image: "./public/images/ramen-noodles.webp",
        alt: "Ramen Noodles",
    },
    {
        image: "./public/images/fruit-salad.webp",
        alt: "Fruit Salad",
    },
];

const ITEMS_PER_VIEW_XL = 5;
const ITEMS_PER_VIEW_DEFAULT = 3;

class RecipeCarousel extends LightDOMLitElement {
    static properties = {
        carouselItems: { type: Array },
        _currentIndex: { type: Number },
        _carouselWidth: { type: Number },
    };

    constructor() {
        super();
        this.carouselItems = carouselItems;
        this._currentIndex = 0;
        this._carouselWidth = 0;
        this._resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize && entry.contentBoxSize[0])
                    this._carouselWidth = entry.contentBoxSize[0].inlineSize;
                else
                    this._carouselWidth = entry.contentRect.width;
            }
        });
    }

    firstUpdated() {
        const carousel = this.querySelector(".carousel");
        if (carousel)
            this._resizeObserver.observe(carousel);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._resizeObserver)
            this._resizeObserver.disconnect();
    }

    previousItem() {
        const carousel = this.querySelector(".carousel");
        if (carousel) {
            const itemsPerView = this._getItemsPerView();
            carousel.scrollBy({
                left: -carousel.clientWidth / itemsPerView,
                behavior: "smooth",
            });
            this._currentIndex = Math.max(this._currentIndex - 1, 0);
        }
    }

    nextItem() {
        const carousel = this.querySelector(".carousel");
        if (carousel) {
            const itemsPerView = this._getItemsPerView();
            carousel.scrollBy({
                left: carousel.clientWidth / itemsPerView,
                behavior: "smooth",
            });
            this._currentIndex = Math.min(this._currentIndex + 1, this.carouselItems.length - itemsPerView);
        }
    }

    _getItemsPerView() {
        return this._carouselWidth >= 800 ? ITEMS_PER_VIEW_XL : ITEMS_PER_VIEW_DEFAULT;
    }

    _getCarouselItemsTemplate() {
        return this.carouselItems.map(
            (item) => x`
                <div class="carousel-item mr-4 h-36 w-1/3 flex-none snap-center overflow-hidden rounded-lg xl:w-1/5">
                    <img src="${item.image}" alt="${item.alt}" class="h-full w-full rounded-t-lg object-cover drop-shadow-xl" />
                </div>
            `
        );
    }

    render() {
        return x`
            <div class="box-border w-full bg-gray-100 shadow-md">
                <div class="relative flex w-full gap-4 overflow-hidden">
                    <button
                        @click="${this.previousItem}"
                        class="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full border-2 border-solid border-orange-300 bg-white bg-opacity-100 p-2 text-black shadow-md hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-50"
                        ?disabled="${this._currentIndex === 0}"
                        aria-label="Previous Recipe"
                    >
                        &lt;
                    </button>
                    <div class="px-5 pb-1">
                        <div class="carousel scrollbar-hide flex w-full snap-x overflow-x-scroll scroll-smooth">${this._getCarouselItemsTemplate()}</div>
                    </div>
                    <button
                        id="next-item-carousel-btn"
                        @click="${this.nextItem}"
                        class="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full border-2 border-solid border-orange-300 bg-white bg-opacity-100 p-2 text-black hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-50"
                        ?disabled="${this._currentIndex === this.carouselItems.length - this._getItemsPerView()}"
                        aria-label="Next Recipe"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define("recipe-carousel", RecipeCarousel);

class SectionHeading extends LightDOMLitElement {
    static properties = {
        title: { type: String },
        subtitle: { type: String },
    };

    render() {
        return x`
            <h2 class="text-left leading-9 tracking-tight has-[+p]:mb-1">${this.title}</h2>
            ${this.subtitle ? x`<p class="pl-1 text-sm text-gray-600">${this.subtitle}</p>` : ""}
        `;
    }
}

customElements.define("section-heading", SectionHeading);

class MainContent extends LightDOMLitElement {
    render() {
        return x`<div class="grid h-full grow content-center gap-1 p-4">
            <section-heading title="Featured Recipes"></section-heading>
            <recipe-carousel></recipe-carousel>
            <section-heading title="Delicious Recipes" subtitle="Explore a variety of recipes to satisfy your culinary cravings."></section-heading>
            <recipe-grid></recipe-grid>
        </div>`;
    }
}
customElements.define("main-content", MainContent);

const videos = [
    {
        text: "How to Make Spaghetti Carbonara",
        description: "A step-by-step guide to making classic spaghetti carbonara.",
    },
    {
        text: "Baking the Perfect Chocolate Cake",
        description: "Learn the secrets to baking a moist and delicious chocolate cake.",
    },
    {
        text: "Grilling Tips for Beginners",
        description: "Essential tips and tricks for mastering the grill.",
    },
    {
        text: "Making Homemade Pizza",
        description: "How to make delicious homemade pizza from scratch.",
    },
    {
        text: "Vegetarian Stir-Fry Recipe",
        description: "A quick and easy vegetarian stir-fry recipe.",
    },
    {
        text: "How to Make Chicken Alfredo",
        description: "Step-by-step instructions for making creamy chicken alfredo.",
    },
    {
        text: "Beef Tacos Recipe",
        description: "Learn how to make delicious beef tacos with fresh toppings.",
    },
    {
        text: "Margherita Pizza Recipe",
        description: "A guide to making classic Margherita pizza with fresh ingredients.",
    },
    {
        text: "Caesar Salad Preparation",
        description: "How to prepare a fresh and crunchy Caesar salad.",
    },
    {
        text: "Perfecting French Toast",
        description: "Tips and tricks for making the perfect French toast.",
    },
    {
        text: "How to Make Sushi",
        description: "A beginner's guide to making sushi at home.",
    },
    {
        text: "Classic Beef Stew Recipe",
        description: "How to make a hearty and delicious beef stew.",
    },
    {
        text: "Vegan Chocolate Mousse",
        description: "A simple recipe for a rich and creamy vegan chocolate mousse.",
    },
    {
        text: "Homemade Ice Cream",
        description: "Learn how to make creamy homemade ice cream with various flavors.",
    },
];

class VideoCard extends LightDOMLitElement {
    static properties = {
        text: { type: String },
        description: { type: String },
    };

    constructor() {
        super();
        this.text = "Modern Video Title";
        this.description = "A brief description of the video content goes here.";
    }

    render() {
        return x`
            <div class="rounded-lg bg-white shadow-md">
                <video controls class="w-full rounded-t-lg object-cover">
                    <source type="video/mp4" />
                    <p>Your browser doesn't support HTML video.</p>
                </video>
                <div class="p-4">
                    <h3 class="text-base font-medium text-gray-900">${this.text}</h3>
                    <p class="mt-2 text-sm text-gray-600">${this.description}</p>
                </div>
            </div>
        `;
    }
}

customElements.define("video-card", VideoCard);

class VideoGrid extends LightDOMLitElement {
    static properties = {
        videos: { type: Array },
    };

    constructor() {
        super();
        this.videos = videos;
    }

    _getVideoCardsTemplate() {
        return this.videos.map((video) => {
            return x`<video-card text="${video.text}" description="${video.description}"></video-card>`;
        });
    }

    render() {
        return x`
            <div class="flex flex-col p-2">
                <section-heading title="Videos" subtitle="Watch and learn from our collection of cooking videos."></section-heading>
                <div class="content-auto grid grid-cols-1 gap-6 p-4 lg:grid-cols-2 xl:gap-7">${this._getVideoCardsTemplate()}</div>
            </div>
        `;
    }
}

customElements.define("video-grid", VideoGrid);

const articles = [
    {
        title: "10 Quick and Easy Weeknight Dinners",
        description: "Discover a collection of recipes that are perfect for busy weeknights. These dishes are quick to prepare and delicious to eat.",
        author: "Jane Doe",
        date: "2024-10-01",
        image: "./public/images/week-night-dinners.webp",
        tags: ["quick", "easy", "weeknight", "dinner"],
    },
    {
        title: "The Ultimate Guide to Baking Bread at Home",
        description: "Learn the art of baking bread with this comprehensive guide. From sourdough to whole wheat, we've got you covered.",
        author: "John Smith",
        date: "2024-09-15",
        image: "./public/images/bread-at-home.webp",
        tags: ["baking", "bread", "guide"],
    },
    {
        title: "5 Healthy Smoothie Recipes to Start Your Day",
        description: "Kickstart your morning with these nutritious and delicious smoothie recipes. Perfect for a quick breakfast on the go.",
        author: "Emily Johnson",
        date: "2024-08-20",
        image: "./public/images/5-healthy-smoothie.webp",
        tags: ["healthy", "smoothie", "breakfast"],
    },
    {
        title: "Exploring the Flavors of Mediterranean Cuisine",
        description: "Dive into the rich and diverse flavors of Mediterranean cuisine. Explore recipes that are both healthy and flavorful.",
        author: "Michael Brown",
        date: "2024-07-30",
        image: "./public/images/mediterranean-cuisine.webp",
        tags: ["Mediterranean", "cuisine", "healthy"],
    },
    {
        title: "Vegan Desserts That Will Satisfy Your Sweet Tooth",
        description: "Indulge in these delicious vegan desserts that are sure to satisfy your sweet cravings. Perfect for any occasion.",
        author: "Sarah Lee",
        date: "2024-06-25",
        image: "./public/images/vegan-desserts.webp",
        tags: ["vegan", "desserts", "sweet"],
    },
    {
        title: "Mastering the Art of French Cooking",
        description: "A deep dive into the techniques and recipes that define French cuisine. Perfect for both beginners and experienced cooks.",
        author: "Julia Child",
        date: "2024-05-10",
        image: "./public/images/mastering-art-of-french-cooking.webp",
        tags: ["French", "cooking", "techniques"],
    },
    {
        title: "Top 10 Superfoods You Should Include in Your Diet",
        description: "Discover the top superfoods that can boost your health and well-being. Learn how to incorporate them into your daily meals.",
        author: "Dr. Mark Hyman",
        date: "2024-04-05",
        image: "./public/images/superfoods-you-should-include.webp",
        tags: ["superfoods", "health", "nutrition"],
    },
    {
        title: "A Beginner's Guide to Meal Prepping",
        description: "Learn the basics of meal prepping and how it can save you time and money. Includes tips and recipes to get you started.",
        author: "Rachel Ray",
        date: "2024-03-15",
        image: "./public/images/meal-prepping.webp",
        tags: ["meal prepping", "guide", "tips"],
    },
    {
        title: "The Best Comfort Foods for a Cozy Night In",
        description: "Indulge in these comforting recipes that are perfect for a cozy night at home. From mac and cheese to chicken pot pie, we've got you covered.",
        author: "Ina Garten",
        date: "2024-02-20",
        image: "./public/images/best-comfort-food.webp",
        tags: ["comfort food", "cozy", "recipes"],
    },
    {
        title: "Innovative Plant-Based Protein Recipes",
        description: "Discover creative plant-based protein recipes that are both tasty and nutritious. Perfect for a healthy lifestyle.",
        author: "Laura Green",
        date: "2024-06-10",
        image: "./public/images/plant-based-protein.webp",
        tags: ["plant-based", "protein", "recipes"],
    },
    {
        title: "Gluten-Free Baking Essentials",
        description: "Master gluten-free baking with these essential tips and recipes. Enjoy delicious baked goods without the gluten.",
        author: "Mark Taylor",
        date: "2024-05-22",
        image: "./public/images/gluten-free-baking.webp",
        tags: ["gluten-free", "baking", "essentials"],
    },
    {
        title: "Seasonal Salads for Every Occasion",
        description: "Refresh your meals with these seasonal salad recipes. Perfect for any occasion and packed with fresh ingredients.",
        author: "Samantha Lee",
        date: "2024-04-18",
        image: "./public/images/seasonal-salads.webp",
        tags: ["seasonal", "salads", "recipes"],
    },
    {
        title: "Decadent Low-Carb Desserts",
        description: "Indulge in these delicious low-carb desserts that satisfy your sweet tooth without the extra carbs.",
        author: "Kevin White",
        date: "2024-03-30",
        image: "./public/images/low-carb-desserts.webp",
        tags: ["low-carb", "desserts", "decadent"],
    },
];

class ArticleCard extends LightDOMLitElement {
    static properties = {
        title: { type: String },
        description: { type: String },
        author: { type: String },
        date: { type: String },
        image: { type: String },
        tags: { type: Array },
    };

    constructor() {
        super();
        this.title = "Vegan Desserts That Will Satisfy Your Sweet Tooth";
        this.description = "Indulge in these delicious vegan desserts that are sure to satisfy your sweet cravings. Perfect for any occasion.";
        this.author = "Sarah Lee";
        this.date = "2023-06-25";
        this.image = "./public/images/placeholder-image-150.svg";
        this.tags = ["vegan", "desserts", "sweet"];
    }

    render() {
        const tags = this.tags.map((tag) => x`<span class="inline-flex items-center rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-orange-500/10">${tag}</span>`);
        return x`
            <div class="col-span-2 grid grid-cols-subgrid gap-4 rounded-lg bg-gradient-to-br from-blue-50 to-green-50 shadow-md hover:shadow-lg">
                <div class="flex flex-col justify-around p-4 xl:p-6">
                    <div>
                        <h3 class="lg:text-lg">${this.title}</h3>
                        <p class="mt-6 text-sm text-gray-600 lg:text-base">${this.description}</p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="text-sm text-gray-500">
                            <p>By <b>${this.author}</b> on ${this.date}</p>
                        </div>
                        <div class="flex flex-wrap gap-2">${tags}</div>
                    </div>
                </div>
                <div class="flex">
                    <img src="${this.image}" alt="${this.title}" class="w-full object-cover" />
                </div>
            </div>
        `;
    }
}

customElements.define("article-card", ArticleCard);

class ArticleGrid extends LightDOMLitElement {
    static properties = {
        articles: { type: Array },
    };
    constructor() {
        super();
        this.articles = articles;
    }

    _getArticlesTemplate() {
        return this.articles.map((article) => {
            return x`<article-card class="col-span-2 grid grid-cols-subgrid" title="${article.title}" description="${article.description}" author="${article.author}" image="${article.image}" .tags="${article.tags}"></article-card>`;
        });
    }

    render() {
        return x`
            <div class="p-2">
                <section-heading title="Articles" subtitle="Read insightful articles about food, cooking tips, and more."></section-heading>
                <div class="content-auto grid grid-cols-2 gap-6 p-4 xl:grid-cols-4 xl:gap-7">${this._getArticlesTemplate()}</div>
            </div>
        `;
    }
}

customElements.define("article-grid", ArticleGrid);

class NewsletterSignup extends LightDOMLitElement {
    render() {
        return x`
            <div class="mt-8 rounded-lg bg-gray-100 p-4 shadow-md">
                <section-heading title="Stay Updated" subtitle="Sign up for our newsletter to receive the latest recipes and updates."></section-heading>
                <form class="mt-4">
                    <label for="email" class="sr-only">Enter your email</label>
                    <input id="email" type="email" placeholder="Enter your email" class="w-full rounded-md border border-gray-300 p-2" />
                    <button type="submit" class="mt-2 w-full rounded-md bg-orange-500 p-2 text-white hover:bg-orange-600">Subscribe</button>
                </form>
            </div>
        `;
    }
}

customElements.define("newsletter-signup", NewsletterSignup);

const chefTips = [
    { quote: "Always use fresh ingredients for the best flavor.", author: "Chef Alex Thompson" },
    { quote: "Don't be afraid to experiment with new recipes and ingredients.", author: "Chef Jamie Smith" },
    { quote: "Keep your knives sharp to make food prep easier.", author: "Chef Jordan Lee" },
    { quote: "Taste as you cook and adjust the seasoning as needed.", author: "Chef Taylor Brown" },
    { quote: "Clean as you go to make cleanup easier.", author: "Chef Morgan Davis" },
    { quote: "Have fun and enjoy the process of cooking!", author: "Chef Casey Johnson" },
    { quote: "Use a thermometer to ensure your meat is cooked to the right temperature.", author: "Chef Riley Adams" },
    { quote: "Let your meat rest before slicing to retain its juices.", author: "Chef Avery Martinez" },
    { quote: "Use the right pan for the job to achieve the best results.", author: "Chef Cameron White" },
    { quote: "Don't overcrowd the pan to ensure even cooking.", author: "Chef Jordan Taylor" },
    { quote: "Prep all your ingredients before you start cooking to stay organized.", author: "Chef Sydney Clark" },
    { quote: "Use fresh herbs to add a burst of flavor to your dishes.", author: "Chef Peyton Brooks" },
    { quote: "Invest in good quality cookware for better performance.", author: "Chef Quinn Parker" },
    { quote: "Season your food at every stage of cooking for depth of flavor.", author: "Chef Reese Morgan" },
    { quote: "Learn to balance flavors like sweet, salty, sour, and bitter.", author: "Chef Taylor Bailey" },
];

class ChefTips extends LightDOMLitElement {
    static properties = {
        chefTips: {},
    };

    constructor() {
        super();
        this.chefTips = chefTips;
    }

    _getChefTipsTemplate() {
        return this.chefTips.map((tip) => {
            return x`
                <blockquote class="rounded-lg bg-gray-100 p-4 shadow-md">
                    <p class="italic text-gray-700">"${tip.quote}"</p>
                    <footer class="mt-2 text-right text-sm text-gray-500">- ${tip.author}</footer>
                </blockquote>
            `;
        });
    }

    render() {
        return x`
            <div class="p-4">
                <section-heading title="Chef's Tips"></section-heading>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">${this._getChefTipsTemplate()}</div>
            </div>
        `;
    }
}

customElements.define("chef-tips", ChefTips);

var Styles = "*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n  --tw-contain-size:  ;\n  --tw-contain-layout:  ;\n  --tw-contain-paint:  ;\n  --tw-contain-style:  ;\n}\n\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n  --tw-contain-size:  ;\n  --tw-contain-layout:  ;\n  --tw-contain-paint:  ;\n  --tw-contain-style:  ;\n}\n\n/*\n! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com\n*/\n\n/*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box;\n  /* 1 */\n  border-width: 0;\n  /* 2 */\n  border-style: solid;\n  /* 2 */\n  border-color: #e5e7eb;\n  /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n5. Use the user's configured `sans` font-feature-settings by default.\n6. Use the user's configured `sans` font-variation-settings by default.\n7. Disable tap highlights on iOS\n*/\n\nhtml,\n:host {\n  line-height: 1.5;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n  -moz-tab-size: 4;\n  /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4;\n  /* 3 */\n  font-family: ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  /* 4 */\n  font-feature-settings: normal;\n  /* 5 */\n  font-variation-settings: normal;\n  /* 6 */\n  -webkit-tap-highlight-color: transparent;\n  /* 7 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0;\n  /* 1 */\n  line-height: inherit;\n  /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  border-top-width: 1px;\n  /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font-family by default.\n2. Use the user's configured `mono` font-feature-settings by default.\n3. Use the user's configured `mono` font-variation-settings by default.\n4. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n  /* 1 */\n  font-feature-settings: normal;\n  /* 2 */\n  font-variation-settings: normal;\n  /* 3 */\n  font-size: 1em;\n  /* 4 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0;\n  /* 1 */\n  border-color: inherit;\n  /* 2 */\n  border-collapse: collapse;\n  /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  /* 1 */\n  font-feature-settings: inherit;\n  /* 1 */\n  font-variation-settings: inherit;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  font-weight: inherit;\n  /* 1 */\n  line-height: inherit;\n  /* 1 */\n  letter-spacing: inherit;\n  /* 1 */\n  color: inherit;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n  padding: 0;\n  /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\ninput:where([type='button']),\ninput:where([type='reset']),\ninput:where([type='submit']) {\n  -webkit-appearance: button;\n  /* 1 */\n  background-color: transparent;\n  /* 2 */\n  background-image: none;\n  /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nReset default styling for dialogs.\n*/\n\ndialog {\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1;\n  /* 1 */\n  color: #9ca3af;\n  /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1;\n  /* 1 */\n  color: #9ca3af;\n  /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block;\n  /* 1 */\n  vertical-align: middle;\n  /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n\n[hidden]:where(:not([hidden=\"until-found\"])) {\n  display: none;\n}\n\nh1 {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n\n:is(h2, h3) {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n\n:is(h1, h2, h3, h4) {\n  --tw-text-opacity: 1;\n  color: rgb(55 65 81 / var(--tw-text-opacity, 1));\n  font-weight: 700;\n}\n\n.container {\n  width: 100%;\n}\n\n@media (min-width: 640px) {\n  .container {\n    max-width: 640px;\n  }\n}\n\n@media (min-width: 768px) {\n  .container {\n    max-width: 768px;\n  }\n}\n\n@media (min-width: 1024px) {\n  .container {\n    max-width: 1024px;\n  }\n}\n\n@media (min-width: 1280px) {\n  .container {\n    max-width: 1280px;\n  }\n}\n\n@media (min-width: 1536px) {\n  .container {\n    max-width: 1536px;\n  }\n}\n\n@media (min-width: 1720px) {\n  .container {\n    max-width: 1720px;\n  }\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.static {\n  position: static;\n}\n\n.absolute {\n  position: absolute;\n}\n\n.relative {\n  position: relative;\n}\n\n.left-0 {\n  left: 0px;\n}\n\n.right-0 {\n  right: 0px;\n}\n\n.right-2 {\n  right: 0.5rem;\n}\n\n.top-1\\/2 {\n  top: 50%;\n}\n\n.top-2 {\n  top: 0.5rem;\n}\n\n.z-10 {\n  z-index: 10;\n}\n\n.col-span-2 {\n  grid-column: span 2 / span 2;\n}\n\n.row-span-6 {\n  grid-row: span 6 / span 6;\n}\n\n.row-start-1 {\n  grid-row-start: 1;\n}\n\n.row-start-2 {\n  grid-row-start: 2;\n}\n\n.row-start-3 {\n  grid-row-start: 3;\n}\n\n.row-start-4 {\n  grid-row-start: 4;\n}\n\n.mx-0\\.5 {\n  margin-left: 0.125rem;\n  margin-right: 0.125rem;\n}\n\n.mx-1 {\n  margin-left: 0.25rem;\n  margin-right: 0.25rem;\n}\n\n.mx-2 {\n  margin-left: 0.5rem;\n  margin-right: 0.5rem;\n}\n\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n\n.ml-2 {\n  margin-left: 0.5rem;\n}\n\n.mr-1 {\n  margin-right: 0.25rem;\n}\n\n.mr-2 {\n  margin-right: 0.5rem;\n}\n\n.mr-4 {\n  margin-right: 1rem;\n}\n\n.mt-1 {\n  margin-top: 0.25rem;\n}\n\n.mt-2 {\n  margin-top: 0.5rem;\n}\n\n.mt-4 {\n  margin-top: 1rem;\n}\n\n.mt-6 {\n  margin-top: 1.5rem;\n}\n\n.mt-8 {\n  margin-top: 2rem;\n}\n\n.box-border {\n  box-sizing: border-box;\n}\n\n.line-clamp-2 {\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n\n.block {\n  display: block;\n}\n\n.flex {\n  display: flex;\n}\n\n.inline-flex {\n  display: inline-flex;\n}\n\n.grid {\n  display: grid;\n}\n\n.hidden {\n  display: none;\n}\n\n.h-1\\.5 {\n  height: 0.375rem;\n}\n\n.h-10 {\n  height: 2.5rem;\n}\n\n.h-3 {\n  height: 0.75rem;\n}\n\n.h-32 {\n  height: 8rem;\n}\n\n.h-36 {\n  height: 9rem;\n}\n\n.h-6 {\n  height: 1.5rem;\n}\n\n.h-full {\n  height: 100%;\n}\n\n.max-h-\\[345px\\] {\n  max-height: 345px;\n}\n\n.min-h-12 {\n  min-height: 3rem;\n}\n\n.w-1\\.5 {\n  width: 0.375rem;\n}\n\n.w-1\\/3 {\n  width: 33.333333%;\n}\n\n.w-10 {\n  width: 2.5rem;\n}\n\n.w-3 {\n  width: 0.75rem;\n}\n\n.w-6 {\n  width: 1.5rem;\n}\n\n.w-full {\n  width: 100%;\n}\n\n.max-w-\\[80\\%\\] {\n  max-width: 80%;\n}\n\n.flex-1 {\n  flex: 1 1 0%;\n}\n\n.flex-none {\n  flex: none;\n}\n\n.flex-shrink-0 {\n  flex-shrink: 0;\n}\n\n.grow {\n  flex-grow: 1;\n}\n\n.grow-0 {\n  flex-grow: 0;\n}\n\n.basis-\\[content\\] {\n  flex-basis: content;\n}\n\n.-translate-y-1\\/2 {\n  --tw-translate-y: -50%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.transform {\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.resize-none {\n  resize: none;\n}\n\n.snap-x {\n  scroll-snap-type: x var(--tw-scroll-snap-strictness);\n}\n\n.snap-center {\n  scroll-snap-align: center;\n}\n\n.grid-cols-1 {\n  grid-template-columns: repeat(1, minmax(0, 1fr));\n}\n\n.grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.grid-cols-subgrid {\n  grid-template-columns: subgrid;\n}\n\n.grid-rows-subgrid {\n  grid-template-rows: subgrid;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.flex-wrap {\n  flex-wrap: wrap;\n}\n\n.flex-nowrap {\n  flex-wrap: nowrap;\n}\n\n.content-center {\n  align-content: center;\n}\n\n.items-start {\n  align-items: flex-start;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.items-baseline {\n  align-items: baseline;\n}\n\n.justify-start {\n  justify-content: flex-start;\n}\n\n.justify-end {\n  justify-content: flex-end;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.justify-around {\n  justify-content: space-around;\n}\n\n.gap-0 {\n  gap: 0px;\n}\n\n.gap-1 {\n  gap: 0.25rem;\n}\n\n.gap-2 {\n  gap: 0.5rem;\n}\n\n.gap-4 {\n  gap: 1rem;\n}\n\n.gap-5 {\n  gap: 1.25rem;\n}\n\n.gap-6 {\n  gap: 1.5rem;\n}\n\n.space-x-2 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-x-reverse: 0;\n  margin-right: calc(0.5rem * var(--tw-space-x-reverse));\n  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));\n}\n\n.space-x-3 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-x-reverse: 0;\n  margin-right: calc(0.75rem * var(--tw-space-x-reverse));\n  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));\n}\n\n.space-y-2 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));\n}\n\n.space-y-4 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(1rem * var(--tw-space-y-reverse));\n}\n\n.justify-self-center {\n  justify-self: center;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.overflow-y-auto {\n  overflow-y: auto;\n}\n\n.overflow-x-hidden {\n  overflow-x: hidden;\n}\n\n.overflow-x-scroll {\n  overflow-x: scroll;\n}\n\n.scroll-smooth {\n  scroll-behavior: smooth;\n}\n\n.text-pretty {\n  text-wrap: pretty;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.rounded-md {\n  border-radius: 0.375rem;\n}\n\n.rounded-xl {\n  border-radius: 0.75rem;\n}\n\n.rounded-t-lg {\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n}\n\n.rounded-t-xl {\n  border-top-left-radius: 0.75rem;\n  border-top-right-radius: 0.75rem;\n}\n\n.border {\n  border-width: 1px;\n}\n\n.border-2 {\n  border-width: 2px;\n}\n\n.border-b {\n  border-bottom-width: 1px;\n}\n\n.border-l {\n  border-left-width: 1px;\n}\n\n.border-t {\n  border-top-width: 1px;\n}\n\n.border-solid {\n  border-style: solid;\n}\n\n.border-blue-200 {\n  --tw-border-opacity: 1;\n  border-color: rgb(191 219 254 / var(--tw-border-opacity, 1));\n}\n\n.border-gray-100 {\n  --tw-border-opacity: 1;\n  border-color: rgb(243 244 246 / var(--tw-border-opacity, 1));\n}\n\n.border-gray-200 {\n  --tw-border-opacity: 1;\n  border-color: rgb(229 231 235 / var(--tw-border-opacity, 1));\n}\n\n.border-gray-300 {\n  --tw-border-opacity: 1;\n  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));\n}\n\n.border-orange-200 {\n  --tw-border-opacity: 1;\n  border-color: rgb(254 215 170 / var(--tw-border-opacity, 1));\n}\n\n.border-orange-300 {\n  --tw-border-opacity: 1;\n  border-color: rgb(253 186 116 / var(--tw-border-opacity, 1));\n}\n\n.bg-blue-50\\/70 {\n  background-color: rgb(239 246 255 / 0.7);\n}\n\n.bg-gray-100 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));\n}\n\n.bg-gray-200 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));\n}\n\n.bg-orange-100 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 237 213 / var(--tw-bg-opacity, 1));\n}\n\n.bg-orange-200 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 215 170 / var(--tw-bg-opacity, 1));\n}\n\n.bg-orange-400 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(251 146 60 / var(--tw-bg-opacity, 1));\n}\n\n.bg-orange-50\\/70 {\n  background-color: rgb(255 247 237 / 0.7);\n}\n\n.bg-orange-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 115 22 / var(--tw-bg-opacity, 1));\n}\n\n.bg-teal-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(20 184 166 / var(--tw-bg-opacity, 1));\n}\n\n.bg-teal-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(13 148 136 / var(--tw-bg-opacity, 1));\n}\n\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));\n}\n\n.bg-white\\/60 {\n  background-color: rgb(255 255 255 / 0.6);\n}\n\n.bg-opacity-100 {\n  --tw-bg-opacity: 1;\n}\n\n.bg-gradient-to-br {\n  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));\n}\n\n.bg-gradient-to-r {\n  background-image: linear-gradient(to right, var(--tw-gradient-stops));\n}\n\n.from-blue-50 {\n  --tw-gradient-from: #eff6ff var(--tw-gradient-from-position);\n  --tw-gradient-to: rgb(239 246 255 / 0) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n}\n\n.from-orange-500 {\n  --tw-gradient-from: #f97316 var(--tw-gradient-from-position);\n  --tw-gradient-to: rgb(249 115 22 / 0) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n}\n\n.to-green-50 {\n  --tw-gradient-to: #f0fdf4 var(--tw-gradient-to-position);\n}\n\n.to-orange-400 {\n  --tw-gradient-to: #fb923c var(--tw-gradient-to-position);\n}\n\n.object-cover {\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n\n.p-1 {\n  padding: 0.25rem;\n}\n\n.p-2 {\n  padding: 0.5rem;\n}\n\n.p-3 {\n  padding: 0.75rem;\n}\n\n.p-4 {\n  padding: 1rem;\n}\n\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\n.px-5 {\n  padding-left: 1.25rem;\n  padding-right: 1.25rem;\n}\n\n.py-0\\.5 {\n  padding-top: 0.125rem;\n  padding-bottom: 0.125rem;\n}\n\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n\n.pb-1 {\n  padding-bottom: 0.25rem;\n}\n\n.pb-2 {\n  padding-bottom: 0.5rem;\n}\n\n.pl-1 {\n  padding-left: 0.25rem;\n}\n\n.pl-2 {\n  padding-left: 0.5rem;\n}\n\n.pr-4 {\n  padding-right: 1rem;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-\\[10px\\] {\n  font-size: 10px;\n}\n\n.text-base {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n\n.text-xs {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.font-medium {\n  font-weight: 500;\n}\n\n.font-semibold {\n  font-weight: 600;\n}\n\n.italic {\n  font-style: italic;\n}\n\n.leading-7 {\n  line-height: 1.75rem;\n}\n\n.leading-9 {\n  line-height: 2.25rem;\n}\n\n.tracking-tight {\n  letter-spacing: -0.025em;\n}\n\n.text-black {\n  --tw-text-opacity: 1;\n  color: rgb(0 0 0 / var(--tw-text-opacity, 1));\n}\n\n.text-blue-800 {\n  --tw-text-opacity: 1;\n  color: rgb(30 64 175 / var(--tw-text-opacity, 1));\n}\n\n.text-gray-500 {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity, 1));\n}\n\n.text-gray-600 {\n  --tw-text-opacity: 1;\n  color: rgb(75 85 99 / var(--tw-text-opacity, 1));\n}\n\n.text-gray-700 {\n  --tw-text-opacity: 1;\n  color: rgb(55 65 81 / var(--tw-text-opacity, 1));\n}\n\n.text-gray-800 {\n  --tw-text-opacity: 1;\n  color: rgb(31 41 55 / var(--tw-text-opacity, 1));\n}\n\n.text-gray-900 {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity, 1));\n}\n\n.text-green-600 {\n  --tw-text-opacity: 1;\n  color: rgb(22 163 74 / var(--tw-text-opacity, 1));\n}\n\n.text-orange-600 {\n  --tw-text-opacity: 1;\n  color: rgb(234 88 12 / var(--tw-text-opacity, 1));\n}\n\n.text-orange-800 {\n  --tw-text-opacity: 1;\n  color: rgb(154 52 18 / var(--tw-text-opacity, 1));\n}\n\n.text-red-600 {\n  --tw-text-opacity: 1;\n  color: rgb(220 38 38 / var(--tw-text-opacity, 1));\n}\n\n.text-teal-600 {\n  --tw-text-opacity: 1;\n  color: rgb(13 148 136 / var(--tw-text-opacity, 1));\n}\n\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n\n.shadow {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-inner {\n  --tw-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-lg {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-md {\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-sm {\n  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.ring-1 {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.ring-inset {\n  --tw-ring-inset: inset;\n}\n\n.ring-gray-300 {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(209 213 219 / var(--tw-ring-opacity, 1));\n}\n\n.ring-orange-400\\/20 {\n  --tw-ring-color: rgb(251 146 60 / 0.2);\n}\n\n.ring-orange-500\\/10 {\n  --tw-ring-color: rgb(249 115 22 / 0.1);\n}\n\n.drop-shadow-xl {\n  --tw-drop-shadow: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n\n.filter {\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n\n.backdrop-blur-sm {\n  --tw-backdrop-blur: blur(4px);\n  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n}\n\n.transition-all {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.duration-300 {\n  transition-duration: 300ms;\n}\n\n.content-auto {\n  content-visibility: auto;\n}\n\n.scrollbar-hide::-webkit-scrollbar {\n  display: none;\n}\n\n.scrollbar-hide {\n  -ms-overflow-style: none;\n  /* Edge */\n  scrollbar-width: none;\n  /* Firefox */\n}\n\n.hover\\:bg-gray-300:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));\n}\n\n.hover\\:bg-orange-300:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(253 186 116 / var(--tw-bg-opacity, 1));\n}\n\n.hover\\:bg-orange-500:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 115 22 / var(--tw-bg-opacity, 1));\n}\n\n.hover\\:bg-orange-600:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(234 88 12 / var(--tw-bg-opacity, 1));\n}\n\n.hover\\:bg-teal-600:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(13 148 136 / var(--tw-bg-opacity, 1));\n}\n\n.hover\\:bg-teal-800:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(17 94 89 / var(--tw-bg-opacity, 1));\n}\n\n.hover\\:from-orange-600:hover {\n  --tw-gradient-from: #ea580c var(--tw-gradient-from-position);\n  --tw-gradient-to: rgb(234 88 12 / 0) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n}\n\n.hover\\:to-orange-500:hover {\n  --tw-gradient-to: #f97316 var(--tw-gradient-to-position);\n}\n\n.hover\\:shadow-lg:hover {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.hover\\:shadow-xl:hover {\n  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.focus\\:outline-none:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n\n.focus\\:ring-2:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus\\:ring-teal-500:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(20 184 166 / var(--tw-ring-opacity, 1));\n}\n\n.disabled\\:cursor-not-allowed:disabled {\n  cursor: not-allowed;\n}\n\n.disabled\\:opacity-50:disabled {\n  opacity: 0.5;\n}\n\n.has-\\[\\+p\\]\\:mb-1:has(+p) {\n  margin-bottom: 0.25rem;\n}\n\n@media (min-width: 640px) {\n  .sm\\:col-span-2 {\n    grid-column: span 2 / span 2;\n  }\n\n  .sm\\:grid-cols-2 {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (min-width: 768px) {\n  .md\\:col-start-3 {\n    grid-column-start: 3;\n  }\n\n  .md\\:row-start-1 {\n    grid-row-start: 1;\n  }\n\n  .md\\:row-end-6 {\n    grid-row-end: 6;\n  }\n\n  .md\\:block {\n    display: block;\n  }\n\n  .md\\:basis-full {\n    flex-basis: 100%;\n  }\n\n  .md\\:grid-cols-1 {\n    grid-template-columns: repeat(1, minmax(0, 1fr));\n  }\n\n  .md\\:grid-cols-2 {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .md\\:grid-cols-3 {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n\n@media (min-width: 1024px) {\n  .lg\\:col-span-2 {\n    grid-column: span 2 / span 2;\n  }\n\n  .lg\\:grid-cols-2 {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .lg\\:grid-cols-3 {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n\n  .lg\\:grid-cols-4 {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n  }\n\n  .lg\\:text-base {\n    font-size: 1rem;\n    line-height: 1.5rem;\n  }\n\n  .lg\\:text-lg {\n    font-size: 1.125rem;\n    line-height: 1.75rem;\n  }\n}\n\n@media (min-width: 1280px) {\n  .xl\\:w-1\\/5 {\n    width: 20%;\n  }\n\n  .xl\\:grid-cols-4 {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n  }\n\n  .xl\\:grid-cols-5 {\n    grid-template-columns: repeat(5, minmax(0, 1fr));\n  }\n\n  .xl\\:gap-6 {\n    gap: 1.5rem;\n  }\n\n  .xl\\:gap-7 {\n    gap: 1.75rem;\n  }\n\n  .xl\\:p-6 {\n    padding: 1.5rem;\n  }\n}\n\n@media (min-width: 1720px) {\n  .\\33xl\\:hidden {\n    display: none;\n  }\n}\n";

const sheet = new CSSStyleSheet();
sheet.replaceSync(Styles);

class CookingApp extends r$1 {
    connectedCallback() {
        super.connectedCallback();
        S$1(this.shadowRoot, [sheet]);
    }

    firstUpdated() {
        const chatWindow = this.shadowRoot.querySelector("chat-window");
        const infoWindow = this.shadowRoot.querySelector("information-window");
        if (chatWindow && infoWindow)
            infoWindow.chatWindow = chatWindow;
    }

    render() {
        return x`
            <div class="grid h-full grid-cols-1 gap-1 bg-white md:grid-cols-3">
                <div class="flex flex-col sm:col-span-2">
                    <h1 class="leading-7 tracking-tight">Cook Book</h1>
                    <app-ribbon></app-ribbon>
                    <main-content></main-content>
                </div>
                <div class="flex w-full flex-col md:col-start-3 md:row-start-1 md:row-end-6 md:grid-cols-1">
                    <div class="flex md:block">
                        <chat-window class="w-full md:basis-full"></chat-window>
                        <div class="hidden grow-0 basis-[content] text-center md:block">
                            <information-window></information-window>
                        </div>
                    </div>
                </div>
                <video-grid class="sm:col-span-2"></video-grid>
                <article-grid class="sm:col-span-2"></article-grid>
                <chef-tips class="sm:col-span-2"></chef-tips>
                <newsletter-signup class="flex justify-center p-4 sm:col-span-2"></newsletter-signup>
            </div>
        `;
    }
}

customElements.define("cooking-app", CookingApp);

export { CookingApp };
//# sourceMappingURL=bundle.js.map
