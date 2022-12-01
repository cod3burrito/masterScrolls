import videoBG from '../assets/pikapaper.mp4'

const eevee = () => {return (
    <video autoPlay alt='a scroll unrolling' id='pikapaper' style={{float: 'left', 'z-index': '-1', position: 'fixed'}}>
        <source src={videoBG} type='video/mp4' />
    </video>
)}

export default eevee