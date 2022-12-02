import videoBG from '../assets/pikapaper.mp4'
import TypeWriterEffect from 'react-typewriter-effect'
const eevee = () => {
    const styles = {
        videoContainer: {
            width: "100%",
            height: "100%",
            overflow: "hidden",
            float: 'left',
            'z-index': '0',
            position: 'fixed',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
        },
        video: {
            // minWidth: "100%",
            // minHeight: "100%",
            width: "100%",
            height: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
        },
        welcome: {
            width: "fit-content",
            color: "#7A2BA1",
            "z-index": "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }

    }

    return (
        <div style={styles.videoContainer} >
            <div className='welcome' style={styles.welcome}>
                < TypeWriterEffect
                    textStyle={{
                        fontWeight: 500,
                        fontSize: "72px"
                    }}
                    startDelay={4000}
                    cursorColor="black"
                    text='Welcome, mortal!'
                    typeSpeed={50}
                    hideCursorAfterText={true} />
                <br></br>
                <TypeWriterEffect
                    textStyle={{
                        fontWeight: 500,
                        fontSize: "20px"
                    }}
                    startDelay={5000}
                    cursorColor="black"
                    text='Please identify yourself in our ranks or request to join us. See the appropriate links above.'
                    typeSpeed={30}
                    hideCursorAfterText={true} />
            </div>
            <video style={styles.video} autoPlay alt='a scroll unrolling' id='pikapaper'>
                <source src={videoBG} type='video/mp4' />
            </video>

        </div>
    )
}

export default eevee

