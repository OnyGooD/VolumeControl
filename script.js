const audio = document.getElementById('audioPlayer');
        const playBtn = document.getElementById('playBtn');
        const volumeUp = document.getElementById('volumeUp');
        const volumeDown = document.getElementById('volumeDown');
        const volumeDisplay = document.getElementById('volumeDisplay');

        let currentVolume = 0.5;
        audio.volume = currentVolume;

        function createRipple(e, button) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }

        playBtn.addEventListener('click', (e) => {
            createRipple(e, playBtn);
            if (audio.paused) {
                audio.play();
                playBtn.textContent = '⏸';
            } else {
                audio.pause();
                playBtn.textContent = '▶';
            }
        });

        audio.addEventListener('ended', () => {
            playBtn.textContent = '▶';
        });

        function updateVolumeDisplay() {
            const percentage = Math.round(currentVolume * 100);
            volumeDisplay.textContent = percentage + '%';
            volumeDisplay.style.setProperty('--volume-width', percentage + '%');
            volumeDisplay.style.animation = 'none';
            setTimeout(() => {
                volumeDisplay.style.animation = 'volumePulse 0.4s ease';
            }, 10);
        }

        volumeUp.addEventListener('click', (e) => {
            createRipple(e, volumeUp);
            const randomIncrease = (Math.random() * 0.99 + 0.01);
            currentVolume = Math.min(1, currentVolume + randomIncrease);
            audio.volume = currentVolume;
            updateVolumeDisplay();
        });

        volumeDown.addEventListener('click', (e) => {
            createRipple(e, volumeDown);
            const randomDecrease = (Math.random() * 0.99 + 0.01);
            currentVolume = Math.max(0, currentVolume - randomDecrease);
            audio.volume = currentVolume;
            updateVolumeDisplay();
        });

        updateVolumeDisplay();