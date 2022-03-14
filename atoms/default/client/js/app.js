const mainContent = document.getElementById('maincontent')
let scrollPercent
const h2s = mainContent.querySelectorAll('h2')

const anchorWrapper = document.querySelector('.anchor-wrapper')

const h2regex = new RegExp(`/\s+/g, '-'`)

let buildFirstNavFunction
let setNavMargins
if (h2s != null) {
    console.log("WORKS")
    buildFirstNavFunction = (() => {
        h2s.forEach((el, index) => {
            const mainContent = document.getElementById('maincontent')
            const mainContentHeight = mainContent.clientHeight
            console.log(mainContentHeight)
            const contentDistanceFromTop = mainContent.getBoundingClientRect().top
            // make anchor links from the h2s on the page
            const anchorElement = document.createElement('a')
            anchorElement.classList.add('anchor-link')
            el.id = el.innerHTML.replace(h2regex).toLowerCase()
            anchorElement.href = "#" + el.innerHTML.replace(h2regex).toLowerCase()
            anchorElement.innerHTML = (`<span>${index + 1}</span>`) + (`<span>${el.innerHTML}</span>`)
            anchorWrapper.appendChild(anchorElement)
            setNavMargins(el, index)
        })
    })

    setNavMargins = ((el, index) => {
        const mainContent = document.getElementById('maincontent')
        const mainContentHeight = mainContent.clientHeight
        const contentDistanceFromTop = mainContent.getBoundingClientRect().top
        const anchorLinks = document.querySelectorAll('.anchor-link')
            
        const distanceFromTop = el.getBoundingClientRect().top
        const distanceFromContentTop = distanceFromTop - contentDistanceFromTop;
        // const percentageFromContentTop = Math.round(distanceFromContentTop / mainContentHeight * 100)
        const percentageFromContentTop = distanceFromContentTop / mainContentHeight * 100
        anchorLinks[index].style.marginLeft = `${percentageFromContentTop}%`;
    })
}


const progressFunction = (() => {
    const mainContent = document.getElementById('maincontent')
    const mainContentHeight = document.getElementById('maincontent').clientHeight
    console.log(mainContentHeight)
    // const contentDistanceFromTop = document.getElementById('maincontent').getBoundingClientRect().top
    const contentDistanceFromTop = document.getElementById('maincontent').getBoundingClientRect().top + window.scrollY
    var distanceScrolledInContent = window.scrollY - contentDistanceFromTop
    console.log("distanceScrolledInContent", distanceScrolledInContent)
    console.log("window.scrollY", window.scrollY)
    console.log("contentDistanceFromTop", contentDistanceFromTop)
    scrollPercent = distanceScrolledInContent / mainContentHeight * 100 + '%';
    console.log("scrollPercent", scrollPercent)
    document.getElementById('_progress').style.setProperty('--scroll', scrollPercent);

    if (document.getElementById('progress-bar').getBoundingClientRect().top <= 0) {
        document.getElementById('progress-bar').classList.add('at-top')
    } else {
        document.getElementById('progress-bar').classList.remove('at-top')
    }
    
})



const init = (() => {
    console.log("init")
    buildFirstNavFunction()
    document.addEventListener('scroll', () => {
        progressFunction()
    },
    { passive: true }
    );
})

const onResize = (() => {
    console.log("On resize function!!!!")
    h2s.forEach((el, index) => {
        setNavMargins(el, index)
    })
    progressFunction()
    
})

if (document.readyState === 'loading') { // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', init);
} else { // `DOMContentLoaded` has already fired
    init();
}

// create an Observer instance
const resizeObserver = new ResizeObserver((entries) => {
    console.log('Body height changed:', entries[0].target.clientHeight)
    onResize()
})
resizeObserver.observe(document.body)