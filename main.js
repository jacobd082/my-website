let slide = 1

function next() {
    slidego(slide)
}

function slidego(_number) {
    if (_number==1){
        document.getElementById('title').innerHTML=('The keyboard smash game')
        document.getElementById('content').innerHTML=('The keyboard smash game is quite easy and simple... Just smash your keyboard for points... <a href="https://launchrgo.github.io/sites/thekeyboardsmashgame">Get it here</a>')
        
    }
    if (_number==2){
        document.getElementById('title').innerHTML=('Bubble')
        document.getElementById('content').innerHTML=('Bubble is a social media project that I have been working on. <a href="https://inthebubble.github.io/">See more...</a>')
        
    }
    if (_number==3){
        document.getElementById('title').innerHTML=('launchr')
        document.getElementById('content').innerHTML=('Launchr is a start page for your browser. It is a way to start on the internet. There is also user-made sites on it. <a href="https://launchrgo.github.io">Open</a>')

        slide = 0
    }

    slide = slide +=1
}