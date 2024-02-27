
    window.addMyCustomeElement('launcher-div', class extends Webolement {
        getContent() { return `
    <div class="flex column center middle  vh100 vw100">
        <div class="animate__animated animate__pulse flex column center middle">
            <img src="/android-chrome-192x192.png" alt="">
            <h1>Webolement</h1>
        </div>
    </div>
` }
        
    });
