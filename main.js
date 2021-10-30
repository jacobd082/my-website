        var i = 0;
        var txt = 'Hi! Im Jacob!'; 
        var speed = 100; 

        function typeWriter() {
        if (i < txt.length) {
            document.getElementById("txtstart").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }}
        typeWriter()


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
        document.getElementById('title').innerHTML=('Jeffrey and Mr. Krabs')
        document.getElementById('content').innerHTML=('If you are a Discord user, I made a couple bots. Jeffrey acts as a admin keeping your servers safe. Mr. Krabs just replies when someone mentions money.')
        
    }
    if (_number==3){
        document.getElementById('title').innerHTML=('launchr')
        document.getElementById('content').innerHTML=('Launchr is a start page for your browser. It is a way to start on the internet. There is also user-made sites on it. <a href="https://launchrgo.github.io">Open</a>')

        
    }
    if (_number==4){
        document.getElementById('title').innerHTML=('Dashd')
        document.getElementById('content').innerHTML=('Dashd is a clean dashboard for you to use. You can buy themes and extentions on its store to add a personal touch. <a href="https://dashdapp.github.io/">Open</a>')
        slide = 0
    }

    slide = slide +=1
}
