class Utils{
    static modal(src){
         let modal = document.querySelector('.modal');
         let img = document.createElement('img')
         img.setAttribute('src',src)
         img.setAttribute('class','imgModal')
         modal.appendChild(img)

    }
    static on(){
        let modal = document.querySelector('.modal');
        modal.style.display = 'block'
    }
    static off(){
        let modal = document.querySelector('.modal');
        return modal.style.display = 'none';
    }
}