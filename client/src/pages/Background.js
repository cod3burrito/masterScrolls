import videoBG from '../assets/paper.mp4'
// import pretty from '../assets/background.css'

const eevee = () => {return (
    <video autoPlay id='pikapaper' style={{float: 'left', 'z-index': '-1', position: 'fixed'}}>
        <source src={videoBG} type='video/mp4' />
    </video>
)}

export default eevee