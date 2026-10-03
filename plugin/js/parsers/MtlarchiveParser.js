"use strict";

parserFactory.register("fictionzone.net", () => new MtlarchiveParser());

// mtlarchive.com and reader-hub.com were previous names of site

class MtlarchiveParser extends Parser {
    constructor() {
        super();
        this.minimumThrottle = 3000;
    }

    async getChapterUrls(dom) {
        let storyId = await this.fetchStoryId(dom.baseURI);
        let json = await this.fetchChaptersJson(storyId);
        return this.jsonToChapterList(json, storyId);
    }

    toChapter(link) {
        return ({
            title: link.querySelector("span.chapter-title").textContent,
            sourceUrl: link.href
        });
    }

    async fetchStoryId(url) {
        let path = "/platform/novel-details?slug=" + this.extractSlug(url);
        let json = await this.fetchJsonFromSite(path);
        return json?.data?.id || null;
    }

    async fetchChaptersJson(storyId) {
        let path = "/platform/chapter-lists?novel_id=" + storyId;
        let json = await this.fetchJsonFromSite(path);
        return json?.data?.chapters ?? [];
    }

    jsonToChapterList(json, storyId) {
        return json.map(c => ({
            title: c.title,
            sourceUrl: `https://fictionzone.net/platform/chapter-content?novel_id=${storyId}&chapter_id=${c.chapter_id}&&highlight=true`
        }));
    }

    extractSlug(url) {
        return url.split("/").pop();
    }

    async fetchJsonFromSite(path, authToken = null) {
        // Build payload with JSON.stringify (no manual string concatenation).
        // The "headers" field is only added when we have a token (chapter content).
        let payload = {
            path: path,
            method: authToken ? "GET" : "get"
        };
        if (authToken) {
            payload.headers = [["authorization", `Bearer ${authToken}`]];
        }
        let options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(payload)
        };
        let json = (await HttpClient.fetchJson("https://fictionzone.net/api/__api_party/fictionzone", options)).json;
        return json;
    }

    // Reads the bearer token from the "fz_access_token" cookie.
    // Returns null if the user is not logged in or the token has expired,
    // in which case the request is sent without "headers" (same as before).
    async getAccessToken() {
        try {
            let cookies = util.isFirefox() ? browser.cookies : chrome.cookies;
            let siteUrl = "https://fictionzone.net";
            let tokenCookie = await cookies.get({ url: siteUrl, name: "fz_access_token" });
            if (!tokenCookie?.value) {
                return null;
            }
            // fz_token_expires_at is a unix timestamp in seconds
            let expiresCookie = await cookies.get({ url: siteUrl, name: "fz_token_expires_at" });
            let expiresAt = parseInt(expiresCookie?.value);
            if (!isNaN(expiresAt) && expiresAt * 1000 <= Date.now()) {
                return null;
            }
            return decodeURIComponent(tokenCookie.value);
        } catch (err) {
            // never log the cookie value, only the failure
            util.log("Unable to read fz_access_token cookie");
            return null;
        }
    }

    findContent(dom) {
        return Parser.findConstructedContent(dom);
    }

    extractTitleImpl(dom) {
        return dom.querySelector("h1.novel-title");
    }

    extractAuthor(dom) {
        let authorLabel = dom.querySelector(".metadata-value");
        return authorLabel?.textContent ?? super.extractAuthor(dom);
    }

    async fetchChapter(url) {
        let path = url.replace("https://fictionzone.net", "");
        let token = await this.getAccessToken();
        if (token == null) {
            throw new Error(
                "fictionzone.net: not logged in (or login expired). " +
                "Log in to fictionzone.net in this browser, then retry. " +
                "Without login only about half of each chapter is available."
            );
        }

        let json = await this.fetchJsonFromSite(path, token);

        // Server says content is locked, so the chapter is truncated even though HTTP status was 200
        if (this.isLoginRequiredResponse(json)) {
            throw new Error(
                "fictionzone.net: server returned a login-required response for '" + url + "' " +
                "(message: " + json?.message + "). The chapter would be incomplete. " +
                "Log in again in this browser and retry."
            );
        }
        return this.buildChapter(json.data, url);
    }

    isLoginRequiredResponse(json) {
        // Matches "Please, Login to continue reading." without depending on exact wording/punctuation
        return /log\s?in/i.test(json?.message ?? "");
    }

    buildChapter(json, url) {
        let newDoc = Parser.makeEmptyDocForContent(url);
        let title = newDoc.dom.createElement("h1");
        title.textContent = json.title;
        newDoc.content.appendChild(title);
        Parser.addTextToChapterContent(newDoc, json.content);
        return newDoc.dom;
    }

    findCoverImageUrl(dom) {
        return util.getFirstImgSrc(dom, ".cover-image-wrapper");
    }

    getInformationEpubItemChildNodes(dom) {
        return [...dom.querySelectorAll(".synopsis-text")];
    }
}
