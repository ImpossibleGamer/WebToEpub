"use strict";

module("WtrlabParser");

const WTRLAB_URL = "https://wtr-lab.com/en/novel/93808/survival-refreshing-talents-daily-i-endlessly-nested-dolls-of-skills";

function loadWtrlabSampleDoc() {
    return util.syncLoadSampleDoc("../testdata/WtrlabMetaInfo.html", WTRLAB_URL);
}

/** run loadEpubMetaInfo() with HttpClient.wrapFetch returning the sample page */
async function loadWtrlabMetaInfo() {
    let dom = loadWtrlabSampleDoc();
    let parser = new WtrlabParser();
    let originalWrapFetch = HttpClient.wrapFetch;
    HttpClient.wrapFetch = () => Promise.resolve({ responseXML: dom });
    try {
        await parser.loadEpubMetaInfo(dom);
    } finally {
        HttpClient.wrapFetch = originalWrapFetch;
    }
    return { parser, dom };
}

QUnit.test("parserFactory", function (assert) {
    let parser = parserFactory.fetch(WTRLAB_URL);
    assert.ok(parser instanceof WtrlabParser);
});

QUnit.test("loadEpubMetaInfo - basic fields", async function (assert) {
    let { parser, dom } = await loadWtrlabMetaInfo();

    assert.equal(parser.extractTitle(dom),
        "Survival: Refreshing Talents Daily, I Endlessly Nested Dolls of Skills");
    assert.equal(parser.extractAuthor(dom), "南霞");
    assert.equal(parser.findCoverImageUrl(dom),
        "https://img.wtr-lab.com/cdn/series/XzBp7WYLoWKqQuKofIrzsmIYMinpo5_sdVm5N3U9vd4.png?w=1088&h=1445");
    assert.ok(parser.extractDescription(dom).startsWith("Billions of humans descend"));
    assert.equal(parser.chapters, 196);
    assert.equal(parser.characters, 368166);
    assert.equal(parser.source, "fanqienovel");
});

QUnit.test("loadEpubMetaInfo - genres and tags become subject", async function (assert) {
    let { parser, dom } = await loadWtrlabMetaInfo();

    // genres [1,3,9,10,38]
    assert.deepEqual(parser.genre.map(g => g.title),
        ["Action", "Adventure", "Fantasy", "Game", "Xuanhuan"]);
    assert.equal(parser.tags.length, 20);

    let subject = parser.extractSubject(dom);
    assert.ok(subject.startsWith("Action, Adventure, Fantasy, Game, Xuanhuan, Male Protagonist"));
    assert.ok(subject.includes("Heaven Defying Comprehension"));
    assert.equal(subject.split(", ").length, 25);
});

QUnit.test("loadEpubMetaInfo - empty image uses placeholder", async function (assert) {
    let dom = loadWtrlabSampleDoc();
    let script = dom.querySelector("script#__NEXT_DATA__");
    let json = JSON.parse(script.textContent);
    json.props.pageProps.serie.serie_data.data.image = "";
    script.textContent = JSON.stringify(json);

    let parser = new WtrlabParser();
    let originalWrapFetch = HttpClient.wrapFetch;
    HttpClient.wrapFetch = () => Promise.resolve({ responseXML: dom });
    try {
        await parser.loadEpubMetaInfo(dom);
    } finally {
        HttpClient.wrapFetch = originalWrapFetch;
    }
    assert.equal(parser.findCoverImageUrl(dom), "https://wtr-lab.com/placeholder.png");
});

QUnit.test("formatNumber", function (assert) {
    let parser = new WtrlabParser();
    assert.equal(parser.formatNumber(1369), "1,369");
    assert.equal(parser.formatNumber(3196014), "3,196,014");
    assert.equal(parser.formatNumber("1,369"), "1,369");
    assert.equal(parser.formatNumber("abc"), "abc");
    assert.equal(parser.formatNumber(null), "");
});

QUnit.test("PostToUrl", function (assert) {
    let parser = new WtrlabParser();
    parser.slug = "my-novel";
    let url = parser.PostToUrl("https://wtr-lab.com/api/reader/get",
        { translate: "ai", language: "en", raw_id: "93808", chapter_no: "12" });
    assert.equal(url, "https://wtr-lab.com/en/novel/93808/my-novel/chapter-12?service=ai");
});