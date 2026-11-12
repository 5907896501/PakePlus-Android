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

// ========== 新增：#FF0029红色状态栏 + 兜底红条 + 左右宽度自适应 ==========
if (window.Android) {
    window.Android.setStatusBarColor("#FF0029", true);
    window.Android.setNavigationBarColor("#FF0029");
}
function buildSafeBar() {
    // 顶部红条
    const topBar = document.createElement('div');
    topBar.style.cssText = `
        width:100%;
        height:env(safe-area-inset-top);
        background:#FF0029;
        position:fixed;
        top:0;left:0;
        z-index:99999;
    `;
    // 底部红条
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

    // 核心：左右自适应，禁止横向溢出、横向滚动
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

