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
        ".desc-wrap {\r\n"+
        "    font-size: 14px;\r\n"+
        "}\r\n"+
        ".description {\r\n"+
        "    --background: #fff;\r\n"+
        "    display: block;\r\n"+
        "    position: relative;\r\n"+
        "}\r\n"+
        ".sig-section-header {\r\n"+
        "    border-left: 2px solid rgba(253, 126, 20, .55);\r\n"+
        "    justify-content: space-between;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 8px;\r\n"+
        "    margin: 16px 0 8px;\r\n"+
        "    padding-left: 10px;\r\n"+
        "    display: flex;\r\n"+
        "}\r\n"+
        ".serie-info-grid {\r\n"+
        "    border: 1px solid #e8e8e8;\r\n"+
        "    border-radius: 8px;\r\n"+
        "    overflow: hidden;\r\n"+
        "}\r\n"+
        ".serie-info-grid .sig-row {\r\n"+
        "    border-bottom: 1px solid #f0f0f0;\r\n"+
        "    grid-template-columns: 108px 1fr;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 0 10px;\r\n"+
        "    padding: 9px 14px;\r\n"+
        "    display: grid;\r\n"+
        "}\r\n"+
        ".serie-info-grid .sig-label {\r\n"+
        "    text-transform: uppercase;\r\n"+
        "    letter-spacing: .07em;\r\n"+
        "    color: #a0a0a0;\r\n"+
        "    white-space: nowrap;\r\n"+
        "    padding-top: 1px;\r\n"+
        "    font-size: 10.5px;\r\n"+
        "    font-weight: 700;\r\n"+
        "    line-height: 24px;\r\n"+
        "}\r\n"+
        ".serie-info-grid .sig-value {\r\n"+
        "    word-break: break-word;\r\n"+
        "    font-size: 13px;\r\n"+
        "    line-height: 1.6;\r\n"+
        "}\r\n"+
        ".serie-info-grid .title-list {\r\n"+
        "    margin: 0;\r\n"+
        "    padding-left: 16px;\r\n"+
        "}\r\n"+
        ".serie-info-grid .title-list li {\r\n"+
        "    padding: 1px 0;\r\n"+
        "    font-size: 13px;\r\n"+
        "}\r\n"+
        ".serie-info-grid .sig-row:nth-child(2n) {\r\n"+
        "    background: rgba(0, 0, 0, .02);\r\n"+
        "}\r\n"+
        ".serie-info-grid .sig-author {\r\n"+
        "    flex-direction: column;\r\n"+
        "    gap: 1px;\r\n"+
        "    display: flex;\r\n"+
        "}\r\n"+
        ".serie-info-grid .sig-value a {\r\n"+
        "    font-weight: 600;\r\n"+
        "    text-decoration: none;\r\n"+
        "}\r\n"+
        ".serie-info-grid .sig-author .sig-author-alt {\r\n"+
        "    opacity: .65;\r\n"+
        "    font-size: 12px;\r\n"+
        "}\r\n"+
        ".w_lv._0 {\r\n"+
        "    background-position:0;\r\n"+
        "}\r\n"+
        ".w_lv._1 {\r\n"+
        "    background-position:0 -24px;\r\n"+
        "}\r\n"+
        ".w_lv._2 {\r\n"+
        "    background-position:0 -48px;\r\n"+
        "}\r\n"+
        ".w_lv._3{\r\n"+
        "    background-position:0 -72px;\r\n"+
        "}\r\n"+
        ".w_lv._4 {\r\n"+
        "    background-position:0 -96px;\r\n"+
        "}\r\n"+
        ".w_lv._5 {\r\n"+
        "    background-position:0 -120px;\r\n"+
        "}\r\n"+
        ".w_lv._6 {\r\n"+
        "    background-position:0 -144px;\r\n"+
        "}\r\n"+
        ".user-name .w_lv {\r\n"+
        "    margin-left: 4px;\r\n"+
        "}\r\n"+
        ".w_lv {\r\n"+
        "    text-indent: -200px;\r\n"+
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
        "    overflow: hidden;\r\n"+
        "}\r\n"+
        ".tags-grouped .tag.tag-male {\r\n"+
        "    color: #3a8ec9;\r\n"+
        "    background: rgba(74, 158, 218, .05);\r\n"+
        "    border-color: rgba(74, 158, 218, .32);\r\n"+
        "    font-weight: 600;\r\n"+
        "}\r\n"+
        ".tags-grouped .tag.tag-female {\r\n"+
        "    color: #c95a8a;\r\n"+
        "    background: rgba(224, 111, 160, .05);\r\n"+
        "    border-color: rgba(224, 111, 160, .32);\r\n"+
        "    font-weight: 600;\r\n"+
        "}\r\n"+
        ".serie-info-grid .sig-ranks {\r\n"+
        "    flex-wrap: wrap;\r\n"+
        "    gap: 6px;\r\n"+
        "    display: flex;\r\n"+
        "}\r\n"+
        ".serie-info-grid .sig-rank-pill {\r\n"+
        "    background: rgba(0, 0, 0, .03);\r\n"+
        "    border: 1px solid #e0e0e0;\r\n"+
        "    border-radius: 7px;\r\n"+
        "    flex-direction: column;\r\n"+
        "    align-items: center;\r\n"+
        "    min-width: 58px;\r\n"+
        "    padding: 5px 8px 4px;\r\n"+
        "    text-decoration: none;\r\n"+
        "    transition: border-color .2s, background .2s, box-shadow .2s;\r\n"+
        "    display: inline-flex;\r\n"+
        "}\r\n"+
        ".serie-info-grid .sig-rank-pill .sig-rank-period {\r\n"+
        "    text-transform: uppercase;\r\n"+
        "    letter-spacing: .1em;\r\n"+
        "    color: #b0b0b0;\r\n"+
        "    font-size: 9px;\r\n"+
        "    font-weight: 700;\r\n"+
        "    line-height: 1.3;\r\n"+
        "}\r\n"+
        ".serie-info-grid .sig-rank-pill .sig-rank-val {\r\n"+
        "    font-size: 14px;\r\n"+
        "    font-weight: 700;\r\n"+
        "    line-height: 1.4;\r\n"+
        "}\r\n"+
        ".npc-root {\r\n"+
        "    margin-top: 12px;\r\n"+
        "    margin-bottom: 4px;\r\n"+
        "}\r\n"+
        ".npc-header {\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 7px;\r\n"+
        "    margin-bottom: 6px;\r\n"+
        "    display: flex;\r\n"+
        "}\r\n"+
        ".npc-rows {\r\n"+
        "    flex-direction: column;\r\n"+
        "    gap: 3px;\r\n"+
        "    display: flex;\r\n"+
        "}\r\n"+
        ".npc-row {\r\n"+
        "    border: 1px solid transparent;\r\n"+
        "    border-radius: 7px;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 8px;\r\n"+
        "    padding: 5px 8px;\r\n"+
        "    display: flex;\r\n"+
        "}\r\n"+
        ".npc-row.npc-gold {\r\n"+
        "    background: rgba(245, 158, 11, .08);\r\n"+
        "    border-color: rgba(245, 158, 11, .2);\r\n"+
        "}\r\n"+
        ".npc-row.npc-silver {\r\n"+
        "    background: rgba(148, 163, 184, .07);\r\n"+
        "    border-color: rgba(148, 163, 184, .18);\r\n"+
        "}\r\n"+
        ".npc-row.npc-bronze {\r\n"+
        "    background: rgba(205, 127, 50, .07);\r\n"+
        "    border-color: rgba(205, 127, 50, .18);\r\n"+
        "}\r\n"+
        ".npc-rank {\r\n"+
        "    text-align: center;\r\n"+
        "    color: #bbb;\r\n"+
        "    flex-shrink: 0;\r\n"+
        "    width: 18px;\r\n"+
        "    font-size: 11px;\r\n"+
        "    font-weight: 800;\r\n"+
        "}\r\n"+
        ".npc-rank.npc-gold {\r\n"+
        "    color: #f59e0b;\r\n"+
        "}\r\n"+
        ".npc-rank.npc-silver {\r\n"+
        "    color: #94a3b8;\r\n"+
        "}\r\n"+
        ".npc-rank.npc-bronze {\r\n"+
        "    color: #cd7f32;\r\n"+
        "}\r\n"+
        ".npc-row-user {\r\n"+
        "    flex: 1;\r\n"+
        "    min-width: 0;\r\n"+
        "}\r\n"+
        ".npc-row-user strong {\r\n"+
        "    font-size: 11px;\r\n"+
        "}\r\n"+
        ".npc-row-user .user-name {\r\n"+
        "    white-space: nowrap;\r\n"+
        "    text-overflow: ellipsis;\r\n"+
        "    font-size: 13px;\r\n"+
        "    display: flex;\r\n"+
        "    overflow: hidden;\r\n"+
        "}\r\n"+
        ".user-name {\r\n"+
        "    align-items: center;\r\n"+
        "    display: inline-flex;\r\n"+
        "    text-decoration: none !important;\r\n"+
        "}\r\n"+
        ".npc-ticket-pill {\r\n"+
        "    flex-shrink: 0;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 3px;\r\n"+
        "    display: inline-flex;\r\n"+
        "}\r\n"+
        ".npc-ticket-pill .npc-amount {\r\n"+
        "    color: #c96a00;\r\n"+
        "    font-size: 12px;\r\n"+
        "    font-weight: 700;\r\n"+
        "}\r\n"+
        ".tags-grouped {\r\n"+
        "    border: 1px solid #e8e8e8;\r\n"+
        "    border-radius: 8px;\r\n"+
        "    overflow: hidden;\r\n"+
        "}\r\n"+
        ".mt-2 {\r\n"+
        "    margin-top: .5rem !important;\r\n"+
        "}\r\n"+
        ".tags-grouped .tag-category-tags {\r\n"+
        "    border-bottom: 1px solid #f0f0f0;\r\n"+
        "    flex-wrap: wrap;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 5px;\r\n"+
        "    padding: 9px 14px;\r\n"+
        "    display: flex;\r\n"+
        "}\r\n"+
        ".tags-grouped .tag-category-label {\r\n"+
        "    text-transform: uppercase;\r\n"+
        "    letter-spacing: .07em;\r\n"+
        "    color: #b4b4b4;\r\n"+
        "    white-space: nowrap;\r\n"+
        "    align-items: center;\r\n"+
        "    gap: 4px;\r\n"+
        "    width: 100%;\r\n"+
        "    font-size: 9.5px;\r\n"+
        "    font-weight: 700;\r\n"+
        "    display: flex;\r\n"+
        "}\r\n"+
        ".tags-grouped .tag-category-label .tag-count {\r\n"+
        "    color: #555;\r\n"+
        "    font-size: 9px;\r\n"+
        "    font-weight: 400;\r\n"+
        "}\r\n"+
        ".tags-grouped .genre {\r\n"+
        "    text-transform: capitalize;\r\n"+
        "    font-weight: 600;\r\n"+
        "    display: inline-block;\r\n"+
        "}\r\n"+
        ".tags-grouped .tag {\r\n"+
        "    background: rgba(0, 0, 0, .04);\r\n"+
        "    border: 1px solid rgba(0, 0, 0, .09);\r\n"+
        "    border-radius: 4px;\r\n"+
        "    padding: 2px 8px;\r\n"+
        "    font-size: 12px;\r\n"+
        "    line-height: 1.6;\r\n"+
        "    text-decoration: none;\r\n"+
        "    transition: border-color .15s, background .15s, color .15s;\r\n"+
        "    display: inline-block;\r\n"+
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
                newresp.response.retryDelay = [80,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120];
            } else {
                newresp.response.retryDelay = [80,40,25,25,25];
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
