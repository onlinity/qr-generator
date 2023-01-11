const button = document.getElementById('submit')
const main = document.getElementById('main')
let image = document.getElementById('image')
let link = ''
let text = ''

button.onclick = function(){
    text = document.getElementById('input').value
    if (!text) return
    button.innerHTML = 'Generating QR code...'
    link = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + text
    image.src = link
    image.addEventListener('load', () => {
        main.classList.add('active')
        button.innerHTML = 'Generate code'
    })
}

document.getElementById('delete').onclick = function(){
    document.getElementById('input').value = ''
}

var x = setInterval(function(){
    if (document.getElementById('input').value == ''){
        main.classList.remove('active')
    }
}, 10)

const download = document.getElementById('download')

download.addEventListener('click', () => {
    download.innerText = 'Downloading...'
    fetchFile(link)
})

function fetchFile(url){
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file)
        let aTag = document.createElement('a')
        aTag.href = tempUrl
        aTag.download = 'OnlinityQR - ' + text + '.png'
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
        URL.revokeObjectURL(tempUrl)
        download.innerText = 'Download code'
    }).catch(() => {
        download.innerText = 'Download code'
        alert('Code download failed! Try again.')
    })
}