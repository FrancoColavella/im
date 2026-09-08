const intro = document.getElementById("intro");
const startButton = document.getElementById("startButton");
const mainContent = document.getElementById("mainContent");

const musicButton = document.getElementById("musicButton");
const musicText = document.getElementById("musicText");

const heartsContainer =
    document.getElementById("heartsContainer");


/* =====================================
   YOUTUBE
===================================== */

let player = null;

let youtubeReady = false;

let musicPlaying = false;

let startRequested = false;


/*
 * Esta función es llamada automáticamente
 * por la API de YouTube.
 */
function onYouTubeIframeAPIReady() {

    console.log("API de YouTube cargada");


    player = new YT.Player(
        "youtube-player",
        {

            width: "200",
            height: "200",

            videoId: "LKpddypa4gc",

            playerVars: {

                autoplay: 0,

                controls: 0,

                disablekb: 1,

                fs: 0,

                loop: 1,

                playlist: "LKpddypa4gc",

                playsinline: 1,

                rel: 0,

                /*
                 * MUY IMPORTANTE:
                 * le indicamos a YouTube desde
                 * qué página se está reproduciendo.
                 */
                origin: window.location.origin

            },


            events: {

                /*
                 * YouTube terminó de crear
                 * el reproductor.
                 */
                onReady: function(event) {

                    console.log(
                        "Reproductor de YouTube listo"
                    );

                    youtubeReady = true;

                    event.target.setVolume(65);


                    /*
                     * Si el usuario ya tocó
                     * "Entrar", reproducimos.
                     */
                    if (startRequested) {

                        startMusic();

                    }

                },


                /*
                 * Cambios de estado.
                 */
                onStateChange: function(event) {

                    console.log(
                        "Estado YouTube:",
                        event.data
                    );


                    /*
                     * 1 = PLAYING
                     */
                    if (
                        event.data ===
                        YT.PlayerState.PLAYING
                    ) {

                        musicPlaying = true;

                        musicText.textContent =
                            "Música";

                    }


                    /*
                     * 2 = PAUSED
                     */
                    else if (
                        event.data ===
                        YT.PlayerState.PAUSED
                    ) {

                        musicPlaying = false;

                        musicText.textContent =
                            "Reproducir";

                    }


                    /*
                     * 0 = ENDED
                     */
                    else if (
                        event.data ===
                        YT.PlayerState.ENDED
                    ) {

                        /*
                         * El playlist configurado arriba
                         * debería encargarse del loop.
                         */
                        musicPlaying = false;

                    }

                },


                /*
                 * Errores de YouTube.
                 */
                onError: function(event) {

                    console.error(
                        "ERROR DE YOUTUBE:",
                        event.data
                    );

                }

            }

        }
    );

}


/* =====================================
   INICIAR MÚSICA
===================================== */

function startMusic() {

    if (!youtubeReady || !player) {

        console.log(
            "YouTube todavía no está listo"
        );

        return;

    }


    console.log(
        "Intentando reproducir música..."
    );


    try {

        /*
         * Nos aseguramos de que
         * no esté muteado.
         */
        player.unMute();

        /*
         * Volumen.
         */
        player.setVolume(65);

        /*
         * Reproducir.
         */
        player.playVideo();

    }

    catch (error) {

        console.error(
            "Error al reproducir YouTube:",
            error
        );

    }

}


/* =====================================
   BOTÓN ENTRAR
===================================== */

startButton.addEventListener(
    "click",
    function() {

        console.log(
            "BOTÓN ENTRAR PRESIONADO"
        );


        /*
         * Guardamos que el usuario
         * interactuó con la página.
         */
        startRequested = true;


        /*
         * Mostrar contenido.
         */
        mainContent.classList.remove(
            "hidden"
        );


        /*
         * Ocultar intro.
         */
        intro.classList.add(
            "hide"
        );


        /*
         * Permitir scroll.
         */
        document.body.classList.remove(
            "locked"
        );


        /*
         * Mostrar botón de música.
         */
        musicButton.classList.remove(
            "hidden-control"
        );


        /*
         * Si YouTube ya está listo,
         * intentamos reproducir.
         */
        if (youtubeReady) {

            startMusic();

        }

        else {

            console.log(
                "Esperando a que YouTube termine de cargar..."
            );

        }

    }
);


/* =====================================
   BOTÓN DE MÚSICA
===================================== */

musicButton.addEventListener(
    "click",
    function() {

        if (!youtubeReady || !player) {

            console.log(
                "YouTube todavía no está listo."
            );

            return;

        }


        /*
         * Si está reproduciendo,
         * pausamos.
         */
        if (musicPlaying) {

            player.pauseVideo();

            musicPlaying = false;

            musicText.textContent =
                "Reproducir";

        }


        /*
         * Si está pausado,
         * reproducimos.
         */
        else {

            startRequested = true;

            startMusic();

        }

    }
);


/* =====================================
   CORAZONES FLOTANTES
===================================== */

function createHeart() {

    const heart =
        document.createElement("div");


    heart.classList.add(
        "floating-heart"
    );


    heart.textContent = "♥";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (10 + Math.random() * 12) + "px";


    heart.style.animationDuration =
        (7 + Math.random() * 6) + "s";


    heart.style.opacity =
        0.3 + Math.random() * 0.5;


    heartsContainer.appendChild(
        heart
    );


    setTimeout(
        function() {

            heart.remove();

        },
        14000
    );

}


/* =====================================
   CREAR CORAZONES
===================================== */

setInterval(
    function() {

        /*
         * Solamente aparecen cuando
         * ya entramos a la página.
         */
        if (
            !intro.classList.contains("hide")
        ) {

            return;

        }


        createHeart();

    },
    1800
);