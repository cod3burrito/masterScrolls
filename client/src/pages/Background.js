import videoBG from '../assets/pikapaper.mp4'

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
            color: "#7A2BA1",
            textAlign: "center",
            "z-index": "1"
        }

    }
    return (
        <div style={styles.videoContainer} >
            <div className='welcome' style={styles.welcome}>
                <h1 style={{ fontSize: "72px" }}> Welcome, mortal! </h1>
                <p style={{ fontSize: "20px" }}> Please identify yourself in our ranks or request to join us. See the appropriate links above.</p>
            </div>
            <video style={styles.video} autoPlay alt='a scroll unrolling' id='pikapaper'>
                <source src={videoBG} type='video/mp4' />
            </video>

        </div>
    )
}

export default eevee