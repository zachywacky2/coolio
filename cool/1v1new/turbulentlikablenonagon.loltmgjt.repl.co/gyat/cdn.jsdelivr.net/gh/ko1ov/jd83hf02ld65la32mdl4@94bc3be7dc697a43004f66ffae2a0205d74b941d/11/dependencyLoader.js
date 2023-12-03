let dependencyUrls = []
const maxLoadTimesTrys = 4;

//Main Libraries
dependencyUrls.push("https://www.googletagmanager.com/gtag/js?id=UA-118283036-6", "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js");
//Ads Libraries
dependencyUrls.push("https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/adsController.js", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/cpmstar.js", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/moneyController.js");
//Firebase/Google Libraries
dependencyUrls.push("https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/googleAnalytics.js", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/firebase-init.js?v=2", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/firebase-login.js?v=2", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/firebase-config.js?v=2", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/firebase-firestore.js?v=2")
//Game Libraries
dependencyUrls.push("https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/unityUrls.js?v=2", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@9978e050f9bf7f5316d56f02e972a3c5f5b302cc/11/unityGame.js?v=2", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/mobileRedirect.js", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/fullscreen.js")
//etc. Libraries
dependencyUrls.push("https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/windowResize.js", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/blockManager.js", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/macUserAgent.js", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/visibilityChangeListener.js", "https://cdn.jsdelivr.net/gh/ko1ov/jd83hf02ld65la32mdl4@4b3621635b678d8c659edf4f40b181ad8f3addd8/11/xsolla.js")

dynamicallyLoadScripts();

async function dynamicallyLoadScripts() {
    for (let i = 0; i < dependencyUrls.length; i++) {
        let url = dependencyUrls[i];
        let script = document.createElement("script");
        script.src = url;

        document.head.appendChild(script);
    }

    let trys = 0;
    while (window.loadedUrls === undefined || window.firebaseLoaded === undefined || window.adsLoaded === undefined
    || window.gameScriptLoaded === undefined || window.configInit === undefined || window.adsControllerLoaded === undefined) {
        await sleep(500)
        trys++;
        if(trys >= maxLoadTimesTrys) {
            break;
        }
    }

    isGameLoaded();
    initAds();
    loadGame();
    initFirebaseLibraries();
    fixMacUserAgent();
}

function loadGame() {
    let gameLoader = document.createElement("script")
    gameLoader.src = getGameLoaderUrl();
    gameLoader.id = "unity-loader"
    gameLoader.onload = function () {
        showGame();
    };

    let gameLoadDiv = document.getElementById("unity-loader-div");
    gameLoadDiv.innerHTML = "";
    gameLoadDiv.appendChild(gameLoader);
}

async function isGameLoaded() {
    await sleep(5000);
    if(window.gameStartLoading === undefined) {
        location.reload();
    }
}

function initFirebaseLibraries() {
    initializeFireBase();
    initRemoteConfig();
}

function onUnityReady() {
    checkAdBlock();
    sendConfig();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}