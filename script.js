const button = document.getElementById('submit')
const main = document.getElementById('main')
let image = document.getElementById('image')
let link = ''
let text = ''
const additions = document.getElementById('add')
const readFile = document.getElementById('readFile')
const readFilediv = document.getElementById('readFilediv')
const file = document.getElementById('file')
const options = document.getElementById('options')
const colorInput = document.getElementById('color')
const bgcolorInput = document.getElementById('bgcolor')
const margin = document.getElementById('margin')
const f1 = document.getElementById('f1')
const f2 = document.getElementById('f2')
const f3 = document.getElementById('f3')

bgcolorInput.value = '#FFFFFF'
margin.value = 2

additions.onclick = () => {
    options.classList.toggle('opened')
    main.style.height = 'fit-content'
}

readFile.onclick = () => {
    readFilediv.classList.toggle('opened')
    button.classList.toggle('closed')
}

file.addEventListener('change', () => {
    let reader = new FileReader()
    reader.readAsText(file.files[0])

    reader.onload = () => {
        let result = reader.result
        result = result.split('\r\n')
        result.forEach(element => {
            let color = colorInput.value
            color = color.substring(1)
            let bgcolor = bgcolorInput.value
            bgcolor = bgcolor.substring(1)
            let qzone = margin.value
            if (f1.checked){
                format = 'jpg'
            }
            else if (f3.checked){
                format = 'svg'
            }
            else{
                format = 'png'
            }
            button.innerHTML = 'Generating QR code...'
            link = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + element
            link += '&color=' + color
            link += '&bgcolor=' + bgcolor
            link += '&format=' + format
            link += '&qzone=' + qzone
            fetchFile(link, element)
        });
    }
})


let format = ''
button.onclick = function(){
    let color = colorInput.value
    color = color.substring(1)
    let bgcolor = bgcolorInput.value
    bgcolor = bgcolor.substring(1)
    let qzone = margin.value
    if (f1.checked){
        format = 'jpg'
    }
    else if (f3.checked){
        format = 'svg'
    }
    else{
        format = 'png'
    }
    text = document.getElementById('input').value
    if (!text) return
    button.innerHTML = 'Generating QR code...'
    link = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + text
    link += '&color=' + color
    link += '&bgcolor=' + bgcolor
    link += '&format=' + format
    link += '&qzone=' + qzone
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
    fetchFile(link, text)
})

function fetchFile(url, name){
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file)
        let aTag = document.createElement('a')
        aTag.href = tempUrl
        aTag.download = 'OnlinityQR - ' + name + '.' + format
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