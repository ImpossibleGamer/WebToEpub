"use strict";

parserFactory.register("wtr-lab.com", () => new WtrlabParser());

class WtrlabParser extends Parser {
    constructor() {
        super();
        this.minimumThrottle = 9000;
    }

    populateUIImpl() {
        document.getElementById("removeChapterNumberRow").hidden = false; 
        // raw download no longer supported as the raw text is encoded and i don't know how.
        // leaving old code in case it gets solved.
        // document.getElementById("selectTranslationAiRow").hidden = false;
        document.getElementById("selectRetryLongerRow").hidden = false;  
    }

    getExtraStyleSheet() {
        return ""+
        ".tab-panel {\r\n"+
        "    flex: 1 1 0%;\r\n"+
        "    font-size: .875rem;\r\n"+
        "    line-height: 1.42857;\r\n"+
        "    outline-style: none;\r\n"+
        "}\r\n"+
        ".section-header {\r\n"+
        "    display: flex;\r\n"+
        "    align-items: center;\r\n"+
        "    justify-content: space-between;\r\n"+
        "    gap: 8px;\r\n"+
        "    margin-top: 16px;\r\n"+
        "    margin-bottom: 8px;\r\n"+
        "    padding-left: 10px;\r\n"+
        "    border-left: 2px solid #4288c9;\r\n"+
        "}\r\n"+
        ".section-title {\r\n"+
        "    flex: 1 1 0%;\r\n"+
        "    font-size: 1rem;\r\n"+
        "    line-height: 1.5;\r\n"+
        "    font-weight: 600;\r\n"+
        "}\r\n"+
        ".desc-toggle-row {\r\n"+
        "    display: flex;\r\n"+
        "    align-items: center;\r\n"+
        "    justify-content: space-between;\r\n"+
        "    margin-bottom: 8px;\r\n"+
        "}\r\n"+
        ".author-novels {\r\n"+
        "    margin-bottom: 12px;\r\n"+
        "}\r\n"+
        ".related-list {\r\n"+
        "    list-style: none;\r\n"+
        "    padding: 0;\r\n"+
        "    margin: 0;\r\n"+
        "    border: 1px solid #d4dadb;\r\n"+
        "    border-radius: .4rem;\r\n"+
        "    overflow: hidden;\r\n"+
        "}\r\n"+
        ".related-item {\r\n"+
        "    border-bottom: 1px solid #d4dadb;\r\n"+
        "}\r\n"+
        ".related-item:last-child {\r\n"+
        "    border-bottom-width: 0;\r\n"+
        "}\r\n"+
        ".related-item:nth-child(even) {\r\n"+
        "    background-color: rgba(0, 0, 0, .016);\r\n"+
        "}\r\n"+
        ".related-link {\r\n"+
        "    display: flex;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 10px;\r\n"+
        "    padding: 8px 14px;\r\n"+
        "    font-size: 13px;\r\n"+
        "    font-weight: 600;\r\n"+
        "    text-decoration: none !important;\r\n"+
        "    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke;\r\n"+
        "    transition-timing-function: cubic-bezier(.4, 0, .2, 1);\r\n"+
        "    transition-duration: 150ms;\r\n"+
        "}\r\n"+
        ".related-link:hover {\r\n"+
        "    color: #4288c9;\r\n"+
        "}\r\n"+
        ".related-rank {\r\n"+
        "    font-size: 10px;\r\n"+
        "    font-weight: 700;\r\n"+
        "    line-height: 1;\r\n"+
        "    color: #ccc;\r\n"+
        "    min-width: 14px;\r\n"+
        "    text-align: right;\r\n"+
        "    flex-shrink: 0;\r\n"+
        "}\r\n"+
        ".related-link:hover .related-rank {\r\n"+
        "    color: rgba(66, 136, 201, .5);\r\n"+
        "}\r\n"+
        ".header-actions {\r\n"+
        "    display: flex;\r\n"+
        "    gap: 4px;\r\n"+
        "}\r\n"+
        ".header-btn {\r\n"+
        "    display: inline-flex;\r\n"+
        "    align-items: center;\r\n"+
        "    justify-content: center;\r\n"+
        "    flex-shrink: 0;\r\n"+
        "    height: 28px;\r\n"+
        "    gap: 4px;\r\n"+
        "    margin-left: 8px;\r\n"+
        "    padding-left: 10px;\r\n"+
        "    padding-right: 10px;\r\n"+
        "    font-size: .8rem;\r\n"+
        "    font-weight: 500;\r\n"+
        "    white-space: nowrap;\r\n"+
        "    cursor: pointer;\r\n"+
        "    user-select: none;\r\n"+
        "    outline-style: none;\r\n"+
        "    background-clip: padding-box;\r\n"+
        "    border: 1px solid #d4dadb;\r\n"+
        "    border-radius: .32rem;\r\n"+
        "    background-color: #fff;\r\n"+
        "    transition-property: all;\r\n"+
        "    transition-timing-function: cubic-bezier(.4, 0, .2, 1);\r\n"+
        "    transition-duration: 150ms;\r\n"+
        "}\r\n"+
        ".header-btn:hover {\r\n"+
        "    background-color: #dee6ed;\r\n"+
        "    color: #1b1d23;\r\n"+
        "}\r\n"+
        ".header-btn[aria-expanded=\"true\"] {\r\n"+
        "    background-color: #dee6ed;\r\n"+
        "    color: #1b1d23;\r\n"+
        "}\r\n"+
        ".header-btn:focus-visible {\r\n"+
        "    border-color: #4288c9;\r\n"+
        "    box-shadow: 0 0 0 3px rgba(66, 136, 201, .5);\r\n"+
        "}\r\n"+
        ".header-btn:disabled {\r\n"+
        "    pointer-events: none;\r\n"+
        "    opacity: .5;\r\n"+
        "}\r\n"+
        ".header-btn[aria-invalid=\"true\"] {\r\n"+
        "    border-color: #dc3545;\r\n"+
        "    box-shadow: 0 0 0 3px rgba(220, 53, 69, .2);\r\n"+
        "}\r\n"+
        ".header-btn svg {\r\n"+
        "    pointer-events: none;\r\n"+
        "    flex-shrink: 0;\r\n"+
        "}\r\n"+
        ".header-btn svg:not([class*=\"size-\"]) {\r\n"+
        "    width: 14px;\r\n"+
        "    height: 14px;\r\n"+
        "}\r\n"+
        ".header-btn:has([data-icon=\"inline-end\"]) {\r\n"+
        "    padding-right: 6px;\r\n"+
        "}\r\n"+
        ".header-btn:has([data-icon=\"inline-start\"]) {\r\n"+
        "    padding-left: 6px;\r\n"+
        "}\r\n"+
        "[data-slot=\"button-group\"] .header-btn {\r\n"+
        "    border-radius: .4rem;\r\n"+
        "}\r\n"+
        ".info-card {\r\n"+
        "    border: 1px solid #d4dadb;\r\n"+
        "    border-radius: .4rem;\r\n"+
        "    overflow: hidden;\r\n"+
        "    margin-bottom: 0;\r\n"+
        "}\r\n"+
        ".info-row {\r\n"+
        "    display: grid;\r\n"+
        "    grid-template-columns: 108px 1fr;\r\n"+
        "    align-items: center;\r\n"+
        "    column-gap: 10px;\r\n"+
        "    padding: 9px 14px;\r\n"+
        "    border-bottom: 1px solid #d4dadb;\r\n"+
        "}\r\n"+
        ".info-row:last-child {\r\n"+
        "    border-bottom-width: 0;\r\n"+
        "}\r\n"+
        ".info-row:nth-child(even) {\r\n"+
        "    background-color: rgba(0, 0, 0, .016);\r\n"+
        "}\r\n"+
        "@media (width < 400px) {\r\n"+
        "    .info-row {\r\n"+
        "        grid-template-columns: 1fr;\r\n"+
        "        gap: 2px;\r\n"+
        "        padding: 8px 12px;\r\n"+
        "    }\r\n"+
        "}\r\n"+
        ".info-label {\r\n"+
        "    font-size: 10.5px;\r\n"+
        "    font-weight: 700;\r\n"+
        "    line-height: 1.5rem;\r\n"+
        "    padding-top: 1px;\r\n"+
        "    text-transform: uppercase;\r\n"+
        "    letter-spacing: .07em;\r\n"+
        "    white-space: nowrap;\r\n"+
        "    color: #7d8283;\r\n"+
        "}\r\n"+
        ".info-label-icon {\r\n"+
        "    display: inline-flex;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 4px;\r\n"+
        "    font-size: 10.5px;\r\n"+
        "    font-weight: 700;\r\n"+
        "    line-height: 1.5rem;\r\n"+
        "    text-transform: uppercase;\r\n"+
        "    letter-spacing: .07em;\r\n"+
        "    white-space: nowrap;\r\n"+
        "    color: #7d8283;\r\n"+
        "}\r\n"+
        ".info-value {\r\n"+
        "    font-size: 13px;\r\n"+
        "    line-height: 1.625;\r\n"+
        "    overflow-wrap: break-word;\r\n"+
        "}\r\n"+
        ".info-value a {\r\n"+
        "    text-decoration: none;\r\n"+
        "    font-weight: 600;\r\n"+
        "}\r\n"+
        ".info-value a:hover {\r\n"+
        "    color: #4288c9;\r\n"+
        "}\r\n"+
        ".info-value-stack {\r\n"+
        "    font-size: 13px;\r\n"+
        "    line-height: 1.625;\r\n"+
        "    overflow-wrap: break-word;\r\n"+
        "    display: flex;\r\n"+
        "    flex-direction: column;\r\n"+
        "    gap: 1px;\r\n"+
        "}\r\n"+
        ".info-value-stack a {\r\n"+
        "    text-decoration: none;\r\n"+
        "    font-weight: 600;\r\n"+
        "}\r\n"+
        ".info-value-stack a:hover {\r\n"+
        "    color: #4288c9;\r\n"+
        "}\r\n"+
        ".info-value-wrap {\r\n"+
        "    font-size: 13px;\r\n"+
        "    line-height: 1.625;\r\n"+
        "    overflow-wrap: break-word;\r\n"+
        "    display: flex;\r\n"+
        "    flex-wrap: wrap;\r\n"+
        "    gap: 6px;\r\n"+
        "}\r\n"+
        ".title-list {\r\n"+
        "    margin: 0;\r\n"+
        "    padding-left: 0;\r\n"+
        "    list-style: none;\r\n"+
        "}\r\n"+
        ".title-list li {\r\n"+
        "    padding-top: 1px;\r\n"+
        "    padding-bottom: 1px;\r\n"+
        "    font-size: 13px;\r\n"+
        "}\r\n"+
        ".author-alt {\r\n"+
        "    font-size: .75rem;\r\n"+
        "    line-height: 1.33333;\r\n"+
        "    opacity: .65;\r\n"+
        "}\r\n"+
        ".user-link {\r\n"+
        "    position: relative;\r\n"+
        "    display: inline-flex;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 4px;\r\n"+
        "}\r\n"+
        ".user-level {\r\n"+
        "    margin-right: -4px;\r\n"+
        "}\r\n"+
        ".user-badge-wrap {\r\n"+
        "    position: relative;\r\n"+
        "    width: 24px;\r\n"+
        "    height: 24px;\r\n"+
        "    display: flex;\r\n"+
        "    align-items: center;\r\n"+
        "    justify-content: center;\r\n"+
        "}\r\n"+
        ".user-badge-icon {\r\n"+
        "    display: inline-flex;\r\n"+
        "    flex-shrink: 0;\r\n"+
        "    width: 20px;\r\n"+
        "    height: 20px;\r\n"+
        "}\r\n"+
        ".label-ticket-icon,\r\n"+
        ".patron-ticket-icon {\r\n"+
        "    display: inline-flex;\r\n"+
        "    flex-shrink: 0;\r\n"+
        "    width: 24px;\r\n"+
        "    height: 24px;\r\n"+
        "}\r\n"+
        ".rank-chip {\r\n"+
        "    display: inline-flex;\r\n"+
        "    flex-direction: column;\r\n"+
        "    align-items: center;\r\n"+
        "    min-width: 58px;\r\n"+
        "    padding: 5px 8px 4px;\r\n"+
        "    background-color: rgba(0, 0, 0, .03);\r\n"+
        "    border: 1px solid #d4dadb;\r\n"+
        "    border-radius: 7px;\r\n"+
        "    text-decoration: none;\r\n"+
        "    transition-property: border-color, background, box-shadow;\r\n"+
        "    transition-timing-function: cubic-bezier(.4, 0, .2, 1);\r\n"+
        "    transition-duration: 200ms;\r\n"+
        "}\r\n"+
        ".rank-chip:hover {\r\n"+
        "    border-color: #4288c9;\r\n"+
        "    background-color: rgba(66, 136, 201, .2);\r\n"+
        "    box-shadow: 0 2px 8px rgba(253, 126, 20, .12);\r\n"+
        "}\r\n"+
        ".rank-chip-label {\r\n"+
        "    font-size: 9px;\r\n"+
        "    font-weight: 700;\r\n"+
        "    line-height: 1.3;\r\n"+
        "    text-transform: uppercase;\r\n"+
        "    letter-spacing: .1em;\r\n"+
        "    color: #7d8283;\r\n"+
        "}\r\n"+
        ".rank-chip-value {\r\n"+
        "    font-size: .875rem;\r\n"+
        "    font-weight: 700;\r\n"+
        "    line-height: 1.4;\r\n"+
        "}\r\n"+
        ".patrons-header {\r\n"+
        "    display: flex;\r\n"+
        "    align-items: center;\r\n"+
        "    margin-top: 16px;\r\n"+
        "    margin-bottom: 6px;\r\n"+
        "    gap: 7px;\r\n"+
        "    padding-left: 10px;\r\n"+
        "    border-left: 2px solid #4288c9;\r\n"+
        "}\r\n"+
        ".patrons-crown {\r\n"+
        "    display: inline-flex;\r\n"+
        "    width: 18px;\r\n"+
        "    height: 18px;\r\n"+
        "    flex-shrink: 0;\r\n"+
        "}\r\n"+
        ".patrons-title {\r\n"+
        "    flex: 1 1 0%;\r\n"+
        "    font-size: 1rem;\r\n"+
        "    line-height: 1.5;\r\n"+
        "    font-weight: 600;\r\n"+
        "    color: #7d8283;\r\n"+
        "}\r\n"+
        ".tag-group {\r\n"+
        "    display: flex;\r\n"+
        "    flex-wrap: wrap;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 6px;\r\n"+
        "    padding: 9px 14px;\r\n"+
        "    border-bottom: 1px solid #d4dadb;\r\n"+
        "}\r\n"+
        ".tag-group:last-child {\r\n"+
        "    border-bottom-width: 0;\r\n"+
        "}\r\n"+
        ".tag-group:nth-child(even) {\r\n"+
        "    background-color: rgba(0, 0, 0, .016);\r\n"+
        "}\r\n"+
        ".tag-group-title {\r\n"+
        "    display: flex;\r\n"+
        "    align-items: center;\r\n"+
        "    width: 100%;\r\n"+
        "    gap: 6px;\r\n"+
        "    font-size: 10px;\r\n"+
        "    font-weight: 700;\r\n"+
        "    text-transform: uppercase;\r\n"+
        "    letter-spacing: .05em;\r\n"+
        "    color: #7d8283;\r\n"+
        "}\r\n"+
        ".tag-group-count {\r\n"+
        "    font-size: 9px;\r\n"+
        "    font-weight: 400;\r\n"+
        "    color: rgba(125, 130, 131, .6);\r\n"+
        "}\r\n"+
        ".tag-chip {\r\n"+
        "    display: inline-flex;\r\n"+
        "    align-items: center;\r\n"+
        "    text-transform: capitalize;\r\n"+
        "    font-size: .75rem;\r\n"+
        "    line-height: 1.33333;\r\n"+
        "    font-weight: 500;\r\n"+
        "    white-space: nowrap;\r\n"+
        "    padding: 2px 6px;\r\n"+
        "    border: 1px solid rgba(212, 218, 219, .7);\r\n"+
        "    border-radius: .25rem;\r\n"+
        "    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke;\r\n"+
        "    transition-timing-function: cubic-bezier(.4, 0, .2, 1);\r\n"+
        "    transition-duration: 150ms;\r\n"+
        "}\r\n"+
        ".tag-chip:hover {\r\n"+
        "    background-color: rgba(222, 230, 237, .5);\r\n"+
        "    color: #212529;\r\n"+
        "    border-color: rgba(66, 136, 201, .5);\r\n"+
        "}\r\n"+
        ".tag-chip-featured {\r\n"+
        "    display: inline-flex;\r\n"+
        "    align-items: center;\r\n"+
        "    text-transform: capitalize;\r\n"+
        "    font-size: .75rem;\r\n"+
        "    line-height: 1.33333;\r\n"+
        "    white-space: nowrap;\r\n"+
        "    padding: 2px 6px;\r\n"+
        "    border: 1px solid;\r\n"+
        "    border-radius: .25rem;\r\n"+
        "    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke;\r\n"+
        "    transition-timing-function: cubic-bezier(.4, 0, .2, 1);\r\n"+
        "    transition-duration: 150ms;\r\n"+
        "}\r\n"+
        ".male-pro {\r\n"+
        "    border-color: rgba(96, 165, 250, .5);\r\n"+
        "    color: #2563eb;\r\n"+
        "    font-weight: 600;\r\n"+
        "}\r\n"+
        ".male-pro:hover {\r\n"+
        "    background-color: rgba(219, 234, 254, .7);\r\n"+
        "}\r\n"+
        ".female-pro {\r\n"+
        "    border-color: rgba(244, 114, 182, .5);\r\n"+
        "    color: #db2777;\r\n"+
        "    font-weight: 600;\r\n"+
        "}\r\n"+
        ".female-pro:hover {\r\n"+
        "    background-color: rgba(252, 231, 243, .7);\r\n"+
        "}\r\n"+
        ".desc-wrap {\r\n"+
        "    font-size: 14px\r\n"+
        "}\r\n"+
        ".desc-wrap .swap {\r\n"+
        "    cursor: pointer;\r\n"+
        "    z-index: 2;\r\n"+
        "    font-weight: 700;\r\n"+
        "    text-decoration: underline;\r\n"+
        "    position: relative\r\n"+
        "}\r\n"+
        ".series-list .description p {\r\n"+
        "    margin-bottom: 4px\r\n"+
        "}\r\n"+
        ".description {\r\n"+
        "    display: block;\r\n"+
        "    position: relative;\r\n"+
        "    overflow: hidden\r\n"+
        "}\r\n"+
        ".description p {\r\n"+
        "    margin-bottom: 8px\r\n"+
        "}\r\n"+
        ".user-name {\r\n"+
        "    align-items: center;\r\n"+
        "    display: inline-flex;\r\n"+
        "    text-decoration: none !important\r\n"+
        "}\r\n"+
        ".user-name:hover {\r\n"+
        "    text-decoration: underline !important\r\n"+
        "}\r\n"+
        ".detail-line .user-name {\r\n"+
        "    font-weight: 700\r\n"+
        "}\r\n"+
        ".user-management .user-info .user-name {\r\n"+
        "    color: #4288c9;\r\n"+
        "    font-weight: 600\r\n"+
        "}\r\n"+
        ".npc-row-user .user-name {\r\n"+
        "    min-width: 0;\r\n"+
        "    max-width: 100%;\r\n"+
        "    font-size: 13px;\r\n"+
        "    display: flex;\r\n"+
        "    overflow: hidden\r\n"+
        "}\r\n"+
        ".npc-row-user .user-name>* {\r\n"+
        "    flex-shrink: 0\r\n"+
        "}\r\n"+
        ".npc-row-user .user-name>span:first-child {\r\n"+
        "    white-space: nowrap;\r\n"+
        "    text-overflow: ellipsis;\r\n"+
        "    flex-shrink: 1;\r\n"+
        "    min-width: 0;\r\n"+
        "    overflow: hidden\r\n"+
        "}\r\n"+
        ".w_lv {\r\n"+
        "    vertical-align: middle;\r\n"+
        "    text-align: center;\r\n"+
        "    color: #fff;\r\n"+
        "    -webkit-user-select: none;\r\n"+
        "    -moz-user-select: none;\r\n"+
        "    user-select: none;\r\n"+
        "    background-image: url(https://wtr-lab.com/images/lvl.png);\r\n"+
        "    background-position: 0 0;\r\n"+
        "    background-repeat: no-repeat;\r\n"+
        "    background-size: 100%;\r\n"+
        "    width: 24px;\r\n"+
        "    min-width: 24px;\r\n"+
        "    height: 24px;\r\n"+
        "    font-weight: 700;\r\n"+
        "    display: inline-block;\r\n"+
        "    position: relative;\r\n"+
        "    overflow: hidden\r\n"+
        "}\r\n"+
        ".icon {\r\n"+
        "    fill: currentColor;\r\n"+
        "    transform-origin: 50%;\r\n"+
        "    transform-box: fill-box;\r\n"+
        "    flex: none\r\n"+
        "}\r\n"+
        ".svg-ticket {\r\n"+
        "    fill: url(#color-2)\r\n"+
        "}\r\n"+
        ".svg-silver {\r\n"+
        "    fill: #7f8c8d;\r\n"+
        "    fill: url(#color-3) !important\r\n"+
        "}\r\n"+
        ".npc-root {\r\n"+
        "    margin-top: 12px;\r\n"+
        "    margin-bottom: 4px\r\n"+
        "}\r\n"+
        ".npc-header .npc-showmore-btn {\r\n"+
        "    color: #fd7e14;\r\n"+
        "    cursor: pointer;\r\n"+
        "    background: 0 0;\r\n"+
        "    border: 1px solid rgba(253, 126, 20, .3);\r\n"+
        "    border-radius: 100px;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 5px;\r\n"+
        "    padding: 2px 10px;\r\n"+
        "    font-size: 11px;\r\n"+
        "    font-weight: 600;\r\n"+
        "    transition: background .15s, border-color .15s;\r\n"+
        "    display: flex\r\n"+
        "}\r\n"+
        ".npc-header .npc-showmore-btn:hover {\r\n"+
        "    background: rgba(253, 126, 20, .08);\r\n"+
        "    border-color: rgba(253, 126, 20, .5)\r\n"+
        "}\r\n"+
        ".npc-header .npc-showmore-btn .npc-showmore-count {\r\n"+
        "    background: rgba(253, 126, 20, .15);\r\n"+
        "    border-radius: 100px;\r\n"+
        "    padding: 0 5px;\r\n"+
        "    font-size: 10px\r\n"+
        "}\r\n"+
        ".npc-rows {\r\n"+
        "    flex-direction: column;\r\n"+
        "    gap: 3px;\r\n"+
        "    display: flex\r\n"+
        "}\r\n"+
        ".npc-row {\r\n"+
        "    border: 1px solid transparent;\r\n"+
        "    border-radius: 7px;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 8px;\r\n"+
        "    padding: 5px 8px;\r\n"+
        "    display: flex\r\n"+
        "}\r\n"+
        ".npc-row.npc-gold {\r\n"+
        "    background: rgba(245, 158, 11, .08);\r\n"+
        "    border-color: rgba(245, 158, 11, .2)\r\n"+
        "}\r\n"+
        ".npc-row.npc-silver {\r\n"+
        "    background: rgba(148, 163, 184, .07);\r\n"+
        "    border-color: rgba(148, 163, 184, .18)\r\n"+
        "}\r\n"+
        ".npc-row.npc-bronze {\r\n"+
        "    background: rgba(205, 127, 50, .07);\r\n"+
        "    border-color: rgba(205, 127, 50, .18)\r\n"+
        "}\r\n"+
        ".npc-row:nth-child(2n) {\r\n"+
        "    background: rgba(0, 0, 0, .02)\r\n"+
        "}\r\n"+
        ".npc-row:hover {\r\n"+
        "    background: rgba(0, 0, 0, .07)\r\n"+
        "}\r\n"+
        ".npc-rank.npc-gold {\r\n"+
        "    color: #f59e0b\r\n"+
        "}\r\n"+
        ".npc-rank.npc-silver {\r\n"+
        "    color: #94a3b8\r\n"+
        "}\r\n"+
        ".npc-rank.npc-bronze {\r\n"+
        "    color: #cd7f32\r\n"+
        "}\r\n"+
        ".npc-rank {\r\n"+
        "    text-align: center;\r\n"+
        "    color: #bbb;\r\n"+
        "    flex-shrink: 0;\r\n"+
        "    width: 18px;\r\n"+
        "    font-size: 11px;\r\n"+
        "    font-weight: 800\r\n"+
        "}\r\n"+
        ".npc-row-user {\r\n"+
        "    flex: 1;\r\n"+
        "    min-width: 0\r\n"+
        "}\r\n"+
        ".npc-row-user strong {\r\n"+
        "    font-size: 11px\r\n"+
        "}\r\n"+
        ".npc-ticket-pill {\r\n"+
        "    flex-shrink: 0;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 3px;\r\n"+
        "    display: inline-flex\r\n"+
        "}\r\n"+
        ".npc-ticket-pill .npc-icon {\r\n"+
        "    width: 18px;\r\n"+
        "    height: 18px\r\n"+
        "}\r\n"+
        ".npc-ticket-pill .npc-amount {\r\n"+
        "    color: #c96a00;\r\n"+
        "    font-size: 12px;\r\n"+
        "    font-weight: 700\r\n"+
        "}\r\n"+
        ".npc-footer-btn {\r\n"+
        "    color: #fd7e14;\r\n"+
        "    cursor: pointer;\r\n"+
        "    text-align: center;\r\n"+
        "    background: 0 0;\r\n"+
        "    border: none;\r\n"+
        "    border-top: 1px solid rgba(0, 0, 0, .06);\r\n"+
        "    width: 100%;\r\n"+
        "    margin-top: 4px;\r\n"+
        "    padding: 6px 0 2px;\r\n"+
        "    font-size: 11px;\r\n"+
        "    font-weight: 600;\r\n"+
        "    transition: opacity .15s;\r\n"+
        "    display: block\r\n"+
        "}\r\n"+
        ".npc-footer-btn:hover {\r\n"+
        "    opacity: .75\r\n"+
        "}\r\n"+
        ".text-gold {\r\n"+
        "    color: #ffc107;\r\n"+
        "}\r\n"+
        ".text-silver {\r\n"+
        "    color: silver;\r\n"+
        "}\r\n"+
        ".text-bronze {\r\n"+
        "    color: #cd7f32;\r\n"+
        "}\r\n"+
        ".text-platinum {\r\n"+
        "    color: #00b4d8;\r\n"+
        "}\r\n"+
        ".text-ruby {\r\n"+
        "    color: #dc143c;\r\n"+
        "}\r\n"+
        ".text-google {\r\n"+
        "    color: #1a73e8;\r\n"+
        "}\r\n"+
        ".text-ticket-gold {\r\n"+
        "    color: #d99c2b;\r\n"+
        "}\r\n"+
        ".rounded-lg {\r\n"+
        "    border-radius: .4rem;\r\n"+
        "}\r\n"+
        ".separator {\r\n"+
        "    display: flex;\r\n"+
        "    align-items: center;\r\n"+
        "    text-align: center;\r\n"+
        "    min-height: 17px;\r\n"+
        "    font-size: 13px;\r\n"+
        "    line-height: 20px;\r\n"+
        "}\r\n"+
        ".separator:after, .separator:before {\r\n"+
        "    content: \"\";\r\n"+
        "    flex: 1 1;\r\n"+
        "    border-bottom: 1.5px solid #21252940;\r\n"+
        "    margin: 0 4px;\r\n"+
        "}\r\n"+
        ".model {\r\n"+
        "    font-weight: bold;\r\n"+
        "}\r\n"+
        ".glossaryTerm {\r\n"+
        "    font-weight: bold;\r\n"+
        "    color: inherit;\r\n"+
        "}\r\n"+
        ".userTerm {\r\n"+
        "    font-weight: bold;\r\n"+
        "    color: #1976d2;\r\n"+
        "}\r\n"+
        ".patchTerm {\r\n"+
        "    font-weight: bold;\r\n"+
        "    color: #006c36;\r\n"+
        "}";
    }

    async getChapterUrls(dom) {
        let leaves = dom.baseURI.split("/");
        let novelIndex = leaves.indexOf("novel");
        let language = leaves[novelIndex - 1];
        let id = leaves[novelIndex + 1];
        let slug = leaves[leaves.length - 1].split("?")[0];
        this.slug = slug;
        let chapters = (await HttpClient.fetchJson("https://wtr-lab.com/api/chapters/" + id)).json;
        let serie_id = chapters.chapters[0].serie_id;

        try {
            let terms = (await HttpClient.fetchJson("https://wtr-lab.com/api/v2/user/config")).json;
            this.terms = terms?.config?.terms.filter(a => (a?.[4] == null) || (a?.[4] ?? []).includes(serie_id));

        } catch (error) {
            this.terms = [];
        }

        let formatTitle = t => t.replace(/^Chapter\s+(\d+)\s*:?\s+/, (_, n) => `Chapter ${n.padStart(4, "0")}: `);

        return chapters.chapters.map(a => ({
            sourceUrl: "https://wtr-lab.com/"+language+"/novel/"+id+"/"+slug+"/chapter-"+a.order, 
            title: (document.getElementById("removeChapterNumberCheckbox").checked)?formatTitle(a.title):a.order.toString().padStart(4, "0")+": "+formatTitle(a.title)
        }));
    }


    async loadEpubMetaInfo(dom) {
        // Reload the page using HttpClient
        let tocHtml = (await HttpClient.wrapFetch(dom.baseURI)).responseXML;

        // Parse JSON again from reloaded page
        let json = tocHtml.querySelector("script#__NEXT_DATA__")?.textContent;
        json = JSON.parse(json);
        console.log("[WtrlabParser] JSON: ", json);

        let serieData = json?.props.pageProps.serie?.serie_data;
        let genres = serieData?.genres || [];

        const genreMap = {
            1: "Action", 2: "Adult", 3: "Adventure", 4: "Comedy", 5: "Drama",
            6: "Ecchi", 7: "Erciyuan", 8: "Fan-Fiction", 9: "Fantasy", 10: "Game",
            11: "Gender-Bender", 12: "Harem", 13: "Historical", 14: "Horror", 15: "Josei",
            16: "Martial-Arts", 17: "Mature", 18: "Mecha", 19: "Military", 20: "Mystery",
            21: "Psychological", 22: "Romance", 23: "School-Life", 24: "Sci-Fi", 25: "Seinen",
            26: "Shoujo", 27: "Shoujo-Ai", 28: "Shounen", 29: "Shounen-Ai", 30: "Slice-Of-Life",
            31: "Smut", 32: "Sports", 33: "Supernatural", 34: "Tragedy", 35: "Urban-Life",
            36: "Wuxia", 37: "Xianxia", 38: "Xuanhuan", 39: "Yaoi", 40: "Yuri"
        };

        // Map IDs to objects containing id and title
        this.genre = genres
            .filter(id => genreMap[id])
            .map(id => ({
                id: id,
                title: genreMap[id]
            }));

        this.tags = json?.props.pageProps.tags;
        this.title = serieData?.data?.title;
        this.description = serieData?.data?.description;
        this.author = serieData?.author;
        this.img = serieData?.data?.image;
        this.chapters = serieData?.chapter_count;
        this.characters = serieData?.char_count;
        return;
    }

    formatTitle(link) {
        let span = link.querySelector("span").textContent.trim();
        let num = link.querySelector("b").textContent.trim().replace("#", "");
        return num + ": " + span;
    }

    findContent(dom) {
        return Parser.findConstructedContent(dom);
    }

    extractTitleImpl() {
        return this.title;
    }

    extractAuthor() {
        return this.author;
    }

    findCoverImageUrl() {
        return this.img;
        // return util.getFirstImgSrc(dom, ".series-list");
    }

    extractSubject() {
        let tagsgenre = (this.genre || []).map(g => g.title);
        let tagstags = (this.tags || []).map(tag => tag.title);

        let tags = tagsgenre.concat(tagstags);
        return tags.join(", ");
    }

    extractDescription() {
        return this.description;
    }

    getInformationEpubItemChildNodes(dom) {
        return [dom.querySelectorAll("div[data-slot='tabs-content']")[0]];
    }

    cleanInformationNode(node) {
        util.removeChildElementsMatchingSelector(node, "div.desc-wrap .mb-2, button, svg");
        // Custom classes: never touched, always preserved
        const CUSTOM = new Set([
            "desc-wrap", "description", "show", "swap", "user-name", "w_lv", "icon",
            "svg-ticket", "svg-silver",
            "text-gold", "text-silver", "text-bronze", "text-platinum", "text-ruby",
            "text-google", "text-ticket-gold", "rounded-lg",
            "npc-root", "npc-header", "npc-showmore-btn", "npc-showmore-count", "npc-rows",
            "npc-row", "npc-gold", "npc-silver", "npc-bronze", "npc-rank", "npc-row-user",
            "npc-ticket-pill", "npc-icon", "npc-amount", "npc-footer-btn"
        ]);
        // npc-icon stays in the signature so it can tell the two ticket icons apart
        const CUSTOM_SIG = new Set([...CUSTOM].filter(c => c !== "npc-icon"));

        // Entries that are ADDED on top of a base entry (never matched on their own)
        const MODIFIERS = new Set(["male-pro", "female-pro"]);

        // new class name -> Tailwind-only part of the old class string
        const MAP = {
            "tab-panel": "flex-1 text-sm outline-none",
            "section-header": "flex items-center justify-between gap-2 mt-4 mb-2 pl-2.5 border-l-2 border-l-primary",
            "section-title": "flex-1 text-base font-semibold text-card-foreground",
            "novel-summary": "text-foreground",
            "desc-toggle-row": "flex items-center justify-between mb-2",
            "author-novels": "mb-3",
            "related-list": "list-none p-0 m-0 border border-border rounded-lg overflow-hidden",
            "related-item": "border-b border-border last:border-b-0 even:bg-black/[0.016] dark:even:bg-white/[0.022]",
            "related-link": "group flex items-center gap-2.5 py-2 px-3.5 text-[13px] font-semibold text-[#2a2a2a] no-underline! transition-colors hover:text-primary dark:text-[#c8ccdc] dark:hover:text-primary",
            "related-rank": "text-[10px] font-bold text-[#ccc] min-w-[14px] text-right shrink-0 leading-none group-hover:text-primary/50 dark:text-white/[0.38] dark:group-hover:text-primary/45",
            "header-actions": "flex gap-1",
            "header-btn": "group/button inline-flex cursor-pointer shrink-0 items-center justify-center bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 border border-border bg-card hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5 ml-2",
            "info-card": "rounded-lg overflow-hidden border border-border mb-0",
            "info-row": "grid grid-cols-[108px_1fr] items-center gap-x-2.5 px-3.5 py-[9px] border-b border-border last:border-b-0 even:bg-black/[0.016] dark:even:bg-white/[0.022] max-[400px]:grid-cols-1 max-[400px]:gap-0.5 max-[400px]:px-3 max-[400px]:py-2",
            "info-label": "text-[10.5px] font-bold uppercase tracking-[0.07em] whitespace-nowrap pt-px leading-6 text-muted-foreground",
            "info-value": "text-[13px] leading-relaxed wrap-break-word [&_a]:no-underline [&_a]:font-semibold [&_a:hover]:text-primary",
            "title-list": "m-0 pl-0 list-none [&_li]:py-px [&_li]:text-[13px]",
            "info-value-stack": "text-[13px] leading-relaxed wrap-break-word [&_a]:no-underline [&_a]:font-semibold [&_a:hover]:text-primary flex flex-col gap-px",
            "author-alt": "text-xs opacity-65",
            "user-link": "relative inline-flex items-center gap-1",
            "user-level": "-mr-1",
            "info-label-icon": "inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.07em] whitespace-nowrap leading-6 text-muted-foreground",
            "label-ticket-icon": "inline-flex shrink-0 size-6",
            "user-badge-wrap": "relative w-6 h-6 flex items-center justify-center",
            "user-badge-icon": "inline-flex shrink-0 size-5",
            "info-value-wrap": "text-[13px] leading-relaxed wrap-break-word flex flex-wrap gap-1.5",
            "rank-chip": "inline-flex flex-col items-center min-w-[58px] pt-[5px] px-2 pb-1 bg-black/3 border border-border rounded-[7px] no-underline hover:border-primary hover:bg-primary/20 hover:shadow-[0_2px_8px_rgba(253,126,20,0.12)] transition-[border-color,background,box-shadow] duration-200",
            "rank-chip-label": "text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground leading-[1.3]",
            "rank-chip-value": "text-sm font-bold text-foreground leading-[1.4]",
            "patrons-header": "flex items-center mt-4 mb-1.5 gap-[7px] pl-2.5 border-l-2 border-l-primary",
            "patrons-crown": "inline-flex size-[18px] shrink-0",
            "patrons-title": "flex-1 text-base font-semibold text-muted-foreground",
            "patron-ticket-icon": "inline-flex shrink-0 size-6 npc-icon",
            "tag-group": "flex flex-wrap items-center gap-1.5 px-3.5 py-[9px] border-b border-border last:border-b-0 even:bg-black/[0.016] dark:even:bg-white/[0.022]",
            "tag-group-title": "flex items-center w-full gap-1.5 text-[10px] uppercase tracking-wider font-bold text-muted-foreground",
            "tag-group-count": "text-[9px] font-normal text-muted-foreground/60",
            "tag-chip": "inline-flex items-center capitalize text-xs font-medium border rounded px-1.5 py-0.5 whitespace-nowrap transition-colors border-border/70 text-card-foreground hover:bg-muted/50 hover:text-card-foreground hover:border-primary/50",
            "tag-chip-featured": "inline-flex items-center capitalize text-xs border rounded px-1.5 py-0.5 whitespace-nowrap transition-colors",
            "male-pro": "border-blue-400/50 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100/70 dark:hover:bg-blue-950/40 font-semibold",
            "female-pro": "border-pink-400/50 text-pink-600 dark:text-fuchsia-400 dark:border-fuchsia-400/50 bg-pink-50/50 dark:bg-fuchsia-950/20 hover:bg-pink-100/70 dark:hover:bg-fuchsia-950/40 font-semibold"
        };

        const toks = s => (s || "").split(/\s+/).filter(Boolean);
        const sig = t => [...new Set(t)].sort().join(" ");
        const twOnly = cls => toks(cls).filter(t => !CUSTOM_SIG.has(t));

        // signature -> new class name (base entries only)
        const lookup = new Map(
            Object.entries(MAP)
                .filter(([name]) => !MODIFIERS.has(name))
                .map(([name, cls]) => [sig(twOnly(cls)), name])
        );

        // modifier name -> its Tailwind tokens
        const modifiers = Object.entries(MAP)
            .filter(([name]) => MODIFIERS.has(name))
            .map(([name, cls]) => [name, twOnly(cls)]);

        const unmatched = [];

        // node itself + all descendants (modified in place)
        for (const el of [node, ...node.querySelectorAll("*")]) {
            const orig = el.getAttribute("class"); // also works for SVG elements
            if (orig == null) continue;

            const all = toks(orig);
            const tw = all.filter(t => !CUSTOM_SIG.has(t));
            if (!tw.length) continue; // custom-only element: leave alone

            let names = null;

            // 1) exact match on a base entry
            const exact = lookup.get(sig(tw));
            if (exact) {
                names = [exact];
            } else {
                // 2) base entry + modifier (e.g. tag-chip-featured + male-pro)
                for (const [mName, mToks] of modifiers) {
                    if (!mToks.every(t => tw.includes(t))) continue;
                    const rest = tw.filter(t => !mToks.includes(t));
                    const base = lookup.get(sig(rest));
                    if (base) { names = [base, mName]; break; }
                }
            }

            if (!names) { unmatched.push(tw.join(" ")); continue; }

            const keep = all.filter(t => CUSTOM.has(t));
            el.setAttribute("class", [...new Set([...keep, ...names])].join(" "));
        }

        if (unmatched.length) {
            console.warn("Unmatched Tailwind sets:", [...new Set(unmatched)]);
        }

        // Insert "Chapters" and "Characters" rows after the 4th child of the first info-card
        const infoCard = node.querySelector(".info-card");
        if (infoCard) {
            const doc = node.ownerDocument;

            const makeRow = (label, value) => {
                const row = doc.createElement("div");
                row.className = "info-row";

                const labelEl = doc.createElement("span");
                labelEl.className = "info-label";
                labelEl.textContent = label;

                const valueEl = doc.createElement("div");
                valueEl.className = "info-value";
                const valueSpan = doc.createElement("span");
                valueSpan.textContent = value ?? "";
                valueEl.appendChild(valueSpan);

                row.append(labelEl, valueEl);
                return row;
            };

            const chaptersRow = makeRow("Chapters", this.chapters);
            const charactersRow = makeRow("Characters", this.characters);

            const ref = infoCard.children[3]; // 4th child element
            if (ref) {
                ref.after(chaptersRow, charactersRow); // inserted in this order
            } else {
                infoCard.append(chaptersRow, charactersRow); // fewer than 4 rows: append at end
            }
        }
    }

    async fetchChapter(url) {
        // Per-request throttle: 10000–10999 ms
        const delay = 1000 + Math.floor(Math.random() * 1000);
        console.log(`[WtrlabParser] Delaying ${delay} ms before fetching: ${url}`);
        await util.sleep(delay);
        let leaves = url.split("/");
        let novelIndex = leaves.indexOf("novel");
        let language = leaves[novelIndex - 1];
        let id = leaves[novelIndex + 1];
        let chapterPart = leaves[leaves.length - 1];
        let chapter = chapterPart.startsWith("chapter-")
            ? chapterPart.slice(8)
            : chapterPart;
        let fetchUrl = "https://wtr-lab.com/api/reader/get";
        let formData = 
            {
                "translate":"ai",
                "language":language,
                "raw_id":id,
                "chapter_no":chapter,
                "retry":false,
                "force_retry":false
            };
        let header = {"Content-Type": "application/json;charset=UTF-8"};
        let options = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: header,
            parser: this
        };
        let json = (await HttpClient.fetchJson(fetchUrl, options)).json;
        console.log(`[${new Date().toLocaleString()}] [WtrlabParser] JSON:`, json);
        return this.buildChapter(json, url);
    }

    isCustomError(response) {
        if (response.json?.code == "CHAPTER_LOCKED") {
            return true;
        }
        if (response.json.data?.data?.body?false:true) {
            return true;
        }
        if (response.json.requireTurnstile) {
            return true;
        }
        return false;
    }

    setCustomErrorResponse(url, wrapOptions, checkedresponse) {
        if (checkedresponse.json?.code == "CHAPTER_LOCKED") {
            let newresp = {};
            newresp.wrapOptions = wrapOptions;
            newresp.response = {};
            newresp.response.url = this.PostToUrl(checkedresponse.response.url, JSON.parse(wrapOptions.fetchOptions.body));
            newresp.response.status = 999;
            newresp.response.retryDelay = [];
            newresp.errorMessage = "Fetch of URL '"+newresp.response.url+"' failed.\nThe Chapter isn't Ai translated.";
            return newresp;
        }
        if (checkedresponse.json.requireTurnstile || checkedresponse.json.code == 1401) {
            let newresp = {};
            newresp.url = url;
            newresp.wrapOptions = wrapOptions;
            newresp.response = {};
            newresp.response.url = this.PostToUrl(checkedresponse.response.url, JSON.parse(wrapOptions.fetchOptions.body));
            newresp.response.status = 403;
            return newresp;
        } else {
            let newresp = {};
            newresp.url = url;
            newresp.wrapOptions = wrapOptions;
            newresp.response = {};
            newresp.response.url = this.PostToUrl(checkedresponse.response.url, JSON.parse(wrapOptions.fetchOptions.body));
            newresp.response.status = 999;
            if (document.getElementById("selectRetryLongerCheckbox").checked) {
                newresp.response.retryDelay = [25,25,25,25,25,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120];
            } else {
                newresp.response.retryDelay = [25,25,25,25,25];
            }
            newresp.errorMessage = "Fetch of URL '"+newresp.response.url+"' failed.\nThe server sends an empty Chapter try to open the URL and try again if you can see the Chapter on the normal website.\nIt could also be that you try to get an Ai translated novel that isn't Ai tranlated.";
            return newresp;
        }
    }

    PostToUrl(url, body) {
        let hostname = new URL(url).hostname;
        let translate = body.translate;
        let language = body.language;
        let raw_id = body.raw_id;
        let chapter_no = body.chapter_no;
        return "https://"+hostname+"/"+language+"/novel/"+raw_id+"/"+this.slug+"/chapter-"+chapter_no+"?service="+translate;
    }

    buildChapter(json, url) {
        let newDoc = Parser.makeEmptyDocForContent(url);

        // Collect and merge all terms
        const mergedTerms = this.mergeAllTerms(json);

        // Create and append title with term replacements
        let title = newDoc.dom.createElement("h1");
        let titleText = json?.data?.data?.title ?? "";
        this.applyTermsToElement(title, titleText, mergedTerms, newDoc.dom);
        newDoc.content.appendChild(title);

        // Add model separator if model exists
        if (json?.data?.data?.model) {
            let separator = newDoc.dom.createElement("div");
            separator.className = "separator";
            let modelSpan = newDoc.dom.createElement("span");
            modelSpan.className = "model";
            modelSpan.dataset.ai_id = json?.data?.ai_id ?? "Unknown";
            modelSpan.textContent = json.data.data.model;
            separator.appendChild(modelSpan);
            newDoc.content.appendChild(separator);
        } else if (json?.data?.ai_id) {
            const aiIdMap = {
                101: "gemini-3.0-flash",
                102: "gemini-2.5-flash",
                103: "gemini-2.0-flash",
                104: "gemini-2.5-flash-lite",
                105: "gemini-3.1-flash-lite",
                106: "gemini-3.5-flash",
                107: "gemini-3.6-flash",
                108: "gemini-3.5-flash-lite",
                109: "gemini-3.7-flash",
                201: "deepseek-chat",
                301: "kimi-k2-instruct-0905",
                302: "gpt-oss-120b",
                501: "mistral-large"
            };
            let separator = newDoc.dom.createElement("div");
            separator.className = "separator";
            let modelSpan = newDoc.dom.createElement("span");
            modelSpan.className = "model";
            modelSpan.dataset.ai_id = json.data.ai_id;
            modelSpan.textContent = aiIdMap[json.data.ai_id] ?? "Unknown";
            separator.appendChild(modelSpan);
            newDoc.content.appendChild(separator);
        }

        // Create content div
        let contentDiv = newDoc.dom.createElement("div");
        contentDiv.className = "content";
        // contentDiv.id = json.data.chapter_id;
        contentDiv.dataset.chapterId = json.data.chapter_id;
        contentDiv.dataset.createdAt = json.data.created_at;
        if (json?.tasks[0]?.created_at) {
            contentDiv.dataset.reTranslatedAt = json.tasks[0].created_at;
        }
        contentDiv.dataset.fetchedAt = new Date().toISOString();

        let imagecounter = 0;
        for (let element of json.data.data.body) {
            if (element == "[image]") {
                let imgnode = newDoc.dom.createElement("img");
                let imghref = json.data.data?.images?.[imagecounter++] ?? "";
                if (imghref == "") {
                    continue;
                }
                imgnode.src = imghref;
                contentDiv.appendChild(imgnode);
            } else {
                let pnode = newDoc.dom.createElement("p");
                this.applyTermsToElement(pnode, element, mergedTerms, newDoc.dom);
                contentDiv.appendChild(pnode);
            }
        }

        newDoc.content.appendChild(contentDiv);
        return newDoc.dom;
    }

    collectUserTerms() {
        const userTerms = [];

        for (let configTerm of this.terms) {
            const pattern = configTerm[2];
            const replacement = configTerm[1];
            const caseSensitive = configTerm[3];
            const replaceGlossary = configTerm[6] ? true : false;

            if (!pattern) continue;

            // Skip patterns with leading/trailing underscores
            if (pattern.startsWith("_") || pattern.endsWith("_")) continue;

            // Handle pipe separator
            const patterns = pattern.split("|");

            for (let pat of patterns) {
                userTerms.push({
                    pattern: pat,
                    to: replacement,
                    className: "userTerm",
                    case: caseSensitive,
                    original: pat,
                    replaceGlossary: replaceGlossary,
                    hasWildcard: pat.includes("_")
                });
            }
        }

        return userTerms;
    }

    collectGlossaryTerms(json) {
        const glossaryTerms = [];
        const terms = json?.data?.data?.glossary_data?.terms ?? [];

        for (let i = 0; i < terms.length; i++) {
            const fallback = `※${i}〓`; 
            const english = terms[i][0] ?? fallback;
            const chinese = terms[i][1];
            const patterns = [`※${i}〓`, `※${i}⛬`];
            patterns.forEach(pattern => {
                glossaryTerms.push({
                    from: pattern,
                    to: english,
                    className: "glossaryTerm",
                    original: chinese
                });
            });
        }

        return glossaryTerms;
    }

    collectPatchTerms(json) {
        const patchTerms = [];
        const patches = json?.data?.data?.patch ?? [];

        for (let patch of patches) {
            const zh = patch.zh;
            const en = patch.en;

            if (!zh || !en) continue;

            patchTerms.push({
                from: zh,
                to: en,
                className: "patchTerm",
                original: zh
            });
        }

        return patchTerms;
    }

    mergeAllTerms(json) {
        const glossaryTerms = this.collectGlossaryTerms(json);
        const userTerms = this.collectUserTerms();
        const patchTerms = this.collectPatchTerms(json);

        // Handle replaceGlossary logic
        const processedUserTerms = [];
        const usedGlossaryIndices = new Set();

        for (let userTerm of userTerms) {
            if (userTerm.replaceGlossary) {
                // Find matching glossary term using pattern field
                let foundIndex = -1;
                for (let i = 0; i < glossaryTerms.length; i++) {
                    if (glossaryTerms[i].original === userTerm.pattern) {
                        foundIndex = i;
                        break;
                    }
                }

                if (foundIndex !== -1) {
                    // Replace pattern with glossary placeholder
                    processedUserTerms.push({
                        pattern: glossaryTerms[foundIndex].from,
                        to: userTerm.to,
                        className: "userTerm",
                        case: userTerm.case,
                        original: userTerm.original,
                        replaceGlossary: true,
                        hasWildcard: false
                    });
                    usedGlossaryIndices.add(foundIndex);
                } else {
                    processedUserTerms.push(userTerm);
                }
            } else {
                processedUserTerms.push(userTerm);
            }
        }

        // Filter out used glossary terms
        const remainingGlossaryTerms = glossaryTerms.filter((_, index) => !usedGlossaryIndices.has(index));

        // Merge all terms: glossary, user, patch
        return [...remainingGlossaryTerms, ...processedUserTerms, ...patchTerms];
    }

    applyTermsToElement(element, text, terms, dom) {
        // First expand user term patterns into actual matches for this specific text
        const expandedTerms = [];

        for (let term of terms) {
            if (term.className === "userTerm" && term.pattern) {
                // Expand wildcard or non-wildcard patterns
                if (term.replaceGlossary) {
                    // Treat as exact placeholder match (like glossary terms)
                    expandedTerms.push({
                        from: term.pattern,
                        to: term.to,
                        className: "userTerm",
                        case: false,
                        original: term.original
                    });
                } else if (term.hasWildcard) {
                    const regexPattern = term.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/_/g, ".");
                    const flags = term.case ? "g" : "gi";
                    const regex = new RegExp(`\\b${regexPattern}\\b`, flags);

                    let match;
                    while ((match = regex.exec(text)) !== null) {
                        expandedTerms.push({
                            from: match[0],
                            to: term.to,
                            className: "userTerm",
                            case: term.case,
                            original: match[0]
                        });
                    }
                } else {
                    // Non-wildcard complete word matching
                    const flags = term.case ? "g" : "gi";
                    const regex = new RegExp(`\\b${term.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, flags);

                    if (regex.test(text)) {
                        expandedTerms.push({
                            from: term.pattern,
                            to: term.to,
                            className: "userTerm",
                            case: term.case,
                            original: term.pattern
                        });
                    }
                }
            } else if (term.className === "glossaryTerm") {
                // Glossary terms use 'from' field directly
                expandedTerms.push({
                    from: term.from,
                    to: term.to,
                    className: "glossaryTerm",
                    case: false,
                    original: term.original
                });
            } else if (term.className === "patchTerm") {
                // Patch terms use 'from' field directly
                expandedTerms.push({
                    from: term.from,
                    to: term.to,
                    className: "patchTerm",
                    case: false,
                    original: term.original
                });
            }
        }

        let workingText = text;
        const replacements = [];

        // Collect all replacements with their positions
        for (let term of expandedTerms) {
            const searchText = term.from;
            const searchFlags = term.case ? "g" : "gi";

            const escapedSearch = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex = new RegExp(escapedSearch, searchFlags);

            let match;
            while ((match = regex.exec(workingText)) !== null) {
                replacements.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    matchedText: match[0],
                    term: term
                });
            }
        }

        // Sort replacements by start position
        replacements.sort((a, b) => a.start - b.start);

        // Remove overlapping replacements (keep first occurrence)
        const nonOverlapping = [];
        let lastEnd = -1;
        for (let replacement of replacements) {
            if (replacement.start >= lastEnd) {
                nonOverlapping.push(replacement);
                lastEnd = replacement.end;
            }
        }

        // Build DOM elements
        let lastIndex = 0;
        for (let replacement of nonOverlapping) {
            // Add text before replacement
            if (replacement.start > lastIndex) {
                const textNode = dom.createTextNode(workingText.substring(lastIndex, replacement.start));
                element.appendChild(textNode);
            }

            // Handle patch terms with spacing outside of span
            if (replacement.term.className === "patchTerm") {
                const hasSpaceBefore = replacement.start > 0 && workingText[replacement.start - 1] === " ";
                const hasSpaceAfter = replacement.end < workingText.length && workingText[replacement.end] === " ";

                // Add space before if needed
                if (!hasSpaceBefore && replacement.start > 0 && /\S/.test(workingText[replacement.start - 1])) {
                    const spaceNode = dom.createTextNode(" ");
                    element.appendChild(spaceNode);
                }

                // Create span for replacement
                const span = dom.createElement("span");
                span.className = replacement.term.className;
                span.setAttribute("data-original", replacement.term.original);
                span.textContent = replacement.term.to;
                element.appendChild(span);

                // Add space after if needed
                if (!hasSpaceAfter && replacement.end < workingText.length && /\S/.test(workingText[replacement.end])) {
                    const spaceNode = dom.createTextNode(" ");
                    element.appendChild(spaceNode);
                }
            } else {
                // Create span for non-patch terms
                const span = dom.createElement("span");
                span.className = replacement.term.className;
                span.setAttribute("data-original", replacement.term.original);
                span.textContent = replacement.term.to;
                element.appendChild(span);
            }

            lastIndex = replacement.end;
        }

        // Add remaining text
        if (lastIndex < workingText.length) {
            const textNode = dom.createTextNode(workingText.substring(lastIndex));
            element.appendChild(textNode);
        }
    }
}
