

class File{
    constructor(){
      this.form = document.querySelector('.form')
      this.onsubmit();
        Utils.off()

    }
    onsubmit(){
        let formFile = document.querySelector('[type="file"]')
        console.log(formFile.files);

            this.form.addEventListener('submit',event =>{
                event.preventDefault();

                    if(document.querySelector('.pai')){
                        let n = document.querySelector('.pai');
                        n.parentNode.removeChild(n);

                    }

                  document.querySelector('[type=submit]').disabled = true;

                  let bar = document.createElement('div');
                  bar.style.height = '4px';
                  bar.style.width = '0px';
                  bar.style.transition = '0.5s';
                  bar.style.background = 'black';
                  bar.setAttribute('class','bar');

                  let div = document.createElement('div');
                  let img = document.createElement('img');
                  let p = document.createElement('p');
                  let loading = document.querySelector('.loading');
                  let div1 = document.createElement('div');
                  div1.setAttribute('class','pai');
                  let span = document.createElement('span');

                  div.setAttribute('class','t');
                  loading.appendChild(p);
                  loading.appendChild(div);
                  document.querySelector('.t').innerHTML = `<div class = 'spinner'></div>`;
                  // loading.appendChild(span);
                  div1.appendChild(bar);
                  loading.appendChild(div1);
                  document.querySelector('.t').appendChild(span)
                  this.file()
                  .then(sucess =>{
                  if(sucess == null){
                      return
                  }
                      Tesseract.recognize(
                        `${sucess}`,
                        'eng',
                        { logger: m => {
                            let txt = `${Math.round(m.progress * 100)}%`

                            if(m.status === 'recognizing text'){

                                span.innerHTML = txt;

                                 bar.style.width = m.progress * 100 + '%';
                     }
                    //  console.log(m.progress);
                                            switch(m.status){
                                case "loading tesseract core":
                                    p.innerHTML = 'Iniciando o sistema ...';
                                    break;
                                    case "initialized tesseract":
                                        p.innerHTML = 'Sistema inicializado.';

                                        break;
                                        case "loading language traineddata":
                                            p.innerHTML = 'Carregando os dados do sistema...';

                                            break;
                                            case 'loaded language traineddata':
                                                p.innerHTML = 'Dados carregados.';

                                                break;
                                                case 'initializing api':
                                                    p.innerHTML = 'Lendo o conteudo da imagem.';

                                                    break;
                                                    case 'recognizing text':
                                                        p.innerHTML = 'Aguarde ...'
                                                        break;

                            }
                        } }

                        ).then(({ data: { text } }) => {
                        this.form.reset();
                        document.querySelector('[type=submit]').disabled = false;
                        let paragrafoTextResultado = document.createElement('p')
                        let results = document.querySelector('.results');
                        let divText = document.createElement('div');
                        let divImage = document.createElement('div');
                        let hr = document.createElement('hr')

                        divText.setAttribute('class','text')
                        paragrafoTextResultado = text
                        divText.innerHTML = paragrafoTextResultado
                        divImage.setAttribute('class','images')
                        divImage.appendChild(img)

                        img.setAttribute('src',sucess);
                        results.appendChild(divText)
                        results.appendChild(divImage);
                        results.appendChild(hr)
                        img.addEventListener('click',e =>{

                            Utils.modal(sucess);
                            Utils.on();

                        })

                        document.querySelector('.spinner').style.display = 'none';
                        p.innerHTML = '';
                        },error =>{
                          alert(error)
                        })

                  },error =>{
                      return
                  })

            })
    }

    file(){
      return new Promise((resolve,rejects)=>{

            let file = this.form.children[0].files[0]

            let fr = new FileReader();
            if(file){
                fr.readAsDataURL(file);
                fr.onload = () =>{
                resolve(fr.result)
                }

            }else{
                rejects(fr.error)
            }

        })

    }
  }
