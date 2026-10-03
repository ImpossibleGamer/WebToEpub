"use strict";

parserFactory.register("wtr-lab.com", () => new WtrlabParser());

class WtrlabParser extends Parser {
    constructor() {
        super();
        this.minimumThrottle = 9000;
    }

    populateUIImpl() {
        document.getElementById("removeChapterNumberRow").hidden = false;
        document.getElementById("selectRetryLongerRow").hidden = false;  
    }

    getExtraStyleSheet() {
        return ""+
        ".tab-panel {\r"+
        "    flex: 1 1 0%;\r"+
        "    font-size: .875rem;\r"+
        "    line-height: 1.42857;\r"+
        "    outline-style: none;\r"+
        "}\r"+
        ".section-header {\r"+
        "    display: flex;\r"+
        "    align-items: center;\r"+
        "    justify-content: space-between;\r"+
        "    gap: 8px;\r"+
        "    margin-top: 16px;\r"+
        "    margin-bottom: 8px;\r"+
        "    padding-left: 10px;\r"+
        "    border-left: 2px solid #4288c9;\r"+
        "}\r"+
        ".section-title {\r"+
        "    flex: 1 1 0%;\r"+
        "    font-size: 1rem;\r"+
        "    line-height: 1.5;\r"+
        "    font-weight: 600;\r"+
        "}\r"+
        ".desc-toggle-row {\r"+
        "    display: flex;\r"+
        "    align-items: center;\r"+
        "    justify-content: space-between;\r"+
        "    margin-bottom: 8px;\r"+
        "}\r"+
        ".author-novels {\r"+
        "    margin-bottom: 12px;\r"+
        "}\r"+
        ".related-list {\r"+
        "    list-style: none;\r"+
        "    padding: 0;\r"+
        "    margin: 0;\r"+
        "    border: 1px solid #d4dadb;\r"+
        "    border-radius: .4rem;\r"+
        "    overflow: hidden;\r"+
        "}\r"+
        ".related-item {\r"+
        "    border-bottom: 1px solid #d4dadb;\r"+
        "}\r"+
        ".related-item:last-child {\r"+
        "    border-bottom-width: 0;\r"+
        "}\r"+
        ".related-item:nth-child(even) {\r"+
        "    background-color: rgba(0, 0, 0, .016);\r"+
        "}\r"+
        ".related-link {\r"+
        "    display: flex;\r"+
        "    align-items: center;\r"+
        "    gap: 10px;\r"+
        "    padding: 8px 14px;\r"+
        "    font-size: 13px;\r"+
        "    font-weight: 600;\r"+
        "    text-decoration: none !important;\r"+
        "    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke;\r"+
        "    transition-timing-function: cubic-bezier(.4, 0, .2, 1);\r"+
        "    transition-duration: 150ms;\r"+
        "}\r"+
        ".related-link:hover {\r"+
        "    color: #4288c9;\r"+
        "}\r"+
        ".related-rank {\r"+
        "    font-size: 10px;\r"+
        "    font-weight: 700;\r"+
        "    line-height: 1;\r"+
        "    color: #ccc;\r"+
        "    min-width: 14px;\r"+
        "    text-align: right;\r"+
        "    flex-shrink: 0;\r"+
        "}\r"+
        ".related-link:hover .related-rank {\r"+
        "    color: rgba(66, 136, 201, .5);\r"+
        "}\r"+
        ".header-actions {\r"+
        "    display: flex;\r"+
        "    gap: 4px;\r"+
        "}\r"+
        ".header-btn {\r"+
        "    display: inline-flex;\r"+
        "    align-items: center;\r"+
        "    justify-content: center;\r"+
        "    flex-shrink: 0;\r"+
        "    height: 28px;\r"+
        "    gap: 4px;\r"+
        "    margin-left: 8px;\r"+
        "    padding-left: 10px;\r"+
        "    padding-right: 10px;\r"+
        "    font-size: .8rem;\r"+
        "    font-weight: 500;\r"+
        "    white-space: nowrap;\r"+
        "    cursor: pointer;\r"+
        "    user-select: none;\r"+
        "    outline-style: none;\r"+
        "    background-clip: padding-box;\r"+
        "    border: 1px solid #d4dadb;\r"+
        "    border-radius: .32rem;\r"+
        "    background-color: #fff;\r"+
        "    transition-property: all;\r"+
        "    transition-timing-function: cubic-bezier(.4, 0, .2, 1);\r"+
        "    transition-duration: 150ms;\r"+
        "}\r"+
        ".header-btn:hover {\r"+
        "    background-color: #dee6ed;\r"+
        "    color: #1b1d23;\r"+
        "}\r"+
        ".header-btn[aria-expanded=\"true\"] {\r"+
        "    background-color: #dee6ed;\r"+
        "    color: #1b1d23;\r"+
        "}\r"+
        ".header-btn:focus-visible {\r"+
        "    border-color: #4288c9;\r"+
        "    box-shadow: 0 0 0 3px rgba(66, 136, 201, .5);\r"+
        "}\r"+
        ".header-btn:disabled {\r"+
        "    pointer-events: none;\r"+
        "    opacity: .5;\r"+
        "}\r"+
        ".header-btn[aria-invalid=\"true\"] {\r"+
        "    border-color: #dc3545;\r"+
        "    box-shadow: 0 0 0 3px rgba(220, 53, 69, .2);\r"+
        "}\r"+
        ".header-btn svg {\r"+
        "    pointer-events: none;\r"+
        "    flex-shrink: 0;\r"+
        "}\r"+
        ".header-btn svg:not([class*=\"size-\"]) {\r"+
        "    width: 14px;\r"+
        "    height: 14px;\r"+
        "}\r"+
        ".header-btn:has([data-icon=\"inline-end\"]) {\r"+
        "    padding-right: 6px;\r"+
        "}\r"+
        ".header-btn:has([data-icon=\"inline-start\"]) {\r"+
        "    padding-left: 6px;\r"+
        "}\r"+
        "[data-slot=\"button-group\"] .header-btn {\r"+
        "    border-radius: .4rem;\r"+
        "}\r"+
        ".info-card {\r"+
        "    border: 1px solid #d4dadb;\r"+
        "    border-radius: .4rem;\r"+
        "    overflow: hidden;\r"+
        "    margin-bottom: 0;\r"+
        "}\r"+
        ".info-row {\r"+
        "    display: grid;\r"+
        "    grid-template-columns: 108px 1fr;\r"+
        "    align-items: center;\r"+
        "    column-gap: 10px;\r"+
        "    padding: 9px 14px;\r"+
        "    border-bottom: 1px solid #d4dadb;\r"+
        "}\r"+
        ".info-row:last-child {\r"+
        "    border-bottom-width: 0;\r"+
        "}\r"+
        ".info-row:nth-child(even) {\r"+
        "    background-color: rgba(0, 0, 0, .016);\r"+
        "}\r"+
        "@media (width < 400px) {\r"+
        "    .info-row {\r"+
        "        grid-template-columns: 1fr;\r"+
        "        gap: 2px;\r"+
        "        padding: 8px 12px;\r"+
        "    }\r"+
        "}\r"+
        ".info-label {\r"+
        "    font-size: 10.5px;\r"+
        "    font-weight: 700;\r"+
        "    line-height: 1.5rem;\r"+
        "    padding-top: 1px;\r"+
        "    text-transform: uppercase;\r"+
        "    letter-spacing: .07em;\r"+
        "    white-space: nowrap;\r"+
        "    color: #7d8283;\r"+
        "}\r"+
        ".info-label-icon {\r"+
        "    display: inline-flex;\r"+
        "    align-items: center;\r"+
        "    gap: 4px;\r"+
        "    font-size: 10.5px;\r"+
        "    font-weight: 700;\r"+
        "    line-height: 1.5rem;\r"+
        "    text-transform: uppercase;\r"+
        "    letter-spacing: .07em;\r"+
        "    white-space: nowrap;\r"+
        "    color: #7d8283;\r"+
        "}\r"+
        ".info-value {\r"+
        "    font-size: 13px;\r"+
        "    line-height: 1.625;\r"+
        "    overflow-wrap: break-word;\r"+
        "}\r"+
        ".info-value a {\r"+
        "    text-decoration: none;\r"+
        "    font-weight: 600;\r"+
        "}\r"+
        ".info-value a:hover {\r"+
        "    color: #4288c9;\r"+
        "}\r"+
        ".info-value-stack {\r"+
        "    font-size: 13px;\r"+
        "    line-height: 1.625;\r"+
        "    overflow-wrap: break-word;\r"+
        "    display: flex;\r"+
        "    flex-direction: column;\r"+
        "    gap: 1px;\r"+
        "}\r"+
        ".info-value-stack a {\r"+
        "    text-decoration: none;\r"+
        "    font-weight: 600;\r"+
        "}\r"+
        ".info-value-stack a:hover {\r"+
        "    color: #4288c9;\r"+
        "}\r"+
        ".info-value-wrap {\r"+
        "    font-size: 13px;\r"+
        "    line-height: 1.625;\r"+
        "    overflow-wrap: break-word;\r"+
        "    display: flex;\r"+
        "    flex-wrap: wrap;\r"+
        "    gap: 6px;\r"+
        "}\r"+
        ".title-list {\r"+
        "    margin: 0;\r"+
        "    padding-left: 0;\r"+
        "    list-style: none;\r"+
        "}\r"+
        ".title-list li {\r"+
        "    padding-top: 1px;\r"+
        "    padding-bottom: 1px;\r"+
        "    font-size: 13px;\r"+
        "}\r"+
        ".author-alt {\r"+
        "    font-size: .75rem;\r"+
        "    line-height: 1.33333;\r"+
        "    opacity: .65;\r"+
        "}\r"+
        ".user-link {\r"+
        "    position: relative;\r"+
        "    display: inline-flex;\r"+
        "    align-items: center;\r"+
        "    gap: 4px;\r"+
        "}\r"+
        ".user-level {\r"+
        "    margin-right: -4px;\r"+
        "}\r"+
        ".user-badge-wrap {\r"+
        "    position: relative;\r"+
        "    width: 24px;\r"+
        "    height: 24px;\r"+
        "    display: flex;\r"+
        "    align-items: center;\r"+
        "    justify-content: center;\r"+
        "}\r"+
        ".user-badge-icon {\r"+
        "    display: inline-flex;\r"+
        "    flex-shrink: 0;\r"+
        "    width: 20px;\r"+
        "    height: 20px;\r"+
        "}\r"+
        ".label-ticket-icon,\r"+
        ".patron-ticket-icon {\r"+
        "    display: inline-flex;\r"+
        "    flex-shrink: 0;\r"+
        "    width: 24px;\r"+
        "    height: 24px;\r"+
        "}\r"+
        ".rank-chip {\r"+
        "    display: inline-flex;\r"+
        "    flex-direction: column;\r"+
        "    align-items: center;\r"+
        "    min-width: 58px;\r"+
        "    padding: 5px 8px 4px;\r"+
        "    background-color: rgba(0, 0, 0, .03);\r"+
        "    border: 1px solid #d4dadb;\r"+
        "    border-radius: 7px;\r"+
        "    text-decoration: none;\r"+
        "    transition-property: border-color, background, box-shadow;\r"+
        "    transition-timing-function: cubic-bezier(.4, 0, .2, 1);\r"+
        "    transition-duration: 200ms;\r"+
        "}\r"+
        ".rank-chip:hover {\r"+
        "    border-color: #4288c9;\r"+
        "    background-color: rgba(66, 136, 201, .2);\r"+
        "    box-shadow: 0 2px 8px rgba(253, 126, 20, .12);\r"+
        "}\r"+
        ".rank-chip-label {\r"+
        "    font-size: 9px;\r"+
        "    font-weight: 700;\r"+
        "    line-height: 1.3;\r"+
        "    text-transform: uppercase;\r"+
        "    letter-spacing: .1em;\r"+
        "    color: #7d8283;\r"+
        "}\r"+
        ".rank-chip-value {\r"+
        "    font-size: .875rem;\r"+
        "    font-weight: 700;\r"+
        "    line-height: 1.4;\r"+
        "}\r"+
        ".patrons-header {\r"+
        "    display: flex;\r"+
        "    align-items: center;\r"+
        "    margin-top: 16px;\r"+
        "    margin-bottom: 6px;\r"+
        "    gap: 7px;\r"+
        "    padding-left: 10px;\r"+
        "    border-left: 2px solid #4288c9;\r"+
        "}\r"+
        ".patrons-crown {\r"+
        "    display: inline-flex;\r"+
        "    width: 18px;\r"+
        "    height: 18px;\r"+
        "    flex-shrink: 0;\r"+
        "}\r"+
        ".patrons-title {\r"+
        "    flex: 1 1 0%;\r"+
        "    font-size: 1rem;\r"+
        "    line-height: 1.5;\r"+
        "    font-weight: 600;\r"+
        "    color: #7d8283;\r"+
        "}\r"+
        ".tag-group {\r"+
        "    display: flex;\r"+
        "    flex-wrap: wrap;\r"+
        "    align-items: center;\r"+
        "    gap: 6px;\r"+
        "    padding: 9px 14px;\r"+
        "    border-bottom: 1px solid #d4dadb;\r"+
        "}\r"+
        ".tag-group:last-child {\r"+
        "    border-bottom-width: 0;\r"+
        "}\r"+
        ".tag-group:nth-child(even) {\r"+
        "    background-color: rgba(0, 0, 0, .016);\r"+
        "}\r"+
        ".tag-group-title {\r"+
        "    display: flex;\r"+
        "    align-items: center;\r"+
        "    width: 100%;\r"+
        "    gap: 6px;\r"+
        "    font-size: 10px;\r"+
        "    font-weight: 700;\r"+
        "    text-transform: uppercase;\r"+
        "    letter-spacing: .05em;\r"+
        "    color: #7d8283;\r"+
        "}\r"+
        ".tag-group-count {\r"+
        "    font-size: 9px;\r"+
        "    font-weight: 400;\r"+
        "    color: rgba(125, 130, 131, .6);\r"+
        "}\r"+
        ".tag-chip {\r"+
        "    display: inline-flex;\r"+
        "    align-items: center;\r"+
        "    text-transform: capitalize;\r"+
        "    font-size: .75rem;\r"+
        "    line-height: 1.33333;\r"+
        "    font-weight: 500;\r"+
        "    white-space: nowrap;\r"+
        "    padding: 2px 6px;\r"+
        "    border: 1px solid rgba(212, 218, 219, .7);\r"+
        "    border-radius: .25rem;\r"+
        "    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke;\r"+
        "    transition-timing-function: cubic-bezier(.4, 0, .2, 1);\r"+
        "    transition-duration: 150ms;\r"+
        "}\r"+
        ".tag-chip:hover {\r"+
        "    background-color: rgba(222, 230, 237, .5);\r"+
        "    color: #212529;\r"+
        "    border-color: rgba(66, 136, 201, .5);\r"+
        "}\r"+
        ".tag-chip-featured {\r"+
        "    display: inline-flex;\r"+
        "    align-items: center;\r"+
        "    text-transform: capitalize;\r"+
        "    font-size: .75rem;\r"+
        "    line-height: 1.33333;\r"+
        "    white-space: nowrap;\r"+
        "    padding: 2px 6px;\r"+
        "    border: 1px solid;\r"+
        "    border-radius: .25rem;\r"+
        "    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke;\r"+
        "    transition-timing-function: cubic-bezier(.4, 0, .2, 1);\r"+
        "    transition-duration: 150ms;\r"+
        "}\r"+
        ".male-pro {\r"+
        "    border-color: rgba(96, 165, 250, .5);\r"+
        "    color: #2563eb;\r"+
        "    font-weight: 600;\r"+
        "}\r"+
        ".male-pro:hover {\r"+
        "    background-color: rgba(219, 234, 254, .7);\r"+
        "}\r"+
        ".female-pro {\r"+
        "    border-color: rgba(244, 114, 182, .5);\r"+
        "    color: #db2777;\r"+
        "    font-weight: 600;\r"+
        "}\r"+
        ".female-pro:hover {\r"+
        "    background-color: rgba(252, 231, 243, .7);\r"+
        "}\r"+
        ".desc-wrap {\r"+
        "    font-size: 14px\r"+
        "}\r"+
        ".desc-wrap .swap {\r"+
        "    cursor: pointer;\r"+
        "    z-index: 2;\r"+
        "    font-weight: 700;\r"+
        "    text-decoration: underline;\r"+
        "    position: relative\r"+
        "}\r"+
        ".series-list .description p {\r"+
        "    margin-bottom: 4px\r"+
        "}\r"+
        ".description {\r"+
        "    display: block;\r"+
        "    position: relative;\r"+
        "    overflow: hidden\r"+
        "}\r"+
        ".description p {\r"+
        "    margin-bottom: 8px\r"+
        "}\r"+
        ".user-name {\r"+
        "    align-items: center;\r"+
        "    display: inline-flex;\r"+
        "    text-decoration: none !important\r"+
        "}\r"+
        ".user-name:hover {\r"+
        "    text-decoration: underline !important\r"+
        "}\r"+
        ".detail-line .user-name {\r"+
        "    font-weight: 700\r"+
        "}\r"+
        ".user-management .user-info .user-name {\r"+
        "    color: #4288c9;\r"+
        "    font-weight: 600\r"+
        "}\r"+
        ".npc-row-user .user-name {\r"+
        "    min-width: 0;\r"+
        "    max-width: 100%;\r"+
        "    font-size: 13px;\r"+
        "    display: flex;\r"+
        "    overflow: hidden\r"+
        "}\r"+
        ".npc-row-user .user-name>* {\r"+
        "    flex-shrink: 0\r"+
        "}\r"+
        ".npc-row-user .user-name>span:first-child {\r"+
        "    white-space: nowrap;\r"+
        "    text-overflow: ellipsis;\r"+
        "    flex-shrink: 1;\r"+
        "    min-width: 0;\r"+
        "    overflow: hidden\r"+
        "}\r"+
        ".w_lv {\r"+
        "    vertical-align: middle;\r"+
        "    text-align: center;\r"+
        "    color: #fff;\r"+
        "    -webkit-user-select: none;\r"+
        "    -moz-user-select: none;\r"+
        "    user-select: none;\r"+
        "    background-image: url(https://wtr-lab.com/images/lvl.png);\r"+
        "    background-position: 0 0;\r"+
        "    background-repeat: no-repeat;\r"+
        "    background-size: 100%;\r"+
        "    width: 24px;\r"+
        "    min-width: 24px;\r"+
        "    height: 24px;\r"+
        "    font-weight: 700;\r"+
        "    display: inline-block;\r"+
        "    position: relative;\r"+
        "    overflow: hidden\r"+
        "}\r"+
        ".icon {\r"+
        "    fill: currentColor;\r"+
        "    transform-origin: 50%;\r"+
        "    transform-box: fill-box;\r"+
        "    flex: none\r"+
        "}\r"+
        ".svg-ticket {\r"+
        "    fill: url(#color-2)\r"+
        "}\r"+
        ".svg-silver {\r"+
        "    fill: #7f8c8d;\r"+
        "    fill: url(#color-3) !important\r"+
        "}\r"+
        ".npc-root {\r"+
        "    margin-top: 12px;\r"+
        "    margin-bottom: 4px\r"+
        "}\r"+
        ".npc-header .npc-showmore-btn {\r"+
        "    color: #fd7e14;\r"+
        "    cursor: pointer;\r"+
        "    background: 0 0;\r"+
        "    border: 1px solid rgba(253, 126, 20, .3);\r"+
        "    border-radius: 100px;\r"+
        "    align-items: center;\r"+
        "    gap: 5px;\r"+
        "    padding: 2px 10px;\r"+
        "    font-size: 11px;\r"+
        "    font-weight: 600;\r"+
        "    transition: background .15s, border-color .15s;\r"+
        "    display: flex\r"+
        "}\r"+
        ".npc-header .npc-showmore-btn:hover {\r"+
        "    background: rgba(253, 126, 20, .08);\r"+
        "    border-color: rgba(253, 126, 20, .5)\r"+
        "}\r"+
        ".npc-header .npc-showmore-btn .npc-showmore-count {\r"+
        "    background: rgba(253, 126, 20, .15);\r"+
        "    border-radius: 100px;\r"+
        "    padding: 0 5px;\r"+
        "    font-size: 10px\r"+
        "}\r"+
        ".npc-rows {\r"+
        "    flex-direction: column;\r"+
        "    gap: 3px;\r"+
        "    display: flex\r"+
        "}\r"+
        ".npc-row {\r"+
        "    border: 1px solid transparent;\r"+
        "    border-radius: 7px;\r"+
        "    align-items: center;\r"+
        "    gap: 8px;\r"+
        "    padding: 5px 8px;\r"+
        "    display: flex\r"+
        "}\r"+
        ".npc-row.npc-gold {\r"+
        "    background: rgba(245, 158, 11, .08);\r"+
        "    border-color: rgba(245, 158, 11, .2)\r"+
        "}\r"+
        ".npc-row.npc-silver {\r"+
        "    background: rgba(148, 163, 184, .07);\r"+
        "    border-color: rgba(148, 163, 184, .18)\r"+
        "}\r"+
        ".npc-row.npc-bronze {\r"+
        "    background: rgba(205, 127, 50, .07);\r"+
        "    border-color: rgba(205, 127, 50, .18)\r"+
        "}\r"+
        ".npc-row:nth-child(2n) {\r"+
        "    background: rgba(0, 0, 0, .02)\r"+
        "}\r"+
        ".npc-row:hover {\r"+
        "    background: rgba(0, 0, 0, .07)\r"+
        "}\r"+
        ".npc-rank.npc-gold {\r"+
        "    color: #f59e0b\r"+
        "}\r"+
        ".npc-rank.npc-silver {\r"+
        "    color: #94a3b8\r"+
        "}\r"+
        ".npc-rank.npc-bronze {\r"+
        "    color: #cd7f32\r"+
        "}\r"+
        ".npc-rank {\r"+
        "    text-align: center;\r"+
        "    color: #bbb;\r"+
        "    flex-shrink: 0;\r"+
        "    width: 18px;\r"+
        "    font-size: 11px;\r"+
        "    font-weight: 800\r"+
        "}\r"+
        ".npc-row-user {\r"+
        "    flex: 1;\r"+
        "    min-width: 0\r"+
        "}\r"+
        ".npc-row-user strong {\r"+
        "    font-size: 11px\r"+
        "}\r"+
        ".npc-ticket-pill {\r"+
        "    flex-shrink: 0;\r"+
        "    align-items: center;\r"+
        "    gap: 3px;\r"+
        "    display: inline-flex\r"+
        "}\r"+
        ".npc-ticket-pill .npc-icon {\r"+
        "    width: 18px;\r"+
        "    height: 18px\r"+
        "}\r"+
        ".npc-ticket-pill .npc-amount {\r"+
        "    color: #c96a00;\r"+
        "    font-size: 12px;\r"+
        "    font-weight: 700\r"+
        "}\r"+
        ".npc-footer-btn {\r"+
        "    color: #fd7e14;\r"+
        "    cursor: pointer;\r"+
        "    text-align: center;\r"+
        "    background: 0 0;\r"+
        "    border: none;\r"+
        "    border-top: 1px solid rgba(0, 0, 0, .06);\r"+
        "    width: 100%;\r"+
        "    margin-top: 4px;\r"+
        "    padding: 6px 0 2px;\r"+
        "    font-size: 11px;\r"+
        "    font-weight: 600;\r"+
        "    transition: opacity .15s;\r"+
        "    display: block\r"+
        "}\r"+
        ".npc-footer-btn:hover {\r"+
        "    opacity: .75\r"+
        "}\r"+
        ".text-gold {\r"+
        "    color: #ffc107;\r"+
        "}\r"+
        ".text-silver {\r"+
        "    color: silver;\r"+
        "}\r"+
        ".text-bronze {\r"+
        "    color: #cd7f32;\r"+
        "}\r"+
        ".text-platinum {\r"+
        "    color: #00b4d8;\r"+
        "}\r"+
        ".text-ruby {\r"+
        "    color: #dc143c;\r"+
        "}\r"+
        ".text-google {\r"+
        "    color: #1a73e8;\r"+
        "}\r"+
        ".text-ticket-gold {\r"+
        "    color: #d99c2b;\r"+
        "}\r"+
        ".rounded-lg {\r"+
        "    border-radius: .4rem;\r"+
        "}\r"+
        ".separator {\r"+
        "    display: flex;\r"+
        "    align-items: center;\r"+
        "    text-align: center;\r"+
        "    min-height: 17px;\r"+
        "    font-size: 13px;\r"+
        "    line-height: 20px;\r"+
        "}\r"+
        ".separator:after, .separator:before {\r"+
        "    content: \"\";\r"+
        "    flex: 1 1;\r"+
        "    border-bottom: 1.5px solid #21252940;\r"+
        "    margin: 0 4px;\r"+
        "}\r"+
        ".model {\r"+
        "    font-weight: bold;\r"+
        "}\r"+
        ".glossaryTerm {\r"+
        "    font-weight: bold;\r"+
        "    color: inherit;\r"+
        "}\r"+
        ".userTerm {\r"+
        "    font-weight: bold;\r"+
        "    color: #1976d2;\r"+
        "}\r"+
        ".patchTerm {\r"+
        "    font-weight: bold;\r"+
        "    color: #006c36;\r"+
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

            // 1369 -> "1,369", 3196014 -> "3,196,014" (non-numeric values are left as they are)
            const formatNumber = v => {
                const n = Number(String(v ?? "").replace(/,/g, ""));
                return v === "" || v == null || Number.isNaN(n)
                    ? String(v ?? "")
                    : n.toLocaleString("en-US");
            };

            const makeRow = (label, value) => {
                const row = doc.createElement("div");
                row.className = "info-row";

                const labelEl = doc.createElement("span");
                labelEl.className = "info-label";
                labelEl.textContent = label;

                const valueEl = doc.createElement("div");
                valueEl.className = "info-value";
                const valueSpan = doc.createElement("span");
                valueSpan.textContent = formatNumber(value);
                valueEl.appendChild(valueSpan);

                row.append(labelEl, valueEl);
                return row;
            };

            const chaptersRow = makeRow("Chapters", this.chapters);
            const charactersRow = makeRow("Characters", this.characters);

            const ref = infoCard.children[3]; // 4th child element
            if (ref) {
                ref.after(chaptersRow, charactersRow);
            } else {
                infoCard.append(chaptersRow, charactersRow);
            }
        }
    }

    async fetchChapter(url) {
        // Per-request throttle: 1000–1999 ms
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
                "translate": "ai",
                "language": language,
                "raw_id": id,
                "chapter_no": chapter,
                "retry": false,
                "force_retry": false
            };
        let header = {"Content-Type": "application/json;charset=UTF-8"};
        let options = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: header,
            parser: this
        };

        // 1. Fetch the initial JSON
        let json = (await HttpClient.fetchJson(fetchUrl, options)).json;

        // 2. Fetch content from content_url if it exists
        if (json && json.content_url) {
            let contentFetchUrl = "https://wtr-lab.com" + json.content_url;
            let contentJson = (await HttpClient.fetchJson(contentFetchUrl)).json;

            // 3. Inject the "data" object right after "chapter" to match your desired schema structure
            let combinedJson = {};
            for (let key in json) {
                combinedJson[key] = json[key];
                if (key === "chapter") {
                    combinedJson.data = contentJson.data; // Extracts the inner data block
                }
            }
            json = combinedJson;
            console.log(`[${new Date().toLocaleString()}] [WtrlabParser] JSON:`, json);
        }

        return this.buildChapter(json, url);
    }

    isCustomError(response) {
        if (response.json?.code == "CHAPTER_LOCKED") {
            return true;
        }
        if (response.json.content_url?false:true) {
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
