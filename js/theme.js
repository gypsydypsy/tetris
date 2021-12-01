//------FUNCTIONS ------ //

function updateTheme() {

    hideSettings();
    document.body.removeAttribute('class');
    
    //Main color
    for (let colorRadio of colorRadios){
        if (colorRadio.checked){
            currentColor = colorRadio.value;
        }
    }
    document.body.classList.add(`color-${currentColor}`);
    localStorage.setItem('color', currentColor);

    //Brick theme
    for (let themeRadio of themeRadios){
        if(themeRadio.selected){
            currentTheme = themeRadio.value;
        }
    }

    document.body.classList.add(`${currentTheme}-theme`);
    localStorage.setItem('theme', currentTheme);


    //Music
    for (let musicRadio of musicRadios){
        if(musicRadio.checked){
            music = (musicRadio.value =='on') ? true : false;
            (music == false) ? song.currentTime = 0 : null;
        }    
    }

    localStorage.setItem('music', music);

    //Sound effects
    for (let sfxRadio of sfxRadios){
        if(sfxRadio.checked){
            soundEffect = (sfxRadio.value =='on') ? true : false;
        }    
    }

    localStorage.setItem('sfx', soundEffect);
}

function getTheme(){
    
    if (localStorage.getItem('color') && localStorage.getItem('theme') && localStorage.getItem('music') && localStorage.getItem('sfx')){

        document.body.removeAttribute('class');

        currentColor = localStorage.getItem('color');
        currentTheme = localStorage.getItem('theme');
        music = (localStorage.getItem('music') == 'true') ? true : false;
        soundEffect = (localStorage.getItem('sfx') == 'true') ? true : false;

        document.body.classList.add(`color-${currentColor}`);
        document.body.classList.add(`${currentTheme}-theme`);

    }

    //Updates settings form
    for (let colorRadio of colorRadios){
        if (colorRadio.value == currentColor){
            colorRadio.setAttribute('checked', true);
        }
    }

    for (let themeRadio of themeRadios){
        if(themeRadio.value == currentTheme){
            themeRadio.setAttribute('selected', true);
        }
    }

    let musicValue = (music) ? 'on' : 'off';
    for (let musicRadio of musicRadios){
        if(musicRadio.value == musicValue){
            musicRadio.setAttribute('checked', true);
        }    
    }

    let sfxValue = (soundEffect) ? 'on' : 'off';
    for (let sfxRadio of sfxRadios){
        if(sfxRadio.value == sfxValue){
            sfxRadio.setAttribute('checked', true);
        }    
    }    
}

// ------ EVENTS ------ //

settingsBtn.addEventListener('click', updateTheme);
window.addEventListener('load', getTheme);
