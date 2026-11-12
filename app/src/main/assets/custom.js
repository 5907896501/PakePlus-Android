window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// #FF0029 红色，尝试原生状态栏
let statusBarOk = false
if (window.Android && typeof window.Android.setStatusBarColor === 'function') {
    try {
        window.Android.setStatusBarColor("#FF0029", true);
        window.Android.setNavigationBarColor("#FF0029");
        statusBarOk = true
    } catch (err) {
        console.log("原生状态栏接口调用失败")
    }
}

// 兜底：生成网页内红条（这个红条在状态栏下面，不是系统时间栏！）
function buildSafeBar() {
    const topBar = document.createElement('div');
    topBar.style.cssText = `
        width:100%;
        height:env(safe-area-inset-top);
        background:#FF0029;
        position:fixed;
        top:0;left:0;
        z-index:99999;
    `;
    const bottomBar = document.createElement('div');
    bottomBar.style.cssText = `
        width:100%;
        height:env(safe-area-inset-bottom);
        background:#FF0029;
        position:fixed;
        bottom:0;left:0;
        z-index:99999;
    `;
    document.body.appendChild(topBar);
    document.body.appendChild(bottomBar);

    document.documentElement.style.width = '100%';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.width = '100%';
    document.body.style.overflowX = 'hidden';
    document.body.style.paddingTop = 'env(safe-area-inset-top)';
    document.body.style.paddingBottom = 'env(safe-area-inset-bottom)';
    document.body.style.boxSizing = 'border-box';
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSafeBar);
} else {
    buildSafeBar();
}
