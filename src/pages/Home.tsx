// import { TextField } from '@mui/material'
// import { useState } from 'react'
// import { Button } from '@mui/material'

// const Home = () =>{
//     const [youtubeURL,setYoutubeURL] = useState('');
//     const [youtubeEmbedPlayer,setYoutubeEmbedPlayer] = useState(false);
//     const [youtubeEmbedLink,setYoutubeEmbedLink] = useState('');

//     function handleSubmitButton(){
//         const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([^\s&]+)/;
//         const match = String(youtubeURL).match(youtubeRegex);
//         const youtubeID = match ? match[1] : '';
//         // Check ID valid
//         if (youtubeID){
//             setYoutubeEmbedLink("https://www.youtube.com/embed/" + youtubeID +"?autoplay=1") ;
//             setYoutubeEmbedPlayer(true);
//             console.log(youtubeEmbedLink.valueOf());
            
//         }
//     }

//     const YoutubeEmbedPlayer = () =>{
//         return (
//             <>
//                 <div className="ratio ratio-16x9" >
//                     <iframe
//                         width="640"
//                         height="360"
//                         src="https://player.vimeo.com/video/VIMEOID"
//                         title="Vimeo Video"
//                         frameBorder="0"
//                         allow="autoplay; fullscreen"
//                         referrerPolicy="no-referrer"
//                         allowFullScreen={true} // Allow full screen can also be written as allowFullScreen
//                     />
//                 </div>
//             </>
//         )
//     }      

//     return (
//         <div>
           
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
//                 <TextField id="outlined-basic" label="Paste Youtube link" variant="outlined"
//                     sx={{
//                         // Root class for the input field
//                         "& .MuiOutlinedInput-root": {
//                         color: "#000",
//                         fontFamily: "Arial",
//                         fontWeight: "bold",
//                         // Class for the border around the input field
//                         "& .MuiOutlinedInput-notchedOutline": {
//                             borderColor: "white",
//                             borderWidth: "2px",
//                         },
//                         },
//                         // Class for the label of the input field
//                         "& .MuiInputLabel-outlined": {
//                         color: "white",
//                         },
//                         margin:"normal"
//                         // paddingBottom:'10px',
//                     }}
//                     onChange={(event)=>setYoutubeURL(event.target.value)}
//                 />
//                 <Button variant='contained' onClick={e=>handleSubmitButton()}>Go!</Button>
//             </div >
            
//             {youtubeEmbedPlayer && (
//                 <div style={{marginTop:'20px'}}>
//                     <YoutubeEmbedPlayer/>
//                 </div>)
//             }
            
            
//         </div>
//     )
// }
// export default Home