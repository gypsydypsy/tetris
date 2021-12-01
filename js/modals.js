// -------- Functions -------- //

function showControls(){
    controlsDisplay.style.display = 'block';
    (paused == false && gameStarted == true) ? togglePlayPause() : null;
}

function hideControls(){
    controlsDisplay.style.display = 'none';
}

function showSettings(){
    settingsDisplay.style.display = 'block';
    (paused == false && gameStarted == true) ? togglePlayPause() : null;
}

function hideSettings(){
    settingsDisplay.style.display = 'none';
}

// -------- Evenements -------- //

openControlsBtn.addEventListener('click', showControls);
closeControlsBtn.addEventListener('click', hideControls);
openSettingsBtn.addEventListener('click', showSettings);
closeSettingsBtn.addEventListener('click', hideSettings);